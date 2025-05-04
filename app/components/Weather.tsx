"use client";

import { useEffect, useRef, useState } from "react";
import type { IWeatherData } from "../types";
import toast from "react-hot-toast";
import classNames from "classnames";
import Image from "next/image";
import { ApiError } from "next/dist/server/api-utils";
import { weatherCodes } from "./data";
import { MyLineChart } from "./dataVis/MyLineChart";

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

export default function Weather({}: Props) {
  const [weather, setWeather] = useState<IWeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherList, setWeatherList] = useState<WeatherDataList | null>(null);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const getWeather = async () => {
    try {
      setWeatherLoading(true);
      const weather = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=51.439372&longitude=-2.586256&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,precipitation_probability_max&wind_speed_unit=mph&timeformat=unixtime",
      );
      const weatherData = (await weather.json()) as IWeatherData;
      return weatherData;
    } catch (err) {
      if (err instanceof ApiError) {
        toast.error(err.message);
      } else {
        toast.error(JSON.stringify(err, null, 2));
      }
    } finally {
      setWeatherLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      const weatherData = await getWeather();
      if (weatherData) {
        setWeather(weatherData);
      }
    })();

    timer.current = setInterval(
      async () => {
        const weatherData = await getWeather();
        if (weatherData) {
          setWeather(weatherData);
        }
      },
      1000 * 60 * 15,
    );

    return () => clearInterval(timer.current as NodeJS.Timeout);
  }, []);

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
          (weatherLoading || !weatherList) && "animate-pulse blur-md",
          "flex flex-col gap-5",
        )}
      >
        {!weatherList ? (
          <div>
            <div className="flex items-center justify-between gap-5">
              <div className="grow">
                <div className="text-3xl font-bold">19.9</div>
                <div>
                  It Feels like <div className="text-xl font-bold">19.9</div>
                </div>
              </div>
              <div>
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
            <div>Wind Speed: 12mgh</div>
            <div className="hidden text-base md:block md:text-lg">
              Precipitation:
              <div className="my-3">
                <MyLineChart
                  data={[
                    {
                      temperature: "",
                      precipitation: 0,
                      weatherCode: 0,
                      time: 123412341,
                    },
                    {
                      temperature: "",
                      precipitation: 0,
                      weatherCode: 0,
                      time: 12342134234,
                    },
                    {
                      temperature: "",
                      precipitation: 0,
                      weatherCode: 0,
                      time: 12341234234,
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        ) : (
          weatherList.map((w, i) => (
            <div key={i}>
              <div className="flex items-center justify-between gap-5">
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
                </div>
                <div>
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
              <div className="text-base md:text-lg">
                Wind Speed: {w.windSpeed}
              </div>
              <div className="hidden text-base md:block md:text-lg">
                Precipitation:
                <div className="my-3">
                  <MyLineChart data={w.daily} />
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
