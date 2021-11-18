import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { Area, getRandomID } from "../model/area.model";

const initialState: { areaList: Area[] } = {
  areaList: [
    {
      id: getRandomID(),
      areaRoman: "Tokyo",
      areaName: "東京",
      color: "blue",
      num: 0,
    },
    {
      id: getRandomID(),
      areaRoman: "Osaka",
      areaName: "大阪",
      color: "yellow",
      num: 1,
    },
    {
      id: getRandomID(),
      areaRoman: "Nagoya",
      areaName: "名古屋",
      color: "green",
      num: 2,
    },
    {
      id: getRandomID(),
      areaRoman: "Kyoto",
      areaName: "京都",
      color: "red",
      num: 3,
    },
  ],
};

const areaSlice = createSlice({
  name: "area",
  initialState,
  reducers: {
    addAreaList: (state, action) => {
      const newArea = new Area(
        getRandomID(),
        "",
        action.payload.areaName,
        "bule",
        state.areaList.length
      );
    },
    setAreaNum: (state, action) => {},
  },
});

export const { addAreaList, setAreaNum } = areaSlice.actions;
export const araeList = (state: RootState) => state.areaState;
export default areaSlice.reducer;
