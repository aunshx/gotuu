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
          <img src={loginActive ? logoLogin : logo} alt='Go Tuu logo' />
        </div>
        <div className=''>
          {menu ? (
            <FontAwesomeIcon
              icon={faBars}
              className={
                loginActive ? "hamburger--tilted-login" : "hamburger--tilted"
              }
              onClick={normalMenu}
              style={{
                fontSize: 20,
              }}
            />
          ) : (
            <Tooltip title='Menu' placement='left'>
              <div>
                <FontAwesomeIcon
                  icon={faBars}
                  className={loginActive ? "hamburger-login" : "hamburger"}
                  onClick={verticalMenu}
                  style={{
                    fontSize: 20,
                  }}
                />
              </div>
            </Tooltip>
          )}
        </div>
      </div>
      <Drawer anchor={"right"} open={drawer} onClose={verticalMenu}>
        <SideNavbar verticalMenu={verticalMenu} />
      </Drawer>
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
