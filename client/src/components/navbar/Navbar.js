import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  Drawer
} from '@mui/material'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "@mui/material";

import logo from "../../resources/images/gotuuLogo.png";
import SideNavbar from "./SideNavbar";

const Navbar = ({ goMain, isActive }) => {
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
            <FontAwesomeIcon
              icon={faBars}
              className='hamburger--tilted'
              onClick={normalMenu}
              style={{
                color: "#25c6f7",
              }}
              style={{
                fontSize: 20,
              }}
            />
          ) : (
            <Tooltip title='Menu' placement='left'>
              <div>
                <FontAwesomeIcon
                  icon={faBars}
                  className='hamburger'
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
        <SideNavbar
          verticalMenu={verticalMenu}
        />
      </Drawer>
    </>
  );
};

Navbar.propTypes = {};

export default Navbar;