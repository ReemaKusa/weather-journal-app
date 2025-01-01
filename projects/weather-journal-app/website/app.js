const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '7eb26932610bad487d5086f4383e5b32';

let d = new Date();
let newDate = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()}`;

// Function to fetch weather data
const getWeatherData = async (city) => {
    try {
        const response = await fetch(`${baseUrl}${city}&appid=${apiKey}&units=metric`); // Added units=metric for Celsius
        if (!response.ok) {
            throw new Error(`City not found or API issue. Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
    }
};

// Function to post data to the server
const postData = async (url = '', data = {}) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Error posting data to the server.');
        }
        return await response.json();
    } catch (error) {
        console.error('Error posting data:', error.message);
    }
};

// Function to update the UI
const updateUI = async () => {
    try {
        const request = await fetch('/all');
        if (!request.ok) {
            throw new Error('Error fetching data from the server.');
        }
        const data = await request.json();
        document.getElementById('date').innerHTML = `Date: ${data.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${data.temperature} °C`;
        document.getElementById('content').innerHTML = `Feelings: ${data.userResponse}`;
    } catch (error) {
        console.error('Error updating the UI:', error.message);
    }
};

// Event listener for the generate button
document.getElementById('generate').addEventListener('click', async () => {
    const city = document.getElementById('zip').value; // Use city name instead of ZIP
    const feelings = document.getElementById('feelings').value;

    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    const weatherData = await getWeatherData(city);
    if (weatherData && weatherData.main) {
        await postData('/add', {
            temperature: weatherData.main.temp,
            date: newDate,
            userResponse: feelings,
        });
        updateUI();
    } else {
        alert('Unable to fetch weather data. Please check the city name and try again.');
    }
});
