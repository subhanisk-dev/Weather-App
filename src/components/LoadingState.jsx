export default function LoadingState() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>

      <h3>Loading weather...</h3>

      <p>
        Getting the latest weather information.
      </p>
    </div>
  );
}