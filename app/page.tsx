import Clock from "./components/Clock";
import Weather from "./components/Weather";
import TVServices from "./components/TVServices";
import { packageVersions } from "./components/data";

type PackageVersions = {
  [key: string]: string;
};
export default function Home() {
  const typedPackageVersions: PackageVersions = packageVersions;

  console.log(typedPackageVersions);
  return (
    <div className="grid grid-cols-12">
      <div className="relative col-span-12 bg-neutral-900 px-5 md:col-span-3">
        <div className="mx-auto flex h-full flex-col md:max-w-[320px]">
          <Clock />
          <Weather />
          <div className="mt-auto mb-6">
            {Object.keys(typedPackageVersions).map((pkg, i) => (
              <div key={i} className="text-right text-sm text-neutral-300">
                {pkg}: {typedPackageVersions[pkg]}
              </div>
            ))}
          </div>
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
