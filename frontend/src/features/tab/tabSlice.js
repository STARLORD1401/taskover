import { createSlice } from "@reduxjs/toolkit";

export const tabSlice = createSlice({
  name: "tab",
  initialState: {
    tab: { myTasks: true, groupTasks: false },
  },
  reducers: {
    myTasksTab: (state) => {
      state.tab = { myTasks: true, groupTasks: false };
    },
    groupTasksTab: (state) => {
      state.tab = { myTasks: false, groupTasks: true };
    },
  },
});

export const { myTasksTab, groupTasksTab } = tabSlice.actions;
export default tabSlice.reducer;
