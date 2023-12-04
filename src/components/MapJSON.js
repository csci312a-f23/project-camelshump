import PropTypes from "prop-types";

export default function MapJSON({ sectionLength, numSections }) {
  // Feels a bit wasteful re: efficiency to have to fill each init array in order to use the map/forEach format
  function generateSection() {
    const initArray = new Array(sectionLength);
    initArray.fill(null);
    const enemyProb = 3;
    const itemProb = 2;
    // add more items to collect and fill inventory
    const items = ["A", "B", "G", "H", "S"];

    const mapArray = initArray.map(() => {
      const rowInit = new Array(sectionLength);
      rowInit.fill("");
      const row = rowInit.map(() => {
        const r = Math.random() * 100;
        if (r < enemyProb) return "E";
        // i want items to fill map at random
        if (r < enemyProb + itemProb) {
          const itemRandomizer = Math.floor(Math.random() * items.length);
          return items[itemRandomizer];
        }
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
