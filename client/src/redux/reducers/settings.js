import {
  // Sound
  SOUND_STATUS,
  SOUND_OFF,
  SOUND_ON,

  // Alerts
  TEN_SEC_ALERT,
  TEN_MIN_ALERT,
  THIRTY_MIN_ALERT,
  ONE_HOUR_ALERT,
  TWO_HOUR_ALERT,
  THREE_HOUR_ALERT,
  REMINDER_ALERT_RESET,

  // DISPLAY PREFERENCE
  LIGHT_MODE,
  DARK_MODE,

  // Reminders
  REMINDER_STATUS,
  REMINDER_ON,
  REMINDER_OFF,
} from "../actions/types";

const initialState = {
  sound: true,
  tenMinAlert: false,
  thirtyMinAlert: false,
  oneHourAlert: false,
  twoHourAlert: false,
  threeHourAlert: false,
  tenSec: false,
  displayMode: true,
  reminder: true
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // Display Toggle
    case LIGHT_MODE:
      return {
        ...state,
        displayMode: true,
      };

    case DARK_MODE:
      return {
        ...state,
        displayMode: false,
      };

    // Sound Alerts
    case TEN_SEC_ALERT:
      return {
        ...state,
        tenSec: true,
      };
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
        tenMinAlert: false,
        thirtyMinAlert: false,
        oneHourAlert: false,
        twoHourAlert: false,
        threeHourAlert: false,
        tenSec: false,
      };

    // Get Reminder Status
    case REMINDER_STATUS:
      return {
        ...state,
        reminder: payload,
      };

    // Reminder change
    case REMINDER_OFF:
      return {
        ...state,
        reminder: payload,
      };

    case REMINDER_ON:
      return {
        ...state,
        reminder: payload,
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
