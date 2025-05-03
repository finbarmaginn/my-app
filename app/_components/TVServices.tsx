import classNames from "classnames";
import { services } from "./data";
import TVServiceImage from "./TVServiceImage";

export default function TVServices() {
  return (
    <>
      <div className="my-4 grid grid-cols-2 items-center justify-center gap-12 md:grid-cols-3 lg:gap-24">
        {services.map((service) => {
          return (
            <a
              className={classNames(
                "transition-opacity duration-300 hover:opacity-40",
              )}
              href={service.url}
              key={service.name}
              target="_blank"
            >
              <TVServiceImage service={service} />
            </a>
          );
        })}
      </div>
    </>
  );
}
