const subBtn = document.getElementById('sub-btn')

const submission = subBtn.addEventListener('click', function (event) {
    event.preventDefault()
    let destination = document.getElementById('destination').value
    console.log("::: Form Submitted :::")
    postUrl('http://localhost:8080/destination', {url: destination})
    .then((resultData) =>{
                    updateUi(resultData)
                });
})


export {
    submission
}

