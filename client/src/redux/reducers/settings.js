import {
  // Sound
  SOUND_STATUS,
  SOUND_OFF,
  SOUND_ON,

  // Alerts
  TEN_MIN_ALERT,
  THIRTY_MIN_ALERT,
  ONE_HOUR_ALERT,
  TWO_HOUR_ALERT,
  THREE_HOUR_ALERT,
  REMINDER_ALERT_RESET,
} from "../actions/types";

const initialState = {
  sound: true,
  tenMinAlert: false,
  thirtyMinAlert: false,
  oneHourAlert: false,
  twoHourAlert: false,
  threeHourAlert: false
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // Sound Alerts
    case TEN_MIN_ALERT:
      return {
        ...state,
        tenMinAlert: true,
      };
    case THIRTY_MIN_ALERT:
      return {
        ...state,
        thirtyMinAlert: true,
      };
    case ONE_HOUR_ALERT:
      return {
        ...state,
        oneHourAlert: true,
      };
    case TWO_HOUR_ALERT:
      return {
        ...state,
        twoHourAlert: true,
      };
    case THREE_HOUR_ALERT:
      return {
        ...state,
        threeHourAlert: true,
      };
    case REMINDER_ALERT_RESET:
      return {
        ...state,
        sound: true,
        tenMinAlert: false,
        thirtyMinAlert: false,
        oneHourAlert: false,
        twoHourAlert: false,
        threeHourAlert: false,
      };

    // Get Sound Status
    case SOUND_STATUS:
      return {
        ...state,
        sound: payload,
      };

    // Sound change
    case SOUND_OFF:
      return {
        ...state,
        sound: payload,
      };

    case SOUND_ON:
      return {
        ...state,
        sound: payload,
      };
    default:
      return state;
  }
}

export default authReducer;
