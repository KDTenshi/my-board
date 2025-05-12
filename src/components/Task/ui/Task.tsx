import { useState, type FC } from "react";

import style from "./Task.module.css";

import type { TTask } from "../../../shared/types/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useAppDispatch } from "../../../app/store/appStore";
import { deleteTask, renameTask } from "../../../shared/store/boardSlice";

interface TaskProps {
  task: TTask;
}

const Task: FC<TaskProps> = ({ task }) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [value, setValue] = useState(task.title);

  const dispatch = useAppDispatch();

  const { attributes, listeners, transform, isDragging, setNodeRef } = useSortable({
    id: task.id,
    data: { type: "task" },
  });

  const handleBlur = () => {
    setIsRenaming(false);
    setValue(task.title);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = value.trim();

    if (!title) return;

    dispatch(renameTask({ id: task.id, title }));

    setIsRenaming(false);
    setValue(title);
  };

  const draggingStyle: React.CSSProperties = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div className={style.Task} {...attributes} {...listeners} ref={setNodeRef} style={draggingStyle}>
      {!isRenaming && <p className={style.Title}>{task.title}</p>}
      {isRenaming && (
        <form className={style.Form} onSubmit={handleSubmit}>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleBlur}
            autoFocus
            className={style.Input}
          />
        </form>
      )}
      <div className={style.Controls}>
        <button className={style.Button} onClick={() => setIsRenaming(true)}>
          EDT
        </button>
        <button className={style.Button} onClick={() => dispatch(deleteTask({ id: task.id }))}>
          DLT
        </button>
      </div>
    </div>
  );
};

export default Task;
