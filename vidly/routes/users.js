const lod = require("lodash");
let router = require("express")();
const { Users } = require("../models/users");

router.post("/", async (req, res) => {
  try {
    let users = await Users.findOne({
      email: req.body.email,
    });

    if (users) return res.status(400).send("User already registered.");
    let newUser = new Users(lod.pick(req.body, ["name", "email", "password"]));
    await newUser.save();
    res.status(200).send(lod.pick(newUser, ["_id", "name", "email"]));
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
