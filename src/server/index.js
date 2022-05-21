const express = require('express')
var path = require('path')
const fetch = require('node-fetch')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'))
})

app.get('/logo/logo.png', function (req, res) {
    res.sendFile(path.resolve('./src/client/media/logo.png'))
})

app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})