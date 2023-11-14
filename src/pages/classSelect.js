/*
 * menu.js
 */
import PropTypes from "prop-types";
import { useRouter } from "next/router";

export default function ClassSelector({ setClassName }) {
  const router = useRouter();

  const handleClick = (selection) => {
    setClassName(selection);
    router.push("/play");
  };

  return (
    <main className="gridContainer">
      <div
        className="warrior"
        id="class"
        onClick={() => handleClick("warrior")}
      >
        <div>Warrior</div>
      </div>
      <div className="mage" id="class" onClick={() => handleClick("mage")}>
        <div>Mage</div>
      </div>
      <div className="rogue" id="class" onClick={() => handleClick("rogue")}>
        <div>Rogue</div>
      </div>
    </main>
  );
}

ClassSelector.propTypes = {
  setClassName: PropTypes.func.isRequired,
};
