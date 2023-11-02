/*
 * menu.js
 */
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MapDisplay from "../components/MapDisplay";
import { Traversal } from "../components/Traversal";

export default function GameViewer() {
  const router = useRouter();
  const initialMap = [Array.from("abc"), Array.from("def"), Array.from("ghi")];

  const [currentMap, setCurrentMap] = useState(initialMap);
  const [position, setPosition] = useState([
    Math.floor(currentMap.length / 2),
    Math.floor(currentMap[0].length / 2),
  ]);
  // eslint-disable-next-line no-console
  console.log(position);

  useEffect(() => {
    function handleKeyPress(event) {
      setPosition(Traversal(currentMap, event.key, position));
      // eslint-disable-next-line no-console
      console.log(position);
      setCurrentMap(currentMap);
    }

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentMap, position]);

  return (
    <main>
      <MapDisplay currentMap={currentMap} />
      <button type="button" onClick={() => router.back()}>
        Quit
      </button>
    </main>
  );
}
