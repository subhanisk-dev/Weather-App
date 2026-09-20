import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  getCurrentWeather,
  getForecast,
  getWeatherByCoordinates,
  getForecastByCoordinates,
} from "../services/weatherApi";

export default function useWeather(unit = "metric") {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Stores the time when weather data was successfully received.
  const [lastUpdated, setLastUpdated] =
    useState(null);

  // Remember the last location/search.
  // This allows automatic refresh when
  // °C / °F is changed.
  const lastSearch = useRef(null);

  // --------------------------------------------------
  // CITY WEATHER
  // --------------------------------------------------

  const fetchCityWeather = useCallback(
    async (city) => {
      const [
        currentData,
        forecastData,
      ] = await Promise.all([
        getCurrentWeather(city, unit),
        getForecast(city, unit),
      ]);

      setWeather(currentData);
      setForecast(forecastData);

      // Update timestamp only after successful API calls.
      setLastUpdated(new Date());
    },
    [unit]
  );

  // --------------------------------------------------
  // LOCATION WEATHER
  // --------------------------------------------------

  const fetchLocationWeather =
    useCallback(
      async (lat, lon) => {
        const [
          currentData,
          forecastData,
        ] = await Promise.all([
          getWeatherByCoordinates(
            lat,
            lon,
            unit
          ),
          getForecastByCoordinates(
            lat,
            lon,
            unit
          ),
        ]);

        setWeather(currentData);
        setForecast(forecastData);

        // Update timestamp only after successful API calls.
        setLastUpdated(new Date());
      },
      [unit]
    );

  // --------------------------------------------------
  // SEARCH BY CITY
  // --------------------------------------------------

  const searchWeather = useCallback(
    async (city) => {
      const cleanCity = city?.trim();

      if (!cleanCity) {
        setError(
          "Please enter a city name."
        );

        return false;
      }

      try {
        setLoading(true);
        setError("");

        // Remember this search.
        lastSearch.current = {
          type: "city",
          city: cleanCity,
        };

        await fetchCityWeather(
          cleanCity
        );

        return true;
      } catch (err) {
        console.error(
          "City weather error:",
          err
        );

        setWeather(null);
        setForecast(null);

        setError(
          err?.message ||
            "Unable to load weather data."
        );

        return false;
      } finally {
        setLoading(false);
      }
    },
    [fetchCityWeather]
  );

  // --------------------------------------------------
  // SEARCH BY LOCATION
  // --------------------------------------------------

  const searchByCoordinates =
    useCallback(
      async (lat, lon) => {
        try {
          setLoading(true);
          setError("");

          // Remember coordinates.
          lastSearch.current = {
            type: "coordinates",
            lat,
            lon,
          };

          await fetchLocationWeather(
            lat,
            lon
          );

          return true;
        } catch (err) {
          console.error(
            "Location weather error:",
            err
          );

          setError(
            err?.message ||
              "Unable to get weather for your location."
          );

          return false;
        } finally {
          setLoading(false);
        }
      },
      [fetchLocationWeather]
    );

  // --------------------------------------------------
  // AUTOMATIC REFRESH WHEN UNIT CHANGES
  // --------------------------------------------------

  useEffect(() => {
    const previousSearch =
      lastSearch.current;

    // Don't make an API request when
    // the app first loads.
    if (!previousSearch) {
      return;
    }

    const refreshWeather =
      async () => {
        try {
          setLoading(true);
          setError("");

          if (
            previousSearch.type ===
            "city"
          ) {
            await fetchCityWeather(
              previousSearch.city
            );
          }

          if (
            previousSearch.type ===
            "coordinates"
          ) {
            await fetchLocationWeather(
              previousSearch.lat,
              previousSearch.lon
            );
          }
        } catch (err) {
          console.error(
            "Unit refresh error:",
            err
          );

          setError(
            err?.message ||
              "Unable to refresh weather data."
          );
        } finally {
          setLoading(false);
        }
      };

    refreshWeather();
  }, [
    unit,
    fetchCityWeather,
    fetchLocationWeather,
  ]);

  // --------------------------------------------------
  // RETURN
  // --------------------------------------------------

  return {
    weather,
    forecast,
    loading,
    error,

    // Used by CurrentWeather.jsx
    lastUpdated,

    searchWeather,
    searchByCoordinates,
  };
}