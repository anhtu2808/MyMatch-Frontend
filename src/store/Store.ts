import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user: userReducer,
})

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const persistedUserReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer:  persistedUserReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
