import React from "react";
import Note from "../Note/Note";
import AddNote from "../AddNote/AddNote";

import "./Dashboard.scss";

function Dashboard({ notes, addNote ,deleteNote,dragTodos}) {
  console.log("This is Notes Data", notes);
  return (
    <div className="notes-list">
      {notes.map((note, id) => (
        <Note
          key={id}
          title={note.title}
          iconUrl={note.iconUrl}
          infoUrl={note.link}
          note={note.note}
          id={note._id}
          handleDeleteTodo = {deleteNote}
          date = {note.date}
          dragTodos = {dragTodos}
        />
      ))}
      <AddNote handleAddNote={addNote} />
    </div>
  );
}

export default Dashboard;
