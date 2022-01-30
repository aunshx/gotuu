import React from "react";
import { Tooltip } from "@mui/material";

import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";

function QuestionMarkTrigger({ message }) {
  return (
    <>
      <div
        style={{
          marginTop: "0em",
          paddingLeft: "0.3em",
          cursor: "pointer",
          color: "#d6d4d4",
        }}
      >
        <Tooltip title={message} placement='bottom' arrow>
          <NotListedLocationIcon
            style={{
              fontSize: 9,
            }}
          />
        </Tooltip>
      </div>
    </>
  );
}

export default QuestionMarkTrigger;
