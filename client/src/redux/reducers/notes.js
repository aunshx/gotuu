import {
  // Create new note
  ADD_NEW_NOTE,

  // Add details
  ADD_NOTE_TITLE,
  ADD_NOTE_BODY,

  // Note complete 
  NOTE_COMPLETE,
  NOTE_INCOMPLETE
} from "../actions/types";

const initialState = {
  // Note Details 
  noteId: '',
  noteTitle: '',
  noteBody: '',
  noteComplete: false
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // Note completion 
    case NOTE_INCOMPLETE:
    return {
      ...state,
      noteComplete: false
    }

    case NOTE_COMPLETE:
    return {
      ...state,
      noteComplete: true
    }

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
