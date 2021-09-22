import React from "react";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import "./ListModal.css";
import { Form } from "react-bootstrap";

const ListModal = (props) => {
  const { show, onHide, element, articleType, amount } = props;
  let increase = React.createRef();
  let decrease = React.createRef();

  function handelSubmitIncrease() {
    var confirm = window.confirm("Continue ?");
    if (Number(increase.current.value) <= amount) {
      if (confirm) {
        Axios.post("http://localhost:5000/sous_chapitres/plus/" + element._id, {
          credit: Number(increase.current.value),
        }).catch((error) => console.log(error));
        Axios.post("http://localhost:5000/chapitres/plus/" + element.chapitre, {
          credit: Number(increase.current.value),
        }).catch((error) => console.log(error));
        Axios.post("http://localhost:5000/budget/mines/", {
          amount: Number(increase.current.value),
        }).catch((error) => console.log(error));
        window.location.reload(false);
      }
    } else {
      window.confirm("Budget not enough!");
    }
  }
  function handelSubmitDecrease() {
    var confirm = window.confirm("Continue ?");
    if (confirm) {
      Axios.post("http://localhost:5000/sous_chapitres/mines/" + element._id, {
        debit: Number(decrease.current.value),
      }).catch((error) => console.log(error));
      Axios.post("http://localhost:5000/chapitres/mines/" + element.chapitre, {
        debit: Number(decrease.current.value),
      }).catch((error) => console.log(error));
      window.location.reload(false);
    }
  }

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Body className="text-center py-4">
          <>
            <div>
              <h4 className="title mb-3">Edit</h4>
              <span className="content">
                <Form.Group>
                  <Form.Label className="subtitle">Increase</Form.Label>
                  <Form.Control
                    className="input"
                    type="number"
                    name="username"
                    ref={increase}
                    // defaultValue={element.increase}
                  />
                </Form.Group>
                <input
                  className="button d-flex"
                  type="submit"
                  name="Submit"
                  onClick={handelSubmitIncrease}
                />
              </span>
              <br />
              <br />
              <span className="content">
                <Form.Group>
                  <Form.Label className="subtitle">Decrease</Form.Label>
                  <Form.Control
                    className="input"
                    type="number"
                    name="username"
                    ref={decrease}
                    defaultValue={element.titre}
                  />
                </Form.Group>
                <input
                  className="button d-flex"
                  type="submit"
                  name="Submit"
                  onClick={handelSubmitDecrease}
                />
              </span>
            </div>
          </>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ListModal;
