const subBtn = document.getElementById('sub-btn')

subBtn.addEventListener('click', submission)

function submission (event) {
    event.preventDefault()
    let destination = document.getElementById('destination').value
    let userDate = document.getElementById('date').value
    if (destination && userDate) {
        console.log("::: Form Submitted :::")
        const todaysDate = new Date().getTime
        const tripDate = new Date(userDate).getTime
        const days = Math.floor((tripDate - todaysDate)/86400000)
        postData('http://localhost:8080/check', {destination: destination, days: days})
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
}

export {
    submission
}

