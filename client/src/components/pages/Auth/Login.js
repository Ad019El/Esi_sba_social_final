import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { Container, Form } from "react-bootstrap";
import useStyles from "./login-jss";
// Actions
import { login, clearErrors } from "../../../redux/actions/authActions";
import { setAlert } from "../../../redux/actions/alertActions";

// App layout components
import Spinner from "../../layout/Spinner/Spinner";

// Utils
import { WEBSITE_NAME } from "../../../utils/Data";

const Login = (props) => {
  const { isAuthenticated, error, loading, login, clearErrors, setAlert } =
    props;

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const { username, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    // eslint-disable-next-line
  }, [isAuthenticated, props.history]);

  useEffect(() => {
    if (error && error.length) {
      if (typeof error === "object") {
        error.forEach((err) => {
          setAlert(err.msg, "danger");
        });
      } else {
        setAlert(error, "danger");
      }

      clearErrors();
    }

    // eslint-disable-next-line
  }, [error]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (username === "" || password === "") {
      setAlert("Please fill all fields", "danger");
    } else {
      await login({ username, password });
    }
  };

  const classes = useStyles();
  return (
    <>
      <Helmet>
        <title>{`${WEBSITE_NAME} | Login`}</title>
      </Helmet>
      <Container className={`${classes.root} `}>
        <div className="container-inner px-3 mt-4">
          <div className="auth mx-auto">
            <h4 className="mb-3 text-center ">
              <strong className="title">Sign in</strong>
            </h4>
            <Form.Group>
              <Form.Label className="subtitle"> Email or username </Form.Label>
              <Form.Control
                type="text"
                placeholder="Email or username"
                name="username"
                value={username}
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="subtitle"> Password </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={onChange}
              />
            </Form.Group>

            <div className="links d-flex align-items-center justify-content-between mt-4">
              {loading ? (
                <Spinner />
              ) : (
                <button
                  className="button-primary"
                  type="submit"
                  onClick={onSubmit}
                >
                  Sign in
                </button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

const mapSateToProps = (state) => ({
  error: state.auth.error,
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapSateToProps, { login, clearErrors, setAlert })(Login);
