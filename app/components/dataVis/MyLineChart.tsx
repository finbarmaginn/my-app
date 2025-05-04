"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { WeatherDataListDaily } from "../Weather";
import { format } from "date-fns/format";
// const chartData = [
//   { month: "January", desktop: 186 },
//   { month: "February", desktop: 305 },
//   { month: "March", desktop: 237 },
//   { month: "April", desktop: 73 },
//   { month: "May", desktop: 209 },
//   { month: "June", desktop: 214 },
// ];

const chartConfig = {
  temperature: {
    label: "Temperature",
    color: "hsl(var(--chart-1))",
  },
  precipitation: {
    label: "Precipitation",
    color: "hsl(var(--chart-2))",
  },
  // weaterCode: {
  //   label: "Weather Code",
  //   color: "hsl(var(--chart-3))",
  // },
} satisfies ChartConfig;
type Props = {
  data: WeatherDataListDaily;
};

export function MyLineChart({ data: chartData }: Props) {
  return (
    <ChartContainer config={chartConfig}>
      <LineChart accessibilityLayer data={chartData} margin={{}}>
        <CartesianGrid vertical={true} />
        <XAxis
          dataKey="time"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => format(value * 1000, "EE")}
        />
        <YAxis
          data-key="precipitation"
          domain={[0, 100]}
          tickFormatter={(value) => `${value}%`}
          tickLine={false}
          axisLine={false}
          tickMargin={10}
        />

        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Line
          dataKey="precipitation"
          type="step"
          // stroke="var(--color-precipitation)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}

{
  /* 
			    // <Card>
    //   <CardHeader>
    //     <CardTitle>precipitation</CardTitle>
    //     <CardDescription></CardDescription>
    //   </CardHeader>
    //   <CardContent>     </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
         <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>      </CardFooter>
    </Card>
		 */
}
