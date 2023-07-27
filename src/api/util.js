import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

export const baseQueryWithAuthInterceptor = (args) => {
  const baseQuery = fetchBaseQuery(args);
  return async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    if (
      result.error &&
      result.error.status === 401
      // || result.error.originalStatus === 401
    ) {
    }
    return result;
  };
};

export const prepareHeaders = (headers, { getState }) => {
  const token = getState().auth.token || localStorage.getItem("token");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return headers;
};
