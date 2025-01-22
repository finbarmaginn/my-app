import classNames from "classnames";
import { services } from "./data";
import TVServiceImage from "./TVServiceImage";

export default function TVServices() {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-24 items-center justify-center">
        {services.map((service, i) => {
          return (
            <a
              className={classNames(
                "block transition-opacity duration-300 hover:opacity-40",
                (i + 1 === services.length) && "md:col-start-2"
              )}
              href={service.url}
              key={service.name}
              target="_blank">

              <TVServiceImage service={service} />
            </a>
          )
        })}
      </div>
    </>
  )
}