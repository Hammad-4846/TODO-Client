import React from "react";
import { MdSearch } from "react-icons/md";

import "./Search.scss";

function Search({ handleSearchNote }) {
  return (
    <div className="search">
      <MdSearch size="1.3em" className="search-icon" />
      <input
        onChange={(e) => handleSearchNote(e.target.value)}
        type="text"
        placeholder="type to search ..."
      />
    </div>
  );
}

export default Search;
