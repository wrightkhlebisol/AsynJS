const lod = require("lodash");
const bcrypt = require('bcrypt');
let router = require("express")();
const {
    Users
} = require("../models/users");

router.post("/", async (req, res) => {
    try {
        let users = await Users.findOne({
            email: req.body.email,
        });

        if (users) return res.status(400).send("User already registered.");
        let user = new Users(lod.pick(req.body, ["name", "email", "password"]));

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        let token = user.generateAuthToken();

        await user.save();

        res.header('X-Auth-Token', token).send(lod.pick(user, ["_id", "name", "email"]));
    } catch (err) {
        console.log(err)
        res.status(400).send(err.message);
    }
});

module.exports = router;
