import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";

import "./AddNote.scss";

function AddNote({ handleAddNote }) {
  const totalWord = 200;
  const [addNote, setAddNote] = useState("");
  const [title, setTitle] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [info, setInfoUrl] = useState("");

  const handleNote = (event) => {
    if (addNote.trim().length > 0) {
      const newNote = {
        note: addNote,
        title,
        iconUrl,
        link: info,
      };
      handleAddNote(newNote);
      setIconUrl("");
      setInfoUrl("");
      setAddNote("");
      setTitle("");
    }
  };

  const handleSetInput = (e) => {
    if (addNote.length < 200) {
      setAddNote(e.target.value);
    }
  };

  return (
    <div className="note new-note">
      <input
        type="text"
        placeholder="Enter Title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <textarea rows={8} cols={10} value={addNote} onChange={handleSetInput} />
      <input
        type="text"
        placeholder="Enter Icon Url"
        onChange={(e) => setIconUrl(e.target.value)}
        value={iconUrl}
      />
      <input
        type="text"
        placeholder="Enter Information Url"
        onChange={(e) => setInfoUrl(e.target.value)}
        value={info}
      />
      <div className="note-footer">
        <small className="note-footer">{totalWord - addNote.length}</small>
        <button onClick={handleNote} className="btn">
          save
        </button>
      </div>
    </div>
  );
}

export default AddNote;
