import {
  getWeatherIconUrl,
  getDayName,
  groupDailyForecast,
} from "../utils/weatherUtils";

export default function DailyForecast({
  forecast,
  unit,
}) {
  if (!forecast) return null;

  const days = groupDailyForecast(forecast);

  const temperatureUnit =
    unit === "metric" ? "°" : "°";

  return (
    <section className="section">
      <div className="section-heading">
        <div>
          <p className="section-label">
            5-DAY FORECAST
          </p>
          <h2>Daily outlook</h2>
        </div>
      </div>

      <div className="daily-list">
        {days.map((day, index) => (
          <div
            className="daily-card"
            key={day.date}
          >
            <div className="day-name">
              {index === 0
                ? "Today"
                : getDayName(day.timestamp)}
            </div>

            <img
              src={getWeatherIconUrl(
                day.icon,
                "2x"
              )}
              alt={day.description}
            />

            <div className="daily-description">
              {day.description}
            </div>

            <div className="daily-temperature">
              <strong>
                {Math.round(day.max)}
                {temperatureUnit}
              </strong>

              <span>
                {Math.round(day.min)}
                {temperatureUnit}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}