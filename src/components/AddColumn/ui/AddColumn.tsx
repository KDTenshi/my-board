import { useState, type FC } from "react";

import style from "./AddColumn.module.css";
import { useAppDispatch } from "../../../app/store/appStore";
import { addColumn } from "../../../shared/store/boardSlice";

const AddColumn: FC = () => {
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

    dispatch(addColumn({ title }));

    setIsAdding(false);
    setValue("");
  };

  return (
    <div className={style.Add}>
      {isAdding && (
        <div className={style.Column}>
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
          <div className={style.Expander}></div>
        </div>
      )}
      {!isAdding && (
        <button className={style.Button} onClick={() => setIsAdding(true)}>
          Add column
        </button>
      )}
    </div>
  );
};

export default AddColumn;
