import Head from "next/head";
import { useState } from "react";
import fetchAreaData from "../data/fetchAreaData";
import { areaModel } from "../model/area.model";
import Weather from "../components/Weather";
import AreaSearch from "../components/AreaSearch";
import SearchWeather from "../components/SearchWeather";
import Footer from "../components/Footer";

const Home = () => {
  const [city, setCity] = useState("");
  const areaSearchHandler = (
    city: string
    //center: google.maps.LatLngLiteral
  ) => {
    setCity(city);
  };

  const areaList: areaModel[] = [
    {
      id: 1,
      areaRoman: "Tokyo",
      areaName: "東京",
      color: "blue",
    },
    {
      id: 2,
      areaRoman: "Osaka",
      areaName: "大阪",
      color: "yellow",
    },
    {
      id: 3,
      areaRoman: "Nagoya",
      areaName: "名古屋",
      color: "green",
    },
    {
      id: 4,
      areaRoman: "Kyoto",
      areaName: "京都",
      color: "red",
    },
  ];

  const { data, loading, error, mutate } = fetchAreaData(city);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Weather Search</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,minimum-scale=1.0"
        ></meta>
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1">
        <h1 className="flex justify-center items-center h-20 text-4xl font-bold">
          Weather Search
        </h1>
        <div className="w-full md:max-w-5xl lg:max-w-7xl sm:flex items-center flex-wrap m-auto mt-5">
          {areaList.map((area) => (
            <Weather area={area} key={area.id} />
          ))}
          {error ? (
            <div className="py-2 px-4 md:p-4 h-64 w-full md:w-1/2 lg:w-1/3">
              <div
                className="w-full h-full rounded-xl shadow-2xl bg-red-100
          transform text-red-500  transition-transform relative flex items-center justify-center"
              >
                <p>Sorry, Error.</p>
              </div>
            </div>
          ) : loading ? null : data ? (
            <>
              <SearchWeather
                city={city}
                center={data.results[0].geometry.location}
              />
            </>
          ) : (
            <></>
          )}
        </div>

        <AreaSearch areaSearchHandler={areaSearchHandler} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
