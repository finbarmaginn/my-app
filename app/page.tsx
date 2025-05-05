import Clock from "./components/Clock";
import Weather from "./components/Weather";
import TVServices from "./components/TVServices";
import { packageVersions } from "./components/data";

type PackageVersions = {
  [key: string]: string;
};
export default function Home() {
  const typedPackageVersions: PackageVersions = packageVersions;
  return (
    <div className="grid grid-cols-12">
      <div className="relative col-span-12 bg-neutral-900 px-5 md:sticky md:top-0 md:col-span-4 md:h-screen">
        <div className="mx-auto flex h-full flex-col">
          <Clock />
          <Weather />
          <div className="mt-auto mb-6 hidden text-center md:block">
            {Object.keys(typedPackageVersions).map((pkg, i) => (
              <span key={i} className="text-xs text-neutral-300">
                {pkg}: {typedPackageVersions[pkg]}{" "}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-12 flex flex-col items-center justify-items-center font-[family-name:var(--font-geist-sans)] md:col-span-8 md:min-h-screen">
        <main className="my-12 w-11/12 max-w-screen-2xl px-6 md:my-12 lg:my-auto">
          <TVServices />
        </main>
        <div className="mt-auto text-center md:hidden">
          {Object.keys(typedPackageVersions).map((pkg, i) => (
            <span key={i} className="text-xs text-neutral-300">
              {pkg}: {typedPackageVersions[pkg]}{" "}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
