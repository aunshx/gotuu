import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import useSound from "use-sound";
import beep from "../../resources/sounds/reminderBell.mp3";
import { Button } from "@mui/material";
import { useCallback } from "react";

let map = new Map([
  ['soundState', false]
])

const Notif = ({ 
  // Redux State
  settings: { sound }
 }) => {
  const inputRef = useRef(null)

  const [play] = useSound(beep, { volume: 1 });

  useEffect(() => {
      inputRef.current.click()
  })

  const playSound = () => {
    play()
  }

  const dontPlaySound = () =>{
  }

  return <Button onClick={sound ? playSound : dontPlaySound} ref={inputRef} />
}

Notif.propTypes = {
  settings: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  settings: state.settings,
});

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(Notif);