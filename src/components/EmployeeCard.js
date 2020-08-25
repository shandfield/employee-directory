import React from "react";

function EmployeeCard(props) {
  return (
    <tr>
        <th scope= "row"><img alt= {props.picture} src= {props.picture} /></th>
        <td className= "col-md-3"> {props.firstName} {props.lastName}</td>
        <td className= "col-md-3"> {props.phone}</td>
        <td className= "col-md-3"> {props.email}</td>
        <td className= "col-md-3"> {props.dob}</td>
    </tr>
    );
}

export default EmployeeCard;