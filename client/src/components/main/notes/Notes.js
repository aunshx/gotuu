import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Scrollbars from "react-custom-scrollbars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faGlobeAsia,
  faStickyNote,
  faFistRaised,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

import SearchNotes from "./SearchNotes";
import SingleNote from "./SingleNote";

import { reChangeDashboardSizing } from "../../../../redux/actions/dashboard";
import { addNote } from "../../../../redux/actions/notes";
import { Tooltip } from "@mui/material";

const renderThumb = ({ style, ...props }) => {
  const thumbStyle = {
    borderRadius: 5,
    backgroundColor: "#d3d3d3",
    width: 4,
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

const CustomScrollbars = (props) => (
  <Scrollbars
    renderThumbHorizontal={renderThumb}
    renderThumbVertical={renderThumb}
    {...props}
  />
);

const Notes = ({
  notes: { searchReturnedNotes, notesArray, pinnedNotesArray },
  reChangeDashboardSizing,
  addNote,
}) => {
  const [input, setInput] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [showNotes, setShowNotes] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  return (
    <>
      <div className='notes_dashboard'>
        {showSearch ? (
          <div>
            <SearchNotes
              input={input}
              setInput={setInput}
              isSelected={isSelected}
              setIsSelected={setIsSelected}
              setShowSearch={setShowSearch}
            />
          </div>
        ) : (
          <div
            className='triple_grid notes_header'
            style={{ borderBottom: "1px solid #696969" }}
          >
            <div className='flex_start_everything'>
              <FontAwesomeIcon
                icon={faStickyNote}
                style={{
                  fontSize: 20,
                  color: "#fca438",
                  transform: "rotate(5deg)",
                }}
              />
              <span
                style={{
                  marginLeft: "0.3em",
                  fontWeight: "bold",
                }}
              >
                <i>NOTES</i>
              </span>
            </div>
            <div className='center_everything'></div>
            <div className='flex_end_everything'>
              <Tooltip title='Add Note' placement='top'>
                <AddIcon
                  style={{
                    fontSize: 22,
                    marginRight: "0.5em",
                  }}
                  onClick={() => addNote()}
                  className='cursor_pointer icon'
                />
              </Tooltip>
              <Tooltip title='Search Notes' placement='top'>
                <SearchIcon
                  style={{
                    fontSize: 22,
                    marginRight: "0.5em",
                  }}
                  onClick={() => setShowSearch(true)}
                  className='cursor_pointer icon'
                />
              </Tooltip>
              <Tooltip title='Close Notes' placement='top'>
                <CloseIcon
                  style={{ fontSize: 22 }}
                  className='cursor_pointer icon_close'
                  onClick={reChangeDashboardSizing}
                />
              </Tooltip>
            </div>
          </div>
        )}
        <div>
          {showNotes ? (
            <div className='notes_array'>
              {pinnedNotesArray
                .map((note, index) => (
                  <>
                    <SingleNote
                      autoOn={pinnedNotesArray.length - 1 === index}
                      id={note.id}
                      title={note.title}
                      details={note.details}
                      key={index}
                      index={index}
                      pinColor={true}
                      isPinned={true}
                    />
                  </>
                ))
                .reverse()}
              {notesArray
                .map((note, index) => (
                  <>
                    <SingleNote
                      autoOn={notesArray.length - 1 === index}
                      id={note.id}
                      title={note.title}
                      details={note.details}
                      key={index}
                      index={index}
                      pinColor={false}
                      isPinned={false}
                    />
                  </>
                ))
                .reverse()}
            </div>
          ) : (
            <>
              {searchReturnedNotes.length > 0 ? (
                <>
                  {searchReturnedNotes.map((note, index) => (
                    <>
                      <SingleNote note={note} key={index} />
                    </>
                  ))}
                </>
              ) : (
                ""
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

Notes.propTypes = {
  notes: PropTypes.object.isRequired,
  reChangeDashboardSizing: PropTypes.func.isRequired,
  addNote: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  notes: state.notes,
});

const mapActionsToProps = {
  reChangeDashboardSizing,
  addNote,
};

export default connect(mapStateToProps, mapActionsToProps)(Notes);
