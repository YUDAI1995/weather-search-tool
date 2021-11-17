import React from "react";
import useSWR from "swr";
import areaFetcher from "../lib/areaFetcher";

const fetchAreaData = (enteredAddress: string) => {
  let API_URL;
  if (enteredAddress) {
    API_URL = `${process.env.NEXT_PUBLIC_GOOGLE_API_URL}?address=${encodeURI(
      enteredAddress
    )}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;
  } else {
    API_URL = `${process.env.NEXT_PUBLIC_GOOGLE_API_URL}?address= &key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;
  }
  const { data, mutate, error } = useSWR(
    enteredAddress ? API_URL : null,
    areaFetcher
  );

  return {
    data: data,
    loading: !data && !error,
    error: error,
    mutate,
  };
};

export default fetchAreaData;
