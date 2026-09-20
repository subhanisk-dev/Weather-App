import {
  formatVisibility,
  formatWindDirection,
} from "../utils/weatherUtils";

export default function WeatherDetails({
  weather,
  unit,
}) {
  if (!weather) return null;

  const windUnit =
    unit === "metric" ? "m/s" : "mph";

  const details = [
    {
      icon: "💧",
      label: "Humidity",
      value: `${weather.main.humidity}%`,
    },
    {
      icon: "🧭",
      label: "Pressure",
      value: `${weather.main.pressure} hPa`,
    },
    {
      icon: "💨",
      label: "Wind Speed",
      value: `${weather.wind.speed} ${windUnit}`,
    },
    {
      icon: "🧭",
      label: "Wind Direction",
      value: formatWindDirection(
        weather.wind.deg
      ),
    },
    {
      icon: "👁️",
      label: "Visibility",
      value: formatVisibility(
        weather.visibility
      ),
    },
    {
      icon: "☁️",
      label: "Cloudiness",
      value: `${weather.clouds?.all || 0}%`,
    },
  ];

  return (
    <section className="section">
      <div className="section-heading">
        <div>
          <p className="section-label">
            WEATHER DETAILS
          </p>
          <h2>Today's conditions</h2>
        </div>
      </div>

      <div className="details-grid">
        {details.map((detail) => (
          <div
            className="detail-card"
            key={detail.label}
          >
            <span className="detail-icon">
              {detail.icon}
            </span>

            <div>
              <p>{detail.label}</p>
              <strong>{detail.value}</strong>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}