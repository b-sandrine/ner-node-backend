const mongoose = require('mongoose')
const Joi = require('joi')
const vehiclesSchema = mongoose.Schema({
    chasisNumber: {
        type: String,
    },
    manufacturer: {
        type: String,
    },
    year: {
        type: Number,
    },
    price: {
        type: Number,
    },
    plateNumber: {
        type: String,
    },
    model: {
        type: String,
    },
    owner: {
        type: String,
    }
})

const Vehicles = mongoose.model("vehicles", vehiclesSchema)

const validVehicle = Joi.object({
    chasisNumber: Joi.string().required(),
    manufacturer: Joi.string().required(),
    year: Joi.number().integer().required(),
    price: Joi.number().integer().required(),
    plateNumber: Joi.string().required(),
    model: Joi.string().required(),
    owner: Joi.string().required()
})

module.exports = { Vehicles, validVehicle};