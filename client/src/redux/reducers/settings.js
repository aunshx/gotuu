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

  // Individual Reminders
  REMINDER_THREE_HOUR_ON,
  REMINDER_TWO_HOUR_ON,
  REMINDER_ONE_HOUR_ON,
  REMINDER_FIFTEEN_MIN_ON,
  REMINDER_THIRTY_MIN_ON,
  REMINDER_THREE_HOUR_OFF,
  REMINDER_TWO_HOUR_OFF,
  REMINDER_ONE_HOUR_OFF,
  REMINDER_FIFTEEN_MIN_OFF,
  REMINDER_THIRTY_MIN_OFF,
  REMINDER_THIRTY_MIN_STATUS,
  REMINDER_FIFTEEN_MIN_STATUS,
  REMINDER_ONE_HOUR_STATUS,
  REMINDER_TWO_HOUR_STATUS,
  REMINDER_THREE_HOUR_STATUS,
} from "../actions/types";

const initialState = {
  // Sound
  sound: true,

  // Alerts
  tenMinAlert: false,
  thirtyMinAlert: false,
  oneHourAlert: false,
  twoHourAlert: false,
  threeHourAlert: false,
  tenSec: false,
  displayMode: true,

  // Reminders
  reminder: true,
  reminderFifteenMin: false,
  reminderThirtyMin: false,
  reminderOneHour: false,
  reminderTwoHour: false,
  reminderThreeHour: false,
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
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

    // 15 Min
    case REMINDER_FIFTEEN_MIN_STATUS:
      return {
        ...state,
        reminderFifteenMin: payload,
      };

    case REMINDER_FIFTEEN_MIN_ON:
      return {
        ...state,
        reminderFifteenMin: payload,
      };

    case REMINDER_FIFTEEN_MIN_OFF:
      return {
        ...state,
        reminderFifteenMin: payload,
      };

    // 30 Min
    case REMINDER_THIRTY_MIN_STATUS:
      return {
        ...state,
        reminderThirtyMin: payload,
      };

    case REMINDER_THIRTY_MIN_ON:
      return {
        ...state,
        reminderThirtyMin: payload,
      };

    case REMINDER_THIRTY_MIN_OFF:
      return {
        ...state,
        reminderThirtyMin: payload,
      };

    // 1 Hour
    case REMINDER_ONE_HOUR_STATUS:
      return {
        ...state,
        reminderOneHour: payload,
      };

    case REMINDER_ONE_HOUR_ON:
      return {
        ...state,
        reminderOneHour: payload,
      };

    case REMINDER_ONE_HOUR_OFF:
      return {
        ...state,
        reminderOneHour: payload,
      };

    // 2 Hour
    case REMINDER_TWO_HOUR_STATUS:
      return {
        ...state,
        reminderTwoHour: payload,
      };

    case REMINDER_TWO_HOUR_ON:
      return {
        ...state,
        reminderTwoHour: payload,
      };

    case REMINDER_TWO_HOUR_OFF:
      return {
        ...state,
        reminderTwoHour: payload,
      };

    // 3 Hour
    case REMINDER_THREE_HOUR_STATUS:
      return {
        ...state,
        reminderThreeHour: payload,
      };

    case REMINDER_THREE_HOUR_ON:
      return {
        ...state,
        reminderThreeHour: payload,
      };

    case REMINDER_THREE_HOUR_OFF:
      return {
        ...state,
        reminderThreeHour: payload,
      };

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
