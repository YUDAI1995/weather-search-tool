import axios from "axios";
import { Area } from "../model/area.model";
import useSWR from "swr";
import { WeatherApiResponse } from "../model/weather.model";
import { useDispatch } from "react-redux";
import { useDrag } from "react-dnd";
import { setAreaNum } from "../store/areaSlice";

interface WeatherProp {
  area: Area;
  containerNum: number;
}

const Weather: React.FC<WeatherProp> = ({ area, containerNum }) => {
  // SWR
  const fetcher = (url: string) =>
    axios.get<WeatherApiResponse>(url).then((res) => {
      return res.data;
    });
  const url = `${process.env.NEXT_PUBLIC_WEATHER_API_URL}?q=${encodeURI(
    area.areaRoman
  )}&APPID=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`;
  const { data, error, mutate, isValidating } = useSWR(url, fetcher);

  const dispatch = useDispatch();

  const [{ isDragging }, dragRef] = useDrag({
    type: "weatherData",

    item: { area },

    end: (_, monitor) => {
      const result = monitor.getDropResult() as { containerNum: number };
      if (result) {
        dispatch(
          setAreaNum({
            containerNum: result.containerNum,
            prevContainerNum: containerNum,
          })
        );
      }
    },

    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const pointer = isDragging ? "cursor-grabbing" : "cursor-grab";

  if (isValidating)
    return (
      <div
        className="w-full h-full min-h-40 rounded-xl shadow-2xl
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
    );
  else if (error)
    return (
      <div
        className="w-full h-full min-h-40 rounded-xl shadow-2xl bg-red-100
transform text-red-500  transition-transform flex items-center justify-center"
      >
        <p>Sorry, Error.</p>
      </div>
    );
  return (
    <div
      className={`bg-blue-600 opacity-80
      w-full h-full rounded-xl shadow-2xl px-8 py-8 transform hover:scale-105 transition-transform duration-300 text-blue-100 overflow-hidden ${pointer}`}
      ref={dragRef}
    >
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-2xl font-bold tracking-widest">
              {area.areaName}
            </h2>
          </div>
          <div className="min-w-50">
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
  );
};

export default Weather;
