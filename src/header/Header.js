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
import { type } from "@testing-library/user-event/dist/type";

const Header = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userLoginFormValues, setUserLoginFormValues] = useState({
    email: "",
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

  //Extra Form Validation Part: Francis Alex
  const [correctname, setCorrectName] = useState(true);
  const [correctcity, setCorrectCity] = useState(true);
  const [correctcountry, setCorrectCountry] = useState(true);
  const [correctprovince, setCorrectProvince] = useState(true);
  const [correctpostalcode, setCorrectPostalcode] = useState(true);
  const [correctphone, setCorrectPhone] = useState(true);
  const [correctemail, setCorrectEmail] = useState(true);
  //End Part

  const onSubmitLogin = (e) => {
    e.preventDefault();
    setUserNmReqd(userLoginFormValues.email === "" ? true : false);
    setLoginPwdReqd(userLoginFormValues.password === "" ? true : false);
    let hashedPassword = "";
    if (!loginPwdReqd) {
      hashedPassword = bcrypt.hashSync(
        userLoginFormValues.password,
        "$2a$10$CwTycUXWue0Thq9StjUM0u"
      );
    }
    fetch(process.env.REACT_APP_LOGIN, {
      method: "POST",
      headers: {
        "Accept":  "application/json; charset=utf-8",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
      },
      body: JSON.stringify({
        email: userLoginFormValues.email,
        password: hashedPassword,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response[0].Status)
        if (response[0].Status === "User Login Successful") {
           setLoggedIn(true);
           props.isLoggedIn(true);
           handleCloseRegisterModal();
           console.log("Login " + response);
           localStorage.setItem("email", userLoginFormValues.email);
           localStorage.setItem("name",response[0].name);
         }
      })
      .catch(function (error) {
        console.error(error);
      });
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

    //Extra Form Validation Functions Part: Francis Alex

    const reg_em = RegExp(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g);

    const reg_cit = RegExp(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g);

    const reg_pro = RegExp(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g);

    const reg_count = RegExp(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g);

    const reg_pc = RegExp(
      /^((\d{5}-?\d{4})|(\d{5})|([A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d))$/g
    );
    const reg_phone = RegExp(
      /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/g
    );
    const reg_email = RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/g
    );

    if (reg_em.test(userRegisterFormValues.name) == false) {
      setCorrectName(false);
    } else {
      setCorrectName(true);
    }
    if (reg_cit.test(userRegisterFormValues.city) == false) {
      setCorrectCity(false);
    } else {
      setCorrectCity(true);
    }
    if (reg_pro.test(userRegisterFormValues.province) == false) {
      setCorrectProvince(false);
    } else {
      setCorrectProvince(true);
    }
    if (reg_count.test(userRegisterFormValues.country) == false) {
      setCorrectCountry(false);
    } else {
      setCorrectCountry(true);
    }

    if (reg_pc.test(userRegisterFormValues.postalCode) == false) {
      setCorrectPostalcode(false);
    } else {
      setCorrectPostalcode(true);
    }

    if (reg_phone.test(userRegisterFormValues.phone) == false) {
      setCorrectPhone(false);
    } else {
      setCorrectPhone(true);
    }

    if (reg_email.test(userRegisterFormValues.email) == false) {
      setCorrectEmail(false);
    } else {
      setCorrectEmail(true);
    }

    //Ending

    let hashedPassword = "";
    console.log(registerPwdReqd);
    if (!registerPwdReqd) {
      hashedPassword = userRegisterFormValues.password;
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

    console.log(nameReqd,emailReqd,addrReqd,cityReqd,countryReqd,postalCodeReqd,provinceReqd,phoneReqd,registerPwdReqd);
    console.log("correct name",correctname);
    console.log("correct city",correctcity);
    console.log("correct province",correctprovince);
    console.log("correct country",correctcountry);
    console.log("correct po",correctpostalcode);
    console.log("correct email",correctemail);
    console.log("correct phone",correctphone);
    

    if (
      userRegisterFormValues.name !='' &&
      userRegisterFormValues.email !='' &&
      userRegisterFormValues.phone !='' &&
      hashedPassword !='' &&
      userRegisterFormValues.address !='' &&
      userRegisterFormValues.city !='' &&
      userRegisterFormValues.province !='' &&
      userRegisterFormValues.postalCode !='' &&
      userRegisterFormValues.country !='' &&
      correctname &&
      correctcity &&
      correctcountry &&
      correctprovince &&
      correctpostalcode &&
      correctphone &&
      correctemail
    ) {
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
          if (response[0].Status === "User Signup Successful")
          {
          setSuccessRegistration(true);
          }
        });
    }
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
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                type="text"
                value={userLoginFormValues.email}
                onChange={(e) => {
                  setUserLoginFormValues({
                    ...userLoginFormValues,
                    email: e.target.value,
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
              {!correctname && !nameReqd && (
                <FormHelperText>
                  <span className="red">
                    Invalid Name: Name should not contain numbers and special
                    symbols
                  </span>
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
              {!correctemail && !emailReqd && (
                <FormHelperText>
                  <span className="red">
                    Invalid Email: Enter Correct Email Address
                  </span>
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
              <InputLabel htmlFor="address">Street</InputLabel>
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
              {!correctcity && !cityReqd && (
                <FormHelperText>
                  <span className="red">
                    Invalid City: City should not contain numbers and special
                    symbols
                  </span>
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
              {!correctprovince && !provinceReqd && (
                <FormHelperText>
                  <span className="red">
                    Invalid Province: Province should not contain numbers and
                    special symbols
                  </span>
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
              {!correctcountry && !countryReqd && (
                <FormHelperText>
                  <span className="red">
                    Invalid Country: Country should not contain numbers and
                    special symbols
                  </span>
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
              {!correctpostalcode && !postalCodeReqd && (
                <FormHelperText>
                  <span className="red">
                    Invalid Postal Code: Please Enter Valid Postal Code
                  </span>
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
              {!correctphone && !phoneReqd && (
                <FormHelperText>
                  <span className="red">
                    Invalid Phone Number: Please Enter Valid Phone Number
                  </span>
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
