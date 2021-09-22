import React from "react";
import useStyles from "../MyRequests/pending-jss";
import NotificationCard from "./NotificationCard";
import { connect } from "react-redux";
import Axios from "axios";

var notifications = [];
Axios.get("http://localhost:5000/notifications")
  .then((result) => {
    for (const notif of result.data) {
      notifications.push(notif);
    }
  })
  .catch((error) => console.log(error));

const Notification = (props) => {
  const { user } = props;
  const classes = useStyles();

  return (
    <>
      <div className={`${classes.page} card-shadow text-center`}>
        <div className="w-75 mx-auto">
          <h3 className="title">Notifications</h3>
          {/* condition */}
          {!notifications.length ? (
            <div className="empty">
              <h6 className="title mt-5">
                Empty inbox
                <span role="img" aria-label="sad">
                  😥
                </span>
              </h6>
            </div>
          ) : (
            notifications.map((notif) =>
              notif.user == user._id || notif.user == "all" ? (
                <NotificationCard notif={notif} />
              ) : null
            )
          )}
        </div>
      </div>
    </>
  );
};

const mapSateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapSateToProps)(Notification);
