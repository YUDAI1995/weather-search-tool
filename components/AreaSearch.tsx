import React, { ReactElement, useEffect, useRef, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import RenderMap from "./RenderMap";
import fetchAreaData from "../data/fetchAreaData";

// for 'react-wrapper'
const render = (status: Status): ReactElement => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return null;
};

interface AreaSearchProp {
  areaSearchHandler: (city: string) => void;
}

const AreaSearch: React.FC<AreaSearchProp> = ({ areaSearchHandler }) => {
  const inputTextRef = useRef<HTMLInputElement>(null);

  const [inputText, setInputText] = useState("");
  const [isEnter, setIsEnter] = useState<boolean>(true);

  const { data, loading, error, mutate } = fetchAreaData(inputText);

  // submit Handler
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    let API_URL;
    if (inputTextRef.current.value !== "") {
      setInputText(inputTextRef.current.value);
      setIsEnter(false);

      if (inputTextRef.current) {
        API_URL = `${
          process.env.NEXT_PUBLIC_GOOGLE_API_URL
        }?address=${encodeURI(inputTextRef.current.value)}&key=${
          process.env.NEXT_PUBLIC_GOOGLE_API_KEY
        }`;
        areaSearchHandler(inputTextRef.current.value);
      } else {
        API_URL = `${process.env.NEXT_PUBLIC_GOOGLE_API_URL}?address="東京"&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;
      }
    }
    inputTextRef.current.value = ""
  };

  //input text Handler
  const inputTextHandler = () => {
    setIsEnter(true);
  };

  return (
    <>
      <div className="w-full max-w-5xl m-auto">
        <div className="p-4">
          <div className="flex justify-center items-center sm:w-1/2 h-64 m-auto border-2 overflow-hidden">
            {isEnter ? (
              <p>Please enter an area.</p>
            ) : data ? (
              <Wrapper
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
                render={render}
              >
                <RenderMap
                  center={data.results[0].geometry.location}
                  zoom={16}
                />
              </Wrapper>
            ) : loading ? (
              <p>Loadong...</p>
            ) : error ? (
              <p className="text-red-500">Sorry, Error.</p>
            ) : (
              <p>Map</p>
            )}
          </div>
        </div>

        <form
          onSubmit={submitHandler}
          className="flex items-center justify-between sm:w-4/5 max-w-2xl m-auto p-4"
        >
          <input
            type="text"
            className="w-full text-sm border-0 bg-gray-100 focus:bg-blue-100 outline-none px-2 py-3 transition-all"
            placeholder="Please enter an area. Example: 東京駅"
            ref={inputTextRef}
            onChange={inputTextHandler}
          />
          <button
            type="submit"
            className="rounded-sm bg-blue-600 sm:ml-2 py-3 px-2 sm:px-10 text-sm text-white hover:bg-blue-400 transition-colors outline-none"
          >
            Search
          </button>
        </form>
      </div>
    </>
  );
};

export default AreaSearch;
