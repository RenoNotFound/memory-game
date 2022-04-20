import { combineReducers } from "@reduxjs/toolkit";
import catsReducer from "../features/cat/catsSlice";

const rootReducer = combineReducers({
  cats: catsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
