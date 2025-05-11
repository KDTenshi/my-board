import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TColumn, TTask } from "../types/types";
import { arrayMove } from "@dnd-kit/sortable";

type BoardState = {
  columns: TColumn[];
};

const initialState: BoardState = {
  columns: [
    { id: "01", title: "Column 1", tasks: [{ id: "001", title: "Task 1" }] },
    { id: "02", title: "Column 2", tasks: [{ id: "002", title: "Task 2" }] },
    { id: "03", title: "Column 3", tasks: [{ id: "003", title: "Task 3" }] },
  ],
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addColumn: (state, action: PayloadAction<{ title: string }>) => {
      const { title } = action.payload;

      const newColumn: TColumn = {
        id: `${Date.now()}`,
        title,
        tasks: [],
      };

      state.columns.push(newColumn);
    },
    addTask: (state, action: PayloadAction<{ columnId: string; title: string }>) => {
      const { columnId, title } = action.payload;

      const column = state.columns.find((column) => column.id === columnId);

      if (!column) return;

      const newTask: TTask = {
        id: `${Date.now()}`,
        title,
      };

      column.tasks.push(newTask);
    },
    changeColumnsPosition: (state, action: PayloadAction<{ activeId: string; overId: string }>) => {
      const { activeId, overId } = action.payload;

      const activeIndex = state.columns.findIndex((column) => column.id === activeId);
      const overIndex = state.columns.findIndex((column) => column.id === overId);

      state.columns = arrayMove(state.columns, activeIndex, overIndex);
    },
    changeTaskColumn: (state, action: PayloadAction<{ activeId: string; overId: string }>) => {
      const { activeId, overId } = action.payload;

      const activeColumn = state.columns.find((column) => column.tasks.some((task) => task.id === activeId));
      const overColumn = state.columns.find((column) => column.id === overId);

      if (!activeColumn || !overColumn) return;

      const activeTask = activeColumn.tasks.find((task) => task.id === activeId);

      if (!activeTask) return;

      activeColumn.tasks = activeColumn.tasks.filter((task) => task.id !== activeTask.id);
      overColumn.tasks.push(activeTask);
    },
    changeTaskPosition: (state, action: PayloadAction<{ activeId: string; overId: string }>) => {
      const { activeId, overId } = action.payload;

      const activeColumn = state.columns.find((column) => column.tasks.some((task) => task.id === activeId));

      if (!activeColumn) return;

      const activeIndex = activeColumn.tasks.findIndex((task) => task.id === activeId);
      const overIndex = activeColumn.tasks.findIndex((task) => task.id === overId);

      activeColumn.tasks = arrayMove(activeColumn.tasks, activeIndex, overIndex);
    },
  },
});

export const { addColumn, addTask, changeColumnsPosition, changeTaskColumn, changeTaskPosition } = boardSlice.actions;
