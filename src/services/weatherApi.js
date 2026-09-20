import axios from "axios";

const API_KEY =
  import.meta.env.VITE_OPENWEATHER_API_KEY;

const BASE_URL =
  "https://api.openweathermap.org/data/2.5";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

const validateApiKey = () => {
  if (!API_KEY) {
    throw new Error(
      "Weather service is not configured. Please add VITE_OPENWEATHER_API_KEY to your .env file."
    );
  }
};

const handleApiError = (error) => {
  if (error.response?.status === 401) {
    return new Error(
      "The weather API key is invalid or expired."
    );
  }

  if (error.response?.status === 404) {
    return new Error(
      "City not found. Please check the city name."
    );
  }

  if (error.response?.status === 429) {
    return new Error(
      "Weather service request limit reached. Please try again later."
    );
  }

  if (error.code === "ECONNABORTED") {
    return new Error(
      "Weather service took too long to respond."
    );
  }

  if (!error.response) {
    return new Error(
      "Unable to connect to the weather service."
    );
  }

  return new Error(
    error.response?.data?.message ||
      "Unable to fetch weather information."
  );
};

export const getCurrentWeather = async (
  city,
  units = "metric"
) => {
  validateApiKey();

  try {
    const response = await api.get("/weather", {
      params: {
        q: city,
        appid: API_KEY,
        units,
      },
    });

    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getForecast = async (
  city,
  units = "metric"
) => {
  validateApiKey();

  try {
    const response = await api.get("/forecast", {
      params: {
        q: city,
        appid: API_KEY,
        units,
      },
    });

    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getWeatherByCoordinates = async (
  lat,
  lon,
  units = "metric"
) => {
  validateApiKey();

  try {
    const response = await api.get("/weather", {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units,
      },
    });

    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getForecastByCoordinates = async (
  lat,
  lon,
  units = "metric"
) => {
  validateApiKey();

  try {
    const response = await api.get("/forecast", {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units,
      },
    });

    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};