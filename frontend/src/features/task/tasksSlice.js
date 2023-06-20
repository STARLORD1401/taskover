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
    deleteTaskReducer: (state, action) => {
      state.tasks = [
        ...state.tasks.slice(0, action.payload.index),
        ...state.tasks.slice(action.payload.index + 1),
      ];
    },
  },
});
export const { create, update, get, deleteTaskReducer } = tasksSlice.actions;
export default tasksSlice.reducer;
