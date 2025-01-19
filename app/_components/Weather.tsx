"use client";

import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import type { IWeatherData } from "../types";

type Props = {
  weatherData: IWeatherData
}

type WeatherDataList = {
  name: string,
  data: string | React.ReactNode
}[]

export default function Weather({ weatherData }: Props) {

  const [weather, setWeather] = useState<IWeatherData>(weatherData);
  const [weatherList, setWeatherList] = useState<WeatherDataList | null>(null)
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timer.current = setInterval(async () => {
      const weather = await fetch('https://api.open-meteo.com/v1/forecast?latitude=51.4396041266992&longitude=-2.590676881053259&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m&daily=sunrise,sunset&wind_speed_unit=mph&timeformat=unixtime');
      const weatherData = await weather.json() as IWeatherData;
      setWeather(weatherData)
    }, 10000);

    return () => clearInterval(timer.current as NodeJS.Timeout);
  }, []);

  useEffect(() => {
    const currentData = weather.current;
    const currentUnits = weather.current_units;
    setWeatherList([
      {
        name: "Temperature",
        data: (<div className="grid grid-cols-2">
          <div className="text-left">It Feels like </div>
          <div className="text-xl text-right font-bold">{currentData.apparent_temperature}{currentUnits.apparent_temperature}</div>
          <div>It&apos;s Actually</div>
          <div className="text-xl text-right font-bold">{currentData.temperature_2m}{currentUnits.temperature_2m}</div>
        </div>)
      },
      {
        name: "Environmental",
        data: (<div className="grid grid-cols-2">
          <div className="text-left">Cloud Cover:</div>
          <div className="text-xl text-right font-bold">{currentData.cloud_cover}{currentUnits.cloud_cover}</div>
          <div className="text-left">Precipitation:</div>
          <div className="text-xl text-right font-bold">{currentData.precipitation}{currentUnits.precipitation}</div>
          <div className="text-left">Humidity:</div>
          <div className="text-xl text-right font-bold">{currentData.relative_humidity_2m}{currentUnits.relative_humidity_2m}</div>
        </div>)
      },
      {
        name: "Last Updated",
        data: (<div className="text-center">
          {format(Date.now(), "p")}
        </div>)
      },
    ])
  }, [weather])

  if (!weatherList) {
    return (<>
      <div className="w-full h-[64px] md:h-[76px] bg-neutral-800 animate-pulse"></div>
      <div className="w-full h-[64px] md:h-[76px] bg-neutral-800 animate-pulse"></div>
      <div className="w-full h-[64px] md:h-[76px] bg-neutral-800 animate-pulse"></div>
    </>)
  }

  return (<>
    <div className="grid gap-5">
      {weatherList.map((w, i) => {
        return (
          <div className="" key={i}>
            <div className="text-lg font-semibold">{w.name}</div>
            <div>
              {w.data}
            </div>
          </div>
        )
      })}
    </div >
  </>)
}