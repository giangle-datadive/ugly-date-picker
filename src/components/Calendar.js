import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

const MAX_DAYS = 35;

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const getDaysOfMonth = (month) => {
  const days = [];
  for (let i = 1; i <= MAX_DAYS; i++) {
    const now = new Date();
    now.setMonth(month);
    now.setDate(i);
    days.push(now);
  }

  return days;
};

const getFirstDayIndex = (month) => {
  const now = new Date();
  now.setMonth(month);
  now.setDate(1);

  return now.getDay();
};

const getDaysOfPrevMonth = (month) => {
  const firstDayIndex = getFirstDayIndex(month);
  const days = [];
  for (let i = 0; i < firstDayIndex; i++) {
    const now = new Date();
    now.setMonth(month);
    now.setDate(1);
    const diffDate = firstDayIndex - i;
    now.setDate(now.getDate() - diffDate);
    days.push(now);
  }

  return days;
};

const getDays = (month) => {
  const days = [...getDaysOfPrevMonth(month), ...getDaysOfMonth(month)];

  return days.slice(0, MAX_DAYS);
};

const Calendar = ({ onPickDate, hideCalendar, inputRef }) => {
  const [date, setDate] = useState(new Date());
  const [days, setDays] = useState(getDays(date.getMonth()));
  const calendarRef = useRef(null);
  const now = new Date();

  useEffect(() => {
    const onMouseUp = (e) => {
      const isContain =
        calendarRef.current && calendarRef.current.contains(e.target);
      const isContainInput =
        inputRef.current && inputRef.current.contains(e.target);
      if (isContain || isContainInput) {
        return;
      }
      hideCalendar();
    };
    window.addEventListener("mouseup", onMouseUp);

    return () => window.removeEventListener("mouseup", onMouseUp);
  }, []);

  useEffect(() => {
    setDays(getDays(date.getMonth()));
  }, [date]);

  const onNextMonth = () => {
    const newDate = new Date(date.valueOf());
    newDate.setMonth(date.getMonth() + 1);
    setDate(newDate);
  };

  const onPrevMonth = () => {
    const newDate = new Date(date.valueOf());
    newDate.setMonth(date.getMonth() - 1);
    setDate(newDate);
  };

  return (
    <div ref={calendarRef} className="date-picker">
      <div className="title">
        <div onClick={onPrevMonth} className="control">
          {"<"}
        </div>
        <div>{`${monthNames[date.getMonth()]} ${date.getFullYear()}`}</div>
        <div onClick={onNextMonth} className="control">
          {">"}
        </div>
      </div>
      <div className="day-of-week">
        <div>Su</div>
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sa</div>
      </div>

      <div className="days">
        {days.map((item, index) => {
          const className =
            item.getMonth() === date.getMonth() ? "current-month" : " ";
          const isCurrentDate =
            item.getMonth() === now.getMonth() &&
            item.getDate() === now.getDate();

          return (
            <div
              onClick={() => onPickDate(item)}
              key={index}
              className={`nes-btn day ${className} ${
                isCurrentDate ? "is-primary" : ""
              }`}
            >
              {item.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

Calendar.propTypes = {
  onPickDate: PropTypes.func,
  hideCalendar: PropTypes.func,
  inputRef: PropTypes.any,
};

export default Calendar;
