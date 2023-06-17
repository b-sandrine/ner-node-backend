const mongoose = require('mongoose')

const ownerSchema = mongoose.Schema({
    fullnames: {
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
    }
})

const Owner = mongoose.model("owners", ownerSchema);

module.exports = Owner;