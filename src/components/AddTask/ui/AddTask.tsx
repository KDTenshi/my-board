import { useState, type FC } from "react";

import style from "./AddTask.module.css";
import { useAppDispatch } from "../../../app/store/appStore";
import { addTask } from "../../../shared/store/boardSlice";

interface AddTaskProps {
  columnId: string;
}

const AddTask: FC<AddTaskProps> = ({ columnId }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [value, setValue] = useState("");

  const dispatch = useAppDispatch();

  const handleBlur = () => {
    setIsAdding(false);
    setValue("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = value.trim();

    if (!title) return;

    dispatch(addTask({ columnId, title }));

    setIsAdding(false);
    setValue("");
  };

  return (
    <div className={style.Add}>
      {isAdding && (
        <form className={style.Form} onSubmit={handleSubmit}>
          <input
            type="text"
            className={style.Input}
            autoFocus
            onBlur={handleBlur}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </form>
      )}
      {!isAdding && (
        <button className={style.Button} onClick={() => setIsAdding(true)}>
          Add task
        </button>
      )}
    </div>
  );
};

export default AddTask;
