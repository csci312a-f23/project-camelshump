/*
 * play.js
 */
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MapJSON from "@/components/MapJSON";
import Inventory from "@/components/Inventory";
import Dictionary from "@/components/Dictionary";
import FightEnemy from "../components/FightEnemy";
import MapDisplay from "../components/MapDisplay";
import { Traversal } from "../components/Traversal";
import TextBox from "../components/TextBox";
import styles from "../styles/Dictionary.module.css";

const ITEMS = ["Sword", "Staff"];
const ENEMIES = ["Spider monster", "Dragon"];
const classDict = { warrior: "Sword", mage: "Staff", rogue: "Knife" };

/*

TODO: Read the docs here and implement reducer
https://react.dev/reference/react/useReducer

TODO: bugs
	- Main menu looks like shit
	- Weird insertion of colons on text box
	- wrong prompt showing for certain items
	- Enemy disappearing from map even if you dont fight
	- writing in text box to prompt is broken. Comment out text entry box for now

*/

export default function GameViewer({ className }) {
  const router = useRouter();
  const sectionLength = 16;
  const numSections = 9;
  // Create a new map with 16 sections and each map is 16x16 characters
  const initialMap = JSON.parse(MapJSON({ sectionLength, numSections }));

  // Set map state to the initial map
  // eslint-disable-next-line no-unused-vars
  const [currentMap, setCurrentMap] = useState(initialMap);
  const [item, setItem] = useState(classDict[className] || "");
  const [enemyPopup, setEnemyPopup] = useState(false);
  const [invisiblePrompt, setInvisiblePrompt] = useState("");
  const [enemyKilled, setEnemyKilled] = useState(false);
  const [showDictionary, setShowDictionary] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [additionalText, setAdditionalText] = useState("");

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

  const fightAction = (action) => {
    switch (action) {
      case "punch":
        setEnemyKilled(true);
        break;
      case "sword":
        setEnemyKilled(true);
        break;
      case "dance":
        setEnemyKilled(false);
        break;
      default:
        setEnemyKilled(false);
    }
  };

  const handleShowDictionary = () => {
    setShowDictionary((prevShowDictionary) => !prevShowDictionary);
  };

  useEffect(() => {
    if (enemyKilled) {
      currentMap[position[2]][position[0]][position[1]] = "-"; // how do we do this without mutating props?
      setCurrentMap(currentMap);
      setEnemyKilled(false);
      closePopup(); // close popup if enemy killed...
      // Will change to include a description of the enemy/the fight
      setGeneratedText("YOU WON!");
    }
  }, [enemyKilled]);

  const updateItem = (itemPressed) => {
    setItem(itemPressed); // Passes this to add the new item to the inventory, and call pop-up if item is E
    if (itemPressed === "E") {
      const enemy = ENEMIES[Math.floor(Math.random() * ENEMIES.length)];
      setAdditionalText(`You encountered a ${enemy}:`);
      // Sends an invisible prompt to TextBox, which sends to TextPrompt, choosing from a list of enemies
      setInvisiblePrompt(
        `I am a fantasy ${className}. Describe an encounter between myself and a ${enemy}`,
      );
      togglePopup(); // Show the enemy pop-up
    } else if (itemPressed !== "-") {
      const pickup = ITEMS[Math.floor(Math.random() * ITEMS.length)];
      setAdditionalText(`You picked up a ${pickup}:`);
      setInvisiblePrompt(
        `I am a fantasy character. Describe an encounter between myself and a ${pickup}`,
      );
      setCurrentMap(currentMap);
    }
    // after you collect items/ fight enemy update its value on map to be -
    currentMap[position[2]][position[0]][position[1]] = "-"; // how do we do this without mutating props?
  };

  const handleItemUpdate = () => {
    // Reset the item to an empty array
    setItem("");
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
        {enemyPopup && (
          <FightEnemy closePopup={closePopup} fightAction={fightAction} />
        )}
      </div>
      <div className="textContainer">
        <TextBox
          generatedText={generatedText}
          setGeneratedText={setGeneratedText}
          additionalText={additionalText}
          invisiblePrompt={invisiblePrompt}
          setInvisiblePrompt={setInvisiblePrompt}
        />
      </div>
      <div className="inventoryContainer">
        <p style={{ fontWeight: "bold", paddingLeft: "10px" }}>Inventory</p>
        <Inventory item={item} onItemUpdate={handleItemUpdate} />
      </div>
      <div className="dictionaryButton">
        <button
          type="button"
          onClick={handleShowDictionary}
          className={styles.dictionaryButton}
        >
          {showDictionary ? "Hide Dictionary" : "Show Dictionary"}
        </button>
        {showDictionary && <Dictionary onClose={handleShowDictionary} />}
      </div>
      <button
        className="quitButton"
        type="button"
        onClick={() => router.push("/")}
      >
        Quit
      </button>
    </main>
  );
}

GameViewer.propTypes = {
  className: PropTypes.string.isRequired,
};
