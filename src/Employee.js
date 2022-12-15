import React, { Component } from "react";
import { Button } from "@material-ui/core";
import "./Employee.css";


const Employee = (props) => {
  const bookEmployee = (e) => {
    console.log("Employee Booked");
  };

  return (
    <div className="employee_list" key={props.name}>
      <img className="worker" width={125} src={props.iconUrl} />
      <div style={{ textAlign: "left" }}>
        <h3><i>Employee Name : </i>{props.name}</h3>
        <h4><i>Employee Rating : </i>{props.rating}</h4>
        <h4><i>Employee Cost : </i>{props.cost}</h4>
        <h4><i>Employee Phone Number : </i>{props.phone}</h4>
        <h4><i>Employee Email : </i>{props.email}</h4>
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
