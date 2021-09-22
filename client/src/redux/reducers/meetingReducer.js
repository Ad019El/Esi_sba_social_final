import {
  MEETING_SUCCESS,
  MEETING_FAIL,
  SET_LOADING_MEETINGS,
  GET_MEETINGS,
  GET_MEETINGS_ERROR,
  CLEAR_MEETINGS,
  CLEAR_ERRORS,
  DELETE_MEETING,
} from "../types";

const initialState = {
  meetings: null,
  loading: false,
  error: null,
  error_fav: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MEETING_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };

    case MEETING_FAIL:
      return {
        ...state,
        loading: false,
        meeting: null,
        error: action.payload || null,
      };

    case CLEAR_MEETINGS:
      return {
        ...state,
        meetings: null,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    case GET_MEETINGS:
      return {
        ...state,
        error: false,
        loading: false,
        meetings: action.payload,
      };

    case GET_MEETINGS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case SET_LOADING_MEETINGS:
      return {
        ...state,
        loading: true,
      };

    case DELETE_MEETING:
      return {
        ...state,
        meetings: state.meetings.filter((meeting) => {
          return meeting._id !== action.payload;
        }),
      };

    default:
      return state;
  }
};
