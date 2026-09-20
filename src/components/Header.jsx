export default function Header({
  isDark,
  onToggleTheme,
}) {
  return (
    <header className="top-header">
      <div className="brand">
        <div className="brand-icon">☁️</div>

        <div>
          <h2>SkyCast</h2>
          <span>Weather Dashboard</span>
        </div>
      </div>

      <button
        className="theme-button"
        onClick={onToggleTheme}
        aria-label="Toggle theme"
      >
        {isDark ? "☀️" : "🌙"}
      </button>
    </header>
  );
}