import axios from 'axios';

import {
  USER_PROFILE_LOADED,
  USER_PROFILE_ERROR,
  GET_USERS,
  GET_USERS_ERROR,
  SET_LOADING_USERS,
  SET_LOADING_USER_PROFILE,
  CLEAR_ERRORS,
  DELETE_USER,
} from '../types';

// Load User
export const loadUserProfile = (username) => async (dispatch) => {
  try {
    dispatch(setLoading());

    const res = await axios.get('/api/users/' + username);

    dispatch({
      type: USER_PROFILE_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: USER_PROFILE_ERROR,
      payload: error.response?.data,
    });
  }
};

// Set loading to true
export const setLoading = () => {
  return { type: SET_LOADING_USER_PROFILE };
};

// Get users
export const getUsers = () => async (dispatch) => {
  try {
    dispatch(setLoadingUsers());
    const res = await axios.get('/api/users');

    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_USERS_ERROR,
      payload: error.response?.data,
    });
  }
};
// DELETE USER
export const deleteUser = id => dispatch => {
  axios.delete(`/api/users/${id}`).then(res => {
    dispatch({
      type: DELETE_USER,
      payload: id
    });
  });
};


// Set loading users to true
export const setLoadingUsers = () => {
  return { type: SET_LOADING_USERS };
};

// Clear errors
export const clearErrors = () => {
  return { type: CLEAR_ERRORS };
};
