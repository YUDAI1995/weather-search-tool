import React, { ReactElement, useRef, useState } from "react";
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
        setIsEnter(true);
        API_URL = `${process.env.NEXT_PUBLIC_GOOGLE_API_URL}?address="東京"&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;
      }
    }
    inputTextRef.current.value = "";
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
              <p className="text-gray-600">地名をご入力ください</p>
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
              <div className="transform  transition-transform text-white relative flex items-center justify-center">
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
            ) : error ? (
              <p className="w-full h-full flex justify-center items-center bg-red-100 text-red-500">Sorry, Error.</p>
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
            placeholder="地名をご入力ください 例: 東京駅"
            ref={inputTextRef}
            onChange={inputTextHandler}
          />
          <button
            type="submit"
            className="block rounded-sm bg-blue-600 min-w-1/4 sm:ml-2 py-3 px-2 sm:px-10 text-sm text-white hover:bg-blue-400 transition-colors outline-none"
          >
            検索
          </button>
        </form>
      </div>
    </>
  );
};

export default AreaSearch;
