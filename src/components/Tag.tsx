import { ReactElement } from "react";
import { deleteTag } from "../store/reducers/NoteSlice";
import { useAppDispatch } from "../hooks/redux";

interface NoteProps {
  tag: string;
  isEdit: boolean;
  id: number;
}

const Tag = ({ tag, isEdit, id }: NoteProps): ReactElement => {
  const dispatch = useAppDispatch();

  const removeTag = () => {
    dispatch(deleteTag({ tag, id }));
  };

  return (
    <>
      <span className="note-tag tag is-warning ml-1 mr-1">
        {tag}
        {isEdit && (
          <button className="delete-tag__btn" onClick={removeTag}>
            <div>✖</div>
          </button>
        )}
      </span>
    </>
  );
};

export default Tag;
