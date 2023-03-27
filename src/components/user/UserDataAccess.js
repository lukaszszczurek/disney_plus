import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  liked: [""],
  watchList: [""],
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,

  reducers: {
    setUserDataDetails: (state, action) => {
      state.id = action.payload.id;
      state.liked = action.payload.liked;
      state.watchList = action.payload.watchList;
    },

    signOutProcessDataReset: (state) => {
      state.id = null;
      state.liked = [];
      state.watchList = [];
    },
  },
});

export const { setUserDataDetails, signOutProcessDataReset } =
  userDataSlice.actions;
export const selectIdUserData = (state) => state.userData.id;
export const selectLiked = (state) => state.userData.liked;
export const selectWatchList = (state) => state.userData.watchList;
export default userDataSlice.reducer;
