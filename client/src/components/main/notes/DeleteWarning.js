import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkullCrossbones } from "@fortawesome/free-solid-svg-icons";

import { deleteNote } from "../../../redux/actions/notes";
import { deleteEvent } from "../../../redux/actions/timeline";

const DeleteWarning = ({
  close,
  noteId,
  eventId,
  setReload,
  // Redux Actions
  deleteNote,
  deleteEvent,
  // Redux State
  settings: { displayMode },
}) => {
  const noteDeletion = (noteId) => {
    deleteEvent(eventId);
    deleteNote(noteId);
    close();
    setReload(false)
  };
  return (
    <div
      className={
        displayMode
          ? "delete-card delete-card--dark ft-bold app"
          : "delete-card ft-bold app"
      }
      style={{ justifyContent: "space-around" }}
    >
      <div className='title flex_middle'>
        <div style={{ marginRight: "0.6em" }}>
          <FontAwesomeIcon
            icon={faSkullCrossbones}
            style={{ marginBottom: "1px" }}
          />
        </div>
        <div>Warning!</div>
      </div>
      <div style={{ marginTop: "1em" }}>
        Are you sure you want to delete this note? This will cause you to lose
        the note along with the Tuu details.
      </div>
      <div className='flex_right' style={{ width: "100%" }}>
        <div className='flex_middle' style={{ marginTop: "1.5em" }}>
          <div style={{ marginRight: "1.3em" }}>
            <button
              className='button-yes flex_middle'
              onClick={() => noteDeletion(noteId)}
            >
              <div className='flex_middle'>
                <div>Yes</div>
              </div>
            </button>
          </div>
          <div>
            <button className='button-no' onClick={() => close()}>
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

DeleteWarning.propTypes = {
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

export default connect(mapStateToProps, mapActionsToProps)(DeleteWarning);
