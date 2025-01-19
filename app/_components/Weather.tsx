"use client";

import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import type { IWeatherData } from "../types";
import toast from "react-hot-toast";
import classNames from "classnames";
import Image from "next/image";
import { ApiError } from "next/dist/server/api-utils";

type Props = {
  weatherData: IWeatherData
}

type WeatherDataList = {
  name: string,
  data: string | React.ReactNode
}[]

export default function Weather({ weatherData }: Props) {

  const [weather, setWeather] = useState<IWeatherData>(weatherData);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherList, setWeatherList] = useState<WeatherDataList | null>(null)
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timer.current = setInterval(async () => {
      setWeatherLoading(true);
      try {
        const weather = await fetch('https://api.open-meteo.com/v1/forecast?latitude=51.4396041266992&longitude=-2.590676881053259&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m&daily=sunrise,sunset&wind_speed_unit=mph&timeformat=unixtime');
        const weatherData = await weather.json() as IWeatherData;
        setWeather(weatherData)
        toast.success("Weather data updated")
      } catch (err) {
        if (err instanceof ApiError) {
          toast.error(err.message);
        } else {
          toast.error(JSON.stringify(err, null, 2))
        }
      } finally {
        setWeatherLoading(false);
      }
    }, 1000 * 60 * 60);

    return () => clearInterval(timer.current as NodeJS.Timeout);
  }, []);

  useEffect(() => {
    const currentData = weather.current;
    const currentUnits = weather.current_units;
    setWeatherList([
      {
        name: "Temperature",
        data: (
          <>
            <div className="flex items-center gap-5">
              <div className="grow">
                <div className="text-3xl font-bold">{currentData.temperature_2m}{currentUnits.temperature_2m}</div>
                <div>It Feels like <div className="text-xl font-bold">{currentData.apparent_temperature}{currentUnits.apparent_temperature}</div></div>
              </div>
              <div>
                <Image
                  src={getIconSrc(currentData.cloud_cover, currentData.rain, currentData.is_day)}
                  alt=""
                  width="50"
                  height="50"
                  className="w-40 h-auto"
                  unoptimized
                  priority
                />
              </div>
              <div></div>
            </div>
            <div>Wind Speed: {currentData.wind_speed_10m}{currentUnits.wind_speed_10m}</div>
          </>
        )
      },
      {
        name: "Last Updated",
        data: (<div className="text-center">
          {format(Date.now(), "p")}
        </div>)
      },
    ])
  }, [weather])


  return (<>
    {/* <div className="text-left">Cloud Cover:</div>
          <div className="text-xl text-right font-bold">
          </div>
          <div className="text-left">Precipitation:</div>
          <div className="text-xl text-right font-bold">{currentData.precipitation}{currentUnits.precipitation}</div>
          <div className="text-left">Humidity:</div>
          <div className="text-xl text-right font-bold">{currentData.relative_humidity_2m}{currentUnits.relative_humidity_2m}</div> */}
    <div className={classNames(
      weatherLoading || !weatherList && "blur-md animate-pulse",
      "flex flex-col gap-5 max-h-full"
    )}>
      {!weatherList ? (
        <>
          <div className="">
            <div className="text-lg font-semibold">Tqwe</div>
            <div>
              Tqwe Lorem ipsum dolor sit amet consectetur
            </div>
          </div>
          <div className="">
            <div className="text-lg font-semibold">Tqwe</div>
            <div>
              Tqwe Lorem ipsum dolor sit amet consectetur
            </div>
          </div>
        </>
      ) : weatherList.map((w, i) => {
        return (
          <div className={classNames(i + 1 === weatherList.length && "absolute bottom-5 right-0 left-0 text-center")} key={i}>
            <div>
              {w.data}
            </div>
          </div>
        )
      })}
    </div >
  </>)
}

function getIconSrc(cover: number, rain: number, day: number) {
  if (cover <= 33) {
    return day === 1
      ? "/svg/clear-day.svg"
      : "/svg/clear-night.svg";
  } else if (cover > 33 && cover <= 66) {
    return day === 1
      ? "/svg/partly-cloudy-day.svg"
      : "/svg/partly-cloudy-night.svg";
  } else {
    return "/svg/cloudy.svg"
  }
}