"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { format } from "date-fns";
import { WeatherDataListDaily } from "@/app/types";

const chartConfig = {
  time: {
    label: "Time",
    color: "hsl(var(--chart-4))",
  },
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

export default function MyBarChart({ data: chartData }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Forecaset</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              // tickLine={true}
              tickMargin={10}
              // axisLine={true}
              // tickSize={10}
              tickFormatter={(value) => {
                return format(new Date(value * 1000), "eeee");
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey="temperature"
              fill="var(--color-temerature)"
              radius={4}
            />
            <Bar
              dataKey="precipitation"
              fill="var(--color-precipitation)"
              radius={4}
            />
            {/* <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} /> */}
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
}
