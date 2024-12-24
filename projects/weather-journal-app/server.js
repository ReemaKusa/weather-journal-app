//Note:
//To run this project 
//terminal: 
//cd ~/Desktop/UdaWeatherAPI/weather-journal-app/projects/weather-journal-app
//node ./server.js



const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('website'));

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on localhost:${port}`);
});

let projectData = {};

app.get('/all', (req, res) => {
    res.send(projectData);
});

app.post('/add', (req, res) => {
    projectData = req.body;
    res.send({ message: 'Data received' });
});
