// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Express to run server and routes
const express = require('express');
const app = express();

// Start up an instance of app
const port = 3000; // Port for the server to listen on

/* Dependencies */
const bodyParser = require('body-parser');
const cors = require('cors');

/* Middleware*/
// Here we are configuring express to use body-parser as middleware
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Cors for cross-origin allowance (to allow requests from different domains)
app.use(cors()); 

// Initialize the main project folder (public files such as HTML, CSS, JS, etc.)
app.use(express.static('website'));

// Spin up the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Callback to debug: This will be logged when the server starts up

// Initialize all routes with a callback function
// This section sets up your API routes

// Callback function to complete GET '/all'
app.get('/all', (req, res) => {
  res.send(projectData); // Sends back the data stored in projectData object
});

// Post Route
app.post('/addData', (req, res) => {
  const newData = req.body; // Receives data sent in the request body
  projectData = { ...projectData, ...newData }; // Updates projectData with new information
  res.send({ message: 'Data added successfully!', projectData }); // Sends a confirmation message with updated data
});
