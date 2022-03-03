import React, { useState }  from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";

import { Tooltip, TextField, Modal, Fade, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  deleteNote,
  sendNoteDataBody,
  sendNoteTitle,
} from "../../../redux/actions/notes";
import DeleteWarning from "./DeleteWarning";

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

const Note = ({ close, 
  // Redux Actions
  deleteNote,
  sendNoteDataBody,
  sendNoteTitle,
  // Redux State
  notes: { noteId, noteTitle, noteBody } 
}) => {
  const textAttitude = useStyles();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [noTitleError, setNoTitleError] = useState(false);

  const CHARACTER_LIMIT = 250;

  const onChange = (noteId, e) => {
    let titleContent = ''
    let bodyContent = ''

    if (e.target.name === "noteTitle") {
       titleContent = e.target.value;
      sendNoteTitle(noteId, titleContent, bodyContent);
    }
    if (e.target.name === "noteBody") {
      bodyContent = e.target.value;
      sendNoteDataBody(noteId, bodyContent);
    }
  };

  const openDeleteBox = () => {
    setIsDeleteOpen(true);
  };

  const closeDeleteBox = () => {
    setIsDeleteOpen(false);
  };

  const closeNote = () => {
    if (noteTitle.length <= 0) {
      setNoTitleError(true);
      setTimeout(() => setNoTitleError(false), 4000);
    } else {
      close();
    }
  };

  // const handleSpace = (e) => {
  //   if(e.keyCode === 32){
  //     if(map.get("element") === '1. ' || map.get("element") === '1) ' || map.get("element") === '- ' || map.get("element") === 'a. ' || map.get("element") === 'a) ' || map.get("element") === 'A. ' || map.get("element") === 'A) ' || map.get("element") === '-> '){
  //       console.log('It is checked', map.get("element"))
  //     }
  //   }
  //   if(e.keyCode === 13){
  //     // setCheckingList('Hello My boys')
  //     map.set("element", '')
  //     console.log(map);
  //   }
  // }

  return (
    <>
      <div className={"single_note_1"} data-aos='fade-up'>
        <div className='title'>
          <input
            name='noteTitle'
            value={noteTitle}
            autoFocus={true}
            onChange={(e) => onChange(noteId, e)}
            placeholder='Title'
          />
        </div>
        <div className='body app'>
          {noTitleError && (
            <div className='errors flex_middle'>Title cannot be empty!</div>
          )}
          <CssTextField
            fullWidth
            multiline
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
            value={noteBody}
            onChange={(e) => onChange(noteId, e)}
            error={noteBody.length > CHARACTER_LIMIT - 1}
          />
        </div>
        <div className='note-footer'>
          <div style={{ fontSize: "0.8em" }}>
            {!(noteBody.length > CHARACTER_LIMIT - 1)
              ? `${noteBody.length}/${CHARACTER_LIMIT}`
              : "Length exceeded"}
          </div>
          <div style={{ fontSize: "0.9em" }}>
            {moment(new Date()).format("DD/MM/YYYY")}
          </div>
          <div className='flex_middle' style={{ marginTop: "0.3em" }}>
            <div>
              <Tooltip
                title='Minimize'
                style={{ fontSize: 22 }}
                className='icons'
              >
                <ExpandMoreIcon onClick={closeNote} />
              </Tooltip>
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
            <DeleteWarning close={closeDeleteBox} noteId={noteId} />
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

Note.propTypes = {
  notes: PropTypes.object.isRequired,
  deleteNote: PropTypes.func.isRequired,
  sendNoteDataBody: PropTypes.func.isRequired,
  sendNoteTitle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  notes: state.notes
});

const mapActionsToProps = {
  deleteNote,
  sendNoteDataBody,
  sendNoteTitle,
};

export default connect(mapStateToProps, mapActionsToProps)(Note);
