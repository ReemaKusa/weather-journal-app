//Note:
//To run this project 
//terminal: 
//cd ~/Desktop/UdaWeatherAPI/weather-journal-app/projects/weather-journal-app
//node ./server.js


const express = require('express');
const cors = require('cors');

let projectData = {};

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static('website'));

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on localhost:${port}`);
});

app.get('/all', (req, res) => {
    res.send(projectData);
});

app.post('/add', (req, res) => {
    projectData = {
        temperature: req.body.temperature,
        date: req.body.date,
        userResponse: req.body.userResponse,
    };
    res.send({ message: 'Data added successfully' });
});
