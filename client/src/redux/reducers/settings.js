import {
  // Sound
  SOUND_STATUS,
  SOUND_OFF,
  SOUND_ON,
} from "../actions/types";

const initialState = {
  sound: true,
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
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
