import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/rootReducer";

export interface ICard {
  id: string;
  url: string;
  matched: boolean;
  hidden?: string;
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
