const lod = require("lodash");
const config = require("config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let router = require("express")();
const {
    Users
} = require("../models/users");

router.post("/login", async (req, res) => {
    try {
        let user = await Users.findOne({
            email: req.body.email,
        });

        if (!user) return res.status(400).send("Invalid email or password");
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword)
            return res.status(400).send("Invalid email or password");

        let token = jwt.sign({
            _id: user._id
        }, config.get("jwtPrivateKey"));
        res.send(token);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
