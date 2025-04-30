import Clock from "./_components/Clock";
import Weather from "./_components/Weather";
import TVServices from "./_components/TVServices";

export default function Home() {
	return (
		<div className="grid grid-cols-12">
			<div className="col-span-12 md:col-span-3 px-5 bg-neutral-900 relative">
				<div className="md:max-w-[320px] mx-auto">
					<Clock />
					<Weather />
				</div>
			</div>
			<div className="col-span-12 md:col-span-9 flex flex-col items-center justify-items-center md:min-h-screen font-[family-name:var(--font-geist-sans)]">
				<main className="max-w-screen-2xl w-11/12 px-6 my-6 md:my-auto">
					<TVServices />
				</main>
			</div>
		</div >
	);
}
