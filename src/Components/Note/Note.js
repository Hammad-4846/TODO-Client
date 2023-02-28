import React from "react";
import { MdDeleteForever } from "react-icons/md";
import logo from "../../Assets/ebay_PNG22.png";

import "./Note.scss";

function Note({
  title,
  note,
  iconUrl,
  infoUrl,
  date,
  id,
  handleDeleteTodo,
  dragTodos,
}) {
  console.log(typeof id);
  const deleteTask = () => {
    handleDeleteTodo(id);
  };
  const handleTodoDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
  };

  const handleTodoDragOver = (e) => {
    e.preventDefault();
  };

  const handleTodoDrop = (e, id) => {
    e.preventDefault();
    dragTodos(e, id);
  };
  return (
    <div
      draggable
      onDragStart={(e) => handleTodoDragStart(e, id)}
      onDragOver={handleTodoDragOver}
      onDrop={(e) => handleTodoDrop(e, id)}
      className="note"
    >
      <div className="note-info">
        <h3>{title}</h3>
        <div className="info-icon">
          <img src={iconUrl ? iconUrl : logo} alt="icon-" />
          <span>{note}</span>
        </div>
        <a target="_blank" href={infoUrl} rel="noreferrer">
          For More Info Please Click
        </a>
      </div>
      <div className="note-footer">
        <small className="note-footer">{date.slice(0, 10)}</small>
        <MdDeleteForever
          onClick={deleteTask}
          className="delete-icom"
          size="1.3em"
        />
      </div>
    </div>
  );
}

export default Note;
