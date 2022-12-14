import React, { Fragment, useState, useEffect, useRef } from "react";
import "./Home.css";
import Button from "@mui/material/Button";
import Employee from "../Employee";
import logo from "../Homepage_design.jpg";
import Profile from "./Profile.js";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";

const Home = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(props.loggedIn);
  const [profile, showUserProfile] = useState(props.showProfile);
  const [employees, setEmployees] = useState([]);
  const [userInputs, setUserInputs] = useState({
    category: "",
    date: "",
    timeslot: "",
  });
  const iconUrl =
    "https://upload.wikimedia.org/wikipedia/commons/5/56/Worker_icon.svg";
  useEffect(() => {
    setIsLoggedIn(props.loggedIn);
  }, [props.loggedIn]);

  useEffect(() => {
    showUserProfile(props.showProfile);
  }, [props.showProfile]);

  const submitUserInput = (e) => {
    console.log(userInputs);
    if (
      userInputs.category != "" &&
      userInputs.timeslot != "" &&
      userInputs.category != "Select" &&
      userInputs.timeslot != "Select"
    ) {
      fetch(process.env.REACT_APP_DOMAIN + "employeelist", {
        method: "POST",
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({
          category: userInputs.category,
          date: userInputs.date,
          timeslot: userInputs.timeslot,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setEmployees(data);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  return (
    <div>
      {isLoggedIn === false ? (
        <Fragment>
          <img alt="Homepage Design" src={logo} style={{ minHeight: "100%" }} />
        </Fragment>
      ) : profile === true ? (
        <Profile />
      ) : (
        <div>
          <h1>Welcome {localStorage.getItem("name")}</h1>
          <InputLabel htmlFor="category">Choose a Category: </InputLabel>
          <Select
            name="category"
            style={{ width: 100 }}
            id="category"
            onChange={(e) =>
              setUserInputs({ ...userInputs, category: e.target.value })
            }
          >
            <MenuItem value="plumbing">Plumbing</MenuItem>
            <MenuItem value="electrician">Electrician</MenuItem>
            <MenuItem value="painting">Painting</MenuItem>
            <MenuItem value="cleaning">Cleaning</MenuItem>
          </Select>
          <InputLabel htmlFor="date">Choose a Date:</InputLabel>
          <TextField
            type="date"
            id="date"
            name="date"
            onChange={(e) => {
              setUserInputs({ ...userInputs, date: e.target.value });
            }}
          />
          <InputLabel htmlFor="timeslot">Choose a Time Slot: </InputLabel>
          <Select
            style={{ width: 100 }}
            name="timeslot"
            id="timeslot"
            onChange={(e) =>
              setUserInputs({ ...userInputs, timeslot: e.target.value })
            }
          >
            <MenuItem value="10-11">10-11</MenuItem>
            <MenuItem value="10-11">11-12</MenuItem>
            <MenuItem value="10-11">12-1</MenuItem>
            <MenuItem value="10-11">1-2</MenuItem>
            <MenuItem value="10-11">2-3</MenuItem>
            <MenuItem value="10-11">3-4</MenuItem>
            <MenuItem value="10-11">4-5</MenuItem>
            <MenuItem value="10-11">5-6</MenuItem>
          </Select>
          <br></br>
          <Button
            onClick={(e) => submitUserInput(e)}
            variant="contained"
            style={{ marginLeft: "auto", marginRight: "8px", height: "50px" }}
          >
            Submit
          </Button>
          {employees.length > 0 ? (
            <div>
              {employees.map((employee) => {
                return (
                  <Employee
                    key={employee.name}
                    name={employee.name}
                    rating={employee.rating}
                    cost={employee.cost}
                    phone={employee.phone}
                    email={employee.email}
                    iconUrl={iconUrl}
                  />
                );
              })}
            </div>
          ) : (
            <h2>No list to display</h2>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
