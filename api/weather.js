// Serverless function for fetching weather data securely on Vercel
// Endpoint: /api/weather?city=CityName
export default async function handler(req, res) {
  try {
    const { city } = req.query;
    if (!city || !city.trim()) {
      return res.status(400).json({ error: "Missing city parameter" });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) {
      return res
        .status(500)
        .json({ error: "Server missing OPENWEATHER_API_KEY" });
    }

    const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${apiKey}&units=metric`;

    const response = await fetch(endpoint);
    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Upstream API error", statusText: response.statusText });
    }
    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("Weather function error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
