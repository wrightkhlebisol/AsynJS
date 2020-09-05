let mongoose = require('mongoose');
let config = require('config')
let jwt = require('jsonwebtoken')
const Joi = require('joi');

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 10
    }
});

function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(user, schema)
}

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({
        _id: this._id
    }, config.get("jwtPrivateKey"));
}

let Users = mongoose.model('users', userSchema);
exports.Users = Users;
exports.validate = validateUser;
