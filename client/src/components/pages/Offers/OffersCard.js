import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import OfferModal from "./offerModalAdmin";
import OfferModalUser from "./offerModalUser";

export default function OfferCard(props) {
  const { offre, type } = props;

  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalUser, setShowModalUser] = useState(false);

  function handleShow() {
    setShow((show = true));
  }
  function handleClickAdmin() {
    setShowModal(!showModal);
  }
  function handleClickUser() {
    setShowModalUser(!showModalUser);
  }

  if (showModal) {
    // show the modal if state showModal is true
    return (
      <OfferModal show={handleShow} onHide={handleClickAdmin} offre={offre} />
    );
  }
  if (showModalUser) {
    // show the modal if state showModal is true
    return (
      <OfferModalUser
        show={handleShow}
        onHide={handleClickUser}
        offre={offre}
      />
    );
  }

  return (
    <div className="col-12 col-lg-3 m-5">
      <div>
        <h4 className="title mb-2 mt-2 mx-auto mx-lg-0 text-center">
          {offre.titre}
        </h4>
        <p className="description mb-3 mx-auto mx-lg-0 text-center">
          {offre.description}
        </p>
      </div>
      <div className="d-flex justify-content-center">
        {type == "admin" ? (
          <button className="button-primary " onClick={handleClickAdmin}>
            Edit
          </button>
        ) : (
          <button className="button-primary " onClick={handleClickUser}>
            View detail
          </button>
        )}
      </div>
    </div>
  );
}
