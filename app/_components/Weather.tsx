import { format } from "date-fns";

type IDailtyData = {
  time: string[],
  weather_code: number[],
  temperature_2m_max: number[],
  temperature_2m_min: number[],
  sunrise: string[],
  sunset: string[],
  daylight_duration: number[],
  sunshine_duration: number[],
  uv_index_max: number[],
  uv_index_clear_sky_max: number[],
  precipitation_sum: number[],
  rain_sum: number[],
  showers_sum: number[],
  wind_speed_10m_max: number[]
};

type Props = {
  weatherData: {
    latitude: number,
    longitude: number,
    generationtime_ms: number,
    utc_offset_seconds: number,
    timezone: string,
    timezone_abbreviation: string,
    elevation: number,
    daily_units: {
      time: string,
      weather_code: string,
      temperature_2m_max: string,
      temperature_2m_min: string,
      sunrise: string,
      sunset: string,
      daylight_duration: string,
      sunshine_duration: string,
      uv_index_max: string,
      uv_index_clear_sky_max: string,
      precipitation_sum: string,
      rain_sum: string,
      showers_sum: string,
      wind_speed_10m_max: string
    },
    daily: IDailtyData
  }
}

export default function Weather({ weatherData }: Props) {
  const dailyData = weatherData.daily;
  const dailyUnits = weatherData.daily_units;

  return (<>
    <div className="grid gap-5">

      <div className="">
        <div className="text-lg font-semibold">Temperature</div>
        <div>
          <div>Min {dailyData.temperature_2m_min}{dailyUnits.temperature_2m_min}</div>
          <div>Max {dailyData.temperature_2m_max}{dailyUnits.temperature_2m_max}</div>
        </div>
      </div>

      <div className="">
        <div className="text-lg font-semibold">Precipitation</div>
        <div>
          <div>{dailyData.precipitation_sum}{dailyUnits.precipitation_sum}</div>
        </div>
      </div>

      <div className="">
        <div className="text-lg font-semibold">Sun Activity</div>
        <div>
          <div>Sunrise {format(dailyData.sunrise[0], "p")}</div>
          <div>Sunset {format(dailyData.sunset[0], "p")}</div>
        </div>
      </div>

      <div className="">
        <div className="text-lg font-semibold">Wind Speed</div>
        <div>
          Min {dailyData.wind_speed_10m_max}{dailyUnits.wind_speed_10m_max}
        </div>
        <div>
          Max {dailyData.wind_speed_10m_max}{dailyUnits.wind_speed_10m_max}
        </div>
      </div>

    </div >
  </>)
}