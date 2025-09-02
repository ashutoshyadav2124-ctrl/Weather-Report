const apiKey = "9352940739f84f418f8123813253003"; // Your API key
const apiUrl = "http://api.weatherapi.com/v1/current.json?key=" + apiKey + "&q=";

function getWeather() {
    const city = document.getElementById('city').value;
    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    fetch(apiUrl + city + "&aqi=yes")
        .then(response => response.json())
        .then(data => {
            // Check if the API returns an error (e.g., city not found)
            if (data.error) {
                document.getElementById('weather-info').innerHTML = `<p style="color: red;">${data.error.message}</p>`;
                return;
            }

            // Extract weather data
            const cityName = data.location.name;
            const country = data.location.country;
            const temperature = data.current.temp_c;
            const condition = data.current.condition.text;
            const humidity = data.current.humidity;
            const windSpeed = data.current.wind_kph;
            const icon = data.current.condition.icon;

            // Display weather data
            document.getElementById('weather-info').innerHTML = `
                <h2>${cityName}, ${country}</h2>
                <img src="https:${icon}" alt="Weather Icon">
                <p>Temperature: ${temperature}°C</p>
                <p>Condition: ${condition}</p>
                <p>Humidity: ${humidity}%</p>
                <p>Wind Speed: ${windSpeed} km/h</p>
            `;
        })
        .catch(error => {
            document.getElementById('weather-info').innerHTML = `<p style="color: red;">Error fetching weather data</p>`;
        });
}
