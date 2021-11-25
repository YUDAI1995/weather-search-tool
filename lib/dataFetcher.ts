import axios from "axios";
import { Area } from "../model/area.model";

export const dataFetcher = () => {
  const data = axios
    .get<Area[]>(`${process.env.NEXT_PUBLIC_URL}/api/data`)
    .then((res) => res.data);

  return data;
};
