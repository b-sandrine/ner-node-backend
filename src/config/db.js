const mongoose = require('mongoose')
require('dotenv').config();

const URL = process.env.MONGODB_URL;

const connection = mongoose.connect(URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(() => {
    console.log("Successfully connected to DB")
})
.catch((err) => {
    console.log(err)
})

module.exports = connection;