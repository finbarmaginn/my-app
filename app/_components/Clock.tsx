"use client";

import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";

export default function Clock() {
	const timer = useRef<NodeJS.Timeout | null>(null);
	const [time, setTime] = useState<{ date: string, time: string } | null>(null);

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

			<div className="mx-auto my-10 max-w-fit text-center">
				{!time ? (<>
					<div className="blur-md animate-pulse">
						<div className="lg:text-xl">asdfasdf 12th daedasg</div>
						<div className="text-4xl lg:text-5xl">  2:00 PM</div>
					</div>
				</>) : (<>
					<div className="lg:text-xl">{time.date}</div>
					<div className="text-4xl lg:text-5xl">{time.time}</div>
				</>)}
			</div>

		</div>
	)
}