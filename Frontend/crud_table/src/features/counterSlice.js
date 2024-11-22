import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  FormEditRow: {},
};

const counterSlice = createSlice({
  name: "editForm",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state, action) => {
      state.FormEditRow = action.payload;

      console.log(state.FormEditRow, "pppp");
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
