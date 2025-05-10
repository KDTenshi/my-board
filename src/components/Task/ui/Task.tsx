import type { FC } from "react";

import style from "./Task.module.css";

import type { TTask } from "../../../shared/types/types";

interface TaskProps {
  task: TTask;
}

const Task: FC<TaskProps> = ({ task }) => {
  return (
    <div className={style.Task}>
      <p className={style.Title}>{task.title}</p>
    </div>
  );
};

export default Task;
