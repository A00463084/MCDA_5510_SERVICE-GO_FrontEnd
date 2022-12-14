import React, { Fragment, useState, useEffect, useRef } from "react";
import "./Home.css";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import employeesData from "../data/employees-data";
import Employee from "../Employee";
import logo from "../Homepage_design.jpg";
import Profile from "./Profile.js";

const Home = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(props.loggedIn);
  const [profile, showUserProfile] = useState(props.showProfile);
  const [open, setOpen] = useState(false);
  const [list, showList] = useState(false);
  const [employees, setEmployees] = useState(employeesData);
  const anchorRef = useRef(null);
  const [userInputs, setUserInputs] = useState({
    category: "",
    date: "",
    timeslot: "",
  });
  useEffect(() => {
    setIsLoggedIn(props.loggedIn);
  }, [props.loggedIn]);

  useEffect(() => {
    showUserProfile(props.showProfile);
  }, [props.showProfile]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
    showList(false);
  };

  const submitUserInput = (e) => {
    console.log(userInputs);
    fetch(process.env.REACT_APP_DOMAIN + "Main/employeelist", {
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
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  const openPlumbers = (e) => {
    let filteredEmployees = employeesData.filter((employee) => {
      return employee.category === "Plumber";
    });
    setEmployees(filteredEmployees);
    setOpen(false);
    showList(true);
  };

  const openElectricians = (e) => {
    let filteredEmployees = employeesData.filter((employee) => {
      return employee.category === "Electrician";
    });
    setEmployees(filteredEmployees);
    setOpen(false);
    showList(true);
  };

  const openPainters = (e) => {
    let filteredEmployees = employeesData.filter((employee) => {
      return employee.category === "Painter";
    });
    setEmployees(filteredEmployees);
    setOpen(false);
    showList(true);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

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
          <h1>Welcome User</h1>
          <label htmlFor="category">Choose a Category:</label>
          <select
            name="category"
            id="category"
            onChange={(e) =>
              setUserInputs({ ...userInputs, category: e.target.value })
            }
          >
            <option value="plumbing">Plumbing</option>
            <option value="electrician">Electrician</option>
            <option value="painting">Painting</option>
            <option value="cleaning">Cleaning</option>
          </select>
          <label htmlFor="date">Choose a Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            onChange={(e) => {
              setUserInputs({ ...userInputs, date: e.target.value });
            }}
          />
          <label htmlFor="timeslot">Choose a Time Slot:</label>
          <select
            name="timeslot"
            id="timeslot"
            onChange={(e) =>
              setUserInputs({ ...userInputs, timeslot: e.target.value })
            }
          >
            <option>10-11</option>
            <option>11-12</option>
            <option>12-1</option>
            <option>1-2</option>
            <option>2-3</option>
            <option>3-4</option>
            <option>4-5</option>
            <option>5-6</option>
          </select>
          <Button
            onClick={(e) => submitUserInput(e)}
            variant="contained"
            style={{ marginLeft: "auto", marginRight: "8px", height: "50px" }}
          >
            Submit
          </Button>
          {/* <Stack spacing={2}>
            <div>
              <Button
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? "composition-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              >
                Dashboard
              </Button>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom-start"
                          ? "left top"
                          : "left bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                          onKeyDown={handleListKeyDown}
                        >
                          <MenuItem onClick={openPlumbers}>Plumbing</MenuItem>
                          <MenuItem onClick={openElectricians}>
                            Electrical
                          </MenuItem>
                          <MenuItem onClick={openPainters}>Painting</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          </Stack> */}
          {list === true && employees.length > 0 ? (
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
                    iconUrl={employee.iconUrl}
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
