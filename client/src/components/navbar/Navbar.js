import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import {
  Drawer
} from '@mui/material'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "@mui/material";

import SideNavbar from "./SideNavbar";
import DarkMode from '../darkmode/DarkMode'

import logo from "../../resources/images/gotuuLogo.png";
import logoLogin from "../../resources/images/gotuuLogoLogin.png";

const Navbar = ({ goMain, isActive }) => {
  const [loginActive, setLoginActive] = useState(false)
  const location = useLocation();

  useEffect(() => {
    if(location.pathname === '/login'){
      setLoginActive(true)
    }
  }, []);

  const [menu, setMenu] = useState(false);
  const [drawer, setDrawer] = useState(false);

  const verticalMenu = () => {
    setMenu(!menu)
    setDrawer(!drawer);
  };

  const normalMenu = () => {
    setMenu(false);
  };

  return (
    <>
      <div
        className={isActive ? "navbar-active" : "navbar"}
        id='nav'
        ref={goMain}
      >
        <div className='logo cursor_pointer'>
          <img src={logo} alt='Go Tuu logo' />
        </div>
        <div className=''>
          {menu ? (
            <div className='flex_middle'>
              <Tooltip title='Toggle' placement='left'>
                <div>
                  <DarkMode />
                </div>
              </Tooltip>
              <FontAwesomeIcon
                icon={faBars}
                className={"hamburger--tilted"}
                onClick={normalMenu}
                style={{
                  fontSize: 20,
                }}
              />
            </div>
          ) : (
            <div className='flex_middle'>
              <Tooltip title='Toggle' placement='left'>
                <div>
                  <DarkMode />
                </div>
              </Tooltip>
              <Tooltip title='Menu' placement='left'>
                <div>
                  <FontAwesomeIcon
                    icon={faBars}
                    className={"hamburger"}
                    onClick={verticalMenu}
                    style={{
                      fontSize: 20,
                    }}
                  />
                </div>
              </Tooltip>
            </div>
          )}
        </div>
      </div>
      <div>
        <Drawer
          anchor={"right"}
          open={drawer}
          onClose={verticalMenu}
          className='sidebar_nav-right'
        >
          <SideNavbar verticalMenu={verticalMenu} />
        </Drawer>
      </div>
      <div>
        <Drawer
          anchor={"top"}
          open={drawer}
          onClose={verticalMenu}
          className='sidebar_nav-top'
        >
          <SideNavbar verticalMenu={verticalMenu} />
        </Drawer>
      </div>
    </>
  );
};


Navbar.propTypes = {
};

const mapStateToProps = (state) => ({
});

const mapStateToActions = {
};

export default connect(mapStateToProps, mapStateToActions)(Navbar);
