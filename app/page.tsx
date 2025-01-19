import Image from "next/image";
import { services } from "./data";
import Clock from "./_components/Clock";
import Weather from "./_components/Weather";

export const revalidate = 1000;

export default async function Home() {
	const weather = await fetch('https://api.open-meteo.com/v1/forecast?latitude=51.4396041266992&longitude=-2.590676881053259&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,wind_speed_10m_max,wind_speed_10m_min&forecast_days=1', { next: { revalidate: 1000 } });
	const weatherData = await weather.json();
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
