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
  S: "Speed Potion",
};

const ENEMIES = [
  { name: "Spider Monster", health: 10, strength: 4 },
  { name: "Dragon", health: 10, strength: 4 },
  { name: "Thief", health: 10, strength: 4 },
  { name: "Bandit", health: 10, strength: 4 },
  { name: "Dark Wizard", health: 10, strength: 4 },
  { name: "An Evil Ampersand", health: 10, strength: 4 },
];

// TODO: Stats dict for enemies and items
let statelessEnemy;
let enemyContainer = <div className="enemyContainer"></div>;

const classDict = { warrior: "Sword", mage: "Staff", rogue: "Knife" };

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
  const [textPrompt, setTextPrompt] = useState("");
  const [enemyKilled, setEnemyKilled] = useState(false);
  const [showDictionary, setShowDictionary] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [inventoryList, setInventoryList] = useState([]);

  // Health and attack, future versions can vary by class
  const [health, setHealth] = useState(10);
  const [strength, setStrength] = useState(10);

  const [enemy, setEnemy] = useState(null);
  // Might be an extraneous piece of state
  // const [additionalText, setAdditionalText] = useState("");

  const [position, setPosition] = useState([
    Math.floor(currentMap[0].length / 2),
    Math.floor(currentMap[0].length / 2),
    5,
  ]);

  const healPlayer = (toHeal) => {
    setHealth(health + toHeal);
  };

  const damagePlayer = (damage) => {
    setHealth(max(health - damage, 0));
    if (health === 0) deathPrompt();
  };

  const damageEnemy = (damage) => {
    if (enemy.health - damage <= 0) setEnemyKilled(true);
    else {
      // redundant setEnemyKilled call?
      setEnemyKilled(false);
      setEnemy({ ...enemy, health: enemy.health - damage });
    }
  };

  const deathPrompt = () => {
    // TODO: Change to prompt the AI to write about the enemy you died to
    console.log("You died");
  };

  const togglePopup = () => {
    setEnemyPopup(true);
  };

  const closePopup = () => {
    setEnemy(null);
    setEnemyPopup(false);
  };

  const fightAction = (action) => {
    switch (action) {
      case "punch":
        setGeneratedText(`You punched the ${enemy.name}`);
        setTimeout(
          () =>
            setTextPrompt(
              `I'm a fantasy character, I punched a ${enemy.name}, describe what happens.`,
            ),
          2000,
        );
        damageEnemy(3);
        break;
      case "sword":
        setGeneratedText(`You swing your sword at the ${enemy.name}`);
        setTimeout(
          () =>
            setTextPrompt(
              `I'm a fantasy character, I swung my sword at a ${enemy.name}, describe what happens.`,
            ),
          2000,
        );
        // setEnemyKilled(true);
        break;
      case "dance":
        setGeneratedText(`You dance with the ${enemy.name}`);
        setTimeout(
          () =>
            setTextPrompt(
              `I'm a fantasy character, I danced with a ${enemy.name}, describe what happens.`,
            ),
          2000,
        );
        break;
      default:
    }
  };

  // const itemDictionary = {
  //   A: "Axe",
  //   B: "Bow",
  //   G: "Grenade",
  //   H: "Health Potion",
  //   S: "Stamina / Speed Boost",
  // };

  const itemAction = (action) => {
    switch (action) {
      case "A":
        // 15 damage
        damageEnemy(15);
        break;
      case "B":
        // 10 damage twice, 50% chance to hit second shot
        damageEnemy(10);
        if (Math.random() >= 0.5) damageEnemy(10);
        break;
      case "G":
        // 20 damage, 5 to self
        damageEnemy(20);
        damagePlayer(5);
        break;
      case "H":
        // Heal 10
        healPlayer(10);
        break;
      case "S":
        // Attack twice (probably unimplemented for now)
        break;
    }
  };

  const handleShowDictionary = () => {
    setShowDictionary((prevShowDictionary) => !prevShowDictionary);
  };

  useEffect(() => {
    if (enemyKilled) {
      currentMap[position[2]][position[0]][position[1]] = "-"; // how do we do this without mutating props?
      setCurrentMap(currentMap);
      setEnemy(null);
      setEnemyKilled(false);
      closePopup(); // close popup if enemy killed...
      // Will change to include a description of the enemy/the fight
      // setGeneratedText("YOU WON!");
    }
  }, [enemyKilled]);

  const updateItem = (itemPressed) => {
    if (itemPressed === "E") {
      statelessEnemy = ENEMIES[getRandom(ENEMIES.length)];
      setEnemy(statelessEnemy);

      setGeneratedText(`You encountered a ${statelessEnemy.name}`);
      // Sends an invisible prompt to TextBox, which sends to TextPrompt, choosing from a list of enemies
      setTimeout(
        () =>
          setTextPrompt(
            `I am a fantasy ${className}. I just encountered a ${statelessEnemy.name}, describe what I see.`,
          ),
        2000,
      );
      togglePopup(); // Show the enemy pop-up
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

  useEffect(() => {
    if (enemy !== null) {
      enemyContainer = <div className="enemyContainer">
        <Stats health={enemy.health} strength={enemy.strength} maxHealth={50} maxStrength={50}/>
      </div>
    }
    else
      enemyContainer = <div className="enemyContainer"></div>
  }, [enemy])

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
            inventory={inventoryList}
            closePopup={closePopup}
            fightAction={fightAction}
            itemAction={itemAction}
            setGeneratedText={setGeneratedText}
            setTextPrompt={setTextPrompt}
          />
        )}
      </div>
      <div className="statsContainer">
        {/* Hardcoding max health and strength values for now */}
        <Stats health={health} strength={strength} maxHealth={10} maxStrength={10}/>
      </div>
      {/* Conditionally render in the enemy container if an enemy exists */}
      { enemy !== null && 
      <div className="enemyContainer">
        <p>{enemy.name}</p>
        <Stats health={enemy.health} strength={enemy.strength} maxHealth={50} maxStrength={50}/> 
      </div> } 
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
        <Inventory
          item={item}
          onItemUpdate={handleItemUpdate}
          inventoryList={inventoryList}
          setInventoryList={setInventoryList}
        />
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
