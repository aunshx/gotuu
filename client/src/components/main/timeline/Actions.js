import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceD6, faStickyNote } from "@fortawesome/free-solid-svg-icons";

import { deleteNote } from "../../../redux/actions/notes";
import { deleteEvent } from "../../../redux/actions/timeline";

import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

const Actions = ({
  close,
  eventId,
  setReload,
  // Redux Actions
  deleteNote,
  deleteEvent,
  // Redux State
  settings: { displayMode },
}) => {
    const [isNoteHovering, setIsNoteHovering] = useState(false)
    const [isDeleteHovering, setIsDeleteHovering] = useState(false)

  const noteDeletion = (noteId) => {
    deleteEvent(eventId);
    deleteNote(noteId);
    close();
    setReload(false);
  };

  const noteHoveringOn = () => {
      setIsNoteHovering(true)
  }
  const noteHoveringOff = () => {
      setIsNoteHovering(false)
  }
  const deleteHoveringOn = () => {
      setIsDeleteHovering(true)
  }
  const deleteHoveringOff = () => {
      setIsDeleteHovering(false)
  }
  return (
    <div
      className={
        displayMode
          ? "actions-card actions-card--dark ft-bold"
          : "actions-card ft-bold"
      }
    >
      <div className='title flex_middle'>
        <div style={{ marginRight: "0.6em" }}>
          <FontAwesomeIcon icon={faDiceD6} style={{ marginBottom: "1px" }} />
        </div>
        <div>Actions</div>
      </div>
      <div className='flex_evenly'>
        <div
          className={
            isNoteHovering
              ? "actions-one  actions-one-active app"
              : "actions-one app"
          }
          onMouseEnter={noteHoveringOn}
          onMouseLeave={noteHoveringOff}
        >
          <div className='logo'>
            <FontAwesomeIcon icon={faStickyNote} style={{ fontSize: 15 }} />
          </div>
          <div className='title'>Add Note</div>
        </div>
        <div
          className={
            isDeleteHovering
              ? "actions-two  actions-two-active app"
              : "actions-two app"
          }
          onMouseEnter={deleteHoveringOn}
          onMouseLeave={deleteHoveringOff}
        >
          <div className='logo'>
            <DeleteIcon style={{ fontSize: 20 }} />
          </div>
          <div className='title'>Delete Tuu</div>
        </div>
      </div>
    </div>
  );
};

Actions.propTypes = {
  settings: PropTypes.object.isRequired,
  timeline: PropTypes.object.isRequired,
  deleteNote: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  settings: state.settings,
  timeline: state.timeline,
});

const mapActionsToProps = {
  deleteNote,
  deleteEvent,
};

export default connect(mapStateToProps, mapActionsToProps)(Actions);
