request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoidXMxOCIsImEiOiJjazkxcDRmcGIwMDFhM21veXUwb3Y4eWZkIn0.I5eENSgmJKacm-O3A0iDRQ&limit=1'

    request({ url, json: true }, (error, { body }) => {
        // console.log(error)
        // console.log(body)
        if (error) {
            console.log('found')
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location , Try Another Location', undefined)
        } else {
            callback('undefined', {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode