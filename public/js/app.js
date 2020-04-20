// client side js to fetch will run in the browser
// fetch not in node js only in browser

const weatherForm = document.querySelector('form')

// event listeners
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() // no refresh

    const location = search.value
    const url = 'http://localhost:3000/weather?address=' + location

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecastData
            }
        })
    })

})