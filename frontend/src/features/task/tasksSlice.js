import { createSlice } from "@reduxjs/toolkit";
export const tasksSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
  },
  reducers: {
    get: (state, action) => {
      state.tasks = action.payload;
    },
    create: (state, action) => {
      state.tasks.push(action.payload);
    },
    update: (state, action) => {
      state.tasks[action.payload.index] = action.payload.task;
    },
  },
});
export const { create, update, get } = tasksSlice.actions;
export default tasksSlice.reducer;
