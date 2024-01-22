import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";

import CreateCvSlice from "./createCv/slice";
import putCvSlice from "./createCv/api/createCvSlice";
import clientSlice from "./clients/slice";
import missionSlice from "./mission/slice";
import accountSlice from './account/slice'
import logoutSlice from "./logout/slice";
import authSlice from "./register/slice";
import jobSlice from "./jobs/slice";
import globalReducer from "./modeTheme";
import persistStore from "redux-persist/es/persistStore";
import providerSlice from "./fournisseurs/slice"
import deviSlice from "./devis/slice"
import DetailsProvidersSlice from "./getDetailsProviders"
import DetailsClientSlice from "./getDetailsClent"

const reducers = combineReducers({
  cvs:CreateCvSlice,
  putCvSlice,
  global: globalReducer,
  clients:clientSlice,
  logout:logoutSlice,
  account:accountSlice,
  missions:missionSlice,
  user:authSlice,
  jobs:jobSlice,
  providers:providerSlice,
  devis:deviSlice,
  detailsProvider:DetailsProvidersSlice,
  detailsClient:DetailsClientSlice,

});


const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth","cvs"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;
export const persistor = persistStore(store)