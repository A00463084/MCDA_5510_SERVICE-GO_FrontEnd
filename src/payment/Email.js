import { send, init } from "emailjs-com";
import React, { useState, useEffect } from "react";

const serviceId = "service_y9ddtxn";
const templateId = "template_38nkktn";
const userID = "VoRzETGNBRXC9DOMH";

const sendEmail = () => {
  init(userID);
  const toSend = {
    to_name: localStorage.getItem("name"),
    to_email: localStorage.getItem("email"),
    to_date: localStorage.getItem("date"),
    to_time: localStorage.getItem("time"),
    to_employee: localStorage.getItem("emp_name")
  };
  send(serviceId, templateId, toSend)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default { sendEmail };