import React, { Component } from "react";
import { Button } from "@material-ui/core";

const Employee = (props) => {
  const bookEmployee = (e) => {
    console.log("Employee Booked");
  };

  return (
    <div className="employee-container" key={props.name}>
      <img width={125} src={props.iconUrl} />
      <div style={{ textAlign: "left" }}>
        <h3>{props.name}</h3>
        <h4>{props.rating}</h4>
        <h4>{props.cost}</h4>
        <h4>{props.phone}</h4>
        <h4>{props.email}</h4>
      </div>
      <Button
        onClick={(e) => bookEmployee(e)}
        variant="contained"
        style={{ marginLeft: "auto", marginRight: "8px", height: "50px" }}
      >
        Book
      </Button>
    </div>
  );
};

export default Employee;

/**
 * Topics you might also like:
 *      - Object Destructuring -> https://dmitripavlutin.com/javascript-object-destructuring/
 *      - Template Literals -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
 *      - Rendering Elements -> https://reactjs.org/docs/rendering-elements.html
 */