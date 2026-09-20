export const getWeatherIconUrl = (icon, size = "4x") => {
  if (!icon) return "";

  return `https://openweathermap.org/img/wn/${icon}@${size}.png`;
};

export const formatTime = (timestamp, timezone = 0) => {
  const date = new Date((timestamp + timezone) * 1000);

  return date.toISOString().slice(11, 16);
};

export const formatDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString(
    "en-US",
    {
      weekday: "short",
      month: "short",
      day: "numeric",
    }
  );
};

export const getDayName = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString(
    "en-US",
    {
      weekday: "short",
    }
  );
};

export const formatWindDirection = (degrees) => {
  if (degrees === undefined || degrees === null) {
    return "N/A";
  }

  const directions = [
    "N",
    "NE",
    "E",
    "SE",
    "S",
    "SW",
    "W",
    "NW",
  ];

  return directions[
    Math.round(degrees / 45) % 8
  ];
};

export const formatVisibility = (visibility) => {
  if (!visibility) return "N/A";

  return `${(visibility / 1000).toFixed(1)} km`;
};

export const getWeatherBackground = (
  weather,
  isDark
) => {
  const theme = isDark ? "dark" : "light";

  if (!weather) {
    return `weather-app ${theme}`;
  }

  const condition =
    weather.weather?.[0]?.main?.toLowerCase() || "";

  let weatherClass = "";

  if (condition.includes("thunderstorm")) {
    weatherClass = "storm";
  } else if (
    condition.includes("rain") ||
    condition.includes("drizzle")
  ) {
    weatherClass = "rain";
  } else if (condition.includes("snow")) {
    weatherClass = "snow";
  } else if (condition.includes("cloud")) {
    weatherClass = "clouds";
  } else if (condition.includes("clear")) {
    weatherClass = "clear";
  }

  return `weather-app ${theme} ${weatherClass}`;
};


export const groupDailyForecast = (forecast) => {
  if (!forecast?.list) {
    return [];
  }

  const grouped = {};

  forecast.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];

    if (!grouped[date]) {
      grouped[date] = [];
    }

    grouped[date].push(item);
  });

  return Object.entries(grouped)
    .slice(0, 5)
    .map(([date, items]) => {
      const temperatures = items.map(
        (item) => item.main.temp
      );

      const representative =
        items.find((item) =>
          item.dt_txt.includes("12:00:00")
        ) ||
        items[Math.floor(items.length / 2)];

      return {
        date,
        timestamp: representative.dt,

        icon:
          representative.weather?.[0]?.icon,

        description:
          representative.weather?.[0]?.description ||
          "Unknown",

        temp: representative.main.temp,

        min: Math.min(...temperatures),

        max: Math.max(...temperatures),
      };
    });
};