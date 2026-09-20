import {
  getWeatherIconUrl,
  formatTime,
} from "../utils/weatherUtils";

export default function CurrentWeather({
  weather,
  unit,
  lastUpdated,
}) {
  if (!weather) return null;

  const temperatureUnit =
    unit === "metric" ? "°C" : "°F";

  const windUnit =
    unit === "metric" ? "m/s" : "mph";

  return (
    <section className="current-weather-card">
      <div className="current-weather-main">
        <div>
          <p className="weather-location">
            📍 {weather.name},{" "}
            {weather.sys?.country}
          </p>

          <h1>
            {Math.round(weather.main.temp)}
            {temperatureUnit}
          </h1>

          <p className="weather-condition">
            {weather.weather?.[0]?.description}
          </p>

          <p className="feels-like">
            Feels like{" "}
            {Math.round(weather.main.feels_like)}
            {temperatureUnit}
          </p>
        </div>

        <img
          className="main-weather-icon"
          src={getWeatherIconUrl(
            weather.weather?.[0]?.icon
          )}
          alt={
            weather.weather?.[0]?.description ||
            "Weather"
          }
        />
      </div>

      <div className="weather-meta">
        <div>
          <span>🌡️</span>
          <small>Min / Max</small>
          <strong>
            {Math.round(weather.main.temp_min)}
            {temperatureUnit} /{" "}
            {Math.round(weather.main.temp_max)}
            {temperatureUnit}
          </strong>
        </div>

        <div>
          <span>💧</span>
          <small>Humidity</small>
          <strong>
            {weather.main.humidity}%
          </strong>
        </div>

        <div>
          <span>💨</span>
          <small>Wind</small>
          <strong>
            {weather.wind.speed} {windUnit}
          </strong>
        </div>

        <div>
          <span>☁️</span>
          <small>Clouds</small>
          <strong>
            {weather.clouds?.all || 0}%
          </strong>
        </div>
      </div>

      <div className="sun-info">
        <span>
          🌅 Sunrise{" "}
          {formatTime(
            weather.sys.sunrise,
            weather.timezone
          )}
        </span>

        <span>
          🌇 Sunset{" "}
          {formatTime(
            weather.sys.sunset,
            weather.timezone
          )}
        </span>
      </div>

      {lastUpdated && (
        <div className="last-updated">
          <span className="live-dot"></span>
          Last updated{" "}
          {lastUpdated.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </div>
      )}
    </section>
  );
}