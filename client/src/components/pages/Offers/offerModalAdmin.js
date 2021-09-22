import React from "react";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
// import "./ListModal.css";

import { Form } from "react-bootstrap";

const ListModal = (props) => {
  const { show, onHide, offre, type } = props;
  let titleEdit = React.createRef();
  let descriptionEdit = React.createRef();
  let detailEdit = React.createRef();
  let titleAdd = React.createRef();
  let descriptionAdd = React.createRef();
  let detailAdd = React.createRef();

  function handleRemove() {
    var result = window.confirm("Do you want to continue?");
    if (result) {
      Axios.delete("http://localhost:5000/offres/" + offre.id);
      window.location.reload(false);
    }
  }

  function handelSubmitAdd() {
    var confirm = window.confirm("Are you sure ?");
    if (confirm) {
      Axios.post("http://localhost:5000/offres/add/", {
        titre: titleAdd.current.value,
        description: descriptionAdd.current.value,
        detail: detailAdd.current.value,
      }).then(
        (response) => {
          console.log("element ajouté");
          Axios.post("http://localhost:5000/notifications/add", {
            user: "all",
            content:
              "A new offer " + titleAdd.current.value + " has been added",
            title: titleAdd.current.value,
          }).then(
            (response) => {
              console.log("notifications sent");
            },
            (error) => {
              console.log(error);
            }
          );
          window.location.reload(false);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  function handelSubmitEdit() {
    var confirm = window.confirm("Are you sure ?");
    if (confirm) {
      Axios.post("http://localhost:5000/offres/update/" + offre.id, {
        titre: titleEdit.current.value,
        description: descriptionEdit.current.value,
        detail: detailEdit.current.value,
      }).then(
        (response) => {
          console.log("element modifie");
          window.location.reload(false);
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
        <Modal.Body className="text-center py-4">
          {type == "add" ? (
            <>
              <h4 className="title mb-3">Add Offer</h4>
              <span className="content">
                <Form.Group>
                  <Form.Label className="subtitle">Title:</Form.Label>
                  <Form.Control
                    className="input"
                    type="text"
                    name="username"
                    ref={titleAdd}
                    // defaultValue={"write a title"}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="subtitle">Description:</Form.Label>
                  <textarea
                    className="input"
                    type="textarea"
                    name="name"
                    ref={descriptionAdd}
                    // defaultValue={element.description}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="subtitle">Detail:</Form.Label>
                  <textarea
                    className="input"
                    type="textarea"
                    name="name"
                    ref={detailAdd}
                    // defaultValue={element.description}
                  />
                </Form.Group>
                <input
                  className="button d-flex"
                  type="submit"
                  name="Submit"
                  onClick={handelSubmitAdd}
                />
              </span>
            </>
          ) : (
            <>
              <FontAwesomeIcon
                className="icons"
                icon={faTrash}
                onClick={handleRemove}
              />
              <h4 className="title mb-3">Edit Offer</h4>
              <span className="content">
                <Form.Group>
                  <Form.Label className="subtitle">Title:</Form.Label>
                  <Form.Control
                    className="input"
                    type="text"
                    name="username"
                    ref={titleEdit}
                    defaultValue={offre.titre}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="subtitle">Description:</Form.Label>
                  <textarea
                    className="input"
                    type="textarea"
                    name="name"
                    ref={descriptionEdit}
                    defaultValue={offre.description}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="subtitle">Detail:</Form.Label>
                  <textarea
                    className="input"
                    type="textarea"
                    name="name"
                    ref={detailEdit}
                    defaultValue={offre.detail}
                  />
                </Form.Group>
                <input
                  className="button d-flex"
                  type="submit"
                  name="Submit"
                  onClick={handelSubmitEdit}
                />
              </span>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ListModal;
