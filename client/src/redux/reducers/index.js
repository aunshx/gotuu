import { combineReducers } from "redux";
import auth from "./auth";
import timeline from "./timeline";
import snackbar from "./snackbar";
import metrics from "./metrics";


export default combineReducers({
  auth,
  timeline,
  snackbar,
  metrics
});
