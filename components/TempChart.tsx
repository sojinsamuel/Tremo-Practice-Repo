"use client";

import { Card, AreaChart, Title } from "@tremor/react";
import { weatherData as results } from "@/constants";

function TempChart() {
  const hourly = results.hourly.time
    .map((time) =>
      new Date(time).toLocaleString("en-US", {
        hour: "numeric",
        hour12: false,
      })
    )
    .slice(0, 24);
  console.log(hourly);

  const data = hourly.map((hour, i) => ({
    time: Number(hour),
    "UV Index": results.hourly.uv_index[i],
    "Temperature (C)": results.hourly.temperature_2m[i],
  }));

  const dataFormatter = (number: number) => `${number}°C`;

  return (
    <div className="flex justify-around p-5">
      <Card className="w-[45vw]">
        <Title>Temperature and UV index</Title>
        <AreaChart
          className="mt-6"
          data={data}
          index="time"
          categories={["Temperature (C)", "UV Index"]}
          colors={["yellow", "rose"]}
          minValue={0}
          valueFormatter={dataFormatter}
          //   yAxisWidth={20}
        />
      </Card>
      <Card className="w-[45vw]">
        <Title>Humidity</Title>
        <AreaChart
          className="mt-6"
          data={data}
          index="time"
          categories={["Temperature (C)", "UV Index"]}
          colors={["yellow", "rose"]}
          minValue={0}
          valueFormatter={dataFormatter}
          yAxisWidth={60}
        />
      </Card>
    </div>
  );
}

export default TempChart;
