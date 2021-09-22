import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
// Actions
import { meeting, clearErrors } from "../../../../redux/actions/meetingActions";
import { setAlert } from "../../../../redux/actions/alertActions";

// App layout components
import Spinner from "../../../layout/Spinner/Spinner";

// Utils
import { WEBSITE_NAME } from "../../../../utils/Data";
import useStyles from "../Requests/pending-jss";

const AddMeeting = (props) => {
  const { error, loading, meeting, clearErrors, setAlert } = props;

  const [meet, setMeet] = useState({
    title: "",
    date: "",
    detailles: "",
  });

  const { title, date, detailles } = meet;

  const onChange = (e) => setMeet({ ...meet, [e.target.name]: e.target.value });

  const classes = useStyles();

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

    if (title === "" || detailles === "" || date === "") {
      setAlert("Please fill all fields", "danger");
    } else {
      await meeting({ title, date, detailles });
      setAlert("Meeting has been registred", "success");
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${WEBSITE_NAME} | Add Meeting`}</title>
      </Helmet>
      <Container className={`${classes.root} `}>
        <div className="container-inner px-3 mt-4">
          <div className="auth mx-auto">
            <h4 className="mb-3 text-center ">
              <strong className="title"> Add new meeting to the archive</strong>
            </h4>
            <Form.Group>
              <Form.Label className="subtitle"> Title </Form.Label>
              <Form.Control
                type="text"
                placeholder="Subject"
                name="title"
                value={title}
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="subtitle"> Date </Form.Label>
              <Form.Control
                type="date"
                placeholder="Date"
                name="date"
                value={date}
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="subtitle"> Detailles </Form.Label>
              <Form.Control
                type="text area"
                placeholder="Detailles"
                name="detailles"
                value={detailles}
                onChange={onChange}
              />
            </Form.Group>

            <div className="links d-flex align-items-center justify-content-between mt-4">
              <span>
                <Link className="link-secondary" to="/meeting">
                  Archive
                </Link>
              </span>

              {loading ? (
                <Spinner />
              ) : (
                <button className="button" type="submit" onClick={onSubmit}>
                  Save Meeting
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
  loading: state.auth.loading,
});

export default connect(mapSateToProps, { meeting, clearErrors, setAlert })(
  AddMeeting
);
