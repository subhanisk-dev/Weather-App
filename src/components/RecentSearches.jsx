export default function RecentSearches({
  searches,
  onSelect,
  onClear,
}) {
  if (searches.length === 0) {
    return null;
  }

  return (
    <section className="side-section">
      <div className="side-heading">
        <h3>🕘 Recent searches</h3>

        <button onClick={onClear}>
          Clear
        </button>
      </div>

      <div className="recent-list">
        {searches.map((city) => (
          <button
            key={city}
            onClick={() => onSelect(city)}
          >
            {city}
          </button>
        ))}
      </div>
    </section>
  );
}