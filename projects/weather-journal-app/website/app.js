const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = 'ReemaK'; 

let d = new Date();
let newDate = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()}`;

const getWeatherData = async (zip) => {
    const response = await fetch(`${baseUrl}${zip}&appid=${apiKey}`);
    try {
        return await response.json();
    } catch (error) {
        console.log('Error:', error);
    }
};

const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    try {
        return await response.json();
    } catch (error) {
        console.log('Error:', error);
    }
};

const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const data = await request.json();
        document.getElementById('date').innerHTML = `Date: ${data.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${data.temperature}`;
        document.getElementById('content').innerHTML = `Feelings: ${data.userResponse}`;
    } catch (error) {
        console.log('Error:', error);
    }
};

document.getElementById('generate').addEventListener('click', async () => {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    const weatherData = await getWeatherData(zip);
    await postData('/add', {
        temperature: weatherData.main.temp,
        date: newDate,
        userResponse: feelings,
    });
    updateUI();
});
