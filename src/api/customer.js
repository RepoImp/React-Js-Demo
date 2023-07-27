import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuthInterceptor, prepareHeaders } from "./util";

export const customerApi = createApi({
  reducerPath: "customerApi",
  baseQuery: baseQueryWithAuthInterceptor({
    baseUrl: "/api/",
    prepareHeaders: prepareHeaders,
  }),
  tagTypes: ["customer"],
  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: () => "customer",
      providesTags: ["customer"],
    }),
  }),
});

export const {
  useGetCustomersQuery,
} = customerApi;