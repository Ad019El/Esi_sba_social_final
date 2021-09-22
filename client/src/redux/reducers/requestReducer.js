import {
    REQUEST_SUCCESS,
    REQUEST_FAIL,
    SET_LOADING_REQUESTS,
    GET_REQUESTS,
    GET_REQUESTS_ERROR,
    CLEAR_REQUESTS,
    TOGGLE_FAV_ERROR,
    CLEAR_ERRORS,
    APPROVE_REQUEST,
    DELETE_REQUEST,
        } from '../types';
  
  
    const initialState = {
      requests: null,
      loading: false,
      error: null,
      error_fav: null,
    };
    

  export default (state = initialState, action) => {
    switch (action.type) {
      
      case REQUEST_SUCCESS :
        return {
          ...state,
          ...action.payload,
          loading: false,
        };


      case REQUEST_FAIL:
        return {
        ...state,
        loading: false,
        request: null,
        error: action.payload || null,
        };
      
      
      case CLEAR_REQUESTS:
        return {
        ...state,
        requests: null,
      };


      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
        

      case GET_REQUESTS :
        return {
        ...state,
        error: false,
        loading: false,
        requests: action.payload,
      };
      

      case GET_REQUESTS_ERROR:
        return {
        ...state,
        error: action.payload,
        loading: false,
      };


    case SET_LOADING_REQUESTS:
      return {
        ...state,
        loading: true,
      };

    case APPROVE_REQUEST :
      return  {
        ...state,
        requests: state.requests.filter(request => {
          return request._id !== action.payload;
        })
      };


    case DELETE_REQUEST :
      return  {
        ...state,
        requests: state.requests.filter(request => {
          return request._id !== action.payload;
        })
      };


    case TOGGLE_FAV_ERROR:
      return {
          ...state,
          error_fav: action.payload,
        };


        default:
        return state;
  }
};

