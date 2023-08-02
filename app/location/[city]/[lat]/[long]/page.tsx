import { getClient } from "@/apollo-client";
import fetchWeatherQuery from "@/graphql/queries/fetchWeatherQueries";
import { Callout } from "@tremor/react";
import { CheckCircleIcon } from "@heroicons/react/solid";
import CalloutCard from "@/components/Callout";
import StatCard from "@/components/StatCard";
import TempChart from "@/components/TempChart";

type Props = {
  params: {
    city: string;
    lat: string;
    long: string;
  };
};
export default async function WeatherPage({
  params: { city, lat, long },
}: Props) {
  const client = getClient();

  const { data } = await client.query({
    query: fetchWeatherQuery,
    variables: {
      current_weather: "true",
      longitude: long,
      latitude: lat,
      timezone: "GMT",
      time: "true",
    },
  });

  const results = data.myQuery;
  console.log({ results });

  return (
    <div>
      {/* Information */}
      <div>
        <div className="p-5">
          <div className="pb-5">
            <h2 className="text-xl font-bold">Todays overview</h2>
            <p className="text-sm text-gray-400">Last Updated at: </p>
            {new Date(results.current_weather.time).toLocaleString()} (
            {results.timezone})
          </div>
        </div>
        <div>
          <CalloutCard warning message="Open AI message goes here" />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2">
          <StatCard
            title="Maximum Temperature"
            metric={`${results.daily.temperature_2m_max[0].toFixed(1)}°C`}
            color="yellow"
          />
        </div>
        <div className="flex space-x-3 mt-5 justify-between">
          <StatCard
            title="Wind Speed"
            metric={`${results.current_weather.winddirection.toFixed(1)}°`}
            color="cyan"
          />
          <StatCard
            title="Wind Direction"
            metric={`${results.current_weather.windspeed.toFixed(1)}m/s`}
            color="violet"
          />
        </div>
      </div>
      <hr className="mb-5 mt-5 border-black" />
      <div className="space-y-3">
        <TempChart />
        {/* Rain Chart */}
        {/* Humidity Chart */}
      </div>
    </div>
  );
}
