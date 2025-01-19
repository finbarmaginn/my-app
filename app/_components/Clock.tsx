"use client";

import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";

type DateTime = {
  date: string,
  time: string
}

export default function Clock({ dateTime }: { dateTime: DateTime }) {
	const timer = useRef<NodeJS.Timeout | null>(null);
	const [time, setTime] = useState<DateTime>(dateTime);

  useEffect(() => {
    timer.current = setInterval(() => {
      const now = Date.now()
      setTime({
        date: format(now, "eeee do LLLL"),
        time: format(now, "p")
      })
    }, 1000)

    return () => clearInterval(timer.current as NodeJS.Timeout);
  }, []);

  return (
    <div>
      <div className="mx-auto my-5 max-w-fit text-center">
        <div className="text-4xl lg:text-5xl">{time.time}</div>
        <div className="lg:text-xl">{time.date}</div>
      </div>
    </div>
  )
}