import axios from "axios";

type GoogleGeoCordingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

const areaFetcher = (url: string) =>
  axios
    .get<GoogleGeoCordingResponse>(url)
    .then((res) => {
      if (res.data.status !== "OK") {
        throw new Error("Could not get coordinates.");
      }

      return res.data;
    })
export default areaFetcher;
