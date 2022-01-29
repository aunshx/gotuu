import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";   
import { Link } from "react-router-dom";
// import { logout } from "../../redux/actions/auth";

import CloseIcon from '@mui/icons-material/Close';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBookOpen, faChartBar, faHome, faProjectDiagram, faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "@mui/material";

const SideNavbar = ({ verticalMenu }) => {
    // TODO: Connect this to redux
    const [isAuthenticated, setIsAuthenticated] = useState(false)
  return (
    <div className='side_navbar'>
      <div className='title triple_grid mrg-t-b-1'>
        <div />
        <div className='center_everything'>Navbar</div>
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
                <a href='#timeline'>
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
                <a href='#main'>
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
            <div className='flex_middle mrg-t-b-1'>
              <a href='#timeline'>
                <div className='flex_middle navbar_option'>
                  <div>
                    <FontAwesomeIcon
                      icon={faSignInAlt}
                      style={{ fontSize: 20 }}
                      className='icon'
                    />
                  </div>
                  <div className='mrg-r-point-5 ft-bold link'>Logout</div>
                </div>
              </a>
            </div>
          </div>
        ) : (
          <div className='app'>
            <div className='flex_middle mrg-t-b-1'>
              <a href='#timeline'>
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
              </a>
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

SideNavbar.propTypes = {};

export default SideNavbar;
