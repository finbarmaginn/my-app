import { WeatherData } from "@/app/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ForecastDay from "./ForecastDay";

export default function ForecastWeek({
  weather,
}: {
  weather: WeatherData | null;
}) {
  return (
    <>
      <Card className="my-6 bg-gray-900">
        <CardHeader>7-Day Forecast</CardHeader>
        <CardContent className="grid grid-cols-7 items-center justify-between">
          {weather
            ? weather.daily.map((day, i) => <ForecastDay key={i} day={day} />)
            : [...Array(7).keys()].map((i) => (
                <ForecastDay key={i} day={null} />
              ))}
        </CardContent>
      </Card>
    </>
  );
}
