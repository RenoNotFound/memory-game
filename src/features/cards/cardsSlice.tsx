import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/rootReducer";

export interface ResponseData {
  id: string;
  categories?: Array<any>;
  breeds?: Array<any>;
  url: string;
  width?: number;
  height?: number;
}

export interface ICard {
  id: string;
  url: string;
  matched?: boolean;
  flipped?: boolean;
}

export interface Cards extends Array<ICard> {}

export interface ActiveCardsState {
  activeCards: Cards;
}

export const initialState: ActiveCardsState = {
  activeCards: [],
};

export const activeCardsSlice = createSlice({
  name: "activeCards",
  initialState,
  reducers: {
    addActiveCard: (state, { payload }: PayloadAction<ICard>) => {
      payload.matched = true;
      state.activeCards = [...state.activeCards, payload];
    },
    resetActiveCards: (state) => {
      state.activeCards = [];
    },
  },
});

export const { addActiveCard, resetActiveCards } = activeCardsSlice.actions;

export const activeCardsSelector = (state: RootState) => state.activeCards;

export default activeCardsSlice.reducer;
