import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Spinner = ({ color, size }) => {
  return (
    <>
      <div className='main flex_middle'>
        <div className='spinner'></div>
      </div>
    </>
  );
};

export default Spinner;
