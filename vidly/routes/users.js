const lod = require("lodash");
const bcrypt = require('bcrypt');
let router = require("express")();
let auth = require('../middleware/auth')
const {
    Users
} = require("../models/users");

router.post("/register", async (req, res) => {
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

        res.header('x-auth-token', token).send(lod.pick(user, ["_id", "name", "email"]));
    } catch (err) {
        console.log(err)
        res.status(400).send(err.message);
    }
});

router.get('/me', auth, async (req, res) => {
    try {
        const user = await Users.findById(req.user._id).select("-password")
        res.status(200).send(user)
    } catch (err) {
        console.log(err.message)
        return res.status(400).send(err.message)
    }
})

module.exports = router;
