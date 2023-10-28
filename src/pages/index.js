/*
 * index.js
 */
// import MapJSON from "../components/MapJSON";

import MapDisplay from "@/components/MapDisplay";

export default function Home() {
  const mapMock = [Array.from("abc"), Array.from("def"), Array.from("ghi")];

  return (
    <main>
      <MapDisplay currentMap={mapMock} />
    </main>
  );
}
