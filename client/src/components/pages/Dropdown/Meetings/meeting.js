import React, { useEffect } from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
// Actions
import {
  getMeetings,
  clearErrors,
} from "../../../../redux/actions/meetingActions";
import { setAlert } from "../../../../redux/actions/alertActions";

// App layout components
import MeetingCard from "./MeetingCard";
// Components

import useStyles from "../Requests/pending-jss";

// Utils
import { WEBSITE_NAME } from "../../../../utils/Data";

const Meeting = (props) => {
  const classes = useStyles();

  const { meetings, loading, error, getMeetings, clearErrors, setAlert } =
    props;

  useEffect(() => {
    getMeetings();

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
        <title>{`${WEBSITE_NAME} | Archive`}</title>
      </Helmet>
      <>
        <div className={`${classes.page} card-shadow text-center`}>
          <h3 className="title">All meetings</h3>
          <button className="button-primary">
            <Link to="/add-meeting"> Add Meeting </Link>
          </button>
          {loading ? (
            <div className="cards-container mt-5">
              <MeetingCard isLoading={true} />
              <MeetingCard isLoading={true} />
            </div>
          ) : !meetings || !meetings.length ? (
            <div className="empty">
              <h6 className="title mt-5">Empty inbox !</h6>
            </div>
          ) : (
            <div className="container mt-5">
              {meetings.map((meeting) => (
                <MeetingCard key={meeting._id} meeting={meeting} />
              ))}
            </div>
          )}
        </div>
      </>
    </>
  );
};

const mapSateToProps = (state) => ({
  meetings: state.meeting.meetings,
  loading: state.meeting.loading,
  error: state.meeting.error,
});

export default connect(mapSateToProps, {
  getMeetings,
  clearErrors,
  setAlert,
})(Meeting);
