/**
 * Weather App
 * Programmatically interacts with a weather API to fetch data, 
 * dynamically updates the DOM, and handles user input.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 */

/**
 * Define Global Variables
 */
const apiKey = 'YOUR_API_KEY'; // Replace with your Weather API key
const baseURL = 'https://api.openweathermap.org/data/2.5/weather';
const generateButton = document.getElementById('generate');
const zipInput = document.getElementById('zip');
const feelingsInput = document.getElementById('feelings');
const entryHolder = document.getElementById('entryHolder');

/**
 * Helper Functions
 */

/**
 * Convert temperature from Kelvin to Celsius
 * @param {number} kelvin - Temperature in Kelvin.
 * @returns {number} Temperature in Celsius.
 */
const kelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(2);

/**
 * Create a new entry element to update the UI dynamically.
 * @param {string} date - The date of the entry.
 * @param {string} temp - The temperature.
 * @param {string} content - User feelings.
 */
const updateUI = ({ date, temp, content }) => {
  entryHolder.innerHTML = `
    <div>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Temperature:</strong> ${temp}°C</p>
      <p><strong>Feelings:</strong> ${content}</p>
    </div>
  `;
};

/**
 * Fetch weather data from the API.
 * @param {string} zip - The zip code for the location.
 * @returns {Promise<Object>} The weather data.
 */
const fetchWeatherData = async (zip) => {
  const response = await fetch(`${baseURL}?zip=${zip},us&appid=${apiKey}`);
  if (!response.ok) {
    throw new Error('Error fetching weather data');
  }
  return response.json();
};

/**
 * Main Functionality
 */

// Handle generating and updating the weather info
const handleGenerate = async () => {
  const zip = zipInput.value;
  const feelings = feelingsInput.value;

  if (!zip) {
    alert('Please enter a zip code!');
    return;
  }

  try {
    const weatherData = await fetchWeatherData(zip);
    const temperature = kelvinToCelsius(weatherData.main.temp);

    // Create a new date instance dynamically with JS
    const date = new Date().toLocaleDateString();

    // Update the UI
    updateUI({ date, temp: temperature, content: feelings });
  } catch (error) {
    console.error('Error:', error.message);
    alert('Failed to fetch weather data. Please check the zip code or try again later.');
  }
};

/**
 * Add Event Listeners
 */
generateButton.addEventListener('click', handleGenerate);
