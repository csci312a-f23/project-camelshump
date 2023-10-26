/*
 * index.js
 */

import MapDisplay from "@/components/MapDisplay";

export default function Home() {
  const mapMock = [Array.from("abc"), Array.from("def"), Array.from("ghi")];

  return (
    <main>
      <MapDisplay currentMap={mapMock} />
    </main>
  );
}
