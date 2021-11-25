import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import { Area, getDirection, getRandomID } from "../model/area.model";
import { AreaWeatherApiResponse } from "../model/weather.model";
import { RootState } from "../store";
import { addAreaList } from "../store/areaSlice";

interface SearchWeatherProp {
  area: string;
  center: google.maps.LatLngLiteral;
  areaSearchHandler: (city: string) => void;
}

const SearchWeather: React.FC<SearchWeatherProp> = ({
  area,
  center,
  areaSearchHandler,
}) => {
  //SWR: Fetcher Function
  const fetcher = (url: string) =>
    axios.get<AreaWeatherApiResponse>(url).then((res) => {
      return res.data;
    });
  const url = `${process.env.NEXT_PUBLIC_WEATHER_ONECALLAPI_URL}?lat=${center.lat}&lon=${center.lng}&APPID=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`;
  const { data, error, mutate, isValidating } = useSWR(url, fetcher);

  const areaList: Area[] = useSelector(
    (state: RootState) => state.areaState.areaList
  );
  const dispatch = useDispatch();
  const onAddHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    const newArea = new Area(
      getRandomID(),
      areaList.length,
      "",
      area,
      center.lat.toString(),
      center.lng.toString(),
      "blue"
    );

    axios
      .post("/api/data", newArea)
      .then((res) => {
        mutate();
      })
      .catch((err) => {
        console.log(err);
      });

    dispatch(
      addAreaList({
        newArea,
      })
    );
    areaSearchHandler("");
  };

  if (isValidating)
    return (
      <div
        className="w-full h-full rounded-xl shadow-2xl
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
  else if (error) {
    return null;
  }
  return (
    <div className="py-4 px-4 md:p-4 w-full md:w-1/2 lg:w-1/3">
      <div
        className="bg-blue-600 opacity-80
        w-full h-full rounded-xl shadow-2xl px-8 py-8
        transform hover:scale-105 transition-transform duration-300 text-blue-100 relative overflow-hidden"
      >
        <div className="w-full">
          <div className="relative flex items-center justify-between">
            <div>
              <h2 className="sm:text-2xl font-bold tracking-widest">{area}</h2>
            </div>
            <div className="min-w-50">
              <img
                src={`${process.env.NEXT_PUBLIC_WEATHER_ICON_URL}/${data.current.weather[0].icon}@2x.png`}
                alt={data.current.weather[0].description}
                width="50"
                height="50"
              />
            </div>
          </div>
          <div className="mt-12 pr-6">
            <div className="flex justify-between">
              <div>
                <p className="font-light text-xs">気温</p>
                <p className="font-bold tracking-more-wider text-md">
                  {data.current.temp}°C
                </p>
              </div>
              <div>
                <p className="font-light text-xs">湿度</p>
                <p className="font-bold tracking-more-wider text-md">
                  {data.current.humidity}%
                </p>
              </div>
              <div>
                <p className="font-light text-xs">風速 - 風向き</p>
                <p className="font-bold tracking-more-wider text-sm">
                  {`${data.current.wind_speed}m/s
                ${getDirection(data.current.wind_deg)}`}
                </p>
              </div>
            </div>
            <button
              className="absolute bg-blue-800 font-bold bottom-2 right-2 w-10 h-6 rounded-xl hover:bg-blue-50 hover:text-blue-800 transition-colors outline-none"
              onClick={onAddHandler}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchWeather;
