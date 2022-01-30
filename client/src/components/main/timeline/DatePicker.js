import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getDay } from "date-fns";
import { connect } from "react-redux";
import moment from 'moment'
import { enIN } from "date-fns/locale";
import { DatePickerCalendar } from "react-nice-dates";
import "react-nice-dates/build/style.css";

const modifiersClassNames = {
  highlight: '-highlight'
}

const DatePicker = ({
  dateSelected,
  setDateSelected,
  // Redux Actions
  timeline: { datesCaptured },
}) => {

  let modifiers = {
    highlight: (dateSelected) =>
      datesCaptured.some((ele) => (
    
          moment(dateSelected).format("DD/MM/YYYY") ===
            moment(ele.createdAt).format("DD/MM/YYYY")
        
      )),
    // disabled: (dateSelected) =>
    //   datesCaptured.some((ele) => (
    
    //       moment(dateSelected).format("DD/MM/YYYY") !==
    //         moment(ele.createdAt).format("DD/MM/YYYY")
        
    //   ))
    // Changes
  };
  return (
    <>
      <DatePickerCalendar
        date={dateSelected}
        onDateChange={setDateSelected}
        locale={enIN}
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
      />
    </>
  );
};
DatePicker.propTypes = {
  timeline: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  timeline: state.timeline
})

export default connect(mapStateToProps)(DatePicker);
