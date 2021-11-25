import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { Area, getRandomID } from "../model/area.model";

const initialState: { areaList: Area[] } = {
  areaList: [
    // {
    //   id: getRandomID(),
    //   num: 0,
    //   areaRoman: "Sapporo",
    //   areaName: "札幌",
    //   center: { lat: 43.0617713, lng: 141.3544507 },
    //   color: "indigo",
    // },
    // {
    //   id: getRandomID(),
    //   num: 1,
    //   areaRoman: "Tokyo",
    //   areaName: "東京",
    //   center: { lat: 35.6803997, lng: 139.7690174 },
    //   color: "blue",
    // },
    // {
    //   id: getRandomID(),
    //   num: 2,
    //   areaRoman: "Nagoya",
    //   areaName: "名古屋",
    //   center: { lat: 35.18145060000001, lng: 136.9065571 },
    //   color: "green",
    // },
    // {
    //   id: getRandomID(),
    //   num: 3,
    //   areaRoman: "Osaka",
    //   areaName: "大阪",
    //   center: { lat: 34.6937249, lng: 135.5022535 },
    //   color: "yellow",
    // },
    // {
    //   id: getRandomID(),
    //   num: 4,
    //   areaRoman: "Kyoto",
    //   areaName: "京都",
    //   center: { lat: 35.011564, lng: 135.7681489 },
    //   color: "red",
    // },
  ],
};

const areaSlice = createSlice({
  name: "area",
  initialState,
  reducers: {
    addAreaList: (state, action) => {
      state.areaList = [action.payload.newArea, ...state.areaList];
    },
    setAreaList: (state, action) => {
      state.areaList = (action.payload as Area[]).map(
        (data) =>
          new Area(
            data.id,
            data.num,
            data.areaRoman,
            data.areaName,
            data.lat,
            data.lng,
            data.color
          )
      );
    },
    setAreaNum: (state, action) => {
      const setNum = (area: Area): Area => {
        if (area.num === action.payload.containerNum) {
          const newArea = new Area(
            area.id,
            action.payload.prevContainerNum,
            area.areaRoman,
            area.areaName,
            area.lat,
            area.lng,
            area.color
          );

          return newArea;
        } else if (area.num === action.payload.prevContainerNum) {
          const newArea = new Area(
            area.id,
            action.payload.containerNum,
            area.areaRoman,
            area.areaName,
            area.lat,
            area.lng,
            area.color
          );
          return newArea;
        } else {
          return area;
        }
      };

      const setNumList = state.areaList.map((area) => setNum(area));
      state.areaList = setNumList.sort((a, b) => {
        if (a.num > b.num) {
          return 1;
        } else return -1;
      });
    },
  },
});

export const { addAreaList, setAreaList, setAreaNum } = areaSlice.actions;
export const araeList = (state: RootState) => state.areaState;
export default areaSlice.reducer;
