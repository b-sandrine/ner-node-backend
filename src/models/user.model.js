const mongoose = require('mongoose')
const Joi = require('joi')

const userSchema = mongoose.Schema({
    fullnames: {
        type: String
    },
    email : {
        type: String
    },
    NID: {
        type: Number
    },
    phoneNumber: {
        type: String
    },
    address: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    }
})

const User = mongoose.model("users", userSchema);

const validUser = Joi.object({
    fullnames: Joi.string().min(5).max(50).required(),
    email: Joi.string().email().required(),
    NID: Joi.number().integer().min(1190000000000000).max(1200700000000000).required(),
    phoneNumber: Joi.string().required(),
    address: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().min(6).required(),
})


module.exports = {User, validUser};