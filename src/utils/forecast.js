request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'https://api.darksky.net/forecast/e6af5b5feb891b272e18f5e2fc0370a6/' + lat + ',' + lon + '?units=si'

    request({ url, json: true }, (error, { body }) => {
        //console.log(error)
        //console.log(body)
        if (error) {
            callback("The Weather services are unavailable", undefined)
        } else if (body.error) {
            callback("Unable to find such location!", undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees outside. There is a ' + body.currently.precipProbability + '% chance of rain')
        }
    })
}

module.exports = forecast