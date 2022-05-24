const express = require('express')
var path = require('path')
const fetch = require('node-fetch')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const { json } = require('body-parser')
dotenv.config()

const geoUrl = process.env.GEON_URL
const geoKey = process.env.GEON_KEY
const wthrbit = process.env.WTHRBIT_URL
const wthrbitKey = process.env.WTHRBIT_KEY
const pxrbayUrl = process.env.PXR_URL
const pxrbayKey = process.env.PXR_KEY

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

app.post('/check', async function(req, res) {
    let destination = req.body.destination
    let days = req.body.days
    const geonUrl = `${geoUrl}=${destination}&maxRows=10&username=${geoKey}`
    fetch(geonUrl)
    .then ((res) => res.json())
    .then ((json) => {
        const lat = json.geonData[0].lat
        const lng = json.geonData[0].lng

        const wthrbitUrl = `${wthrbit}lat=${lat}&lon=${lng}&key=${wthrbitKey}`
        fetch(wthrbitUrl)
        .then((res) => res.json())
        .then((json) => {
            console.log(json)
        })

    })

    return 2
})

app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})