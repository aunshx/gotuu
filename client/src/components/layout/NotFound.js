import React from "react";
import { Link } from "react-router-dom";

import notFound from "../../resources/images/pageNotFound.png";
import logo from "../../resources/images/gotuuLogo.png";

const NotFound = () => {
  return (
    <>
      <div className='center-screen'>
        <div
          className='flexit'
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "black",
            borderRadius: "10px",
            border: "2px solid pink",
            width: "80%",
          }}
        >
          <div
            className='one-more'
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              margin: "0em",
            }}
          >
            <img
              src={logo}
              alt='logo'
              style={{
                width: "20%",
                height: "50%",
                objectFit: "contain",
                margin: "0 -15px",
                marginTop: "0.5em",
              }}
            />
            <h5
              style={{
                color: "pink",
                margin: "0 -15px",
              }}
            >
              Says
            </h5>
            <h1
              style={{
                color: "pink",
                fontSize: "3em",
                margin: "0 -15px",
              }}
            >
              <i> Oops!</i>
            </h1>
          </div>
          <img
            src={notFound}
            alt='Not found'
            style={{
              width: "70%",
              height: "50%",
              objectFit: "contain",
              alignSelf: "center",
            }}
          />
          <Link to='/'>
            <button
              className='inputButton'
              style={{
                margin: "2em",
                width: "10%",
                padding: "1em",
                alignSelf: "center",
              }}
            >
              Go Back
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
