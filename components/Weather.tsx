import { useEffect, useState } from "react";
import axios from "axios";
import { areaModel } from "../model/area.model";
import useSWR from "swr";

type WeatherApiResponse = {
  weather: [
    {
      main: string;
      description: string;
      icon: string;
    }
  ];
  main: { temp: number; humidity: number };
  name: string;
  dt: number;
  statusText: "OK" | "unKnown";
};

interface WeatherProp {
  area: areaModel;
}

const Weather: React.FC<WeatherProp> = ({ area }) => {
  // SWR
  const fetcher = (url: string) =>
    axios.get<WeatherApiResponse>(url).then((res) => {
      return res.data;
    });
  const url = `${process.env.NEXT_PUBLIC_WEATHER_API_URL}?q=${encodeURI(
    area.areaRoman
  )}&APPID=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`;
  const { data, error, mutate, isValidating } = useSWR(url, fetcher);

  if (isValidating)
    return (
      <div className="py-2 px-4 md:p-4 h-64 w-full md:w-1/2 lg:w-1/3">
        <div
          className="
      w-96 h-56 rounded-xl shadow-2xl
      transform  transition-transform
      text-white relative flex items-center justify-center"
        >
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      </div>
    );
  else if (error)
    return (
      <div className="py-2 px-4 md:p-4 h-64 w-full md:w-1/2 lg:w-1/3">
        <div
          className="
w-96 h-56 rounded-xl shadow-2xl bg-red-100
transform text-red-500  transition-transform relative flex items-center justify-center"
        >
          <p>Sorry, Error.</p>
        </div>
      </div>
    );
  return (
    <div className="py-2 px-4 md:p-4 h-64 w-full md:w-1/2 lg:w-1/3">
      <div
        className=" bg-blue-600 opacity-80
        w-full h-full rounded-xl shadow-2xl px-8 py-8
                  transform hover:scale-105 transition-transform duration-300 text-blue-100 relative overflow-hidden"
      >
        <div className="w-full">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-2xl font-bold tracking-widest">
                {area.areaName}
              </h2>
            </div>
            <div>
              <img
                src={`${process.env.NEXT_PUBLIC_WEATHER_ICON_URL}/${data.weather[0].icon}.png`}
                alt={data.weather[0].description}
              />
            </div>
          </div>
          <div className="mt-12 pr-6">
            <div className="flex justify-between">
              <div>
                <p className="font-light text-xs">Date</p>
                <p className="font-bold tracking-more-wider text-md">
                  {new Date(data.dt * 1000).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="font-light text-xs">Temprature</p>
                <p className="font-bold tracking-more-wider text-md">
                  {data.main.temp}°C
                </p>
              </div>
              <div>
                <p className="font-light text-xs">Humidity</p>
                <p className="font-bold tracking-more-wider text-md">
                  {data.main.humidity}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
