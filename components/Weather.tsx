import { useEffect, useState } from "react";
import axios from "axios";
import { areaModel } from "../model/area.model";

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
  const [data, setData] = useState([
    {
      weather: [
        {
          main: "",
          description: "",
          icon: "",
        },
      ],
      main: { temp: 0, humidity: 0 },
      name: "",
      dt: 0,
    },
  ]);

  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    axios
      .get<WeatherApiResponse>(
        `${process.env.NEXT_PUBLIC_WEATHER_API_URL}?q=${encodeURI(
          area.areaRoman
        )}&APPID=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
      )
      .then((response) => {
        if (response.statusText !== "OK") {
          throw new Error("Could not get data.");
        }

        setData((prevState) => [
          {
            weather: [response.data.weather[0]],
            main: {
              temp: response.data.main.temp,
              humidity: response.data.main.humidity,
            },
            name: response.data.name,
            dt: response.data.dt,
          },
          ...prevState,
        ]);
        setIsFetching(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (isFetching)
    return (
      <div className="p-4">
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
  return (
    <div className="p-4">
      <div
        className=" bg-blue-600 opacity-80
                  w-96 h-56 m-auto rounded-xl shadow-2xl px-8 py-8
                  transform hover:scale-105 transition-transform duration-300 text-blue-100 relative overflow-hidden"
      >
        <div className="w-full">
          <div className="flex justify-between">
            <div>
              <h2 className="font-light text-sm">Area Name</h2>
              <p className="text-xl font-medium tracking-widest">
                {area.areaName}
              </p>
            </div>
            <div>
              <img
                src={`${process.env.NEXT_PUBLIC_WEATHER_ICON_URL}/${data[0].weather[0].icon}.png`}
                alt={data[0].weather[0].description}
              />
            </div>
          </div>
          <div className="mt-12 pr-6">
            <div className="flex justify-between">
              <div>
                <p className="font-light text-xs">Date</p>
                <p className="font-bold tracking-more-wider text-sm">
                  {new Date(data[0].dt * 1000).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="font-light text-xs">Temprature</p>
                <p className="font-bold tracking-more-wider text-sm">
                  {data[0].main.temp}°C
                </p>
              </div>
              <div>
                <p className="font-light text-xs">Humidity</p>
                <p className="font-bold tracking-more-wider text-sm">
                  {data[0].main.humidity}%
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
