import { configureStore } from "@reduxjs/toolkit";
import { apiSclice } from "./api/apiSlice";

export const store = configureStore({
  reducer: {
    api: apiSclice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSclice.middleware),
});
