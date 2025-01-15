import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

// Create an adapter to manage normalized user entities
const usersAdaptor = createEntityAdapter({});
const initialState = usersAdaptor.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users/all",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      //Transform response data into normalized format
      transformResponse: (responseData) => {
        const loadedUsers = responseData.map((user) => {
          user.id = user._id;
          return user;
        });
        return usersAdaptor.setAll(initialState, loadedUsers);
      },
      providesTags: (result, error, arg) => {
        if (error) return [{ type: "User", id: "LIST" }];
        if (result?.ids) {
          return [
            { type: "User", id: "LIST" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else return [{ type: "User", id: "LIST" }];
      },
    }),
    addNewUser: builder.mutation({
      query: (initialUserData) => ({
        url: "/users/register",
        method: "POST",
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
  }),
});

export const { useGetUsersQuery, useAddNewUserMutation } = usersApiSlice;

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult?.data ?? null
);

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdaptor.getSelectors(
  (state) => selectUsersData(state) ?? initialState
);
