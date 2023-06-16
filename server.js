const express = require('express')
require('dotenv').config()
const json = express.json();
const cors = require('cors')

const PORT = process.env.PORT || 2000
const app = express();

app.use(json)
app.use(cors())

require('./src/config/db')
const routes = require('./src/routes/user.route')

const swagger = require('./swagger')

swagger(app);

app.get('/',(req,res) => {
    res.send('Welcome to backend tutorial')
})

app.use('/api',routes)

app.listen(PORT, function() {
    console.log(`app running on http://localhost:${PORT}`);
})