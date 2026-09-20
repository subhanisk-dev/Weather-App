import { useState } from "react";

export default function SearchBar({
  onSearch,
  loading,
}) {
  const [city, setCity] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const value = city.trim();

    if (!value) return;

    onSearch(value);
  };

  return (
    <form
      className="search-container"
      onSubmit={handleSubmit}
    >
      <div className="search-input-wrapper">
        <span className="search-icon">⌕</span>

        <input
          type="text"
          value={city}
          onChange={(event) =>
            setCity(event.target.value)
          }
          placeholder="Search for a city..."
          aria-label="Search city"
        />

        {city && (
          <button
            type="button"
            className="clear-button"
            onClick={() => setCity("")}
          >
            ×
          </button>
        )}
      </div>

      <button
        className="search-button"
        type="submit"
        disabled={loading}
      >
        {loading ? "Loading..." : "Search"}
      </button>
    </form>
  );
}