import type { FC } from "react";

import style from "./Column.module.css";
import type { TColumn } from "../../../shared/types/types";
import { Task } from "../../Task";

interface ColumnProps {
  column: TColumn;
}

const Column: FC<ColumnProps> = ({ column }) => {
  return (
    <div className={style.Column}>
      <h2 className={style.Title}>{column.title}</h2>
      <div className={style.List}>
        {column.tasks.map((task) => (
          <Task task={task} key={task.id} />
        ))}
      </div>
    </div>
  );
};

export default Column;
