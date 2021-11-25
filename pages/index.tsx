import Head from "next/head";
import { useEffect, useState } from "react";
import fetchAreaData from "../data/fetchAreaData";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { Area } from "../model/area.model";
import ResultContainer from "../components/ResultContainer";
import AreaSearch from "../components/AreaSearch";
import SearchWeather from "../components/SearchWeather";
import Footer from "../components/Footer";
import { GetStaticProps } from "next";
import axios from "axios";
import { setAreaList } from "../store/areaSlice";

interface Prop {
  fetchData: Area[];
}
const Home: React.FC<Prop> = ({ fetchData }: Prop) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAreaList(fetchData));
  }, []);

  const [area, setArea] = useState("");
  const areaSearchHandler = (area: string) => {
    setArea(area);
  };

  const areaList: Area[] = useSelector(
    (state: RootState) => state.areaState.areaList
  );

  const { data, loading, error, mutate } = fetchAreaData(area);

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
        <div className="w-full md:max-w-5xl lg:max-w-7xl sm:flex items-stretch flex-wrap m-auto mt-5">
          {areaList.map((area, index) => (
            <ResultContainer containerNum={index} key={area.id} />
          ))}
          {error ? (
            <div className="py-4 px-4 md:p-4 w-full md:w-1/2 lg:w-1/3">
              <div
                className="w-full h-full min-h-40 rounded-xl shadow-2xl bg-red-100
          transform text-red-500  transition-transform flex items-center justify-center"
              >
                <p>Sorry, Error.</p>
              </div>
            </div>
          ) : loading ? null : data ? (
            <>
              <SearchWeather
                area={area}
                center={data.results[0].geometry.location}
                areaSearchHandler={areaSearchHandler}
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

export const getStaticProps: GetStaticProps = async () => {
  const fetchData = await axios
    .get<Area[]>(`${process.env.NEXT_PUBLIC_URL}/api/data`)
    .then((res) => res.data);
  return { props: { fetchData } };
};
