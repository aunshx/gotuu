import { useEffect, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import useSound from "use-sound";
import beep from "../../resources/sounds/reminderBell.mp3";
import { Button } from "@mui/material";

const Notif = ({ 
  // Redux State
  settings: { sound }
 }) => {
  const inputRef = useRef(null)

  const [play] = useSound(beep, { volume: 1 });

  useEffect(() => {
      setTimeout(() => inputRef.current.click(), 1300);
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