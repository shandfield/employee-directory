import React from "react";


function ResultList(props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th></th>
          <th OnClick = {props.name}>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>DOB</th>
         </tr>
      </thead>

      <tbody className = "">
      {props.results.map(result => (
        <tr className= "table">
          <td><img className= "img-responsive" src= {result.picture.medium} alt= "" /></td>
          <td className= "align-middle">{result.name.first + " " + result.name.last}</td>
          <td className=" align-middle"><a href={result.email}>{result.email}</a></td>
          <td className=" align-middle"><a href={result.phone}>{result.phone}</a></td>
          <td className=" align-middle"><a href={result.dob.date}>{result.dob.date}</a></td>
        </tr>
      ))}
      </tbody>
    </table>
  )
};
export default ResultList;