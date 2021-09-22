import React, { useEffect } from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { Container, Form } from "react-bootstrap";

// Actions
import { loadUserProfile } from "../../../redux/actions/userActions";
import { setAlert } from "../../../redux/actions/alertActions";

// Utils
import { WEBSITE_NAME } from "../../../utils/Data";

// App layout components
import MalePicture from "../../../svg/male_avatar.svg";
import FemalePicture from "../../../svg/female_avatar.svg";
import OtherPicture from "../../../svg/male_avatar.svg";

const Profile = (props) => {
  const {
    match,
    user,
    loading,
    error_send,
    loadUserProfile,
    clearErrors,
    setAlert,
  } = props;
  const { _id, name, username, post, email, gender } = user || {};

  useEffect(() => {
    loadUserProfile(match.params.username);

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    loadUserProfile(match.params.username);

    // eslint-disable-next-line
  }, [match]);

  useEffect(() => {
    if (error_send && error_send.length) {
      if (typeof error_send === "object") {
        error_send.forEach((err) => {
          setAlert(err.msg, "danger");
        });
      } else {
        setAlert(error_send, "danger");
      }

      clearErrors();
    }

    // eslint-disable-next-line
  }, [error_send]);

  return (
    <>
      <Helmet>
        <title>{`${WEBSITE_NAME} | ${
          loading ? "Loading..." : username || "Not found"
        }`}</title>
      </Helmet>
      <Container>
        <div className="container-inner px-3 mt-4 text-center">
          <div className="profile mx-auto">
            <img
              className="picture"
              src={
                gender === 1
                  ? MalePicture
                  : gender === 2
                  ? FemalePicture
                  : OtherPicture
              }
              alt="Profile"
            />

            <div className="user-details mt-4">
              <h3 className="name">{name || username}</h3>
              <p className="bio">{"Post : " + post}</p>
              <p className="bio">{"email : " + email}</p>
            </div>

            <div className="links d-flex align-items-center justify-content-center mt-4"></div>
          </div>
        </div>
      </Container>
    </>
  );
};

const mapSateToProps = (state) => ({
  user: state.auth.user,
  user_profile: state.user.user_profile,
  loading: state.user.loading,
});

export default connect(mapSateToProps, {
  loadUserProfile,
  setAlert,
})(Profile);
