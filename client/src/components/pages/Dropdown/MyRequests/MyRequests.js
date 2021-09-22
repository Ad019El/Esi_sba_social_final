import React, { useEffect } from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";

// Actions
import {
  getRequests,
  /* approveRequest,
  deleteRequest,*/
  clearErrors,
} from "../../../../redux/actions/requestActions";
import { setAlert } from "../../../../redux/actions/alertActions";

// App layout components
import RequestCard from "./RequestCard";
// Components

import useStyles from "./pending-jss";

// Utils
import { WEBSITE_NAME } from "../../../../utils/Data";

const Requests = (props) => {
  const classes = useStyles();

  const {
    requests,
    user,
    loading,
    error,
    getRequests,
    clearErrors,
    setAlert,
    /*approveRequest,
      deleteRequest,*/
  } = props;

  useEffect(() => {
    getRequests();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (error && error.length) {
      if (typeof error === "object") {
        error.forEach((err) => {
          setAlert(err.msg, "danger");
        });
      } else {
        setAlert(error, "danger");
      }
    }
    clearErrors();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Helmet>
        <title>{`${WEBSITE_NAME} | Pending`}</title>
      </Helmet>
      <>
        <div className={`${classes.page} card-shadow text-center`}>
          <h3 className="title">All requests</h3>
          {loading ? (
            <div className="cards-container mt-5">
              <RequestCard isLoading={true} />
              <RequestCard isLoading={true} />
            </div>
          ) : !requests || !requests.length ? (
            <div className="empty">
              <h6 className="title mt-5">
                Empty inbox{" "}
                <span role="img" aria-label="sad">
                  😥
                </span>
              </h6>
            </div>
          ) : (
            <div className="container mt-5">
              {requests.map((request) =>
                request.name == user.username ? (
                  <RequestCard key={request._id} request={request} />
                ) : null
              )}
            </div>
          )}
        </div>
      </>
    </>
  );
};

const mapSateToProps = (state) => ({
  requests: state.request.requests,
  loading: state.request.loading,
  user: state.auth.user,
  error: state.request.error,
});

export default connect(mapSateToProps, {
  getRequests,
  clearErrors,
  setAlert,
})(Requests);
