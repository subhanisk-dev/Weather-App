export default function FavoriteCities({
  favorites,
  onSelect,
  onRemove,
}) {
  return (
    <section className="side-section">
      <div className="side-heading">
        <h3>⭐ Favorite cities</h3>
      </div>

      {favorites.length === 0 ? (
        <p className="muted-text">
          No favorite cities yet.
        </p>
      ) : (
        <div className="city-list">
          {favorites.map((city) => (
            <div
              className="saved-city"
              key={city}
            >
              <button
                onClick={() => onSelect(city)}
              >
                {city}
              </button>

              <button
                className="remove-city"
                onClick={() => onRemove(city)}
                aria-label={`Remove ${city}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}