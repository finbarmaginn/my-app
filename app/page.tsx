import Clock from "./components/Clock";
import TVServices from "./components/TVServices";
import Weather from "./components/Weather/Weather";

export default function Home() {
  return (
    <div className="grid grid-cols-12">
      <div className="relative col-span-12 bg-gray-950 px-5 md:sticky md:top-0 md:col-span-4 md:h-screen">
        <div className="mx-auto flex h-full flex-col">
          <Clock />
          <Weather />
        </div>
      </div>
      <div className="col-span-12 flex flex-col items-center justify-items-center font-[family-name:var(--font-geist-sans)] md:col-span-8 md:min-h-screen">
        <main className="my-6 w-11/12 max-w-screen-2xl px-6 md:my-12 lg:my-auto">
          <TVServices />
        </main>
      </div>
    </div>
  );
}
