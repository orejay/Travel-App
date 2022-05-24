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

subBtn.addEventListener('click', submission)

function submission (event) {
    event.preventDefault()
    let destination = document.getElementById('destination').value
    let userDate = document.getElementById('date').value
    const todaysDate = new Date().getTime()
    const tripDate = new Date(userDate).getTime()
    const days = Math.round((tripDate - todaysDate)/86400000)
    const date = new Date(userDate).toDateString()
    if (destination && userDate) {
        console.log("::: Form Submitted :::")
        console.log(days)
        postData('http://localhost:8080/check', {destination: destination, days: days, date: date})
        .then((resultData) =>{
                        updateUi(resultData)
                    });
    } else if (destination) {
        console.log('Please select a date')
    } else if (userDate) {
        console.log('Please enter your destination')
    } else {
        console.log('An error occurred please try again')
    }
    
}

const postData = async(url="", data={}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    try{
        const resultData = await response.json();
        console.log('Data received:', resultData)
        return resultData;
    }catch(error){
        console.log('could not reach url', error)
    }
}

const updateUi = async (resultData) => {
    console.log(resultData)
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
    console.log(resultData.weather.image)
    result.style.display = 'flex'
}

export {
    submission
}

