import type { FC } from "react";

import style from "./Task.module.css";

import type { TTask } from "../../../shared/types/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TaskProps {
  task: TTask;
}

const Task: FC<TaskProps> = ({ task }) => {
  const { attributes, listeners, transform, isDragging, setNodeRef } = useSortable({
    id: task.id,
    data: { type: "task" },
  });

  const draggingStyle: React.CSSProperties = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div className={style.Task} {...attributes} {...listeners} ref={setNodeRef} style={draggingStyle}>
      <p className={style.Title}>{task.title}</p>
    </div>
  );
};

export default Task;
