const express = require('express') //exports single function
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

// Define paths for Express config
const PublicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views
app.set('view engine', 'hbs') // name value
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directories to serve
app.use(express.static(PublicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Utkrisht"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Utkrisht"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: "You have reached help",
        title: "Help",
        name: "Utkrisht"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }

    geocode(req.query.address, (error, { location, latitude, longitude } = {}) => {
        //console.log(typeof error)
        if (error !== "undefined") {
            //console.log(error)
            return res.send({
                error
            })
        }
        forecast(longitude, latitude, (error, forecastData) => {
            //console.log(typeof error)
            //console.log(forecastData)

            if (typeof error !== "undefined") {
                console.log(error)
                return res.send({
                    error
                })
            }
            //console.log("here")
            res.send({
                location,
                forecastData,
                address: req.query.address
            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('notfound', {
        title: "404",
        name: 'Utkrisht',
        errorMessage: "Help article not found"
    })
})

// 404 route wildcard character
app.get('*', (req, res) => { //everything is a match
    res.render('notfound', {
        title: "404 Page",
        name: "Utkrisht",
        errorMessage: "Page not Found"
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})