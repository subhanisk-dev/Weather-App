import { useEffect, useMemo, useState } from "react";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import LocationButton from "./components/LocationButton";
import UnitToggle from "./components/UnitToggle";

import CurrentWeather from "./components/CurrentWeather";
import WeatherDetails from "./components/WeatherDetails";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";
import WeatherChart from "./components/WeatherChart";

import FavoriteCities from "./components/FavoriteCities";
import RecentSearches from "./components/RecentSearches";

import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";
import EmptyState from "./components/EmptyState";

import useWeather from "./hooks/useWeather";
import useLocalStorage from "./hooks/useLocalStorage";

import {
  getWeatherBackground,
} from "./utils/weatherUtils";

export default function App() {
  const [unit, setUnit] = useState("metric");

  const [isDark, setIsDark] = useLocalStorage(
    "skycast-theme",
    true
  );

  const [favorites, setFavorites] =
    useLocalStorage(
      "favorite-cities",
      []
    );

  const [recentSearches, setRecentSearches] =
    useLocalStorage(
      "recent-searches",
      []
    );

  const {
    weather,
    forecast,
    loading,
    error,
    lastUpdated,
    searchWeather,
    searchByCoordinates,
  } = useWeather(unit);

  const backgroundClass = useMemo(
    () =>
      getWeatherBackground(
        weather,
        isDark
      ),
    [weather, isDark]
  );

  useEffect(() => {
    document.documentElement.dataset.theme =
      isDark ? "dark" : "light";
  }, [isDark]);

  const handleSearch = async (city) => {
    const success =
      await searchWeather(city);

    if (!success) {
      return;
    }

    setRecentSearches((previous) => {
      const filtered =
        previous.filter(
          (item) =>
            item.toLowerCase() !==
            city.toLowerCase()
        );

      return [
        city,
        ...filtered,
      ].slice(0, 6);
    });
  };

  const handleLocation = async (
    lat,
    lon
  ) => {
    await searchByCoordinates(
      lat,
      lon
    );
  };

  const handleUnitChange = (
    newUnit
  ) => {
    setUnit(newUnit);
  };

  const handleFavorite = () => {
    if (!weather?.name) {
      return;
    }

    setFavorites((previous) => {
      const alreadyExists =
        previous.some(
          (city) =>
            city.toLowerCase() ===
            weather.name.toLowerCase()
        );

      if (alreadyExists) {
        return previous;
      }

      return [
        ...previous,
        weather.name,
      ];
    });
  };

  const removeFavorite = (city) => {
    setFavorites((previous) =>
      previous.filter(
        (item) => item !== city
      )
    );
  };

  const toggleTheme = () => {
    setIsDark(
      (previous) => !previous
    );
  };

  return (
    <div className={backgroundClass}>
      <div className="app-shell">

        <Header
          isDark={isDark}
          onToggleTheme={toggleTheme}
        />

        <main>

          <section className="hero-section">

            <div className="hero-content">

              <span className="hero-badge">
                ✨ REAL-TIME WEATHER
              </span>

              <h1>
                Weather, beautifully
                <br />
                simplified.
              </h1>

              <p>
                Get accurate weather
                information, forecasts and
                conditions for cities around
                the world.
              </p>

            </div>

            <SearchBar
              onSearch={handleSearch}
              loading={loading}
            />

            <div className="search-actions">

              <LocationButton
                onLocation={handleLocation}
                loading={loading}
              />

              <UnitToggle
                unit={unit}
                onChange={
                  handleUnitChange
                }
              />

            </div>

          </section>

          <div className="dashboard-layout">

            <div className="main-content">

              {loading && (
                <LoadingState />
              )}

              {!loading && error && (
                <ErrorState
                  message={error}
                />
              )}

              {!loading &&
                !error &&
                !weather && (
                  <EmptyState />
                )}

              {!loading &&
                !error &&
                weather && (
                  <>

                    <div className="favorite-row">

                      <div>
                        <span className="live-dot"></span>
                        Live weather data
                      </div>

                      <button
                        className="favorite-button"
                        onClick={
                          handleFavorite
                        }
                      >
                        ⭐ Add to favorites
                      </button>

                    </div>

                    <CurrentWeather
                      weather={weather}
                      unit={unit}
                      lastUpdated={
                        lastUpdated
                      }
                    />

                    <WeatherDetails
                      weather={weather}
                      unit={unit}
                    />

                    <HourlyForecast
                      forecast={forecast}
                      unit={unit}
                    />

                    <WeatherChart
                      forecast={forecast}
                      unit={unit}
                    />

                    <DailyForecast
                      forecast={forecast}
                      unit={unit}
                    />

                  </>
                )}

            </div>

            <aside className="sidebar">

              <FavoriteCities
                favorites={favorites}
                onSelect={handleSearch}
                onRemove={
                  removeFavorite
                }
              />

              <RecentSearches
                searches={
                  recentSearches
                }
                onSelect={handleSearch}
                onClear={() =>
                  setRecentSearches([])
                }
              />

              <div className="about-card">

                <span>🌎</span>

                <h3>
                  About SkyCast
                </h3>

                <p>
                  A modern weather
                  dashboard built with
                  React and OpenWeather
                  API.
                </p>

              </div>

            </aside>

          </div>

        </main>

        <footer>

          <p>
            SkyCast Weather Dashboard
          </p>

          <span>
            Built with React + Vite
          </span>

        </footer>

      </div>
    </div>
  );
}