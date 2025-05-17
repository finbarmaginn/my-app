"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ApiError } from "next/dist/server/api-utils";
import useSWR from "swr";
import { cn } from "@/lib/utils";
import Today from "./Today";
import ForecastWeek from "./ForecastWeek";
import { weatherCodes } from "../data";
import { IWeatherData, WeatherDataList } from "@/app/types";

type Props = {
  weatherData?: IWeatherData;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Weather({}: Props) {
  const [weatherList, setWeatherList] = useState<WeatherDataList | null>(null);
  const {
    data: weather,
    isLoading: weatherLoading,
    isValidating: weatherValidating,
  } = useSWR<IWeatherData>(
    "https://api.open-meteo.com/v1/forecast?latitude=51.439372&longitude=-2.586256&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,precipitation_probability_max&wind_speed_unit=mph&timeformat=unixtime",
    fetcher,
    {
      revalidateOnFocus: true,
      refreshInterval: 1000 * 60 * 15,
      refreshWhenHidden: false,
      onError: (err: ApiError) => {
        if (err.statusCode === 404) {
          toast.error("Weather data not found");
        } else if (err.statusCode === 500) {
          toast.error("Server error, please try again later");
        } else {
          toast.error("An unexpected error occurred");
        }
      },
    },
  );

  useEffect(() => {
    if (weather) {
      const currentData = weather.current;
      const currentUnits = weather.current_units;

      setWeatherList([
        {
          daily: weather.daily.time.map((time, i) => ({
            temperature: `${weather.daily.temperature_2m_max[i]}${weather.daily_units.temperature_2m_max}`,
            precipitation: weather.daily.precipitation_probability_max[i],
            weatherCode: weather.daily.weather_code[i],
            time: time,
          })),
          temperature: `${currentData.temperature_2m}${currentUnits.temperature_2m}`,
          feelsLike: `${currentData.apparent_temperature}${currentUnits.apparent_temperature}`,
          windSpeed: `${currentData.wind_speed_10m}${currentUnits.wind_speed_10m}`,
          iconSrc: getWeatherIconSrc(
            currentData.is_day,
            currentData.weather_code,
          ),
        },
      ]);
    }
  }, [weather]);

  return (
    <>
      <div
        className={cn(
          (weatherLoading || weatherValidating || !weatherList) &&
            "animate-pulse blur-md",
          "flex flex-col gap-5",
        )}
      >
        {!weatherList ? (
          <div>
            <Today weather={weatherList} />
            <ForecastWeek weather={weatherList} />
          </div>
        ) : (
          weatherList.map((w, i) => (
            <div key={i}>
              <Today weather={w} />
              <ForecastWeek weather={w} />
            </div>
          ))
        )}
      </div>
    </>
  );
}

export function getWeatherIconSrc(is_day: number, weather_code: number) {
  if (is_day) {
    return weatherCodes[`${weather_code}` as keyof typeof weatherCodes].day
      .image;
  } else {
    return weatherCodes[`${weather_code}` as keyof typeof weatherCodes].night
      .image;
  }
}
