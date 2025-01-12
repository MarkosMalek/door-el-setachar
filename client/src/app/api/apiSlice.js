import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSclice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
