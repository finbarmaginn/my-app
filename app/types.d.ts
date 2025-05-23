export type IWeatherData =
  // | IWeatherAPIError
  {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    current_units: {
      time: string;
      interval: string;
      temperature_2m: string;
      relative_humidity_2m: string;
      apparent_temperature: string;
      is_day: string;
      precipitation: string;
      rain: string;
      showers: string;
      snowfall: string;
      weather_code: string;
      cloud_cover: string;
      wind_speed_10m: string;
      wind_direction_10m: string;
    };
    current: {
      time: number;
      interval: number;
      temperature_2m: number;
      relative_humidity_2m: number;
      apparent_temperature: number;
      is_day: number;
      precipitation: number;
      rain: number;
      showers: number;
      snowfall: number;
      weather_code: number;
      cloud_cover: number;
      wind_speed_10m: number;
      wind_direction_10m: number;
    };
    daily_units: {
      precipitation_probability_max: string;
      temperature_2m_max: string;
      time: string;
      weather_code: string;
    };
    daily: {
      precipitation_probability_max: number[];
      temperature_2m_max: number[];
      time: number[];
      weather_code: number[];
    };
  };

export type IWeatherCode = {
  [key: string]: {
    day: {
      description: string;
      image: string;
    };
    night: {
      description: string;
      image: string;
    };
  };
};

export type IWeatherAPIError = {
  error: boolean;
  reason: string;
};

export type WeatherDataListDay = {
  temperature: string;
  precipitation: number;
  weatherCode: number;
  time: number;
};

export type WeatherDataListDaily = WeatherDataListDay[];

export type WeatherData = {
  temperature: string;
  daily: WeatherDataListDaily;
  feelsLike: string;
  windSpeed: string;
  iconSrc: string;
};

export type WeatherDataList = WeatherData[];

export type PackageVersions = {
  [key: string]: string;
};
