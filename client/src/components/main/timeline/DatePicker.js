import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getDay } from "date-fns";
import { enGB } from "date-fns/locale";
import { DatePickerCalendar } from "react-nice-dates";
import "react-nice-dates/build/style.css";

const modifiers = {
  disabled: date => getDay(date) === 6, // Disables Saturdays
  highlight: date => getDay(date) === 2 // Highlights Tuesdays
}

const modifiersClassNames = {
  highlight: '-highlight'
}

function DatePicker() {
  const [date, setDate] = useState()
  return (
    <DatePickerCalendar
      date={date}
      onDateChange={setDate}
      locale={enGB}
      modifiers={modifiers}
      modifiersClassNames={modifiersClassNames}
    />
  )
}
DatePicker.propTypes = {}

export default DatePicker;
