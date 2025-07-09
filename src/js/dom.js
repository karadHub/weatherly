function updateDOM(weatherData) {
    const weatherCard = document.querySelector('.weather-info');
    const cityName = document.querySelector('.city-name');
    const temperature = document.querySelector('.temperature');
    const humidity = document.querySelector('.humidity');
    const windSpeed = document.querySelector('.wind-speed');
    const weatherCondition = document.querySelector('.weather-condition');
    const weatherIcon = document.querySelector('.weather-icon');

    cityName.textContent = weatherData.name;
    temperature.textContent = `${Math.round(weatherData.main.temp)}°C`;
    humidity.textContent = `Humidity: ${weatherData.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${weatherData.wind.speed} m/s`;
    weatherCondition.textContent = weatherData.weather[0].description;

    const iconCode = weatherData.weather[0].icon;
    weatherIcon.src = `assets/icons/${iconCode}.svg`; // Assuming icons are named by their code
}