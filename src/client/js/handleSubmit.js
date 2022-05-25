//select html elements
const subBtn = document.getElementById('sub-btn')
const location = document.getElementById('location')
const when = document.getElementById('when')
const distance = document.getElementById('distance')
const weather = document.getElementById('weather')
const icon = document.getElementById('icon')
const high = document.getElementById('high')
const low = document.getElementById('low')
const image = document.getElementById('pre-result')
const result = document.getElementById('result')
const destErr = document.getElementById('dest-err')
const dateErr = document.getElementById('date-err')

subBtn.addEventListener('click', submission)

function submission (event) {
    event.preventDefault()
    let destination = document.getElementById('destination').value
    let userDate = document.getElementById('date').value
    //get present date
    const todaysDate = new Date().getTime()
    //get travel date
    const tripDate = new Date(userDate).getTime()
    //calculate the number of days between present date and travel date
    const days = Math.round((tripDate - todaysDate)/86400000)
    //get date in string format
    const date = new Date(userDate).toDateString()
    if (destination && userDate) {
        console.log("::: Form Submitted :::")
        //send user input to server
        postData('http://localhost:8080/check', {destination: destination, days: days, date: date})
        .then((resultData) =>{
                        updateUi(resultData)
                    });
    } else if (destination) {
        //alert user if date is omitted
        dateErr.innerText = 'Please select a date'
        console.log('Please select a date')
    } else if (userDate) {
        //alert user if destination is omitted
        destErr.innerText = 'Please enter your destination'
        console.log('Please enter your destination')
    } else {
        dateErr.innerText = 'Please select a date'
        destErr.innerText = 'Please enter your destination'
        console.log('An error occurred please try again')
    }
    
}


//funtion to send the user entry to the server
const postData = async(url="", data={}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(data)
    })
    try{
        //data received from the server
        const resultData = await response.json();
        console.log('Data received:', resultData)
        return resultData;
    }catch(error){
        console.log('could not reach url', error)
    }
}

//function to log the data on the UI
const updateUi = async (resultData) => {
    console.log(resultData)
    if (dateErr.innerText || destErr.innerText) {
        dateErr.innerText = ''
        destErr.innerText = ''
    }
    const weatherDesc = resultData.weather.description
    const destination = resultData.weather.destination
    const days = resultData.weather.days
    const date = resultData.weather.date
    const pic = resultData.weather.image
    location.innerText = `${destination}`
    if (days > 1) {
        distance.innerText = `${days} days away`
    } else {
        distance.innerText = `${days} day away`
    }
    weather.innerText = `${weatherDesc}`
    when.innerText = `${date}`
    icon.innerHTML = `<img class="icon" src="https://www.weatherbit.io/static/img/icons/${resultData.weather.icon}.png" alt="Forecast Icons" width="90px">`
    high.innerHTML = `<span><span class="temp">${resultData.weather.highTemp}</span> degrees</span>`
    low.innerHTML = `<span><span class="temp">${resultData.weather.lowTemp}</span> degrees</span>`
    image.style.backgroundImage = 'url('+pic+')'
    result.style.display = 'flex'
}

export {
    //export the submit function
    submission
}

