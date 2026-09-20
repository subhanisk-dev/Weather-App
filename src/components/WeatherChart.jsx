export default function WeatherChart({
  forecast,
  unit,
}) {
  if (!forecast?.list) return null;

  const items = forecast.list.slice(0, 8);

  const temperatures = items.map(
    (item) => item.main.temp
  );

  const min = Math.min(...temperatures);
  const max = Math.max(...temperatures);

  const range = max - min || 1;

  const temperatureUnit =
    unit === "metric" ? "°C" : "°F";

  return (
    <section className="section">
      <div className="section-heading">
        <div>
          <p className="section-label">
            TEMPERATURE TREND
          </p>
          <h2>Temperature over time</h2>
        </div>
      </div>

      <div className="temperature-chart">
        <div className="chart-area">
          {items.map((item) => {
            const height =
              ((item.main.temp - min) / range) *
                70 +
              20;

            return (
              <div
                className="chart-column"
                key={item.dt}
              >
                <span>
                  {Math.round(item.main.temp)}
                  {temperatureUnit}
                </span>

                <div
                  className="chart-bar"
                  style={{
                    height: `${height}%`,
                  }}
                />

                <small>
                  {new Date(
                    item.dt * 1000
                  ).toLocaleTimeString(
                    [],
                    {
                      hour: "numeric",
                    }
                  )}
                </small>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}