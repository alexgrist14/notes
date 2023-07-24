import React, { ChangeEvent, ReactElement, useEffect, useRef, useState } from "react";
import { INote } from "../types/INote";
import { useAppDispatch } from "../hooks/redux";
import { deleteNote, editNote } from "../store/reducers/NoteSlice";
import Tag from "./Tag";

interface NoteProps {
  note: INote;
}

const Note = ({ note }: NoteProps): ReactElement => {
  const [isEdit, setIsEdit] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node) && isEdit) {
          setIsEdit(false);
        }
      };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isEdit]);

  const removeNote = (note: INote) => {
    dispatch(deleteNote(note));
  };

  const toggleEditor = () => {
    setIsEdit((prevState) => !prevState);
  };

  const setEditedNote = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(editNote({ ...note, note: e.target.value }));
  };
  return (
    <div className="box note" ref={ref}>
      <div>
        {isEdit ? (
          <input type="text" value={note.note} onChange={setEditedNote} />
        ) : (
          note.note
        )}
        {note.tags.map((tag) => (
          <Tag tag={tag} isEdit={isEdit} id={note.id} />
        ))}
      </div>

      <div className="action-btn__container">
        <button className="button" onClick={() => removeNote(note)}>
          ✖
        </button>
        <button className="button" onClick={toggleEditor}>
          ✎
        </button>
      </div>
    </div>
  );
};

export default Note;
