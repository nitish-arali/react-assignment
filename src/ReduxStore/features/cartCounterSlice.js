import { createSlice } from "@reduxjs/toolkit";

const cartCounterSlice = createSlice({
  name: "cartCounter",
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
  },
});

export const { increment } = cartCounterSlice.actions;

export default cartCounterSlice.reducer;
