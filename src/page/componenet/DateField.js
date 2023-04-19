import React, { useState } from "react";

function DateFieldB({ defaultValue, onChange, isdisable }) {
  const [value, setValue] = useState(defaultValue);
  const disval = isdisable;
  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div>
      <input
        className="date-field"
        type="date"
        disabled={disval}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

export default DateFieldB;
