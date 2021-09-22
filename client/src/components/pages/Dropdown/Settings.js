import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Container, Form } from 'react-bootstrap';

// Actions
import {
  loadSettings,
  updateProfile,
  updatePassword,
  clearErrors,
} from '../../../redux/actions/authActions';
import { setAlert } from '../../../redux/actions/alertActions';

// App layout components
import Spinner from '../../layout/Spinner/Spinner';

// Utils
import { WEBSITE_NAME } from '../../../utils/Data';
import useStyles from './drop-jss';

const Settings = (props) => {
  const {
    user,
    error,
    loading_settings,
    loadSettings,
    updateProfile,
    updatePassword,
    clearErrors,
    setAlert,
  } = props;

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    name: '',
    post: '',
    gender: 0,
    allow_messages: false,
  });

  useEffect(() => {
    loadSettings();

    //eslint-disable-next-line
  }, []);

  const { username, email, name, post, gender, allow_messages } = userData;

  const [passwords, setPasswords] = useState({
    old_password: '',
    new_password: '',
  });

  const { old_password, new_password } = passwords;

  const onChange = (e) =>
    setUserData({ ...user, [e.target.name]: e.target.value });

  const onChangeGender = (e) =>
    setUserData({ ...userData, gender: parseInt(e.target.value) });

  const onChangePosition = (e) =>
    setUserData({ ...userData, post: e.target.value });

  const onChangeAllowMessages = (e) =>
    setUserData({
      ...userData,
      allow_messages: e.target.value === 'true' ? true : false,
    });

  const onChangePasswords = (e) =>
    setPasswords({ ...passwords, [e.target.name]: e.target.value });

  useEffect(() => {
    if (error && error.length) {
      if (typeof error === 'object') {
        error.forEach((err) => {
          setAlert(err.msg, 'danger');
        });
      } else {
        setAlert(error, 'danger');
      }

      clearErrors();
    }

    // eslint-disable-next-line
  }, [error]);

  useEffect(() => {
    if (user) {
      setUserData({ ...userData, ...user });
    }

    // eslint-disable-next-line
  }, [user]);

  const onSubmit = async (e) => {
    e.preventDefault();

    await updateProfile({
      allow_messages,
      name,
      post,
      gender,
    });
  };

  const onSubmitPassword = async (e) => {
    e.preventDefault();

    if (old_password === '') {
      setAlert('Old password is empty', 'danger');
      return;
    }

    if (new_password === '' || new_password.length < 6) {
      setAlert('Password must contain at least 6 characters', 'danger');
      return;
    }

    await updatePassword({
      old_password,
      new_password,
    });
  };
  const classes = useStyles()
  return (
    <>
      <Helmet>
        <title>{`${WEBSITE_NAME} | Settings`}</title>
      </Helmet>
      <Container className={`${classes.root}`} >
        <div className='container-inner px-3 mt-4'>
          {loading_settings ? (
            <div className='text-center'>
              <Spinner />
            </div>
          ) : (
            <div className='settings mx-auto'>
              <h4 className='mb-3'>
                <strong className='title'>Your informations</strong>
              </h4>
              <Form className='form form-container' onSubmit={onSubmit}>
                <Form.Group>
                  <Form.Label className='subtitle'>Email</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Email'
                    name='email'
                    value={email}
                    readOnly
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className='subtitle'>Username</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Username'
                    name='username'
                    value={username}
                    readOnly
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className='subtitle'>Fullname</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Fullname'
                    name='name'
                    value={name}
                    onChange={onChange}
                  />
                </Form.Group>

                

                <Form.Group>
                  <Form.Label className='subtitle'>Position</Form.Label>
                  <Form.Control
                    as='select'
                    name='post'
                    value={post}
                    onChange={onChangePosition}
                  >
                    <option defaultValue value={4}>
                      Not defined
                    </option>
                    <option value='MCA'>MCA</option>
                    <option value='MCB'>MCB</option>
                    <option value='Professor'>Professor</option>
                    <option value='Administration staff'>Administration staff</option>
                    <option value='ATS'>ATS</option>

                  </Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label className='subtitle'>Gender</Form.Label>
                  <Form.Control
                    as='select'
                    name='gender'
                    value={gender}
                    onChange={onChangeGender}
                  >
                    <option defaultValue value={3}>
                      Not defined
                    </option>
                    <option value={1}>Male</option>
                    <option value={2}>Female</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label className='subtitle'>Allow receiving Notifications</Form.Label>
                  <Form.Control
                    as='select'
                    name='allow_messages'
                    value={allow_messages}
                    onChange={onChangeAllowMessages}
                  >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </Form.Control>
                </Form.Group>

                <div className='links d-flex align-items-center justify-content-end mt-4'>
                  {loading_settings ? (
                    <Spinner />
                  ) : (
                    <button className='button-primary' type='submit' onClick={onSubmit}>
                     Update
                  </button>
                  )}
                </div>
              </Form>

              <h4 className='my-3'>
                <strong className='title'>Security</strong>
              </h4>
              <Form className='form form-container' onSubmit={onSubmitPassword}>
                <Form.Group>
                  <Form.Label className='subtitle'>Old password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Old password'
                    name='old_password'
                    value={old_password}
                    onChange={onChangePasswords}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className='subtitle'>New password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='New password'
                    name='new_password'
                    value={new_password}
                    onChange={onChangePasswords}
                  />
                </Form.Group>

                <div className='links d-flex align-items-center justify-content-end mt-4'>
                  {loading_settings ? (
                    <Spinner />
                  ) : (
                    <button className='button-primary' type='submit' onClick={onSubmit}>
                        Update
                     </button>
                  )}
                </div>
              </Form>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

const mapSateToProps = (state) => ({
  user: state.auth.user,
  error: state.auth.error,
  loading_settings: state.auth.loading_settings,
});

export default connect(mapSateToProps, {
  loadSettings,
  updateProfile,
  updatePassword,
  clearErrors,
  setAlert,
})(Settings);
