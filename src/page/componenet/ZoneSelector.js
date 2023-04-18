import React, { useEffect } from "react";

function ZoneSelector(props) {
  const { zonein, setPickZone, pickZone } = props;

  const zones = zonein;

  const handleOptionChange = (event) => {
    const selectedZone = zones.find((zone) => zone.zone === event.target.value);
    setPickZone(selectedZone);
  };

  return (
    <div>
      <select
        id="zone-select"
        value={pickZone.zone}
        onChange={handleOptionChange}
      >
        {zones.map((zone) => (
          <option key={zone._id} value={zone.zone}>
            {zone.zone}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ZoneSelector;
