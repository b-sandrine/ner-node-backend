const { User, validUser } = require('../models/user.model')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const KEY = process.env.SECRET_KEY;

const addUser = async (req, res) => {
    try {
        const userData = req.body;
        const {error} = validUser.validate(userData)

        if (error) {
            return res.status(400).json({error: error.details[0].message})
        }
        else {
            const userExist = await User.findOne({email: userData.email})

            if(userExist) {
                return res.status(400).json({
                    message: "User already exists",
                    user: userExist
                })
            }
            const user = new User(userData);
            const result = await user.save();
            res.status(201).json(result)
        }
    }
    catch (err) {
        console.log(err)
        res.status(400).send("Failed to save used")
    }
}

const login = async (req, res) => {
    try {
        const email = req.body.email;
        const result = await User.findOne({ email: email })

        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }

        const token = jwt.sign({ id: result._id }, KEY, { expiresIn: '6h' })

        const payload = {
            user: result,
            token: token
        }

        res.status(200).json({ payload })
    }
    catch (err) {
        console.log(err)
        res.status(400).send("User not found")
    }
}

const welcome = (req, res) => {
    res.status(200).send("Protected route")
}
module.exports = { addUser, login, welcome }