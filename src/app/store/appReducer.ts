import { combineReducers } from "@reduxjs/toolkit";
import { boardSlice } from "../../shared/store/boardSlice";

export const appReducer = combineReducers({
  [boardSlice.reducerPath]: boardSlice.reducer,
});
