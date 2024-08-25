const weatherButton = document.getElementById("get_weather_btn");

weatherButton.addEventListener("click", () => {
    const latitude = document.getElementById("latitude").value;
    const longitude = document.getElementById("longitude").value;

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code&timezone=auto`)
        .then(response => response.json())
        .then(data => {
            const weatherExplanation = document.getElementById("weather-explanation");
            const weatherIcon = document.getElementById("weather-icon");

            const weatherCode = data.daily.weather_code[0];
            const weatherType = getWeatherType(weatherCode);

            weatherExplanation.textContent = weatherType;
            weatherIcon.src = getWeatherIconUrl(weatherCode);

            // Make the icon and explanation visible
            weatherIcon.style.display = 'block';
            weatherExplanation.style.display = 'block';

            // Handle image loading error by setting a default image
            weatherIcon.onerror = function() {
                weatherIcon.src = "https://openweathermap.org/img/wn/50d@2x.png"; // Default icon
            };
        })
        .catch(error => console.error("Error:", error));
});

function getWeatherIconUrl(weatherCode) {
    switch (weatherCode) {
        case 0: return "https://openweathermap.org/img/wn/01d@2x.png"; // Clear sky
        case 1: return "https://openweathermap.org/img/wn/02d@2x.png"; // Mainly clear
        case 2: return "https://openweathermap.org/img/wn/03d@2x.png"; // Partly cloudy
        case 3: return "https://openweathermap.org/img/wn/04d@2x.png"; // Overcast
        case 45: return "https://openweathermap.org/img/wn/50d@2x.png"; // Fog
        case 48: return "https://openweathermap.org/img/wn/50d@2x.png"; // Depositing rime fog
        case 51: return "https://openweathermap.org/img/wn/09d@2x.png"; // Drizzle: Light
        case 53: return "https://openweathermap.org/img/wn/09d@2x.png"; // Drizzle: Moderate
        case 55: return "https://openweathermap.org/img/wn/09d@2x.png"; // Drizzle: Dense
        case 61: return "https://openweathermap.org/img/wn/10d@2x.png"; // Rain: Slight
        case 63: return "https://openweathermap.org/img/wn/10d@2x.png"; // Rain: Moderate
        case 65: return "https://openweathermap.org/img/wn/10d@2x.png"; // Rain: Heavy
        case 80: return "https://openweathermap.org/img/wn/09d@2x.png"; // Rain showers: Slight
        case 81: return "https://openweathermap.org/img/wn/09d@2x.png"; // Rain showers: Moderate
        case 82: return "https://openweathermap.org/img/wn/09d@2x.png"; // Rain showers: Violent
        case 85: return "https://openweathermap.org/img/wn/13d@2x.png"; // Snow showers: Slight
        case 86: return "https://openweathermap.org/img/wn/13d@2x.png"; // Snow showers: Heavy
        default: return "https://openweathermap.org/img/wn/50d@2x.png"; // Unknown or other
    }
}

function getWeatherType(weatherCode) {
    switch (weatherCode) {
        case 0: return "Clear sky";
        case 1: return "Mainly clear";
        case 2: return "Partly cloudy";
        case 3: return "Overcast";
        case 45: return "Fog";
        case 48: return "Depositing rime fog";
        case 51: return "Light drizzle";
        case 53: return "Moderate drizzle";
        case 55: return "Dense drizzle";
        case 61: return "Slight rain";
        case 63: return "Moderate rain";
        case 65: return "Heavy rain";
        case 80: return "Slight rain showers";
        case 81: return "Moderate rain showers";
        case 82: return "Violent rain showers";
        case 85: return "Slight snow showers";
        case 86: return "Heavy snow showers";
        default: return "Unknown or other";
    }
}
