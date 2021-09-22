import React from "react";
import { connect } from "react-redux";
import useStyles from "../Requests/pending-jss";

// Utils
import calcDays from "../../../../utils/calcDays";
import {
  clearErrors,
  deleteMeeting,
} from "../../../../redux/actions/meetingActions";
import { setAlert } from "../../../../redux/actions/alertActions";
const MeetingCard = ({ meeting, deleteMeeting }) => {
  const { _id, title, date, detailles } = meeting || {};

  const supprime = async (id) => {
    await deleteMeeting(id);
    setAlert("Meeting deleted", "danger");
  };

  const classes = useStyles();

  return (
    <div className={`${classes.page}`}>
      <div className="card-shadow messageitem  text-left p-4">
        <div className="card-inner  d-flex flex-column justify-content-between">
          <div className=" d-flex align-items-center justify-content-between">
            <p className="title mb-3">
              <strong className="title">
                {" "}
                <h5 className="subone">title</h5>{" "}
              </strong>{" "}
              {title}
            </p>

            <p className="title mb-3">
              <strong className="title">
                {" "}
                <h5 className="subone">detailles</h5>{" "}
              </strong>{" "}
              {detailles}
            </p>
            <span className="date">{calcDays(date)}</span>

            <button
              className="button-primary"
              onClick={() => {
                supprime(_id);
              }}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapSateToProps = (state) => ({
  meetings: state.meeting.meetings,
  loading: state.meeting.loading,
  error: state.meeting.error,
});

export default connect(mapSateToProps, {
  deleteMeeting,
  clearErrors,
  setAlert,
})(MeetingCard);
