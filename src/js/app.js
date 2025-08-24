import { fetchWeatherData } from "./api.js";
import { getWeatherBackgroundSVG } from "./weatherBackgrounds.js";
import { getWeatherIconSVG } from "./weatherIcons.js";

document.addEventListener("DOMContentLoaded", () => {
  const loadingIndicator = document.getElementById("loading");
  const searchButton = document.getElementById("search-button");
  const cityInput = document.getElementById("city-input");
  const weatherCard = document.getElementById("weather-card");
  const refreshIndicator = document.getElementById("refresh-indicator");

  // Animate card on load
  function animateCard() {
    weatherCard.classList.remove("loaded");
    setTimeout(() => weatherCard.classList.add("loaded"), 10);
  }

  // Show refresh indicator as tooltip
  function showRefreshIndicator() {
    refreshIndicator.classList.add("visible");
    setTimeout(() => refreshIndicator.classList.remove("visible"), 2500);
  }

  const updateDOM = (data) => {
    const { main, weather, wind, sys } = data;
    // Animated background SVG
    const bgSVG = getWeatherBackgroundSVG(weather[0].main);
    document.body.style.backgroundImage = `url('')`;
    let bgDiv = document.getElementById("animated-bg");
    if (!bgDiv) {
      bgDiv = document.createElement("div");
      bgDiv.id = "animated-bg";
      bgDiv.style.position = "fixed";
      bgDiv.style.zIndex = "-1";
      bgDiv.style.top = "0";
      bgDiv.style.left = "0";
      bgDiv.style.width = "100vw";
      bgDiv.style.height = "100vh";
      bgDiv.style.overflow = "hidden";
      document.body.prepend(bgDiv);
    }
    bgDiv.innerHTML = bgSVG;

    // Weather icon (animated if available)
    const iconSVG = getWeatherIconSVG(weather[0].main, 48);
    // Weather details
    const feelsLike = main.feels_like
      ? `<span class="feels-like">Feels like: ${Math.round(
          main.feels_like
        )}°C</span>`
      : "";
    const sunrise =
      sys && sys.sunrise
        ? new Date(sys.sunrise * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "";
    const sunset =
      sys && sys.sunset
        ? new Date(sys.sunset * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "";
    weatherCard.innerHTML = `
            <h2 style="display:flex;align-items:center;gap:0.5rem;justify-content:center;">
                <span>${data.name}</span>
                <span class="weather-anim" style="display:inline-flex;line-height:0;">${iconSVG}</span>
            </h2>
            <div class="temp-main" style="display:flex;align-items:center;justify-content:center;gap:1.2rem;">
                <div style="text-align:center;">
                    <span style="font-size:2.2rem;font-weight:700;">${Math.round(
                      main.temp
                    )}°C</span>
                    <div style="font-size:1.1rem;color:#00A9FF;font-weight:600;">${
                      weather[0].main
                    }</div>
                    ${feelsLike}
                </div>
                <div style="font-size:1.1rem;">
                    <div>💧 <b>${
                      main.humidity
                    }%</b> <span style="color:#888;font-size:0.95em;">Humidity</span></div>
                    <div>� <b>${
                      wind.speed
                    } m/s</b> <span style="color:#888;font-size:0.95em;">Wind</span></div>
                </div>
            </div>
            <div style="margin-top:0.7rem;display:flex;gap:1.5rem;justify-content:center;">
                <div>🌅 <span style="font-weight:500;">${sunrise}</span> <span style="color:#888;font-size:0.95em;">Sunrise</span></div>
                <div>🌇 <span style="font-weight:500;">${sunset}</span> <span style="color:#888;font-size:0.95em;">Sunset</span></div>
            </div>
            <div style="margin-top:0.7rem;font-size:1.1rem;color:#22223b;font-weight:500;letter-spacing:0.1px;">
                <span style="vertical-align:middle;">${
                  weather[0].description
                }</span>
            </div>
        `;
    animateCard();
  };

  const handleErrors = (error) => {
    weatherCard.innerHTML = `<p style="color:#ff5252;font-weight:500;">${
      error.message || "City not found or API error."
    }</p>`;
    animateCard();
  };

  function fetchAndDisplay(city) {
    loadingIndicator.style.display = "block";
    fetchWeatherData(city)
      .then((data) => updateDOM(data))
      .catch((error) => handleErrors(error))
      .finally(() => (loadingIndicator.style.display = "none"));
  }

  searchButton.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) fetchAndDisplay(city);
  });

  cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const city = cityInput.value.trim();
      if (city) fetchAndDisplay(city);
    }
  });

  // Auto-refresh every 10 minutes
  let lastCity = "";
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
  weatherCard.innerHTML = "";
  loadingIndicator.style.display = "none";
  refreshIndicator.classList.remove("visible");
});
