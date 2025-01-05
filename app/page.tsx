import Image from "next/image";
import { services } from "./data";

export default function Home() {
	return (
		<div className="flex flex-col h-full items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
			<main className=" w-11/12 my-auto">
				<div className="grid grid-cols-3 gap-24 items-center justify-center">
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
	);
}
