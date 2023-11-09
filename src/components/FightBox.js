/*
 * FightBox.js
 */
import PropTypes from "prop-types";

export default function FightBox({ closeFightBox }) {
  const handleClose = () => {
    closeFightBox();
  };

  return (
    <div>
      <button type="button"> Punch </button>
      <button type="button"> Swing Sword </button>
      <button type="button"> Dance </button>
      <button type="button" onClick={() => handleClose()}>
        {" "}
        Close{" "}
      </button>
    </div>
  );
}

FightBox.propTypes = {
  closeFightBox: PropTypes.func.isRequired,
};
