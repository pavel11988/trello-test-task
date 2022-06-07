import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./slice";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),

  devTools: process.env.NODE_ENV === "development",
});

export default store;
