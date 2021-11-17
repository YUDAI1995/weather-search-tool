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
    mutate(API_URL);
  };

  //input text Handler
  const inputTextHandler = () => {
    setIsEnter(true);
  };

  return (
    <>
      <div className="w-full max-w-7xl flex justify-center items-center m-auto">
        <div className="p-4">
          <div className="w-96 h-56 border-2 flex justify-center items-center overflow-hidden">
            {isEnter ? (
              // <p>please serach button.</p>
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
          className="p-4 w-96 flex items-center justify-between"
        >
          <input
            type="text"
            className="w-full border-2 boder-white bg-blue-100 focus:bg-blue-100 focus:boder-blue outline-none px-2 py-3 transition-all"
            placeholder="Enter to add."
            ref={inputTextRef}
            onChange={inputTextHandler}
          />
          <button
            type="submit"
            className="rounded-md bg-blue-600 ml-2 py-3 px-8 text-white hover:bg-blue-400 transition-colors"
          >
            Search
          </button>
        </form>
      </div>
    </>
  );
};

export default AreaSearch;
