/*
 * ClassSelector.js
 */

import PropTypes from "prop-types";

export default function ClassSelector({ classChoice }) {
  return (
    <main className="gridContainer">
      <div
        className="class"
        id="warrior"
        onClick={() => classChoice("warrior")}
      >
        <div>
          Warrior
          <br />
          <br />
          Warrior class begins with a sword. This is a basic class with high
          attack and defense who loves to fight.
        </div>
      </div>
      <div className="class" id="mage" onClick={() => classChoice("mage")}>
        <div>
          Mage
          <br />
          <br />
          Mage is a class that starts with a staff. This class specializes in
          magic and spells. These include attack and healing.
        </div>
      </div>
      <div className="class" id="rogue" onClick={() => classChoice("rogue")}>
        <div>
          Rogue
          <br />
          <br />
          Rogue is a class that starts with a knife. This class specializes in
          avoiding being detected. Although it does not have strong attack or
          defense, it cannot be blocked.
        </div>
      </div>
    </main>
  );
}

ClassSelector.propTypes = {
  classChoice: PropTypes.func.isRequired,
};
