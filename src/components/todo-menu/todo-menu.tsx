import React from "react";

import styles from "./todo-menu.module.css";

type Props = {
  itemsLeft: number;
  filter: string;
  setFilter: (filter: string) => void;
  clearCompleted: () => void;
};

export function TodoMenu({
  itemsLeft,
  filter,
  setFilter,
  clearCompleted,
}: Props) {
  return (
    <div className={"item__container"}>
      <div className={styles["search-menu_style"]}>
        <div>
          {itemsLeft >= 1 ? (
            <p>{itemsLeft} items left</p>
          ) : (
            <p>No items left</p>
          )}
        </div>
        <div className={styles["actions"]}>
          <p
            onClick={() => setFilter("")}
            className={`${styles["action"]} ${
              !filter ? styles["action_enabled"] : ""
            }`}
          >
            All
          </p>
          <p
            onClick={() => setFilter("active")}
            className={`${styles["action"]} ${
              filter === "active" ? styles["action_enabled"] : ""
            }`}
          >
            Active
          </p>
          <p
            onClick={() => setFilter("completed")}
            className={`${styles["action"]} ${
              filter === "completed" ? styles["action_enabled"] : ""
            }`}
          >
            Completed
          </p>
        </div>
        <div>
          <p className={styles["action"]} onClick={clearCompleted}>
            Clear Completed
          </p>
        </div>
      </div>
      <div className={styles["outer-box_first"]}></div>
      <div className={styles["outer-box_second"]}></div>
    </div>
  );
}
