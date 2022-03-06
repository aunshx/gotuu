import React from "react";
import { Link } from "react-router-dom";

import oops from "../../resources/images/oops.png";

const NotFound = () => {
  return (
    <>
      <div className='bg_not_found'></div>
      <div className='not_found'>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100vw",
            height: "100vh",
          }}
        >
          <div className='app crux' style={{ margin: "2em 0" }}>
            <img src={oops} alt='Oops Logo' />
            <div>Looks like you've gone to the unknown</div>
          </div>
          <div className='app'>
            <div className='fourOfour app' style={{ justifyContent: "center" }}>
              <div className='flex_middle'>404</div>
              <div style={{ marginBottom: "1em" }} className='flex_middle'>
                Page Not Found
              </div>
            </div>
          </div>
          <div className='flex_middle'>
            <Link to='/'>
              <button
                className='inputButton'
                style={{
                  margin: "2em",
                  width: "150px",
                  padding: "1em",
                  alignSelf: "center",
                }}
              >
                Go Back
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
