import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ITodosState {
  tasks: ITask[];
}

const initialState: ITodosState = {
  tasks: [],
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ITask>) => {
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    },
    changeTaskState: (state, action: PayloadAction<{ id: string }>) => {
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          const newStatus = task.status === "active" ? "completed" : "active";
          return task.id === action.payload.id
            ? { ...task, status: newStatus }
            : task;
        }),
      };
    },
    clearCompleted: (state) => {
      return {
        ...state,
        tasks: state.tasks.filter((item) => item.status !== "completed"),
      };
    },
  },
});

export const { addTask, changeTaskState, clearCompleted } = todosSlice.actions;

export default todosSlice.reducer;
