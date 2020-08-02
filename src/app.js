const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define path for express config
const publicPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebar engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicPath)) // It will load a statick page

// app.get('', (req, res)=>{
//     res.send('<h1>Weather</h1>')
// }) // This route never going to work because we are using app.use(express.static(publicPath)). 
// It will load the index page page in the public directory

// app.get('/help', (req, res)=>{
//     res.send([{
//         name: 'Raja'
//     },
//     {
//         name: 'Andrew'
//     }
// ])
// })

// app.get('/about', (req, res)=>{
//     res.send('<h1>About page</h1>')
// })

// if you want to use dynamic content with template engine
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Raja Chakraborty'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Raja Chakraborty'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Hello There I am Raja to help you out',
        title: 'Help',
        name: 'Raja Chakraborty'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     location: 'Philadalphia',
    //     tempreture: '40 degree out there',
    //     name: 'Raja Chakraborty',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Help artical not found',
        name: 'Raja Chakraborty'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Page not found'
    })
})



app.listen(port, () => {
    console.log('Server is up on the port ' + port);
})