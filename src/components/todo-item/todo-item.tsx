import React, { useMemo } from "react";

import styles from "./todo-item.module.css";

type Props = {
  content: string;
  status: string;
  id: string;
  changeStatus: (id: string) => void;
};

export function TodoItem({ id, content, status, changeStatus }: Props) {
  const checkboxStatus = useMemo(() => {
    switch (status) {
      case "active":
        return false;
      case "completed":
        return true;
      default:
        return false;
    }
  }, [status]);

  return (
    <li className={"item__container"}>
      <div className={styles["search-item_style"]}>
        <label>
          <input
            type="checkbox"
            checked={checkboxStatus}
            onChange={() => changeStatus(id)}
          />
          <span>
            <div
              className={`${styles["tick-mark"]} ${
                checkboxStatus ? styles["tick-mark_show"] : ""
              }`}
            ></div>
          </span>
        </label>

        <p
          className={`${styles["content"]} ${
            checkboxStatus ? styles["content_completed"] : ""
          }`}
        >
          {content}
        </p>
      </div>
    </li>
  );
}
