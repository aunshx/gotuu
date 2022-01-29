import { combineReducers } from "redux";
import auth from "./auth";
import timeline from "./timeline";
import snackbar from "./snackbar";


export default combineReducers({
  auth,
  timeline,
  snackbar,
});
