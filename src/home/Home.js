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
import employees from "../data/employees-data";
import Employee from "../Employee";

const Home = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(props.loggedIn);
  const [open, setOpen] = useState(false);
  const [list, showList] = useState(false);
  const anchorRef = useRef(null);
  useEffect(() => {
    setIsLoggedIn(props.loggedIn);
  }, [props.loggedIn]);

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

  const openPlumbers = (e) => {
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
          <h1> Service GO App</h1>
          <h2> Best place to find all sort of repairs </h2>
        </Fragment>
      ) : (
        <div>
          <h1>Welcome User</h1>
          <Stack direction="row" spacing={2}>
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
                          <MenuItem onClick={handleClose}>Electrical</MenuItem>
                          <MenuItem onClick={handleClose}>Furniture</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          </Stack>
          {list === true ? (
            <div>
              {employees.map((employee) => {
                return (
                  <Employee
                    key={employee.name}
                    name={employee.name}
                    description={employee.description}
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
