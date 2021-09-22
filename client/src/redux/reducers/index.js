import { combineReducers } from "redux";

import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import userReducer from "./userReducer";
import requestReducer from "./requestReducer";
import budgetReducer from "./budgetReducer";
import meetingReducer from "./meetingReducer";

export default combineReducers({
  auth: authReducer,
  alerts: alertReducer,
  user: userReducer,
  request: requestReducer,
  budget: budgetReducer,
  meeting: meetingReducer,
});
