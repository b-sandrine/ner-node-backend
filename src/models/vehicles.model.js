const mongoose = require('mongoose')

const vehiclesSchema = mongoose.Schema({
    chasisNumber: {
        type: Number,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    plateNumber: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required:true
    }
})

const Vehicles = mongoose.model("vehicles", vehiclesSchema)

module.exports = Vehicles;