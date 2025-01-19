import Image from "next/image";
import { services } from "./data";
import Clock from "./_components/Clock";
import Weather from "./_components/Weather";
import type { IWeatherData } from "./types";

export const revalidate = 1000;

export default async function Home() {
	const weather = await fetch('https://api.open-meteo.com/v1/forecast?latitude=51.4396041266992&longitude=-2.590676881053259&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m&daily=sunrise,sunset&wind_speed_unit=mph&timeformat=unixtime');
	const weatherData = await weather.json() as IWeatherData;
	return (
		<div className="grid grid-cols-12">
			<div className="col-span-12 md:col-span-2 px-5 bg-neutral-900">
				<Clock />

				<div className="hidden md:block">
					<Weather weatherData={weatherData} />
				</div>
			</div>
			<div className="col-span-12 md:col-span-10 flex flex-col items-center justify-items-center md:min-h-screen font-[family-name:var(--font-geist-sans)]">
				<main className="max-w-screen-2xl w-11/12 my-6 md:my-auto">
					<div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-24 items-center justify-center">
						{services.map((service) => {
							return (
								<a className="block transition-opacity duration-300 hover:opacity-40" href={service.url} key={service.name} target="_blank">
									<Image
										src={service.img}
										alt={service.name}
										width={20}
										height={20}
										className="w-full max-h-[30dvh]"
										unoptimized
										priority
									/>
								</a>
							)
						})}
					</div>
				</main>
			</div>
		</div >
	);
}
