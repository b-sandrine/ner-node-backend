const jwt = require('jsonwebtoken')
require('dotenv').config()

const User = require('../models/user.model')

const KEY = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
    const token = req.headers.token?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "unauthorized" })
    }

    try {
        const decoded = jwt.verify(token, KEY)

        req.user = decoded.user;
        next()
    }
    catch (error) {
        return res.status(401).json({ error: 'Invalid token' })
    }
}

const authRole = (requiredRole) => {
    return (req, res, next) => {
        const userRole = req.body.role;

        if (userRole == requiredRole) {
            next()
        }
        else {
            return res.status(401).json({ error: 'Access Denied' })
        }
    }
}

const authUser = async (req, res, next) => {
    const token = req.headers.token?.split(' ')[1]

    if (!token) {
        return res.status(400).json({ error: 'Invalid token' })
    }

    try {
        const decoded = jwt.verify(token, KEY)
        const userId = decoded.userId;

        await User.findById(userId)
            .then((user) => {
                if (!user) {
                    return res.status(401).json({ error: 'Unauthorized' })
                }

                req.user = user;
                next()
            })
            .catch((err) => {
                console.log(err)
                return res.status(500).json({error: 'Internal Server Error'})
            })
    }
    catch(err) {
        console.log(err)
        return res.status(401).json({error: 'Unauthorized'})
    }
}

module.exports = { verifyToken, authRole, authUser };