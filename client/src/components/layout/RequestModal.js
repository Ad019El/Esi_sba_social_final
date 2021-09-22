import React from "react";
import { Modal } from "react-bootstrap";
import "./RequestModal.css";
const RequestModal = ({ show, request, onHide }) => {
  const { category, offer, request_accept, date } = request || {};

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Body className="text-center py-4">
          <>
            <h5 className="title mb-3">Request</h5>
            <span className="content">
              <p className="content mb-3">
                <strong className="link-secondary"> Category : </strong>{" "}
                {category}
              </p>

              <p className="content mb-3">
                <strong className="link-secondary"> Offer : </strong> {offer}
              </p>
              <p className="content mb-3">
                <strong className="link-secondary"> State : </strong>{" "}
                {request_accept}
              </p>
              <p className="content mb-3">
                <strong className="link-secondary"> Date : </strong> {date}
              </p>
              <div className="d-flex justify-content-between">
                <button className="button_primary">Accept</button>
                <button className="button_secondary">Decline</button>
              </div>
            </span>
          </>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RequestModal;
