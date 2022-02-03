import { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import useSound from "use-sound";
import beep from "../../resources/sounds/reminderBell.mp3";

let map = new Map([
  ['soundState', false]
])

const Notif = ({ 
  // Redux State
  settings: { sound }
 }) => {
  const [play] = useSound(beep, { interrupt: true });
  const [soundState, setSoundState] = useState(false)

  useEffect(() => map.set('soundState', sound), [])

  useEffect(() => {
    if(map.get('soundState')){
      play();
      console.log('FIRE')
    }
    console.log('NOT FIRED')
  }, [play]);
  return null;
}

Notif.propTypes = {
  settings: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  settings: state.settings,
});

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(Notif);