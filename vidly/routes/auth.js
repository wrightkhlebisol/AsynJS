const bcrypt = require("bcrypt");
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

        const token = user.generateAuthToken();
        res.send(token);
    } catch (err) {
        console.log(err)
        res.status(400).send(err.message);
    }
});

module.exports = router;
