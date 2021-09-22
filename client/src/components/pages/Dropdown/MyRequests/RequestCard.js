import React from "react";
import { connect } from "react-redux";
import useStyles from "./pending-jss";
// Utils
import calcDays from "../../../../utils/calcDays";
import {
  clearErrors,
  approveRequest,
  deleteRequest,
} from "../../../../redux/actions/requestActions";
import { setAlert } from "../../../../redux/actions/alertActions";
import Axios from "axios";

let data = "";
var options = [];
Axios.get("http://localhost:5000/chapitres")
  .then((result) => {
    data = result.data;

    for (const chapitre of data) {
      options.push({ id: chapitre._id, titre: chapitre.titre });
    }
  })
  .catch((error) => {
    console.log(error);
  });

const RequestCard = ({ approveRequest, request, deleteRequest }) => {
  const { _id, name, email, category, offer, request_accept, date } =
    request || {};
  var CategoryName;
  options.map((element) => {
    if (element.id == category) {
      CategoryName = element.titre;
    }
  });

  const approve = async (id) => {
    await approveRequest(id);
    setAlert("Request approved", "success");
  };

  const supprime = async (id) => {
    var confirm = window.confirm("Are you sure ?");
    if (confirm) {
      await deleteRequest(id);
      setAlert("Request deleted", "danger");
    }
  };

  const classes = useStyles();

  return (
    <div className={`${classes.page}`}>
      <div className="card-shadow messageitem  text-left p-4">
        <div className="card-inner  d-flex flex-column justify-content-between">
          <div className=" d-flex align-items-center justify-content-between ">
            {/* <p className="title mb-3">
              {name}
              <br />
              <br />
              {email}
            </p> */}

            <p className="title mb-3">
              <strong className="title">
                {" "}
                <h5 className="subone">category</h5>{" "}
              </strong>{" "}
              {CategoryName}
              <br />
              <strong className="title">
                {" "}
                <h5 className="subone">offer</h5>{" "}
              </strong>{" "}
              {offer}
            </p>

            <p className="title mb-3">
              <strong className="title">
                {" "}
                <h5 className="subone">state</h5>{" "}
              </strong>{" "}
              {request_accept ? (
                <h4 className="accepted">accepted</h4>
              ) : (
                <h4 className="refused">wating...</h4>
              )}
            </p>
            <span className="date">{calcDays(date)}</span>

            {/*<p className='content mb-3'>
        {category.length > 50 ? category.substring(0, 50) + '..' : category}
        </p> */}
            {/* <button
              className="button-primary"
              onClick={() => {
                approve(_id);
              }}
            >
              Accept
            </button> */}
            <button
              className="button-primary"
              onClick={() => {
                supprime(_id);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapSateToProps = (state) => ({
  requests: state.request.requests,
  loading: state.request.loading,
  error: state.request.error,
});

export default connect(mapSateToProps, {
  approveRequest,
  deleteRequest,
  clearErrors,
  setAlert,
})(RequestCard);
