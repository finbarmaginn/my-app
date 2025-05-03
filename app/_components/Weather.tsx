"use client";

import { useEffect, useRef, useState } from "react";
import type { IWeatherData } from "../types";
import toast from "react-hot-toast";
import classNames from "classnames";
import Image from "next/image";
import { ApiError } from "next/dist/server/api-utils";

type Props = {
  weatherData?: IWeatherData;
};

type WeatherDataList = {
  name: string;
  temperature: string;
  feelsLike: string;
  windSpeed: string;
  iconSrc: string;
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
        "https://api.open-meteo.com/v1/forecast?latitude=51.439372&longitude=-2.586256&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m&daily=sunrise,sunset&wind_speed_unit=mph&timeformat=unixtime",
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
          name: "Temperature",
          temperature: `${currentData.temperature_2m}${currentUnits.temperature_2m}`,
          feelsLike: `${currentData.apparent_temperature}${currentUnits.apparent_temperature}`,
          windSpeed: `${currentData.wind_speed_10m}${currentUnits.wind_speed_10m}`,
          iconSrc: getIconSrc(
            currentData.cloud_cover,
            currentData.rain,
            currentData.is_day,
          ),
        },
      ]);
    }
  }, [weather]);

  return (
    <>
      <div
        className={classNames(
          (weatherLoading || !weatherList) && "animate-pulse blur-md",
          "my-6 flex flex-col gap-5 md:my-12",
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
                  src={getIconSrc(50, 50, 1)}
                  alt=""
                  width="50"
                  height="50"
                  className="-my-5 -mr-5 h-auto w-40"
                  unoptimized
                  priority
                />
              </div>
            </div>
            <div>Wind Speed: 12mgh</div>
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
                    className="-my-5 -mr-5 h-auto w-40"
                    unoptimized
                    priority
                  />
                </div>
              </div>
              <div className="text-base md:text-lg">
                Wind Speed: {w.windSpeed}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

function getIconSrc(cover: number, rain: number, day: number) {
  if (cover <= 33) {
    return day === 1 ? "/svg/clear-day.svg" : "/svg/clear-night.svg";
  } else if (cover > 33 && cover <= 66) {
    return day === 1
      ? "/svg/partly-cloudy-day.svg"
      : "/svg/partly-cloudy-night.svg";
  } else {
    return "/svg/cloudy.svg";
  }
}
