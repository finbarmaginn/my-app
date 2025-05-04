import Clock from "./components/Clock";
import Weather from "./components/Weather";
import TVServices from "./components/TVServices";

export default function Home() {
  return (
    <div className="grid grid-cols-12">
      <div className="relative col-span-12 bg-neutral-900 px-5 md:col-span-3">
        <div className="mx-auto md:max-w-[320px]">
          <Clock />
          <Weather />
        </div>
      </div>
      <div className="col-span-12 flex flex-col items-center justify-items-center font-[family-name:var(--font-geist-sans)] md:col-span-9 md:min-h-screen">
        <main className="my-6 w-11/12 max-w-screen-2xl px-6 md:my-auto">
          <TVServices />
        </main>
      </div>
    </div>
  );
}
