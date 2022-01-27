import React, { useState } from "react";
import PropTypes from "prop-types";
// import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "@mui/material";

import logo from "../resources/images/gotuuLogo.png";

const Navbar = (props) => {
  const [menu, setMenu] = useState(false);

  const verticalMenu = () => {
    setMenu(true);
  };

  const normalMenu = () => {
    setMenu(false);
  };

  return (
    <div className='navbar'>
      {/* <NavLink to='/home'> */}
      <div className='logo cursor_pointer'>
        <img src={logo} alt='Go Tuu logo' />
        {/* <div className='logo'>YE</div> */}
      </div>
      {/* </NavLink> */}
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
  );
};

Navbar.propTypes = {};

export default Navbar;
