import axios from "axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppThunk } from "../../app/store";
import { RootState } from "../../app/rootReducer";

export interface Cat {
  id: string;
  categories?: Array<any>;
  breeds: Array<any>;
  url: string;
  width: number;
  height: number;
}

export interface Cats extends Array<Cat> {}
export interface CatsState {
  cats: Cats;
  isLoading: boolean;
  error: CatsError;
}

export interface CatsError {
  message: string;
}

export const initialState: CatsState = {
  cats: [],
  isLoading: false,
  error: { message: "" },
};

export const catsSlice = createSlice({
  name: "cat",
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setCatsSuccess: (state, { payload }: PayloadAction<Cats>) => {
      state.cats = payload;
    },
    setCatsFailed: (state, { payload }: PayloadAction<CatsError>) => {
      state.error = payload;
    },
  },
});

export const { setCatsSuccess, setCatsFailed, setLoading } = catsSlice.actions;

export const getCats = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const catsResponse = await axios.get(
      "https://api.thecatapi.com/v1/images/search?limit=8&size=small&order=random"
    );
    dispatch(setCatsSuccess(catsResponse.data));
  } catch (error) {
    dispatch(setCatsFailed({ message: "An Error occurred" }));
  } finally {
    dispatch(setLoading(false));
  }
};

export const catsSelector = (state: RootState) => state.cats;
export default catsSlice.reducer;
