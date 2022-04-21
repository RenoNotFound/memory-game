import { combineReducers } from "@reduxjs/toolkit";
import catsReducer from "../features/cat/catsSlice";
import activeCardsReducer from "../features/cards/cardsSlice";

const rootReducer = combineReducers({
  cats: catsReducer,
  activeCards: activeCardsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
