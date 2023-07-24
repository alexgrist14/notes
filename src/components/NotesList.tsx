import { ReactElement, useMemo } from "react";
import { useAppSelector } from "../hooks/redux";

import Note from "./Note";

interface SearchProps {
  search: string;
  isSearchForm: boolean;
}

const NotesList = ({ search, isSearchForm }: SearchProps): ReactElement => {
  const { notes } = useAppSelector((state) => state.noteReducer);

  const filterNotes = useMemo(() => {
    return notes.filter((note) => note.tags.some((tag) => tag === search));
  }, [search, notes]);

  return (
    <div className="mt-5">
      {isSearchForm ? (
        filterNotes.length === 0 ? (
          ""
        ) : (
          <div className="notes is-centered container box">
            {filterNotes.map((note) => (
              <Note note={note} />
            ))}
          </div>
        )
      ) : notes.length === 0 ? (
        ""
      ) : (
        <div className="notes is-centered container box">
          {notes.map((note) => (
            <Note note={note} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesList;
