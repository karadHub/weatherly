// Simple inline SVG weather icons based on condition
// Usage: getWeatherIconSVG(condition, size)
export function getWeatherIconSVG(condition, size = 48) {
  const c = (condition || "").toString().toLowerCase();
  const s = String(size);

  // Sunny (Clear)
  const sunny = `
  <svg width="${s}" height="${s}" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Sunny">
    <circle cx="32" cy="32" r="12" fill="#FDB813"/>
    <g stroke="#FDB813" stroke-width="4" stroke-linecap="round">
      <line x1="32" y1="4" x2="32" y2="14"/>
      <line x1="32" y1="50" x2="32" y2="60"/>
      <line x1="4" y1="32" x2="14" y2="32"/>
      <line x1="50" y1="32" x2="60" y2="32"/>
      <line x1="12" y1="12" x2="18" y2="18"/>
      <line x1="46" y1="46" x2="52" y2="52"/>
      <line x1="12" y1="52" x2="18" y2="46"/>
      <line x1="46" y1="18" x2="52" y2="12"/>
    </g>
  </svg>`;

  // Cloudy (Clouds)
  const cloudy = `
  <svg width="${s}" height="${s}" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Cloudy">
    <g fill="#C7D2FE">
      <ellipse cx="28" cy="36" rx="14" ry="10"/>
      <ellipse cx="40" cy="34" rx="12" ry="9"/>
      <ellipse cx="20" cy="34" rx="10" ry="8"/>
    </g>
  </svg>`;

  // Rainy (Rain/Drizzle/Thunderstorm)
  const rainy = `
  <svg width="${s}" height="${s}" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Rainy">
    <g fill="#C7D2FE">
      <ellipse cx="28" cy="28" rx="14" ry="10"/>
      <ellipse cx="40" cy="26" rx="12" ry="9"/>
      <ellipse cx="20" cy="26" rx="10" ry="8"/>
    </g>
    <g stroke="#38BDF8" stroke-width="4" stroke-linecap="round">
      <line x1="22" y1="40" x2="22" y2="54"/>
      <line x1="32" y1="42" x2="32" y2="58"/>
      <line x1="42" y1="40" x2="42" y2="54"/>
    </g>
  </svg>`;

  if (c.includes("clear") || c.includes("sun")) return sunny;
  if (c.includes("cloud")) return cloudy;
  if (c.includes("rain") || c.includes("drizzle") || c.includes("thunder"))
    return rainy;

  // default to cloudy
  return cloudy;
}
