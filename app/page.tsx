import Image from "next/image";
import { services } from "./data";
import Clock from "./_components/Clock";
import Weather from "./_components/Weather";
import { format } from "date-fns";

export const revalidate = 1000;

export default async function Home() {
	const now = Date.now();
	return (
		<div className="grid grid-cols-12">
			<div className="col-span-12 md:col-span-3 px-5 bg-neutral-900 relative">
				<div className="max-w-[320px] mx-auto">
					<Clock
						dateTime={{
							date: format(now, "eeee do LLLL"),
							time: format(now, "p")
						}}
					/>
					<Weather

					/>
				</div>
			</div>
			<div className="col-span-12 md:col-span-9 flex flex-col items-center justify-items-center md:min-h-screen font-[family-name:var(--font-geist-sans)]">
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
