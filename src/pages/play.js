/*
 * menu.js
 */
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MapJSON from "@/components/MapJSON";
import MapDisplay from "../components/MapDisplay";
import { Traversal } from "../components/Traversal";
import TextBox from "../components/TextBox";

export default function GameViewer() {
  const router = useRouter();
  const sectionLength = 16;
  const numSections = 16;
  // Create a new map with 16 sections and each map is 16x16 characters
  const initialMap = JSON.parse(MapJSON({ sectionLength, numSections }));

  // Set map state to the initial map
  // eslint-disable-next-line no-unused-vars
  const [currentMap, setCurrentMap] = useState(initialMap[0]);
  const [position, setPosition] = useState([
    Math.floor(currentMap.length / 2),
    Math.floor(currentMap[0].length / 2),
  ]);

  useEffect(() => {
    function handleKeyPress(event) {
      setPosition(Traversal(currentMap, event.key, position));
      // eslint-disable-next-line no-console
      console.log(position);
    }

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentMap, position]);

  return (
    <main>
      <div className="rowA">
        <MapDisplay currentMap={currentMap} position={position} />
        <TextBox />
      </div>
      <button type="button" onClick={() => router.back()}>
        Quit
      </button>
    </main>
  );
}
