import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useSelector as rawUseSelector,
} from "react-redux";
import areaReducer from "./areaSlice";

const reducer = combineReducers({
  areaState: areaReducer,
});

export const store = configureStore({
  reducer,
  //   middleware: (getDefaultMiddleware) =>
  //     getDefaultMiddleware({
  //       serializableCheck: {
  //         ignoredActions: ["pet/setPetNum"],
  //       },
  //     }),
});

export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
export type AppDispatch = typeof store.dispatch;
