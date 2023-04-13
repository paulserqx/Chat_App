import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICounterState {
  value: number;
}

const initialState: ICounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incremented(state) {
      state.value++;
    },
  },
});

export const { incremented } = counterSlice.actions;
export default counterSlice.reducer;
