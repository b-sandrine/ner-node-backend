const { User, validUser, validLoginUser } = require('../models/user.model')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcrypt')

const KEY = process.env.SECRET_KEY;

const addUser = async (req, res) => {
    try {
        const userData = req.body;
        const { error } = validUser.validate(userData)

        if (error) {
            return res.status(400).json({ error: error.details[0].message })
        }
        else {
            const userExist = await User.findOne({ email: userData.email })

            if (userExist) {
                return res.status(400).json({
                    error: "User already exists",
                    user: userExist
                })
            }

            const password = userData.password;

            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    console.log(err)
                    return
                }

                bcrypt.hash(password, salt, (err, hashedPassword) => {
                    if (err) {
                        console.log(err)
                        return;
                    }
                    userData.password = hashedPassword;
                    const user = new User(userData);
                    user.save()
                    .then((result) => {
                        return res.status(201).json(result)
                    })
                    .catch((err) => {
                        console.log(err)
                        return res.status(500).json({error: "Failed to save user"})
                    })
                })
            })

        }
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ error: "Failed to save user" })
    }
}

const login = async (req, res) => {
    try {
        const userData = req.body;
        const { error } = validLoginUser.validate(userData)

        if (error) {
            return res.status(400).json({ error: error.details[0].message })
        }
        else {
            const email = userData.email
            const result = await User.findOne({ email: email })

            if (!result) {
                return res.status(404).json({ error: 'User not found' });
            }

            const storedPassword = result['password'];
            const enteredPassword = userData.password;

            bcrypt.compare(enteredPassword, storedPassword, (err, success) => {
                if (err) {
                    return res.status(500).json({ error: "An Error Occured" })
                }
                if (success) {
                    const token = jwt.sign({ id: result._id }, KEY, { expiresIn: '6h' })

                    const payload = {
                        user: result,
                        token: token
                    }

                    return res.status(200).json({ payload })
                }
                else {
                    return res.status(400).json({ error: "Invalid Credentials" })
                }
            })

        }

    }
    catch (err) {
        console.log(err)
        res.status(400).json({ error: "User not found" })
    }
}

const welcome = (req, res) => {
    res.status(200).send("Protected route")
}
module.exports = { addUser, login, welcome }