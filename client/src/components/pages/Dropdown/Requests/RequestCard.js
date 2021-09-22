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

let users = [];
Axios.get("http://localhost:5000/users")
  .then((result) => {
    data = result.data;

    for (const user of data) {
      users.push({ id: user._id, name: user.username });
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

  var userId;
  users.map((element) => {
    if (element.name == name) {
      userId = element.id;
    }
  });

  console.log(userId);
  const approve = async (id) => {
    var confirm = window.confirm("Are you sure ?");
    if (confirm) {
      await approveRequest(id);
      setAlert("Request approved", "success");
      //here

      Axios.post("http://localhost:5000/notifications/add", {
        user: userId,
        content:
          "Your request has been accepted, please bring your papers as soon as possible",
        title: offer,
      }).then(
        (response) => {
          console.log("notifications sent");
        },
        (error) => {
          console.log(error);
        }
      );

      window.location.reload(false);
    }
  };

  const supprime = async (id) => {
    var confirm = window.confirm("Are you sure ?");
    if (confirm) {
      await deleteRequest(id);
      setAlert("Request deleted", "danger");

      Axios.post("http://localhost:5000/notifications/add", {
        user: userId,
        content:
          "Your request has been rejected, for more informations please contact us.",
        title: offer,
      }).then(
        (response) => {
          console.log("notifications sent");
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };

  const classes = useStyles();

  return (
    <div className={`${classes.page}`}>
      <div className="card-shadow messageitem  text-left p-4">
        <div className="card-inner  d-flex flex-column justify-content-between">
          <div className=" d-flex align-items-center justify-content-between">
            <p className="title mb-3">
              {name}
              <br />
              <br />
              {email}
            </p>

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
            {!request_accept ? (
              <>
                <button
                  className="button-primary"
                  onClick={() => {
                    approve(_id);
                  }}
                >
                  Accept
                </button>
                <button
                  className="button-primary"
                  onClick={() => {
                    supprime(_id);
                  }}
                >
                  Delete
                </button>
              </>
            ) : null}
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
