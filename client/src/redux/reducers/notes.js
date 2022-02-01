import {
  // Create new note
  ADD_NEW_NOTE,

  // Add details
  ADD_NOTE_TITLE,
  ADD_NOTE_BODY,
} from "../actions/types";

const initialState = {
  // Note Details 
  noteId: '',
  noteTitle: '',
  noteBody: ''
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_NEW_NOTE:
      return {
        ...state,
        noteId: payload,
      };

    case ADD_NOTE_TITLE:
      return {
        ...state,
        noteTitle: payload,
      };

    case ADD_NOTE_BODY:
      return {
        ...state,
        noteBody: payload,
      };

    default:
      return state;
  }
}
// .
export default authReducer;
