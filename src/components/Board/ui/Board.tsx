import { useState, type FC } from "react";

import style from "./Board.module.css";
import { Column } from "../../Column";
import { useAppDispatch, useAppSelector } from "../../../app/store/appStore";
import { DndContext, DragOverlay, pointerWithin, type DragOverEvent, type DragStartEvent } from "@dnd-kit/core";
import { horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { changeColumnsPosition, changeTaskColumn, changeTaskPosition } from "../../../shared/store/boardSlice";
import type { TColumn, TTask } from "../../../shared/types/types";
import { Task } from "../../Task";

const Board: FC = () => {
  const columns = useAppSelector((state) => state.board.columns);
  const dispatch = useAppDispatch();

  const [selectedItem, setSelectedItem] = useState<{ item: TTask | TColumn; type: "task" | "column" } | null>(null);

  const handleDragStart = (e: DragStartEvent) => {
    const { active } = e;

    const { current } = active.data;

    if (!current) return;

    if (current.type === "column") {
      const column = columns.find((column) => column.id === active.id);

      if (!column) return;

      setSelectedItem({ item: column, type: "column" });
    }

    if (current.type === "task") {
      const column = columns.find((column) => column.tasks.some((task) => task.id === active.id));

      if (!column) return;

      const task = column.tasks.find((task) => task.id === active.id);

      if (!task) return;

      setSelectedItem({ item: task, type: "task" });
    }
  };

  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e;

    if (!over) return;

    const activeCurrent = active.data.current;
    const overCurrent = over.data.current;

    if (!activeCurrent || !overCurrent) return;

    if (active.id === over.id) return;

    if (activeCurrent.type === "column") {
      dispatch(changeColumnsPosition({ activeId: active.id as string, overId: over.id as string }));
    }

    if (activeCurrent.type === "task") {
      if (overCurrent.type === "column") {
        dispatch(changeTaskColumn({ activeId: active.id as string, overId: over.id as string }));
      }

      if (overCurrent.type === "task") {
        dispatch(changeTaskPosition({ activeId: active.id as string, overId: over.id as string }));
      }
    }
  };

  const renderDragOverlay = () => {
    if (!selectedItem) return;

    if (selectedItem.type === "column") return <Column column={selectedItem.item as TColumn} />;

    if (selectedItem.type === "task") return <Task task={selectedItem.item as TTask} />;
  };

  return (
    <div className={style.Board}>
      <div className={style.Container}>
        <DndContext onDragStart={handleDragStart} onDragOver={handleDragOver} collisionDetection={pointerWithin}>
          <SortableContext items={columns} strategy={horizontalListSortingStrategy}>
            {columns.map((column) => (
              <Column column={column} key={column.id} />
            ))}
          </SortableContext>
          <DragOverlay>{renderDragOverlay()}</DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

export default Board;
