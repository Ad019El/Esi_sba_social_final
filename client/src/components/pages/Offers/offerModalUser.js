import React from "react";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import { connect } from "react-redux";

import { Form } from "react-bootstrap";

const ListModal = (props) => {
  const { show, onHide, offre, type, user } = props;

  function handelRequest() {
    var confirm = window.confirm("Are you sure ?");
    if (confirm) {
      Axios.post("http://localhost:5000/requests/add", {
        category: "offre",
        offer: offre.titre,
        name: user.username,
        email: user.email,
      }).then(
        (response) => {
          console.log("element ajouté");
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Body className="text-left justify-content py-4">
          <>
            <h4 className="title mb-3"></h4>
            <span className="content">
              <Form.Group>
                <Form.Label className="subtitle">Title:</Form.Label>
                <h5 className="text">{offre.titre}</h5>
              </Form.Group>
              <Form.Group>
                <Form.Label className="subtitle">Description:</Form.Label>
                <p className="text">{offre.description}</p>
              </Form.Group>
              <Form.Group>
                <Form.Label className="subtitle">Details:</Form.Label>
                <p className="text">{offre.detail}</p>
              </Form.Group>
              <button className="button d-flex" onClick={handelRequest}>
                Send a request
              </button>
            </span>
          </>
        </Modal.Body>
      </Modal>
    </>
  );
};

const mapSateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapSateToProps)(ListModal);
