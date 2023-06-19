import { createSlice } from "@reduxjs/toolkit";
export const toastSlice = createSlice({
  name: "toast",
  initialState: {
    toast: [false, ""],
  },
  reducers: {
    showToast: (state, action) => {
      state.toast = action.payload;
    },
  },
});
export const { showToast } = toastSlice.actions;
export default toastSlice.reducer;
