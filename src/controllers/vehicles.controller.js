const Vehicles = require('../models/vehicles.model')

const addVehicles = async(req,res) => {
    try {
        const {name,type,quantity} = req.body
        const createdBy = req.user.userId

        const   Vehicles = await  Vehicles.create({name,type,quantity,createdBy})

        if( Vehicles) {
            return res.status(201).json({   Vehicles})
        }
        return res.status(400).json({error: "Failed to create   Vehicles"})
    }
    catch(err) {
        return res.status(500).json({err: "Internal Server Error"})
    }
}

module.exports = {addVehicles}
