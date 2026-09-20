export default function UnitToggle({
  unit,
  onChange,
}) {
  return (
    <div className="unit-toggle">
      <button
        className={unit === "metric" ? "active" : ""}
        onClick={() => onChange("metric")}
      >
        °C
      </button>

      <button
        className={unit === "imperial" ? "active" : ""}
        onClick={() => onChange("imperial")}
      >
        °F
      </button>
    </div>
  );
}