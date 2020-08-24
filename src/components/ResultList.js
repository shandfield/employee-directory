import React from "react";


function ResultList(props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th></th>
          <th OnClick = {props.sortByName}>Name</th>
          <th>Email</th>
          <th>Phone</th>
         </tr>
      </thead>

      <tbody className = "">
      {props.results.map(result => (
        <tr className= "table">
          <td><img className= "" src= {result.picture.medium} alt= "" /></td>
          <td>{result.name.first + " " + result.name.last}</td>
          <td className="email"><a href={result.email}>{result.email}</a></td>
          <td className="phone"><a href={result.phone}>{result.phone}</a></td>
        </tr>
      ))}
      </tbody>
    </table>
  )
};
export default ResultList;