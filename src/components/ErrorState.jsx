export default function ErrorState({ message }) {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>

      <h3>Something went wrong</h3>

      <p>{message}</p>
    </div>
  );
}