import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    logIn: (state, action) => {
      state.user = action.payload;
    },
    logOut: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});
export const { logIn, logOut } = userSlice.actions;
export default userSlice.reducer;
