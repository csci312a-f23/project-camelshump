// Stats.js

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import StatBar from "./Statbar";

export default function Stats({ item, onItemUpdate }) {
  const [statValues, setStatValues] = useState({
    health: 50,
    strength: 10,
  });

  const updateInventory = (receivedItem) => {
    switch (receivedItem) {
      case "H":
        // Increase health by 1, but make sure it doesn't go above 100
        setStatValues((prevValues) => ({
          ...prevValues,
          health: Math.min(prevValues.health + 1, 100),
        }));
        break;
      case "E":
        // Reduce health by 1.5, but make sure it doesn't go below 0
        // Reduce strength by 5 but make sure it doesn't go below 0
        setStatValues((prevValues) => ({
          ...prevValues,
          health: Math.max(prevValues.health - 1.5, 0),
          strength: Math.max(prevValues.strength - 5, 0),
        }));
        break;
      case "S":
        // Increase strength by 2
        setStatValues((prevValues) => ({
          ...prevValues,
          strength: Math.min(prevValues.strength + 2, 100),
        }));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (item) {
      updateInventory(item);
    }
    onItemUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  return (
    <div>
      <StatBar label="Health" value={statValues.health} maxValue={100} />
      <StatBar label="Strength" value={statValues.strength} maxValue={100} />
    </div>
  );
}

Stats.propTypes = {
  item: PropTypes.string.isRequired,
  onItemUpdate: PropTypes.func.isRequired,
};
