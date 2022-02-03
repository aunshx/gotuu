import { combineReducers } from "redux";
import auth from "./auth";
import timeline from "./timeline";
import snackbar from "./snackbar";
import metrics from "./metrics";
import notes from "./notes";
import settings from "./settings";

export default combineReducers({
  auth,
  timeline,
  snackbar,
  metrics,
  notes,
  settings,
});
