import React from "react";
import { connect } from "react-redux";
import useStyles from "../Requests/pending-jss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
// Utils
import calcDays from "../../../../utils/calcDays";
import Axios from "axios";

export default function NotificationCard(props) {
  const { notif } = props;
  const classes = useStyles();

  function handleRemove() {
    var confirm = window.confirm("Are you sure ?");
    if (confirm) {
      Axios.delete("http://localhost:5000/notifications/" + notif._id)
        .then(() => {
          window.location.reload(false);
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <div className={`${classes.page}`}>
      <div className="card-shadow messageitem  text-left p-4">
        <div className="card-inner  d-flex flex-column justify-content-between">
          <div className=" d-flex align-items-center justify-content-between">
            <>
              <h5 className="w-25 subone">{notif.title}</h5>
              <p className="w-50">{notif.content}</p>
            </>
            <span className="date">{calcDays(notif.createdAt)}</span>
            <FontAwesomeIcon
              className="icons"
              icon={faTrash}
              onClick={handleRemove}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
