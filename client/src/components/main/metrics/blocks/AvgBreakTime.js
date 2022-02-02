import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
import SnoozeIcon from "@mui/icons-material/Snooze";
import QuestionMarkTrigger from "./QuestionMarkTrigger";

const message = "Average duration of breaks taken between 2 tuus";

const AvgBreakTime = ({ data, loading }) => {
   const [messageOne, setMessageOne] = useState(false);
   const [messageTwo, setMessageTwo] = useState(false);
   const [messageThree, setMessageThree] = useState(false);

   useEffect(() => {
     console.log(data)
     if (data <= 1800000) {
       setMessageThree(false);
       setMessageOne(true);
       setMessageTwo(false);
     }

     if (1800000 < data && data <= 3600000) {
       setMessageThree(false);
       setMessageOne(false);
       setMessageTwo(true);
     }

     if (3600000 < data) {
       setMessageThree(true);
       setMessageOne(false);
       setMessageTwo(false);
     }
   }, [data]);

  return (
    <div className='progress_blocks_main'>
      <div className='progress_blocks_individual_headers'>
        <div>Synopsis</div>
        <QuestionMarkTrigger message={message} />
      </div>
      <div className=''>
        <div className='flex_left'>
          <div style={{ padding: "10px 5px 10px 15px", fontSize: "0.9em" }}>
            {messageOne && (
              <div>
                You like to work in{" "}
                <span className='ft-bold' style={{ color: "#d13328" }}>
                  short
                </span>{" "}
                and{" "}
                <span className='ft-bold' style={{ color: "#d13328" }}>
                  intense
                </span>{" "}
                bursts of time. Try focusing for a little more time. Cheers!
              </div>
            )}
            {messageTwo && (
              <div>
                You like to work in{" "}
                <span className='ft-bold' style={{ color: "#2c96f2" }}>
                  larger
                </span>{" "}
                and{" "}
                <span className='ft-bold' style={{ color: "#2c96f2" }}>
                  more distributed
                </span>{" "}
                spans of time which makes completing tasks easier!
              </div>
            )}
            {messageThree && (
              <div>
                Your work style is that of Gods! People are envious of your{" "}
                <span className='ft-bold' style={{ color: "#17d41a" }}>
                  well-paced
                </span>{" "}
                and{" "}
                <span className='ft-bold' style={{ color: "#17d41a" }}>
                  completely focused
                </span>{" "}
                style. Keep it up!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

AvgBreakTime.propTypes = {};

export default AvgBreakTime;
