import React from "react";


function SearchForm(props) {
  return (
      <>
        <div className="searchbox">
        <input
            onChange={props.handleInputChange}
            value={props.search}
            name="search"
            type="text"
            className="form-control"
            placeholder="Search for a Employee"
            id="search"
        />
        <button onClick={props.handleFormSubmit} className="btn btn-primary mt-3">
          Search
        </button>
      </div>
    </>
  );
  
};

export default SearchForm;
