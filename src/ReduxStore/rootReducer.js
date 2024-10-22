import { combineReducers } from "@reduxjs/toolkit";
import cartCounterSlice from "./features/cartCounterSlice";

const rootReducer = combineReducers({
  counter: cartCounterSlice,
});

export default rootReducer;
