import { WeatherData } from "@/app/types";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { weatherCodes } from "../data";

export default function Today({ weather }: { weather: WeatherData | null }) {
  return (
    <>
      <div className="hidden md:block">
        <Card className="bg-gray-900">
          <CardContent className="flex items-center justify-between gap-6">
            <div className="!justify-self-start">
              <div className="text-2xl font-bold md:text-3xl">
                {weather ? weather.temperature : "11°C"}
              </div>
              <div className="text-base md:text-lg">
                It Feels like{" "}
                <div className="text-lg font-bold md:text-xl">
                  {weather ? weather.feelsLike : "11°C"}
                </div>
              </div>
              Wind Speed: {weather ? weather.windSpeed : "5 mph"}
            </div>
            <Image
              src={weather ? weather.iconSrc : weatherCodes["0"].day.image}
              alt=""
              width="50"
              height="50"
              className={cn(
                "h-auto w-40 rounded-lg bg-gray-800 object-center",
                !weather && "opacity-50",
              )}
              unoptimized
              priority
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
