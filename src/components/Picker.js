import React, { useState } from 'react'
import Input from './Input'
import DatePicker from './DatePicker'
import "nes.css/css/nes.min.css";
import './date-picker.scss'


const Picker = () => {
  const [isShowDatePicker, setIsShowDatePicker] = useState(false)

  return (
    <div className="nes-date-picker">
      <Input />
      <DatePicker /> 
    </div>
  )
}

export default Picker