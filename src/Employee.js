import React, { Component, useState } from "react";
import { Button } from "@material-ui/core";
import "./Employee.css";
import Payment from "./payment/Payment";
import Modal from "react-modal";

const Employee = (props) => {
  const [openPaymentModal, setOpenPaymentModal] = useState(false);

  const handleCloseRegisterModal = () => setOpenPaymentModal(false);

  return (
    <>
      <div className="employee_list" key={props.name}>
        <img className="worker" width={125} src={props.iconUrl} />
        <div style={{ textAlign: "left" }}>
          <h3>
            <i>Employee Name : </i>
            {props.name}
          </h3>
          <h4>
            <i>Employee Rating : </i>
            {props.rating}
          </h4>
          <h4>
            <i>Employee Cost : </i>
            {props.cost}
          </h4>
          <h4>
            <i>Employee Phone Number : </i>
            {props.phone}
          </h4>
          <h4>
            <i>Employee Email : </i>
            {props.email}
          </h4>
        </div>
        <Button
          onClick={(e) => setOpenPaymentModal(true)}
          variant="contained"
          style={{ marginLeft: "auto", marginRight: "8px", height: "50px" }}
        >
          Book
        </Button>
      </div>

      <Modal
        ariaHideApp={false}
        isOpen={openPaymentModal}
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
            height: "30%",
            width: "40%",
          },
        }}
      >
        <Payment order={props} />
      </Modal>
    </>
  );
};

export default Employee;
