import { useState, type FC } from "react";

import style from "./Column.module.css";
import type { TColumn } from "../../../shared/types/types";
import { Task } from "../../Task";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AddTask } from "../../AddTask";
import { useAppDispatch } from "../../../app/store/appStore";
import { deleteColumn, renameColumn } from "../../../shared/store/boardSlice";

interface ColumnProps {
  column: TColumn;
}

const Column: FC<ColumnProps> = ({ column }) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [value, setValue] = useState(column.title);

  const dispatch = useAppDispatch();

  const { attributes, listeners, transform, isDragging, setNodeRef, setDroppableNodeRef } = useSortable({
    id: column.id,
    data: {
      type: "column",
    },
  });

  const handleBlur = () => {
    setIsRenaming(false);
    setValue(column.title);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = value.trim();

    if (!title) return;

    dispatch(renameColumn({ id: column.id, title }));

    setIsRenaming(false);
    setValue(title);
  };

  const draggingStyle: React.CSSProperties = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div className={style.Column} {...attributes} {...listeners} ref={setNodeRef} style={draggingStyle}>
      <button className={style.Button} onClick={() => dispatch(deleteColumn({ id: column.id }))}>
        DLT
      </button>
      {!isRenaming && (
        <h2 className={style.Title} onClick={() => setIsRenaming(true)}>
          {column.title}
        </h2>
      )}
      {isRenaming && (
        <form className={style.Form} onSubmit={handleSubmit}>
          <input
            type="text"
            className={style.Input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
            onBlur={handleBlur}
          />
        </form>
      )}
      <div className={style.List} ref={setDroppableNodeRef}>
        <AddTask columnId={column.id} />
        <SortableContext items={column.tasks}>
          {column.tasks.map((task) => (
            <Task task={task} key={task.id} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default Column;
