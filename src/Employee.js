import React, { Component, useState } from "react";
import { Button } from "@material-ui/core";
import Payment from './payment/Payment'
import Modal from "react-modal";

const Employee = (props) => {

  // const [pay, setPay] = useState(false)
  const [openRegistrationModal, setOpenRegistrationModal] = useState(false);

  const handleCloseRegisterModal = () => setOpenRegistrationModal(false);

  return (
    <>
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
          onClick={(e) => setOpenRegistrationModal(true)}
          variant="contained"
          style={{ marginLeft: "auto", marginRight: "8px", height: "50px" }}
        >
          Book
        </Button>
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
            height: "30%",
            width: "40%",
          },
        }}
      >
      <Payment cost={(parseInt(props.cost)*100)} />
      </Modal>
    </>
  );
};

export default Employee;

/**
 * Topics you might also like:
 *      - Object Destructuring -> https://dmitripavlutin.com/javascript-object-destructuring/
 *      - Template Literals -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
 *      - Rendering Elements -> https://reactjs.org/docs/rendering-elements.html
 */
