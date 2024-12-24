// Personal API Key for OpenWeatherMap API
const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API Key
const baseURL = 'https://api.openweathermap.org/data/2.5/weather';

// Event listener to add function to existing HTML DOM element
document.getElementById('submit').addEventListener('click', function() {
  const city = document.getElementById('city').value;
  if (city) {
    getWeatherData(city); // Call function to fetch weather data when the button is clicked
  }
});

/* Function called by event listener */
function getWeatherData(city) {
  const url = `${baseURL}?q=${city}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data); // For debugging: log the response
      postWeatherData(data); // Call function to post data after fetching it
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
}

/* Function to GET Web API Data (e.g., from OpenWeatherMap) */
function getWeatherFromAPI(city) {
  const url = `${baseURL}?q=${city}&appid=${apiKey}&units=metric`;
  return fetch(url)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.error('Error fetching data:', error));
}

/* Function to POST data (e.g., to store fetched weather data or send it to another server) */
function postWeatherData(weatherData) {
  const postURL = '/addData'; // Replace with your server endpoint
  const data = {
    city: weatherData.name,
    temperature: weatherData.main.temp,
    description: weatherData.weather[0].description,
    humidity: weatherData.main.humidity,
  };

  fetch(postURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(result => {
      console.log('Data posted successfully:', result);
    })
    .catch(error => {
      console.error('Error posting data:', error);
    });
}

/* Function to GET Project Data (e.g., fetch previously saved weather data from a server) */
function getProjectData() {
  fetch('/getData') // Replace with your server endpoint
    .then(response => response.json())
    .then(data => {
      console.log('Project data retrieved:', data);
    })
    .catch(error => {
      console.error('Error retrieving project data:', error);
    });
}
