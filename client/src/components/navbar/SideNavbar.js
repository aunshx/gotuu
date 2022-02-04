import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";   
import { Link } from "react-router-dom";

import CloseIcon from '@mui/icons-material/Close';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBookOpen, faChartBar, faDoorOpen, faHome, faProjectDiagram, faSignInAlt, faVolumeMute, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { Collapse, IconButton, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";

import { logout } from "../../redux/actions/auth";
import { setSoundOn, setSoundOff } from "../../redux/actions/settings";
import NavRem from '../popup/NavRem';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  width: "1em",
  height: "1em",
  color: "white",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));


const SideNavbar = ({
  verticalMenu,
  // Redux States
  auth: { isAuthenticated, user },
  settings: { sound },
  // Redux Actions
  logout,
  setSoundOn,
  setSoundOff
}) => {
  const [name, setName] = useState('')
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if(user !== null){
      setName(user.name.split(" ")[0]);
    } else {
      setName('')
    }
  },[])

  const soundOn = () => {
    setSoundOn()
  }

  const soundOff = () => {
    setSoundOff()
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className='side_navbar'>
      <div className='title triple_grid mrg-t-b-1'>
        <div />
        <div className='center_everything'>Hi! {name}</div>
        <div className='center_everything' style={{ marginTop: "0.2em" }}>
          <CloseIcon
            className='cancel cursor_pointer'
            style={{ fontSize: 18 }}
            onClick={verticalMenu}
          />
        </div>
      </div>
      <div className='app'>
        {isAuthenticated ? (
          <div className='app'>
            <div>
              <div className='flex_middle mrg-t-b-1'>
                <a href='#nav'>
                  <div className='flex_middle navbar_option'>
                    <div>
                      <FontAwesomeIcon
                        icon={faHome}
                        style={{ fontSize: 20 }}
                        className='icon'
                      />
                    </div>
                    <div className='mrg-r-point-5 ft-bold link'>Home</div>
                  </div>
                </a>
              </div>
            </div>
            <div>
              <div className='flex_middle mrg-t-b-1'>
                <a href='#timeline'>
                  <div className='flex_middle navbar_option'>
                    <div>
                      <FontAwesomeIcon
                        icon={faProjectDiagram}
                        style={{ fontSize: 20 }}
                        className='icon'
                      />
                    </div>
                    <div className='mrg-r-point-5 ft-bold link'>Timeline</div>
                  </div>
                </a>
              </div>
            </div>
            <div>
              <div className='flex_middle mrg-t-b-1'>
                <a href='#metrics'>
                  <div className='flex_middle navbar_option'>
                    <div>
                      <FontAwesomeIcon
                        icon={faChartBar}
                        style={{ fontSize: 20 }}
                        className='icon'
                      />
                    </div>
                    <div className='mrg-r-point-5 ft-bold link'>Metrics</div>
                  </div>
                </a>
              </div>
            </div>
            <div>
              <div className='flex_middle mrg-t-b-1'>
                <div className='flex_middle navbar_option'>
                  {sound ? (
                    <div
                      onClick={soundOff}
                      className='flex_middle cursor_pointer'
                    >
                      <div>
                        <FontAwesomeIcon
                          icon={faVolumeUp}
                          style={{ fontSize: 18 }}
                          className='icon'
                        />
                      </div>
                      <div className='mrg-r-point-5 ft-bold link'>Sound On</div>
                    </div>
                  ) : (
                    <div
                      onClick={soundOn}
                      className='flex_middle cursor_pointer'
                    >
                      <div>
                        <FontAwesomeIcon
                          icon={faVolumeMute}
                          style={{ fontSize: 18 }}
                          className='icon'
                        />
                      </div>
                      <div className='mrg-r-point-5 ft-bold link'>
                        Sound Off
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div>
              <div className='flex_middle mrg-t-b-1'>
                <div
                  className='flex_middle navbar_option cursor_pointer'
                  onClick={handleExpandClick}
                >
                  <div>
                    <FontAwesomeIcon
                      icon={faBell}
                      style={{ fontSize: 20 }}
                      className='icon'
                    />
                  </div>
                  <div className='mrg-r-point-5 ft-bold link'>Reminders</div>
                </div>
              </div>
            </div>
            <div className=''>
              <Collapse
                in={expanded}
                timeout='auto'
                unmountOnExit
                style={{
                  padding: 0,
                }}
              >
                <div>
                  <NavRem />
                </div>
              </Collapse>
            </div>
            <div className='flex_middle mrg-t-b-1'>
              <div
                className='flex_middle navbar_option cursor_pointer'
                onClick={() => logout()}
              >
                <div>
                  <FontAwesomeIcon
                    icon={faSignInAlt}
                    style={{ fontSize: 20 }}
                    className='icon'
                  />
                </div>
                <div className='mrg-r-point-5 ft-bold link'>Logout</div>
              </div>
            </div>
          </div>
        ) : (
          <div className='app'>
            <div>
              <div className='flex_middle mrg-t-b-1'>
                <Link to='/'>
                  <div className='flex_middle navbar_option'>
                    <div>
                      <FontAwesomeIcon
                        icon={faHome}
                        style={{ fontSize: 20 }}
                        className='icon'
                      />
                    </div>
                    <div className='mrg-r-point-5 ft-bold link'>Home</div>
                  </div>
                </Link>
              </div>
            </div>
            <div className='flex_middle mrg-t-b-1'>
              <Link to='/about'>
                <div className='flex_middle navbar_option'>
                  <div>
                    <FontAwesomeIcon
                      icon={faBookOpen}
                      style={{ fontSize: 20 }}
                      className='icon'
                    />
                  </div>
                  <div className='mrg-r-point-5 ft-bold link'>About</div>
                </div>
              </Link>
            </div>
            <div className='flex_middle mrg-t-b-1'>
              <Link to='/register'>
                <div className='flex_middle navbar_option'>
                  <div>
                    <FontAwesomeIcon
                      icon={faDoorOpen}
                      style={{ fontSize: 20 }}
                      className='icon'
                    />
                  </div>
                  <div className='mrg-r-point-5 ft-bold link'>Register</div>
                </div>
              </Link>
            </div>
            <div className='flex_middle mrg-t-b-1'>
              <Link to='/login'>
                <div className='flex_middle navbar_option'>
                  <div>
                    <FontAwesomeIcon
                      icon={faSignInAlt}
                      style={{ fontSize: 20 }}
                      className='icon'
                    />
                  </div>
                  <div className='mrg-r-point-5 ft-bold link'>Login</div>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

SideNavbar.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  setSoundOn: PropTypes.func.isRequired,
  setSoundOff: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  settings: state.settings,
  auth: state.auth
})

const mapActionsToProps = {
  setSoundOn,
  setSoundOff,
  logout
}

export default connect(mapStateToProps, mapActionsToProps)(SideNavbar);
