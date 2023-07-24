import { FormEvent, ReactElement, useState } from "react";
import { useAppDispatch } from "../hooks/redux";
import { addNote } from "../store/reducers/NoteSlice";
import NotesList from "./NotesList";

const InputForm = (): ReactElement => {
  const [isSearchForm, setIsSearchForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [textInputValue, setTextInputValue] = useState("");
  const [note, setNote] = useState("");
  const [tags, setTags] = useState([]);
  const dispatch = useAppDispatch();

  const parser = (text: string): void => {
    const tags: any = text
      .split(" ")
      .filter((item) => {
        if (item.includes("#")) {
          return item;
        }
      })
      .map((tag) => {
        if (tag.includes("#")) {
          const allTags = tag.split("#").splice(1);
          if (allTags.includes("")) {
            return allTags.filter((tag) => tag !== "");
          } else {
            return allTags;
          }
        }
      })
      .join(",")
      .split(",")
      .filter((tag) => tag !== "");
    setTags(tags);
  };
  const removeTags = (str: string): string => {
    const result = str.replace(/#[^ ]*/g, "");
    return result.trim();
  };

  const clearAllStates = (): void => {
    setNote("");
    setTags([]);
    setTextInputValue("");
  };

  const handleNoteClick = (): void => {
    if (isSearchForm) {
      setIsSearchForm(false);
      clearAllStates();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (textInputValue === "" || isSearchForm) {
      clearAllStates();
    } else {
      dispatch(addNote({ note, tags: tags }));
      clearAllStates();
    }
  };

  return (
    <>
      <div className="container mt-5">
        <form className="form" onSubmit={handleSubmit}>
          <textarea
            value={textInputValue}
            onChange={(e) => {
              parser(e.target.value);
              setTextInputValue(e.target.value);
              setNote(removeTags(e.target.value));
              isSearchForm && setSearchQuery(e.target.value);
            }}
            className="hero-body textarea is-primary"
            placeholder="Write your note."
          ></textarea>
          <button
            className={`button ${!isSearchForm && "is-primary"}`}
            onClick={handleNoteClick}
          >
            Add note
          </button>
          <button
            className={`button ${isSearchForm && "is-primary"}`}
            onClick={() => setIsSearchForm(true)}
          >
            Search by tags
          </button>
          {tags.length !== 0 && !isSearchForm ? (
            <div className="box">
              {tags.map((tag, i) => {
                return (
                  <span key={i} className="tag is-link ml-1 mr-1">
                    {tag}
                  </span>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
      <NotesList search={searchQuery} isSearchForm={isSearchForm} />
    </>
  );
};

export default InputForm;
