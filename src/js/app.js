document.addEventListener('DOMContentLoaded', () => {
    const loadingIndicator = document.getElementById('loading');
    const searchButton = document.getElementById('search-button');
    const cityInput = document.getElementById('city-input');
    const weatherCard = document.getElementById('weather-card');
    const refreshIndicator = document.getElementById('refresh-indicator');

    // Animate card on load
    function animateCard() {
        weatherCard.classList.remove('loaded');
        setTimeout(() => weatherCard.classList.add('loaded'), 10);
    }

    // Show refresh indicator as tooltip
    function showRefreshIndicator() {
        refreshIndicator.classList.add('visible');
        setTimeout(() => refreshIndicator.classList.remove('visible'), 2500);
    }

    const updateDOM = (data) => {
        const { main, weather, wind } = data;
        weatherCard.innerHTML = `
            <h2>${data.name}</h2>
            <img class="weather-anim" src="assets/icons/${weather[0].icon}.png" alt="${weather[0].description}" onerror="this.onerror=null;this.src='/src/assets/icons/04n.png';">
            <div style="display:flex;gap:1.2rem;justify-content:center;margin:0.5rem 0;">
                <div>
                    <p style="font-weight:600;font-size:1.2rem;">${Math.round(main.temp)}°C</p>
                    <p style="font-size:0.95rem;color:#00A9FF;">${weather[0].main}</p>
                </div>
                <div>
                    <p style="margin:0;">💧 ${main.humidity}%</p>
                    <p style="margin:0;">💨 ${wind.speed} m/s</p>
                </div>
            </div>
        `;
        animateCard();
    };

    const handleErrors = (error) => {
        weatherCard.innerHTML = `<p style="color:#ff5252;font-weight:600;">${error.message || "City not found or API error."}</p>`;
        animateCard();
    };

    function fetchAndDisplay(city) {
        loadingIndicator.style.display = 'block';
        fetchWeatherData(city)
            .then(data => updateDOM(data))
            .catch(error => handleErrors(error))
            .finally(() => loadingIndicator.style.display = 'none');
    }

    searchButton.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) fetchAndDisplay(city);
    });

    cityInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const city = cityInput.value.trim();
            if (city) fetchAndDisplay(city);
        }
    });

    // Auto-refresh every 10 minutes
    let lastCity = '';
    function autoRefresh() {
        const city = cityInput.value.trim();
        if (city && city !== lastCity) lastCity = city;
        if (lastCity) {
            fetchAndDisplay(lastCity);
            showRefreshIndicator();
        }
    }
    setInterval(autoRefresh, 600000); // 10 minutes

    // Initial state
    weatherCard.innerHTML = '';
    loadingIndicator.style.display = 'none';
    refreshIndicator.classList.remove('visible');
});