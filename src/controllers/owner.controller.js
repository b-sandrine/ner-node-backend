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
        res.status(400).json({ error: "Failed to save user" })
    }
}

module.exports = { addOwner }