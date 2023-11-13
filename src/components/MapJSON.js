import PropTypes from "prop-types";

export default function MapJSON({ sectionLength, numSections }) {
  // Feels a bit wasteful re: efficiency to have to fill each init array in order to use the map/forEach format
  function generateSection() {
    const initArray = new Array(sectionLength);
    initArray.fill(null);
    const enemyProb = 1;
    const itemProb = 2;

    const mapArray = initArray.map(() => {
      const rowInit = new Array(sectionLength);
      rowInit.fill("");
      const row = rowInit.map(() => {
        const r = Math.random() * 100;
        if (r < enemyProb) return "E";
        if (r < enemyProb + itemProb) return "I";
        return "-";
      });
      return row;
    });

    return mapArray;
  }

  const sectionsInit = new Array(numSections);
  sectionsInit.fill(null);
  const sections = sectionsInit.map(() => generateSection());

  return JSON.stringify(sections);
}

MapJSON.propTypes = {
  sectionLength: PropTypes.number,
  numSections: PropTypes.number,
};
