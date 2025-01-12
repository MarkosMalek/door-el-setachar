import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSclice } from "../../app/api/apiSlice";

// Create an adapter to manage normalized user entities
const usersAdaptor = createEntityAdapter({});
const initialState = usersAdaptor.getInitialState();

export const usersApiSlice = apiSclice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users/all",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      //Transform response data into normalized format
      transformResponse: (responsData) => {
        const loddedUsers = responsData.map((user) => {
          user.id = user._id;
          return user;
        });
        return usersAdaptor.setAll(initialState, loddedUsers);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "User", id: "LIST" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else return [{ type: "User", id: "LIST" }];
      },
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data
);

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdaptor.getSelectors(
  (state) => selectUsersData(state) ?? initialState
);
