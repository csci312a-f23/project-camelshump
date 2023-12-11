/*
  StatsShape.js
*/

import PropTypes from "prop-types";

const StatsShape = PropTypes.shape({
  health: PropTypes.number.isRequired,
  strength: PropTypes.number.isRequired,
  defense: PropTypes.number.isRequired,
  speed: PropTypes.number.isRequired,
  intelligence: PropTypes.number.isRequired,
  rizz: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired,
  xp: PropTypes.number.isRequired,
  maxHealth: PropTypes.number.isRequired,
  // eslint-disable-next-line react/require-default-props
  art: PropTypes.string,
});

StatsShape.defaultProps = {
  art: "",
};

export default StatsShape;
