import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./slice";

const store = configureStore({
  reducer: tasksReducer,

  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),

  devTools: process.env.NODE_ENV === "development",
});

export default store;

// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import {
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import { persistStore, persistReducer } from "redux-persist";
// import tasksReducer from "./slice";
// import storage from "redux-persist/lib/storage";

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, tasksReducer);

// const store = configureStore({
//   reducer: tasksReducer,

//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// export const persistor = persistStore(store);
// export default store;
