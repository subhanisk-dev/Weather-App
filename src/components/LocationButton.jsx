import { useState } from "react";

export default function LocationButton({
  onLocation,
  loading,
}) {
  const [locationError, setLocationError] =
    useState("");

  const handleLocation = () => {
    setLocationError("");

    if (!navigator.geolocation) {
      setLocationError(
        "Geolocation is not supported by your browser."
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationError("");

        onLocation(
          position.coords.latitude,
          position.coords.longitude
        );
      },
      (error) => {
        let message =
          "Unable to access your location.";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            message =
              "Location permission was denied. Please allow location access in your browser.";
            break;

          case error.POSITION_UNAVAILABLE:
            message =
              "Your location could not be determined. Please try again.";
            break;

          case error.TIMEOUT:
            message =
              "Location request timed out. Please try again.";
            break;

          default:
            message =
              "Unable to access your location.";
        }

        setLocationError(message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  };

  return (
    <div className="location-wrapper">
      <button
        className="location-button"
        onClick={handleLocation}
        disabled={loading}
        type="button"
      >
        📍 Use my location
      </button>

      {locationError && (
        <div className="location-error">
          <span>⚠️</span>
          <span>{locationError}</span>

          <button
            type="button"
            onClick={() => setLocationError("")}
            aria-label="Close location error"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}