import React, { useState } from "react";
import PropTypes from "prop-types";
import Input from "./Input";
import Calendar from "./Calendar";
import "nes.css/css/nes.min.css";
import "./date-picker.scss";

const NesDatePicker = ({ currentDate }) => {
  const [isShowCalendar, setIsShowCalendar] = useState(false);
  const [date, setDate] = useState(currentDate);

  const onFocusInput = () => {
    setIsShowCalendar(true);
  };

  const hideCalendar = () => {
    setIsShowCalendar(false);
  };

  const onPickDate = (date) => {
    setDate(date);
    hideCalendar();
  };

  return (
    <div className="nes-date-picker">
      <Input value={date} onFocus={onFocusInput} />
      {isShowCalendar && (
        <Calendar hideCalendar={hideCalendar} onPickDate={onPickDate} />
      )}
    </div>
  );
};

NesDatePicker.propTypes = {
  currentDate: PropTypes.object,
};

NesDatePicker.defaultProps = {
  currentDate: null,
};

export default NesDatePicker;
