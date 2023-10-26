export default function MapJSON({ length }) {
  const mapArray = [];
  const enemyProb = 1;
  const itemProb = 2;

  for (let i = 0; i < length; i += 1) {
    const row = [];
    for (let j = 0; j < length; j += 1) {
      const r = Math.random() * 100;
      if (r < enemyProb) row[j] = "E";
      else if (r < enemyProb + itemProb) row[j] = "I";
      else row[j] = "-";
    }
    mapArray[i] = row;
  }

  return JSON.stringify(mapArray);
}
