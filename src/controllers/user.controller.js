const User = require('../models/user.model')

const addUser = async(req,res) => {
    const user = new User(req.body);
    const result = await user.save();
    try {
        if(result) {
            res.status(201).send(result)
        }
    }
    catch(err) {
        console.log(err)
        res.status(400).send("Failed to save used")
    }
}

module.exports = {addUser}