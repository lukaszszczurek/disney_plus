import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  photo: "",
  isLogged: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLoginDetails: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.photo = action.payload.photo;
      state.isLogged = action.payload.isLogged;
    },

    setSignOutState: (state) => {
      state.name = null;
      state.email = null;
      state.photo = null;
      state.isLogged = false;
    },
  },
});

export const { setUserLoginDetails, setSignOutState } = userSlice.actions;
export const selectUsername = (state) => state.user.username;
export const selectUserEmail = (state) => state.user.email;
export const selectUserPhoto = (state) => state.user.photo;
export const selectLoggedStatus = (state) => state.user.isLogged;

export default userSlice.reducer;
