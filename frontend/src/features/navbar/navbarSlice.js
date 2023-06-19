import { createSlice } from "@reduxjs/toolkit";

export const navbarSlice = createSlice({
  name: "navbar",
  initialState: {
    navbar: false,
  },
  reducers: {
    showNavbar: (state, action) => {
      state.navbar = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showNavbar } = navbarSlice.actions;

export default navbarSlice.reducer;
