import classNames from "classnames";
import { services } from "./data";
import TVServiceImage from "./TVServiceImage";
import { Card } from "@/components/ui/card";

export default function TVServices() {
  return (
    <>
      <div className="grid grid-cols-2 items-center justify-center gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
        {services.map((service) => {
          return (
            <Card
              className="flex h-full w-full items-center justify-center p-6 md:p-12"
              key={service.name}
            >
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
            </Card>
          );
        })}
      </div>
    </>
  );
}
