import type { FC } from "react";

import style from "./Board.module.css";
import { Column } from "../../Column";
import type { TColumn } from "../../../shared/types/types";

const Board: FC = () => {
  const cols: TColumn[] = [
    { id: "01", title: "Column 1", tasks: [{ id: "001", title: "Task 1" }] },
    { id: "02", title: "Column 2", tasks: [{ id: "002", title: "Task 2" }] },
    { id: "03", title: "Column 3", tasks: [{ id: "003", title: "Task 3" }] },
  ];

  return (
    <div className={style.Board}>
      <div className={style.Container}>
        {cols.map((col) => (
          <Column column={col} key={col.id} />
        ))}
      </div>
    </div>
  );
};

export default Board;
