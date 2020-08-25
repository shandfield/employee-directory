import React from "react";

import "../styles/DataTable.css";


const DataTable = ({headings, handleSort}) => {
  

  return (
<>
  <thead>
    <tr>
      {headings.map(({ name, width }) => {
        return (
          <th
            className="col"
            key={name}
            style={{ width }}
            onClick={() => {
              
              handleSort(name);
            }}
          >
            {name}
            <span onClick = {handleSort} className="pointer"></span>
          </th>
        );
      })}
    </tr>
  </thead>
   </>
  );
}

export default DataTable;