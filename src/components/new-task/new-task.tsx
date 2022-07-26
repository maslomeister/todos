import React from "react";

import styles from "./new-task.module.css";

type Props = {
  input: string;
  showMenu: boolean;
  setInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addTask: () => void;
};

export function NewTask({ input, showMenu, setInput, addTask }: Props) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      addTask();
    }
  };
  return (
    <div className={"item__container"}>
      <div className={styles["search-box_style"]}>
        <div className={styles["drop-down-icon-container"]}>
          <div
            className={`${styles["drop-down-icon"]} ${
              showMenu ? styles["down"] : styles["up"]
            }`}
          />
        </div>
        <input
          className={styles["input"]}
          type="text"
          placeholder={"What needs to be done?"}
          onChange={setInput}
          value={input}
          onKeyDown={handleKeyDown}
          data-cy={"new-task-input"}
        />
        {input && (
          <p className={styles["add"]} onClick={addTask}>
            add
          </p>
        )}
      </div>
    </div>
  );
}
