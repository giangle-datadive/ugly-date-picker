import React from "react";
import PropTypes from "prop-types";

const Input = ({ onFocus, value }) => {
  const dateString = value ? value.toLocaleDateString('en-US') : ''

  return (
    <div className="nes-field">
      <label htmlFor="name_field">Pick a date</label>
      <input
        onChange={() => {}}
        value={dateString}
        onFocus={onFocus}
        type="text"
        id="name_field"
        className="nes-input"
      />
    </div>
  )
};

Input.propTypes = {
  onFocus: PropTypes.func,
  value: PropTypes.object,
};

export default Input;
