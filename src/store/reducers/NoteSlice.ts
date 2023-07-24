import { INote } from "../../types/INote";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NoteState {
  notes: INote[];
}

interface DeleteTagParams {
  id: number;
  tag: string;
}

const initialState: NoteState = {
  notes: JSON.parse(localStorage.getItem("notes") || "[]"),
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    addNote(state, action: PayloadAction<Omit<INote, "id">>) {
      state.notes.push({ ...action.payload, id: Math.random() });
    },
    deleteNote(state, action: PayloadAction<INote>) {
      state.notes = state.notes.filter(
        (note) => note.note !== action.payload.note
      );
    },
    editNote(state, action: PayloadAction<INote>) {
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) return action.payload;
        return note;
      });
    },
    deleteTag(state, action: PayloadAction<DeleteTagParams>) {
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return {
            ...note,
            tags: note.tags.filter((tag) => tag !== action.payload.tag),
          };
        }
        return note;
      });
    },
  },
});

export const { addNote, deleteNote, editNote, deleteTag } = noteSlice.actions;
export default noteSlice.reducer;
