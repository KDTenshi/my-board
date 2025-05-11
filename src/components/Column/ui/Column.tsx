import type { FC } from "react";

import style from "./Column.module.css";
import type { TColumn } from "../../../shared/types/types";
import { Task } from "../../Task";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AddTask } from "../../AddTask";

interface ColumnProps {
  column: TColumn;
}

const Column: FC<ColumnProps> = ({ column }) => {
  const { attributes, listeners, transform, isDragging, setNodeRef, setDroppableNodeRef } = useSortable({
    id: column.id,
    data: {
      type: "column",
    },
  });

  const draggingStyle: React.CSSProperties = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div className={style.Column} {...attributes} {...listeners} ref={setNodeRef} style={draggingStyle}>
      <h2 className={style.Title}>{column.title}</h2>
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
