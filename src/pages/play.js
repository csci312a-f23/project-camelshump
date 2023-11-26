/*
 * play.js
 */
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MapJSON from "@/components/MapJSON";
import Inventory from "@/components/Inventory";
import Dictionary from "@/components/Dictionary";
import Stats from "@/components/Stats";
import FightEnemy from "../components/FightEnemy";
import MapDisplay from "../components/MapDisplay";
import { Traversal } from "../components/Traversal";
import TextBox from "../components/TextBox";
import styles from "../styles/Dictionary.module.css";

// const ITEMS = ["Sword", "Staff"];
const itemDictionary = {
  A: "Axe",
  B: "Bow",
  G: "Grenade",
  H: "Health Potion",
  S: "Stamina / Speed Boost",
};
const ENEMIES = [
  "Spider monster",
  "Dragon",
  "Thief",
  "Bandit",
  "Dark Wizard",
  "An Evil Ampersand",
];

// TODO: Stats dict for enemies and items

const classDict = { warrior: "Sword", mage: "Staff", rogue: "Knife" };

let enemy;

export function getRandom(max) {
  return Math.floor(Math.random() * max);
}

/*

TODO: bugs
	- wrong prompt showing for certain items
	- initial prompt should not be visible when responding to the text prompt box

*/

export default function GameViewer({ className }) {
  const router = useRouter();
  const sectionLength = 16;
  const numSections = 9;
  // Create a new map with 9 sections and each map is 16x16 characters
  const initialMap = JSON.parse(MapJSON({ sectionLength, numSections }));

  // Set map state to the initial map
  const [currentMap, setCurrentMap] = useState(initialMap);
  const [item, setItem] = useState(classDict[className] || "");
  const [enemyPopup, setEnemyPopup] = useState(false);
  console.log(enemyPopup);
  const [textPrompt, setTextPrompt] = useState("");
  const [enemyKilled, setEnemyKilled] = useState(false);
  const [showDictionary, setShowDictionary] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  // Might be an extraneous piece of state
  // const [additionalText, setAdditionalText] = useState("");

  const [position, setPosition] = useState([
    Math.floor(currentMap[0].length / 2),
    Math.floor(currentMap[0].length / 2),
    5,
  ]);

  const togglePopup = () => {
    setEnemyPopup(true);
  };

  const closePopup = () => {
    setEnemyPopup(false);
  };

  const fightAction = (action) => {
    switch (action) {
      case "punch":
        setGeneratedText(`You punched the ${enemy}`);
        setTimeout(
          () =>
            setTextPrompt(
              `I'm a fantasy character, I punched a ${enemy}, describe what happens.`,
            ),
          2000,
        );
        setEnemyKilled(true);
        break;
      case "sword":
        setGeneratedText(`You swing your sword at the ${enemy}`);
        setTimeout(
          () =>
            setTextPrompt(
              `I'm a fantasy character, I swung my sword at a ${enemy}, describe what happens.`,
            ),
          2000,
        );
        setEnemyKilled(true);
        break;
      case "dance":
        setGeneratedText(`You dance with the ${enemy}`);
        setTimeout(
          () =>
            setTextPrompt(
              `I'm a fantasy character, I danced with a ${enemy}, describe what happens.`,
            ),
          2000,
        );
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
      // setGeneratedText("YOU WON!");
    }
  }, [enemyKilled]);

  const updateItem = (itemPressed) => {
    if (itemPressed === "E") {
      enemy = ENEMIES[getRandom(ENEMIES.length)];
      setGeneratedText(`You encountered a ${enemy}`);
      // Sends an invisible prompt to TextBox, which sends to TextPrompt, choosing from a list of enemies
      setTimeout(
        () =>
          setTextPrompt(
            `I am a fantasy ${className}. I just encountered a ${enemy}, describe what I see.`,
          ),
        2000,
      );
      togglePopup(); // Show the enemy pop-up
      setItem(itemPressed);
    } else if (itemPressed !== "-") {
      const pickup = itemDictionary[itemPressed];
      setItem(itemPressed); // Passes this to add the new item to the inventory, and call pop-up if item is E
      setGeneratedText(`You picked up a ${pickup}`);
      setTimeout(
        () =>
          setTextPrompt(
            `I am a fantasy character. I just found a ${pickup}, describe what I see.`,
          ),
        2000,
      );
      setCurrentMap(currentMap);
    }
    // after you collect items/ fight enemy update its value on map to be -
    currentMap[position[2]][position[0]][position[1]] = "-"; // how do we do this without mutating props?
    setCurrentMap(currentMap);
  };

  const handleItemUpdate = () => {
    // Reset the item to an empty array
    setItem("");
  };

  useEffect(() => {
    function handleKeyPress(event) {
      if (!enemyPopup) setPosition(Traversal(currentMap, event.key, position));
    }

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [enemyPopup, currentMap, position]);

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
          <FightEnemy
            closePopup={closePopup}
            fightAction={fightAction}
            setGeneratedText={setGeneratedText}
            setTextPrompt={setTextPrompt}
          />
        )}
      </div>
      <div className="statsContainer">
        <Stats item={item} onItemUpdate={handleItemUpdate} />
      </div>
      <div className="textContainer">
        <TextBox
          generatedText={generatedText}
          setGeneratedText={setGeneratedText}
          invisiblePrompt={textPrompt}
          setInvisiblePrompt={setTextPrompt}
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
        {showDictionary && (
          <Dictionary
            onClose={handleShowDictionary}
            itemDictionary={itemDictionary}
          />
        )}
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
