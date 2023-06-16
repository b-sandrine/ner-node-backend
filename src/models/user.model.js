const mongoose = require('mongoose')

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

module.exports = User;