import React, { useState } from "react";
import Helmet from "react-helmet";
import { WEBSITE_NAME } from "../../../utils/Data";
import useStyles from "./Offers-jss";
import { Link } from "react-router-dom";
import OffersCard from "./OffersCard";
import OfferModal from "./offerModalAdmin";
import Axios from "axios";

let data = "";
const offres = [];
Axios.get("http://localhost:5000/offres")
  .then((result) => {
    data = result.data;

    for (const offre of data) {
      offres.push({
        id: offre._id,
        titre: offre.titre,
        description: offre.description,
        detail: offre.detail,
      });
    }
  })
  .catch((error) => {
    console.log(error);
  });

const Offers = () => {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function handleShow() {
    setShow((show = true));
  }
  function handleClick() {
    setShowModal(!showModal);
  }
  if (showModal) {
    // show the modal if state showModal is true
    return <OfferModal show={handleShow} onHide={handleClick} type="add" />;
  }
  console.log(offres);
  return (
    <div>
      <Helmet>
        <title>{`${WEBSITE_NAME} | Offers`}</title>
      </Helmet>
      <div className={`${classes.root} card-shadow text-center`}>
        <div className="row">
          <div className="col-12">
            <button className="button-secondary" onClick={handleClick}>
              Add offer
            </button>
          </div>
        </div>

        <div className="row text-center text-lg-left">
          {offres.map((offre) => (
            <OffersCard offre={offre} type="admin" />
          ))}

          {/* <div className=" col-12 col-lg-3">
            <div>
              <img
                className="img img-fluid mb-3"
                src={DonationIcon}
                alt="Home"
              />
              <h5 className="title mb-2 mt-2 mx-auto mx-lg-0">Social aid</h5>
              <p className="description mb-5 mx-auto mx-lg-0">
                gifts and grants for workers on the occasions of marriage, new
                born, circumcision, and others{" "}
              </p>
            </div>
            <Link to="/offers/soc">
              <button className="button-primary "> View Offers </button>
            </Link>
          </div>

          <div className=" col-12 col-lg-3">
            <div>
              <img className="img img-fluid mb-3" src={BloodIcon} alt="Home" />

              <h5 className="title mb-2 mt-2 mx-auto mx-lg-0">
                Health services
              </h5>
              <p className="description mb-5 mx-auto mx-lg-0">
                Help employees patients or relatives in their chirurgical
                operations or medical treatment and others
              </p>
            </div>
            <Link to="/offers/hea">
              <button className="button-primary "> View Offers </button>
            </Link>
          </div>

          <div className="col-12 col-lg-3">
            <div>
              <img className="img img-fluid mb-3" src={Solidarity} alt="Home" />

              <h5 className="title mb-2 mt-2 mx-auto mx-lg-0">Solidarity </h5>
              <p className="description mb-5 mx-auto mx-lg-0">
                Give financial aids to those in need of money, tools or
                resources , specially those in difficult health and financial
                conditions
              </p>
            </div>
            <Link to="/offers/sol">
              <button className="button-primary "> View Offers </button>
            </Link>
          </div>

          <div className="col-12 col-lg-3">
            <div>
              <img className="img img-fluid mb-3" src={Other} alt="Home" />
              <h5 className="title mb-2 mt-2 mx-auto mx-lg-0">
                {" "}
                Other services
              </h5>
              <p className="description mb-5 mx-auto mx-lg-0">
                exceptional loans for school staff, organize cultural and sports
                activities and other related activities
              </p>
            </div>
            <Link to="/offers/oth">
              <button className="button-primary "> View Offers </button>
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Offers;
