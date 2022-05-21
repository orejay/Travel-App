// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Require cors to enable cross origin resource sharing
const cors = require('cors');

const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

const port = 8000;

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


app.post("/post", async function(req, res) {
    const body = await req.body;
    projectData = body;
    res.send(projectData);
});

app.get("/get", async (req, res) => {
    console.log(projectData);
    res.send(projectData);
});

// Setup Server
const server = app.listen(port, listening);

function listening(){
    console.log(`server is running on port:${port}`);
}
