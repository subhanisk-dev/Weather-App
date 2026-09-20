import {
  getWeatherIconUrl,
  formatTime,
} from "../utils/weatherUtils";

export default function HourlyForecast({
  forecast,
  unit,
}) {
  if (!forecast?.list) return null;

  const items = forecast.list.slice(0, 8);

  const temperatureUnit =
    unit === "metric" ? "°" : "°";

  return (
    <section className="section">
      <div className="section-heading">
        <div>
          <p className="section-label">
            HOURLY FORECAST
          </p>
          <h2>Next hours</h2>
        </div>
      </div>

      <div className="hourly-container">
        {items.map((item) => (
          <div
            className="hour-card"
            key={item.dt}
          >
            <span>
              {formatTime(
                item.dt,
                forecast.city?.timezone || 0
              )}
            </span>

            <img
              src={getWeatherIconUrl(
                item.weather?.[0]?.icon,
                "2x"
              )}
              alt=""
            />

            <strong>
              {Math.round(item.main.temp)}
              {temperatureUnit}
            </strong>

            <small>
              {item.weather?.[0]?.main}
            </small>
          </div>
        ))}
      </div>
    </section>
  );
}