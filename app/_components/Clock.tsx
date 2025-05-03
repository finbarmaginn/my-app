"use client";

import classNames from "classnames";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";

type DateTime = {
  date: string;
  time: string;
};

export default function Clock() {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [time, setTime] = useState<DateTime>({
    date: "Skeleton !£th Somedate",
    time: "S:KL TN",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    timer.current = setInterval(() => {
      setLoading(false);
      const now = Date.now();
      setTime({
        date: format(now, "eeee do LLLL"),
        time: format(now, "p"),
      });
    }, 1000);

    return () => clearInterval(timer.current as NodeJS.Timeout);
  }, []);

  return (
    <div>
      <div
        className={classNames(
          "mx-auto my-6 max-w-fit text-center md:my-12",
          loading && "animate-pulse blur-md",
        )}
      >
        <div className="text-4xl md:text-5xl">{time.time}</div>
        <div className="text-lg md:text-xl">{time.date}</div>
      </div>
    </div>
  );
}
