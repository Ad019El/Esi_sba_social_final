import React from "react";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import "./ListModal.css";
import { Form } from "react-bootstrap";

const ListModal = (props) => {
  const { show, onHide, element, articleType } = props;

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Body className="text-center py-4">
          <>
            <h4 className="title mb-3">{articleType}</h4>
            <span className="content">
              <Form.Group>
                <Form.Label className="subtitle">Title:</Form.Label>
                <h5 className="text">{element.titre}</h5>
              </Form.Group>
              <Form.Group>
                <Form.Label className="subtitle">Description:</Form.Label>
                {articleType != "article" ? (
                  <p className="text">{element.description}</p>
                ) : (
                  <p className="text">{element.designation}</p>
                )}
              </Form.Group>
            </span>
          </>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ListModal;
