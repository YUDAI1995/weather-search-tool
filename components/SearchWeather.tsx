import { useState } from "react";
import axios from "axios";
import useSWR from "swr";

type WeatherApiResponse = {
  current: {
    dt: number;
    temp: number;
    humidity: number;
    weather: [
      {
        main: string;
        description: string;
        icon: string;
      }
    ];
    statusText: "OK" | "unKnown";
  };
};

interface SearchWeatherProp {
  city: string;
  center: google.maps.LatLngLiteral;
}

const SearchWeather: React.FC<SearchWeatherProp> = ({ city, center }) => {
  //SWR: Fetcher Function
  const fetcher = (url: string) =>
    axios.get<WeatherApiResponse>(url).then((res) => {
      return res.data.current;
    });
  const url = `${process.env.NEXT_PUBLIC_WEATHER_ONECALLAPI_URL}?lat=${center.lat}&lon=${center.lng}&APPID=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`;
  const { data, error, mutate, isValidating } = useSWR(url, fetcher);
  const [isFetching, setIsFetching] = useState(true);

  if (isValidating)
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
        className="bg-blue-600 opacity-80
        w-96 h-56 m-auto rounded-xl shadow-2xl px-8 py-8
        transform hover:scale-105 transition-transform duration-300 text-blue-100 relative overflow-hidden"
      >
        <div className="w-full">
          <div className="flex justify-between">
            <div>
              <h2 className="font-light">Area Name</h2>
              <p className="text-lg font-medium tracking-widest">{city}</p>
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
                <p className="font-bold tracking-more-wider text-sm">
                  {new Date(data.dt * 1000).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="font-light text-xs">Temprature</p>
                <p className="font-bold tracking-more-wider text-sm">
                  {data.temp}°C
                </p>
              </div>
              <div>
                <p className="font-light text-xs">Humidity</p>
                <p className="font-bold tracking-more-wider text-sm">
                  {data.humidity}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchWeather;