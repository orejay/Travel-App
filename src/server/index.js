const express = require('express')
var path = require('path')
const fetch = require('node-fetch')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const geoUrl = process.env.GEON_URL
const geoKey = process.env.GEON_KEY
const wthrbit = process.env.WTHRBIT_URL
const wthrbitKey = process.env.WTHRBIT_KEY
const pxrbay = process.env.PXR_URL
const pxrbayKey = process.env.PXR_KEY

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'))
})

app.get('/media/logo.png', function (req, res) {
    res.sendFile(path.resolve('./src/client/media/logo.png'))
})

app.post('/check', async function(req, res) {
    let destination = req.body.destination
    let days = req.body.days
    let date = req.body.date
    const geonUrl = `${geoUrl}=${destination}&maxRows=10&username=${geoKey}`
    const geoData = await fetch(geonUrl)
    const geonData = await geoData.json()
    const lat = geonData.geonames[0].lat
    const lng = geonData.geonames[0].lng
    const wthrbitUrl = `${wthrbit}lat=${lat}&lon=${lng}&key=${wthrbitKey}`
    const wthrbitData = await fetch(wthrbitUrl)
    const weatherData = await wthrbitData.json()
    getWeather(weatherData, days, pxrbay, pxrbayKey, destination, date)    
    .then((weather) => {
        const resultData = {
            weather: weather, 
        }
        res.send(resultData)
    })
})

const getWeather = async (weatherData, days, pxrbay, pxrbayKey, destination, date) => {
        if (days <= 15 && days >= 0) {
            const pxrbayUrl = `${pxrbay}?key=${pxrbayKey}&category=place&q=${destination}&image_type=photo}`
            const pxrbayData = await fetch(pxrbayUrl)
            const photoData = await pxrbayData.json()
            const image = photoData.hits[0].webformatURL
            const weather = { highTemp: weatherData.data[days].high_temp,
                lowTemp: weatherData.data[days].low_temp,
                icon: weatherData.data[days].weather.icon,
                description: weatherData.data[days].weather.description,
                image: image,
                destination: destination,
                days: days,
                date: date
            }
            return weather
        } else if (days < 0) {
            const pxrbayUrl = `${pxrbay}?key=${pxrbayKey}&category=place&q=${destination}&image_type=photo}`
            const pxrbayData = await fetch(pxrbayUrl)
            const photoData = await pxrbayData.json()
            const image = photoData.hits[0].webformatURL
            const weather = { highTemp: weatherData.data[0].high_temp,
                lowTemp: weatherData.data[0].low_temp,
                icon: weatherData.data[0].weather.icon,
                description: weatherData.data[0].weather.description,
                image: image,
                destination: destination,
                days: days,
                date: date
            }
            return weather
        } else {
            const pxrbayUrl = `${pxrbay}?key=${pxrbayKey}&category=place&q=${destination}&image_type=photo}`
            const pxrbayData = await fetch(pxrbayUrl)
            const photoData = await pxrbayData.json()
            const image = photoData.hits[0].webformatURL
            const weather = { highTemp: weatherData.data[15].high_temp,
                lowTemp: weatherData.data[15].low_temp,
                icon: weatherData.data[15].weather.icon,
                description: weatherData.data[15].weather.description,
                image: image,
                destination: destination,
                days: days,
                date: date
            }
            return weather
        }
    }

app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})