import React, { Fragment, useState } from "react";
import { Button } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import "./Header.css";
import Tab from "@material-ui/core/Tab";
import Modal from "react-modal";
import Tabs from "@material-ui/core/Tabs";
import bcrypt from "bcryptjs";
import { Link } from "react-router-dom";

const Header = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userLoginFormValues, setUserLoginFormValues] = useState({
    username: "",
    password: "",
  });
  const [userRegisterFormValues, setUserRegisterFormValues] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    province: "",
    country: "",
    postalCode: "",
    phone: "",
    password: "",
  });
  const [userNmReqd, setUserNmReqd] = useState(false);
  const [loginPwdReqd, setLoginPwdReqd] = useState(false);
  const [openRegistrationModal, setOpenRegistrationModal] = useState(false);
  const [ModalTab, setModalTab] = useState(0);
  const handleCloseRegisterModal = () => setOpenRegistrationModal(false);
  const [nameReqd, setNameReqd] = useState(false);
  const [emailReqd, setEmailReqd] = useState(false);
  const [addrReqd, setAddrReqd] = useState(false);
  const [cityReqd, setCityReqd] = useState(false);
  const [countryReqd, setCountryReqd] = useState(false);
  const [postalCodeReqd, setPostalCodeReqd] = useState(false);
  const [provinceReqd, setProvinceReqd] = useState(false);
  const [registrationSuccess, setSuccessRegistration] = useState(false);
  const [phoneReqd, setPhoneReqd] = useState(false);
  const [registerPwdReqd, setRegisterPwdReqd] = useState(false);
  const [profile, showUserProfile] = useState(false);

  const onSubmitLogin = (e) => {
    e.preventDefault();
    setUserNmReqd(userLoginFormValues.username === "" ? true : false);
    setLoginPwdReqd(userLoginFormValues.password === "" ? true : false);
    if (
      userLoginFormValues.username !== "" &&
      userLoginFormValues.password !== ""
    ) {
      setLoggedIn(true);
      props.isLoggedIn(true);
      const hashedPassword = bcrypt.hashSync(
        userLoginFormValues.password,
        "$2a$10$CwTycUXWue0Thq9StjUM0u"
      );
      console.log(hashedPassword);
    }
  };

  const handleTabChange = (event, newValue) => {
    setModalTab(newValue);
  };

  const onRegistration = (e) => {
    e.preventDefault();
    setNameReqd(userRegisterFormValues.name === "" ? true : false);
    setEmailReqd(userRegisterFormValues.email === "" ? true : false);
    setAddrReqd(userRegisterFormValues.address === "" ? true : false);
    setCityReqd(userRegisterFormValues.city === "" ? true : false);
    setCountryReqd(userRegisterFormValues.country === "" ? true : false);
    setPostalCodeReqd(userRegisterFormValues.postalCode === "" ? true : false);
    setProvinceReqd(userRegisterFormValues.province === "" ? true : false);
    setRegisterPwdReqd(userRegisterFormValues.password === "" ? true : false);
    setPhoneReqd(userRegisterFormValues.phone === "" ? true : false);
    let hashedPassword = "";
    console.log(registerPwdReqd);
    if (!registerPwdReqd) {
      hashedPassword = bcrypt.hashSync(
        userRegisterFormValues.password,
        "$2a$10$CwTycUXWue0Thq9StjUM0u"
      );
    }
    let signupData = JSON.stringify({
      name: userRegisterFormValues.name,
      email: userRegisterFormValues.email,
      phone: userRegisterFormValues.phone,
      password: hashedPassword,
      address: userRegisterFormValues.address,
      city: userRegisterFormValues.city,
      province: userRegisterFormValues.province,
      postal_code: userRegisterFormValues.postalCode,
      country: userRegisterFormValues.country,
    });
    console.log(signupData, process.env.REACT_APP_REGISTER);
    fetch(process.env.REACT_APP_REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: signupData,
    })
      .then((response) => response.json())
      .then((response) => {
        setSuccessRegistration(response.status === "ACTIVE" ? true : false);
      });
  };

  const logout = (e) => {
    e.preventDefault();
    setLoggedIn(false);
    props.isLoggedIn(false);
  };

  const displayUserProfile = (e) => {
    e.preventDefault();
    showUserProfile(true);
    props.showProfile(true);
  };
  const goBack = (e) => {
    e.preventDefault();
    props.showProfile(false);
    showUserProfile(false);
  };
  return (
    <Fragment>
      <div className="header">
        {/*<img className="app-logo" src={Logo} alt="logo" />
         <Button variant="contained" style={{ marginLeft: "auto" }}>
        Login
      </Button> */}
        {loggedIn && !profile ? (
          <div>
            <Button
              onClick={(e) => logout(e)}
              variant="contained"
              style={{ marginLeft: "auto", marginRight: "8px" }}
            >
              Logout
            </Button>
            <Button
              onClick={(e) => displayUserProfile(e)}
              variant="contained"
              style={{ marginLeft: "auto", marginRight: "auto" }}
            >
              Profile
            </Button>
          </div>
        ) : loggedIn && profile ? (
          <div>
            <Button
              onClick={(e) => logout(e)}
              variant="contained"
              style={{ marginLeft: "auto", marginRight: "8px" }}
            >
              Logout
            </Button>
            <Button
              onClick={(e) => goBack(e)}
              variant="contained"
              style={{ marginLeft: "auto", marginRight: "auto" }}
            >
              Back
            </Button>
          </div>
        ) : (
          <Button
            onClick={(e) => setOpenRegistrationModal(true)}
            variant="contained"
            style={{ marginLeft: "auto" }}
          >
            Login
          </Button>
        )}
      </div>
      <Modal
        ariaHideApp={false}
        isOpen={openRegistrationModal}
        contentLabel="Login"
        onRequestClose={handleCloseRegisterModal}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <Tabs
          style={{ marginBottom: "20px" }}
          value={ModalTab}
          onChange={handleTabChange}
          variant="fullWidth"
        >
          <Tab disableFocusRipple label="LOGIN" />
          <Tab disableFocusRipple label="REGISTER" />
        </Tabs>
        {ModalTab === 0 && (
          <div style={{ padding: 0, textAlign: "center" }}>
            <FormControl required>
              <InputLabel htmlFor="username">Email</InputLabel>
              <Input
                id="username"
                type="text"
                value={userLoginFormValues.username}
                onChange={(e) => {
                  setUserLoginFormValues({
                    ...userLoginFormValues,
                    username: e.target.value,
                  });
                }}
              />
              {userNmReqd && (
                <FormHelperText>
                  <span className="red">required</span>
                </FormHelperText>
              )}
            </FormControl>
            <br />
            <br />
            <FormControl required>
              <InputLabel htmlFor="loginPassword">Password</InputLabel>
              <Input
                id="loginPassword"
                type="password"
                value={userLoginFormValues.password}
                onChange={(e) => {
                  setUserLoginFormValues({
                    ...userLoginFormValues,
                    password: e.target.value,
                  });
                }}
              />
              {loginPwdReqd && (
                <FormHelperText>
                  <span className="red">required</span>
                </FormHelperText>
              )}
            </FormControl>
            <br />
            <br />
            {loggedIn === true && (
              <FormControl>
                <span className="successText">Login Successful!</span>
              </FormControl>
            )}
            <br />
            <br />
            <Button variant="contained" color="primary" onClick={onSubmitLogin}>
              LOGIN
            </Button>
          </div>
        )}

        {ModalTab === 1 && (
          <div style={{ padding: 0, textAlign: "center" }}>
            <FormControl required>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                id="name"
                type="text"
                value={userRegisterFormValues.name}
                onChange={(e) => {
                  setUserRegisterFormValues({
                    ...userRegisterFormValues,
                    name: e.target.value,
                  });
                }}
              />
              {nameReqd && (
                <FormHelperText>
                  <span className="red">required</span>
                </FormHelperText>
              )}
            </FormControl>
            <br />
            <FormControl required>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                type="text"
                value={userRegisterFormValues.email}
                onChange={(e) => {
                  setUserRegisterFormValues({
                    ...userRegisterFormValues,
                    email: e.target.value,
                  });
                }}
              />
              {emailReqd && (
                <FormHelperText>
                  <span className="red">required</span>
                </FormHelperText>
              )}
            </FormControl>
            <br />
            <FormControl required>
              <InputLabel htmlFor="registerPassword">Password</InputLabel>
              <Input
                id="registerPassword"
                type="password"
                value={userRegisterFormValues.registerPassword}
                onChange={(e) => {
                  setUserRegisterFormValues({
                    ...userRegisterFormValues,
                    password: e.target.value,
                  });
                }}
              />
              {registerPwdReqd && (
                <FormHelperText>
                  <span className="red">required</span>
                </FormHelperText>
              )}
            </FormControl>
            <br />
            <FormControl required>
              <InputLabel htmlFor="address">Address</InputLabel>
              <Input
                id="address"
                type="text"
                value={userRegisterFormValues.address}
                onChange={(e) => {
                  setUserRegisterFormValues({
                    ...userRegisterFormValues,
                    address: e.target.value,
                  });
                }}
              />
              {addrReqd && (
                <FormHelperText>
                  <span className="red">required</span>
                </FormHelperText>
              )}
            </FormControl>
            <br />
            <FormControl required>
              <InputLabel htmlFor="city">City</InputLabel>
              <Input
                id="city"
                type="text"
                value={userRegisterFormValues.city}
                onChange={(e) => {
                  setUserRegisterFormValues({
                    ...userRegisterFormValues,
                    city: e.target.value,
                  });
                }}
              />
              {cityReqd && (
                <FormHelperText>
                  <span className="red">required</span>
                </FormHelperText>
              )}
            </FormControl>
            <br />
            <FormControl required>
              <InputLabel htmlFor="province">Province</InputLabel>
              <Input
                id="province"
                type="text"
                value={userRegisterFormValues.province}
                onChange={(e) => {
                  setUserRegisterFormValues({
                    ...userRegisterFormValues,
                    province: e.target.value,
                  });
                }}
              />
              {provinceReqd && (
                <FormHelperText>
                  <span className="red">required</span>
                </FormHelperText>
              )}
            </FormControl>
            <br />
            <FormControl required>
              <InputLabel htmlFor="country">Country</InputLabel>
              <Input
                id="country"
                type="text"
                value={userRegisterFormValues.country}
                onChange={(e) => {
                  setUserRegisterFormValues({
                    ...userRegisterFormValues,
                    country: e.target.value,
                  });
                }}
              />
              {countryReqd && (
                <FormHelperText>
                  <span className="red">required</span>
                </FormHelperText>
              )}
            </FormControl>
            <br />
            <FormControl required>
              <InputLabel htmlFor="postalCode">Postal Code</InputLabel>
              <Input
                id="postalCode"
                type="text"
                value={userRegisterFormValues.postalCode}
                onChange={(e) => {
                  setUserRegisterFormValues({
                    ...userRegisterFormValues,
                    postalCode: e.target.value,
                  });
                }}
              />
              {postalCodeReqd && (
                <FormHelperText>
                  <span className="red">required</span>
                </FormHelperText>
              )}
            </FormControl>
            <br />
            <FormControl required>
              <InputLabel htmlFor="phone">Contact No.</InputLabel>
              <Input
                id="phone"
                type="number"
                value={userRegisterFormValues.phone}
                onChange={(e) => {
                  setUserRegisterFormValues({
                    ...userRegisterFormValues,
                    phone: e.target.value,
                  });
                }}
              />
              {phoneReqd && (
                <FormHelperText>
                  <span className="red">required</span>
                </FormHelperText>
              )}
            </FormControl>
            <br />

            {registrationSuccess === true && (
              <FormControl>
                <span>Registration Successful. Please Login!</span>
              </FormControl>
            )}
            <br />
            <br />
            <Button
              variant="contained"
              color="primary"
              onClick={onRegistration}
            >
              REGISTER
            </Button>
          </div>
        )}
      </Modal>
    </Fragment>
  );
};

export default Header;
