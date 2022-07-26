import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";

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

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
//export const selectCount = (state: RootState) => state.counter.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };

export default todosSlice.reducer;
