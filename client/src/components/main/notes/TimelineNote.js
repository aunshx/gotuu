import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";

import { Tooltip, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

import {
  deleteNote,
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


const TimelineNote = ({
  noteDetails,
  close,
  // Redux Actions
  deleteNote,
  // Redux State
}) => {
  const textAttitude = useStyles();

  const CHARACTER_LIMIT = 250;

  const deleteTheNote = (noteId) => {
    deleteNote(noteId);
    close();
  };

  return (
    <>
      <div className={"single_note_1_timeline"} data-aos='zoom-in-left'>
        <div className='title-single-note'>
          {noteDetails.title}
        </div>
        <div className='body'>
          <CssTextField
            fullWidth
            multiline
            disabled={true}
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
                <CloseIcon onClick={() => close()} />
              </Tooltip>
            </div>
            <div>
              <Tooltip
                title='Delete Note'
                style={{ fontSize: 18 }}
                className='icons'
              >
                <DeleteIcon onClick={() => deleteTheNote(noteDetails._id)} />
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

TimelineNote.propTypes = {
  notes: PropTypes.object.isRequired,
  deleteNote: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
});

const mapActionsToProps = {
  deleteNote,
};

export default connect(mapStateToProps, mapActionsToProps)(TimelineNote);
