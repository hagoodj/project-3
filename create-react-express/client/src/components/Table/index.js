import React from "react";
import { Container, Row, Col } from "../Grid";

export function Table() {
  return(
  <tr>
      <th scope="col">#</th>
      <th scope="col">Category</th>
      <th scope="col">Item</th>
      <th scope="col">#Items</th>
      <th scope="col">Location</th>
    </tr>
  )
}

export function TableData(props) {
  console.log(props);
  let id = props.id;
  return (

  <tbody>
    <tr>
    <td>{props.id}</td>
      <td>{props.category}</td>
      <td>{props.item}</td>
      <td>{props.itemNumber}</td>
      <td>{props.location}</td>
    </tr>
  </tbody>

  );
}
