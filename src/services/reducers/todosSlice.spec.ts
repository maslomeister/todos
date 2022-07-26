import todosReducer, {
  ITodosState,
  addTask,
  changeTaskState,
  clearCompleted,
} from "./todosSlice";

describe("todos reducer", () => {
  const initialState: ITodosState = {
    tasks: [],
  };

  const stateWithTasks: ITodosState = {
    tasks: [
      {
        id: "task1",
        content: "task",
        status: "active",
      },
      {
        id: "task2",
        content: "task",
        status: "completed",
      },
      {
        id: "task3",
        content: "task",
        status: "active",
      },
    ],
  };

  it("should handle initial state", () => {
    expect(todosReducer(undefined, { type: "unknown" })).toEqual({
      tasks: [],
    });
  });

  it("should handle add task", () => {
    const actual = todosReducer(
      initialState,
      addTask({ id: "1", content: "Task", status: "active" })
    );
    expect(actual.tasks[0]).toEqual({
      id: "1",
      content: "Task",
      status: "active",
    });
  });

  it("should handle change task state of active", () => {
    const actual = todosReducer(
      stateWithTasks,
      changeTaskState({ id: "task1" })
    );

    expect(actual.tasks).toEqual(
      stateWithTasks.tasks.map((task) => {
        const newStatus = task.status === "active" ? "completed" : "active";
        return task.id === "task1" ? { ...task, status: newStatus } : task;
      })
    );
  });

  it("should remove completed tasks", () => {
    const actual = todosReducer(stateWithTasks, clearCompleted());

    expect(actual.tasks).toEqual(
      stateWithTasks.tasks.filter((task) => task.status !== "completed")
    );
  });
});
