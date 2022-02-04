import { useEffect, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Button } from "@mui/material";

import useSound from "use-sound";
import beep from "../../resources/sounds/reminderBell.mp3";
import beep2 from "../../resources/sounds/reminderBellOneHour.mp3";
import beep3 from "../../resources/sounds/successBellThreeHours.mp3";

const Notif = ({ 
  type,
  // Redux State
  settings: { sound }
 }) => {
  const inputRef = useRef(null)

  const [play] = useSound(beep, { volume: 1 });
  const [playTwo] = useSound(beep2, { volume: 1 });
  const [playThree] = useSound(beep3, { volume: 1 });

  useEffect(() => {
      setTimeout(() => inputRef.current.click(), 1200);
  })

  const playSound = () => {
    if(type === '15'){
      play();
    }
    if(type === '30'){
      play();
    }
    if(type === '60'){
      playTwo();
    }
    if(type === '120'){
      playTwo();
    }
    if(type === '180'){
      playThree();
    }
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