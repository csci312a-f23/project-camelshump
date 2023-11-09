/*
 * play.js
 */
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MapJSON from "@/components/MapJSON";
import Inventory from "@/components/Inventory";
import FightEnemy from "../components/FightEnemy";
import MapDisplay from "../components/MapDisplay";
import { Traversal } from "../components/Traversal";
import TextBox from "../components/TextBox";

const placeholderItems = ["Sword", "Staff"];
const placeholderEnemies = ["Spider monster", "Dragon"];

export default function GameViewer() {
  const router = useRouter();
  const sectionLength = 16;
  const numSections = 9;
  // Create a new map with 16 sections and each map is 16x16 characters
  const initialMap = JSON.parse(MapJSON({ sectionLength, numSections }));

  // Set map state to the initial map
  // eslint-disable-next-line no-unused-vars
  const [currentMap, setCurrentMap] = useState(initialMap);
  const [item, setItem] = useState("");
  const [enemyPopup, setEnemyPopup] = useState(false);
  const [invisiblePrompt, setInvisiblePrompt] = useState("");

  const [position, setPosition] = useState([
    Math.floor(currentMap[0].length / 2),
    Math.floor(currentMap[0].length / 2),
    5,
  ]);

  const togglePopup = () => {
    setEnemyPopup(!enemyPopup);
  };

  const closePopup = () => {
    setEnemyPopup(false);
  };

  const updateItem = (itemPressed) => {
    setItem(itemPressed); // Passes this to add the new item to the inventory, and call pop-up if item is E
    if (itemPressed === "E") {
      // Sends an invisible prompt to TextBox, which sends to TextPrompt, choosing from a list of enemies
      setInvisiblePrompt(`describe a ${placeholderEnemies[0]}`);
      togglePopup(); // Show the enemy pop-up
    } else {
      setInvisiblePrompt(`describe a ${placeholderItems[0]}`);
    }
  };

  const handleItemUpdate = () => {
    // Reset the item to an empty array
    setItem("");
    // eslint-disable-next-line no-console
    console.log("Enemy pop up false");
  };

  useEffect(() => {
    function handleKeyPress(event) {
      setPosition(Traversal(currentMap, event.key, position));
    }

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentMap, position]);

  return (
    <main className="gridContainer">
      <div className="mapContainer">
        <MapDisplay
          currentMap={currentMap}
          position={position}
          updateItem={updateItem}
        />
      </div>
      <div
        className="enemyPopup"
        style={{ width: "50%", float: "left", position: "relative" }}
      >
        {enemyPopup && <FightEnemy closePopup={closePopup} />}
      </div>
      <div className="textContainer">
        <TextBox
          invisiblePrompt={invisiblePrompt}
          setInvisiblePrompt={setInvisiblePrompt}
        />
      </div>
      <div className="inventoryContainer">
        <Inventory item={item} onItemUpdate={handleItemUpdate} />
      </div>
      <button type="button" onClick={() => router.push("/")}>
        Quit
      </button>
    </main>
  );
}
