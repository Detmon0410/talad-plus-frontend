import React, { useEffect } from "react";

function ZoneSelector(props) {
  const { zonein, setPickZone, pickZone, setDisable } = props;

  const zones = zonein;
  const disaset = false;
  const handleOptionChange = (event) => {
    const selectedZone = zones.find((zone) => zone.zone === event.target.value);
    setDisable(disaset);
    setPickZone(selectedZone);
    console.log(selectedZone);
  };

  return (
    <div>
      <select
        id="zone-select"
        value={pickZone.zone || ""}
        onChange={handleOptionChange}
        style={{ maxWidth: "fit-content" }}
      >
        <option value={""} disabled hidden>
          Select a zone
        </option>
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
