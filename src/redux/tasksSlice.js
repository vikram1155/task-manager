import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allTasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setAllTasks: (state, action) => {
      state.allTasks = action.payload;
    },
    addTask: (state, action) => {
      const maxId = state.allTasks.reduce((max, task) => {
        return task.taskId > max ? task.taskId : max;
      }, 0);
      const newTask = {
        ...action.payload,
        taskId: maxId + 1,
      };
      state.allTasks.push(newTask);
    },
    updateTask: (state, action) => {
      const { taskId } = action.payload;

      const taskIndex = state.allTasks.findIndex(
        (task) => task.taskId === taskId
      );
      console.log("a-t", action.payload);
      if (taskIndex !== -1) {
        state.allTasks[taskIndex] = action.payload;
      }
    },
    deleteTask: (state, action) => {
      console.log("a", typeof action.payload);
      state.allTasks = state.allTasks.filter(
        (task) => task.taskId !== action.payload
      );
    },
  },
});

export const { setAllTasks, addTask, updateTask, deleteTask } =
  tasksSlice.actions;
export default tasksSlice.reducer;
