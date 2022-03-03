import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal, Fade, Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceD6, faStickyNote } from "@fortawesome/free-solid-svg-icons";

import { createNewNote } from "../../../redux/actions/notes";

import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

import Note from '../notes/Note'
import NoteNew from "../notes/NoteNew";
import DeleteWarningTimeline from "../notes/DeleteWarningTimeline";

const style = {
  position: "fixed",
  top: "50%",
  left: "48%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 2,
  border: "none",
  p: 4,
};

const Actions = ({
  close,
  eventId,
  // Redux Actions
  createNewNote,
  // Redux State
  settings: { displayMode },
  notes: { noteId }
}) => {
    const [isNoteHovering, setIsNoteHovering] = useState(false)
    const [isDeleteHovering, setIsDeleteHovering] = useState(false)
    const [isNoteOpen, setIsNoteOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

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

  const closeNote = () => {
      setIsNoteOpen(false)
  }

  const openNote = () => {
      createNewNote(eventId)
      setIsNoteOpen(true)
  }

  const openDelete = () => {
      setIsDeleteOpen(true)
  }
  const closeDelete = () => {
      setIsDeleteOpen(false)
  }
  return (
    <>
      <div
        className={
          displayMode
            ? "actions-card"
            : "actions-card actions-card--dark ft-bold"
        }
      >
        <div className='triple_grid'>
          <div></div>
          <div className='title flex_middle'>
            <div style={{ marginRight: "0.6em" }}>
              <FontAwesomeIcon
                icon={faDiceD6}
                style={{ marginBottom: "1px" }}
              />
            </div>
            <div>Actions</div>
          </div>
          <div className='flex_right cursor_pointer'>
            <CloseIcon
              className='cancel'
              style={{ fontSize: 15 }}
              onClick={close}
            />
          </div>
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
            onClick={openNote}
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
            onClick={openDelete}
          >
            <div className='logo'>
              <DeleteIcon style={{ fontSize: 20 }} />
            </div>
            <div className='title'>Delete Tuu</div>
          </div>
        </div>
      </div>
      <Modal
        open={isNoteOpen}
        onClose={closeNote}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
          style: {
            backgroundColor: "rgba(0,0,0,0.8)",
          },
        }}
      >
        <Fade in={isNoteOpen}>
          <Box style={style}>
            <NoteNew close={closeNote} eventId={eventId} />
          </Box>
        </Fade>
      </Modal>
      <Modal
        open={isDeleteOpen}
        onClose={closeDelete}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
          style: {
            backgroundColor: "rgba(0,0,0,0.8)",
          },
        }}
      >
        <Fade in={isDeleteOpen}>
          <Box style={style}>
            <DeleteWarningTimeline
              close={closeDelete}
              completeClose={close}
              eventId={eventId}
              noteId={noteId}
            />
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

Actions.propTypes = {
  settings: PropTypes.object.isRequired,
  timeline: PropTypes.object.isRequired,
  notes: PropTypes.object.isRequired,
  createNewNote: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  settings: state.settings,
  timeline: state.timeline,
  notes: state.notes,
});

const mapActionsToProps = {
  createNewNote,
};

export default connect(mapStateToProps, mapActionsToProps)(Actions);
