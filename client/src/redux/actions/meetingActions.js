import axios from "axios";

import {
  SET_LOADING_MEETINGS,
  GET_MEETINGS,
  GET_MEETINGS_ERROR,
  CLEAR_MEETINGS,
  CLEAR_ERRORS,
  MEETING_SUCCESS,
  MEETING_FAIL,
  DELETE_MEETING,
} from "../types";

// Clear errors
export const clearErrors = () => {
  return { type: CLEAR_ERRORS };
};

// Register meeting
export const meeting = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/api/meeting/", formData, config);

    dispatch({
      type: MEETING_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: MEETING_FAIL,
      payload: error?.response?.data,
    });
  }
};

// Get meetings
export const getMeetings = () => async (dispatch) => {
  try {
    dispatch(setLoadingMeetings());
    const res = await axios.get("/api/meeting");

    dispatch({
      type: GET_MEETINGS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_MEETINGS_ERROR,
      payload: error.response?.data,
    });
  }
};

// DELETE meeting
export const deleteMeeting = (id) => (dispatch) => {
  axios.delete(`/api/meeting/${id}`).then((res) => {
    dispatch({
      type: DELETE_MEETING,
      payload: id,
    });
  });
};

// Set loading meetings to true
export const setLoadingMeetings = () => {
  return { type: SET_LOADING_MEETINGS };
};

// Clear meetings
export const clearMeetings = () => {
  return { type: CLEAR_MEETINGS };
};
