import _ from "lodash";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import authReducer, { authSlice } from "../slices/authSlice";
import gmtCvsReducer, { gmtCsvSlice } from "../slices/gmtCsvSlice";
import { authApi } from "../../api/auth";
import {gmtCsvApi} from "../../api/gmtCsv";
import { notificationsSlice } from "../slices/notificationsSlice";
import { loaderSlice } from "../slices/loaderSlice";
import { customerSlice } from "../slices/customerSlice";
import { customerApi } from "../../api/customer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    gmtCvs: gmtCvsReducer,
    [authApi.reducerPath]: authApi.reducer,
    [gmtCsvApi.reducerPath]: gmtCsvApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(gmtCsvApi.middleware)
      .concat(customerApi.middleware)
});

setupListeners(store.dispatch);

const createActions = (slice) =>
  _.mapValues(
    slice.actions,
    (actionCreator) => (payload) => store.dispatch(actionCreator(payload)),
  );

export const actions = {
  auth: createActions(authSlice),
  notifications: createActions(notificationsSlice),
  gmtCvs: createActions(gmtCsvSlice),
  loading: createActions(loaderSlice),
  customer: createActions(customerSlice)
};

export default store;
