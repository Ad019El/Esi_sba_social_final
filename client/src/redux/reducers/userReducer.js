import {
  USER_PROFILE_LOADED,
  USER_PROFILE_ERROR,
  SET_LOADING_USER_PROFILE,
  CLEAR_ERRORS,
  SET_LOADING_USERS,
  GET_USERS,
  GET_USERS_ERROR,
  DELETE_USER,
} from '../types';

const initialState = {
  user_profile: null,
  loading: false,
  error: null,
  users:null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_PROFILE_LOADED:
      return {
        ...state,
        user_profile: action.payload,
        loading: false,
      };

    case USER_PROFILE_ERROR:
      return {
        ...state,
        user_profile: null,
        error: action.payload || null,
        loading: false,
      };

    case SET_LOADING_USER_PROFILE:
      return {
        ...state,
        loading: true,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };


      case GET_USERS :
        return {
        ...state,
        error: false,
        loading: false,
        users: action.payload,
      };

      case DELETE_USER :
      return  {
        ...state,
        users: state.users.filter(user => {
          return user._id !== action.payload;
        })
      };

      

      case GET_USERS_ERROR:
        return {
        ...state,
        error: action.payload,
        loading: false,
      };


    case SET_LOADING_USERS:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};
