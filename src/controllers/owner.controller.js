const Owner = require('../models/owner.model')

const addOwner = async (req, res) => {
    try {
        const ownerData = req.body;

        const owner = new Owner(ownerData);
        owner.save()
            .then((result) => {
                return res.status(201).json(result)
            })
            .catch((err) => {
                console.log(err)
                return res.status(500).json({ error: "Failed to save owner" })
            })


    }
    catch (err) {
        console.log(err)
        res.status(400).json({ error: "Failed to save owner" })
    }
}

const getOwners = async(req,res) => {
    try {
        const result = await Owner.find()

        if(result) {
            return res.status(200).json({result})
        }
        res.status(400).json({error: "unable to fetch data "})
    }
    catch(err) {
        console.log(err)
        res.status(500).json({error: "Server Error"})
    }
}

module.exports = { addOwner, getOwners }