/*
 * FightBox.js
 */
import PropTypes from "prop-types";

export default function FightBox({ closeFightBox, fightAction }) {
  const handleClose = () => {
    closeFightBox();
  };

  return (
    <div>
      <button type="button" onClick={() => fightAction("punch")}>
        {" "}
        Punch{" "}
      </button>
      <button type="button" onClick={() => fightAction("sword")}>
        {" "}
        Swing Sword{" "}
      </button>
      <button type="button" onClick={() => fightAction("dance")}>
        {" "}
        Dance{" "}
      </button>
      <button type="button" onClick={() => handleClose()}>
        {" "}
        Close{" "}
      </button>
    </div>
  );
}

FightBox.propTypes = {
  closeFightBox: PropTypes.func.isRequired,
  fightAction: PropTypes.func.isRequired,
};