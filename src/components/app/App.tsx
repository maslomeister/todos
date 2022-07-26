import React, { useState, useEffect, useMemo } from "react";
import { v4 as uuid } from "uuid";

import { NewTask } from "../new-task/new-task";
import { TodoItem } from "../todo-item/todo-item";
import { TodoMenu } from "../todo-menu/todo-menu";
import { useAppSelector, useAppDispatch } from "../../services/hooks";
import {
  addTask,
  changeTaskState,
  clearCompleted,
} from "../../services/reducers/todosSlice";

import styles from "./App.module.css";

function App() {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state) => state.todos);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("");

  const addTaskAction = () => {
    if (input) {
      dispatch(addTask({ id: uuid(), content: input, status: "active" }));
      setInput("");
    }
  };

  const changeTaskStatus = (id: string) => {
    dispatch(changeTaskState({ id }));
  };

  const clearCompletedAction = () => {
    dispatch(clearCompleted());
  };

  const filteredTasks = useMemo(() => {
    if (filter === "active") {
      return tasks.filter((task) => task.status === "active");
    }
    if (filter === "completed") {
      return tasks.filter((task) => task.status === "completed");
    }

    return tasks;
  }, [filter, tasks]);

  const itemsLeft = useMemo(
    () =>
      tasks.reduce(
        (prev, cur) => (cur.status === "active" ? prev + 1 : prev),
        0
      ),
    [tasks]
  );

  const showMenu = useMemo(() => {
    if (tasks.length === 0) {
      return false;
    }
    return true;
  }, [tasks]);

  return (
    <div className={styles.app}>
      <div className={styles["app-container"]}>
        <header className={"item__container"}>
          <h1 className={styles["app-name"]}>todos</h1>
          <NewTask
            input={input}
            setInput={(e) => setInput(e.target.value)}
            showMenu={showMenu}
            addTask={addTaskAction}
          />
        </header>
        <ul className={"item__container"}>
          {filteredTasks.map((task) => (
            <TodoItem
              content={task.content}
              status={task.status}
              id={task.id}
              key={task.id}
              changeStatus={changeTaskStatus}
            />
          ))}
        </ul>
        <section className={"item__container"}>
          {showMenu && (
            <TodoMenu
              itemsLeft={itemsLeft}
              filter={filter}
              setFilter={setFilter}
              clearCompleted={clearCompletedAction}
            />
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
