import { WeatherDataListDay } from "@/app/types";
import { format } from "date-fns";
import Image from "next/image";
import { getWeatherIconSrc } from "./Weather";

export default function ForecastDay({
  day,
}: {
  day: WeatherDataListDay | null;
}) {
  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-bold text-inherit md:text-sm">
          {day ? format(new Date(day.time * 1000), "E") : "--"}
        </span>
        <Image
          src={
            day
              ? getWeatherIconSrc(1, day.weatherCode)
              : getWeatherIconSrc(1, 0)
          }
          alt=""
          width="50"
          height="50"
          className="h-auto w-15"
          unoptimized
          priority
        />
        <span className="text-xs text-inherit md:text-sm">
          {day ? day.temperature : "--"}
        </span>
        <span className="text-xs text-inherit md:text-sm">
          {day ? day.precipitation : "--"}%
        </span>
      </div>
    </>
  );
}
