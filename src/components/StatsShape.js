/*
  StatsShape.js
*/

import PropTypes from "prop-types";

const StatsShape = PropTypes.shape({
  health: PropTypes.number.isRequired,
  strength: PropTypes.number.isRequired,
  defense: PropTypes.number.isRequired,
  stamina: PropTypes.number.isRequired,
  speed: PropTypes.number.isRequired,
  intelligence: PropTypes.number.isRequired,
  rizz: PropTypes.number.isRequired,
  maxHealth: PropTypes.number.isRequired,
  // eslint-disable-next-line react/require-default-props
  art: PropTypes.string,
});

StatsShape.defaultProps = {
  art: "",
};

export default StatsShape;
