"use client";

import React, { useEffect, useState } from "react";
import type { IWeatherData } from "../types";
import toast from "react-hot-toast";
import classNames from "classnames";
import Image from "next/image";
import { ApiError } from "next/dist/server/api-utils";
import { weatherCodes } from "./data";
import useSWR from "swr";
import { format } from "date-fns";

type Props = {
  weatherData?: IWeatherData;
};

export type WeatherDataList = {
  temperature: string;
  daily: WeatherDataListDaily;
  feelsLike: string;
  windSpeed: string;
  iconSrc: string;
}[];

export type WeatherDataListDaily = {
  temperature: string;
  precipitation: number;
  weatherCode: number;
  time: number;
}[];

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
          iconSrc: getIconSrc(currentData.is_day, currentData.weather_code),
        },
      ]);
    }
  }, [weather]);

  return (
    <>
      <div
        className={classNames(
          (weatherLoading || weatherValidating || !weatherList) &&
            "animate-pulse blur-md",
          "flex flex-col gap-5",
        )}
      >
        {!weatherList ? (
          <div>
            <div className="hidden items-center justify-between gap-5 md:flex">
              <div className="grow">
                <div className="text-3xl font-bold">19.9</div>
                <div>
                  It Feels like <div className="text-xl font-bold">19.9</div>
                  <div>Wind Speed: 12mgh</div>
                </div>
              </div>
              <div className="rounded bg-neutral-400 p-3">
                <Image
                  src={weatherCodes["0"].day.image}
                  alt=""
                  width="50"
                  height="50"
                  className="h-auto w-40"
                  unoptimized
                  priority
                />
              </div>
            </div>
            <div className="my-3 flex min-h-[176px] items-center justify-between rounded bg-neutral-400 p-3 text-neutral-900"></div>
          </div>
        ) : (
          weatherList.map((w, i) => (
            <div key={i}>
              <div className="hidden items-center justify-between gap-5 md:flex">
                <div className="grow">
                  <div className="text-2xl font-bold md:text-3xl">
                    {w.temperature}
                  </div>
                  <div className="text-base md:text-lg">
                    It Feels like{" "}
                    <div className="text-lg font-bold md:text-xl">
                      {w.feelsLike}
                    </div>
                  </div>
                  Wind Speed: {w.windSpeed}
                </div>
                <div className="rounded bg-neutral-400 p-3">
                  <Image
                    src={w.iconSrc}
                    alt=""
                    width="50"
                    height="50"
                    className="h-auto w-40"
                    unoptimized
                    priority
                  />
                </div>
              </div>
              <div className="text-base md:text-lg"></div>
              {/* <div className="my-3">
                  <MyLineChart data={w.daily} />
                </div> */}
              <div className="my-3 rounded bg-neutral-400 p-3 text-neutral-900">
                <div className="mb-2 font-bold">7-Day Forecast</div>
                <div className="grid grid-cols-7 items-center justify-between">
                  {w.daily.map((day, i) => (
                    <React.Fragment key={i}>
                      <div key={i} className="flex flex-col items-center gap-2">
                        <div className="text-sm font-bold">
                          {format(new Date(day.time * 1000), "E")}
                        </div>
                        <Image
                          src={getIconSrc(1, day.weatherCode)}
                          alt=""
                          width="50"
                          height="50"
                          className="-m-3 h-auto w-15"
                          unoptimized
                        />
                        <div className="text-sm">{day.temperature}</div>
                        <div className="text-sm">{day.precipitation}%</div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export function getIconSrc(is_day: number, weather_code: number) {
  if (is_day) {
    return weatherCodes[`${weather_code}` as keyof typeof weatherCodes].day
      .image;
  } else {
    return weatherCodes[`${weather_code}` as keyof typeof weatherCodes].night
      .image;
  }
}
