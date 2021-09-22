import React from "react";
import { connect } from "react-redux";
import useStyles from "./users-jss";
// Utils
import calcDays from "../../../../utils/calcDays";
import MalePicture from "../../../../svg/male_avatar.svg";
import FemalePicture from "../../../../svg/female_avatar.svg";
import User from "../../../../images/user.svg";
import { deleteUser, clearErrors } from "../../../../redux/actions/userActions";
import { setAlert } from "../../../../redux/actions/alertActions";
const UserCard = ({ user, deleteUser }) => {
  const { _id, username, email, gender, post, date } = user || {};

  const classes = useStyles();

  const supprime = (id) => {
    var confirm = window.confirm("Are you sure ?");
    if (confirm) {
      setAlert("User deleted", "danger");
      deleteUser(id);
    }
  };
  return (
    <div className={`${classes.page}`}>
      <div className="card-shadow messageitem  text-left p-4">
        <div className="card-inner  d-flex flex-column justify-content-between">
          <div className=" d-flex align-items-center justify-content-between">
            <div>
              {!gender || gender === 3 ? (
                <img className="picture" src={User} alt="Profile" />
              ) : (
                <img
                  className="picture"
                  src={gender === 1 ? MalePicture : FemalePicture}
                  alt="Profile"
                />
              )}
            </div>
            <p className="title mb-3">{email}</p>
            <p className="title mb-3">{username}</p>
            <p className="title mb-3">{post}</p>

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
  users: state.user.users,
  loading: state.user.loading,
  error: state.user.error,
});

export default connect(mapSateToProps, {
  deleteUser,
  setAlert,
  clearErrors,
})(UserCard);
