import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";

import { Tooltip, TextField, Modal, Fade, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

import DeleteWarning from "./DeleteWarning";

import {
  sendNoteDataBody,
  sendNoteTitle,
} from "../../../redux/actions/notes";

const CssTextField = styled(TextField, {
  shouldForwardProp: (props) => props !== "focusColor",
})((p) => ({
  // input label when focused
  "& label.Mui-focused": {
    color: "none",
    border: "none",
  },
  // focused color for input with variant='outlined'
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "none",
      fontSize: "0.9em",
    },
  },
  border: "transparent",
}));

const useStyles = makeStyles(() => ({
  noBorder: {
    border: "none",
  },
}));

const style = {
  position: "fixed",
  top: "50%",
  left: "48%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  border: "none",
  p: 4,
};

const TimelineNote = ({
  noteDetails,
  close,
  eventId,
  dateSelected,
  setReload,
  // Redux Actions
  sendNoteDataBody,
  sendNoteTitle,
}) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOkay, setIsEditOkay] = useState(false)
  const [noTitleError, setNoTitleError] = useState(false);

  const textAttitude = useStyles();

  const CHARACTER_LIMIT = 250;

  const openDeleteBox = () => {
    setIsDeleteOpen(true);
  };

  const closeDeleteBox = () => {
    setIsDeleteOpen(false);
  };

  const onChange = (noteId, e) => {
    let titleContent = "";
    let bodyContent = "";

    if (e.target.name === "noteTitle") {
      titleContent = e.target.value;
      noteDetails.title = titleContent
      sendNoteTitle(noteId, titleContent, bodyContent);
    }
    if (e.target.name === "noteBody") {
      bodyContent = e.target.value;
      noteDetails.body = bodyContent;
      sendNoteDataBody(noteId, bodyContent);
    }
  };

  const startEdit = () => {
    setIsEditOkay(true)
  }

  const stopEdit = () => {
    if (noteDetails.title <= 0) {
      setNoTitleError(true);
      setTimeout(() => setNoTitleError(false), 4000);
    } else {
      setIsEditOkay(false);
    }
  }

  const closeNote = () => {
    if(noteDetails.title <= 0){
      setNoTitleError(true);
      setTimeout(() => setNoTitleError(false), 4000);
    } else {
      setIsEditOkay(false);
      close();
    }
  }

  return (
    <>
      <div className={"single_note_1_timeline"} data-aos='zoom-in-left'>
        {isEditOkay ? (
          <div className='title-single-note'>
            <input
              name='noteTitle'
              value={noteDetails.title}
              autoFocus={true}
              onChange={(e) => onChange(noteDetails._id, e)}
              placeholder='Title'
            />
          </div>
        ) : (
          <div className='title-single-note'>{noteDetails.title}</div>
        )}
        <div className='body app'>
          {noTitleError && (
            <div className='errors flex_middle'>Title cannot be empty!</div>
          )}
          <CssTextField
            fullWidth
            multiline
            disabled={!isEditOkay}
            placeholder='Details'
            inputProps={{
              maxLength: CHARACTER_LIMIT,
              style: {
                fontSize: "0.85em",
              },
            }}
            InputProps={{
              classes: { notchedOutline: textAttitude.noBorder },
            }}
            style={{
              border: "none",
            }}
            name='noteBody'
            value={noteDetails.body}
            onChange={(e) => onChange(noteDetails._id, e)}
          />
        </div>
        <div className='note-footer'>
          <div style={{ fontSize: "0.8em" }}>
            {moment(noteDetails.createdAt).format("hh:mm a")}
          </div>
          <div style={{ fontSize: "0.9em" }}>
            {moment(noteDetails.createdAt).format("DD/MM/YYYY")}
          </div>
          <div className='flex_middle' style={{ marginTop: "0.3em" }}>
            <div>
              <Tooltip
                title='Minimize'
                style={{ fontSize: 22 }}
                className='icons'
              >
                <CloseIcon onClick={closeNote} />
              </Tooltip>
            </div>
            <div>
              {isEditOkay ? (
                <Tooltip
                  title='Edit'
                  style={{ fontSize: 18 }}
                  className='icons-active'
                >
                  <EditIcon onClick={stopEdit} />
                </Tooltip>
              ) : (
                <Tooltip
                  title='Edit'
                  style={{ fontSize: 18 }}
                  className='icons'
                >
                  <EditIcon onClick={startEdit} />
                </Tooltip>
              )}
            </div>
            <div>
              <Tooltip
                title='Delete Note'
                style={{ fontSize: 18 }}
                className='icons'
              >
                <DeleteIcon onClick={openDeleteBox} />
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={isDeleteOpen}
        onClose={closeDeleteBox}
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
            <DeleteWarning
              close={closeDeleteBox}
              noteId={noteDetails._id}
              eventId={eventId}
              dateSelected={dateSelected}
              setReload={setReload}
            />
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

TimelineNote.propTypes = {
  sendNoteDataBody: PropTypes.func.isRequired,
  sendNoteTitle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
});

const mapActionsToProps = {
  sendNoteDataBody,
  sendNoteTitle,
};

export default connect(mapStateToProps, mapActionsToProps)(TimelineNote);
