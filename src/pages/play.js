/*
 * play.js
 */
// eslint-disable-next-line no-unused-vars
import PropTypes, { element } from "prop-types";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
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
import ENEMIES from "../components/Enemy";
import CHARACTERS from "../components/Character";

const itemDictionary = {
  A: "Throwing Axe",
  B: "Bow and Arrow",
  G: "Grenade",
  H: "Health Potion",
  S: "Stamina Potion",
};

let statelessEnemy;
let character;

const classDict = { warrior: "Sword", mage: "Staff", rogue: "Knife" };

export function getRandom(max) {
  return Math.floor(Math.random() * max);
}

export default function GameViewer({ className, currentId }) {
  const router = useRouter();
  const { data: session } = useSession({ required: true });

  // Create a new map with 9 sections and each map is 16x16 characters
  const sectionLength = 16;
  const numSections = 9;

  const initialMap = JSON.parse(MapJSON({ sectionLength, numSections }));

  character = CHARACTERS.find((elem) => elem.name === className);
  if (!character) {
    // eslint-disable-next-line prefer-destructuring
    character = CHARACTERS[0];
  }
  const classWeapon = character.weapon;

  // Set map state to the initial map
  const [currentMap, setCurrentMap] = useState(initialMap);
  const [item, setItem] = useState(classDict[className] || "");
  const [enemyPopup, setEnemyPopup] = useState(false);
  const [textPrompt, setTextPrompt] = useState("");
  const [enemyKilled, setEnemyKilled] = useState(false);
  const [showDictionary, setShowDictionary] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [inventoryList, setInventoryList] = useState([]);
  const [score, setScore] = useState(0);
  const [mute, setMute] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [title, setTitle] = useState(null);
  const [showTextInput, setShowTextInput] = useState(false);

  // Function to play audio based on mute status
  // not using an API as we have specific sound effect from different sources
  const playAudio = (audioFile) => {
    if (!mute) {
      if (audioFile) {
        try {
          const audio = new Audio(audioFile);
          const playPromise = audio.play();

          // Check if playPromise is defined and has a 'catch' method
          if (playPromise && typeof playPromise.catch === "function") {
            playPromise.catch((error) => {
              // eslint-disable-next-line no-console
              console.error(`Error playing audio: ${error.message}`);
            });
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(`Error playing audio: ${error.message}`);
        }
      }
    }
  };

  const toggleMute = () => {
    setMute(!mute);
  };

  const [stats, setStats] = useState({
    health: character.health,
    strength: character.strength,
    defense: character.defense,
    stamina: 10,
    speed: character.speed,
    intelligence: character.intelligence,
    rizz: character.rizz,
    xp: character.xp,
    level: character.level,
    maxHealth: character.health,
  });

  const [enemy, setEnemy] = useState(null);

  const [position, setPosition] = useState([
    Math.floor(currentMap[0].length / 2),
    Math.floor(currentMap[0].length / 2),
    5,
  ]);

  useEffect(() => {
    if (currentId) {
      fetch(`/api/games/${currentId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then((response) => {
          setTitle(response.title);
          setPosition(response.position);
          setCurrentMap(response.map);
          setStats(response.stats);
          setInventoryList(response.inventory);
        })
        .catch((err) => console.log(err)); // eslint-disable-line no-console
    }
  }, [currentId]);

  // Disable arrow scrolling
  const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

  function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
      e.preventDefault();
      return false;
    }
    return true;
  }

  if (typeof window !== "undefined") {
    window.addEventListener("keydown", preventDefaultForScrollKeys, false);
  }

  const reduceItem = (newItem) => {
    const itemExists = inventoryList.find(
      (inventoryItem) => inventoryItem.name === newItem,
    );

    if (itemExists) {
      // If the item exists, update the inventory by mapping through and modifying the target item
      const updatedInventory = inventoryList.map((inventoryItem) =>
        inventoryItem.name === newItem
          ? {
              ...inventoryItem,
              quantity: Math.max(0, inventoryItem.quantity - 1), // Ensure quantity does not go below 0
            }
          : inventoryItem,
      );
      setInventoryList(updatedInventory);
    }
  };

  useEffect(() => {
    if (stats.health <= 0) {
      // then the player died :(
      setGeneratedText("Game Over");

      // send player back to main menu
      setTimeout(() => router.push("/"), 4000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setStats, stats.health]);

  const lowerEnemyStrength = (amount) => {
    setEnemy({ ...enemy, strength: Math.max(1, enemy.strength - amount) });
  };

  const healPlayer = (toHeal) => {
    setStats((currStats) => ({
      ...currStats,
      health: Math.min(character.health, currStats.health + toHeal),
    }));
  };

  const damagePlayer = (damage) => {
    setStats((currStats) => ({
      ...currStats,
      health: currStats.health - damage,
    }));
  };

  const damageEnemy = (damage) => {
    if (enemy.health - damage <= 0) setEnemyKilled(true);
    else {
      // redundant setEnemyKilled call?
      setEnemyKilled(false);
      setEnemy({ ...enemy, health: enemy.health - damage });
    }
  };

  const togglePopup = () => {
    setEnemyPopup(true);
  };

  const closePopup = () => {
    setEnemy(null);
    setEnemyPopup(false);
  };

  const fightPrompt = (preGeneratedString, promptToGenerate) => {
    setGeneratedText(preGeneratedString);
    setTimeout(() => setTextPrompt(promptToGenerate), 1000);
  };

  const enemyAction = () => {
    damagePlayer(enemy.strength);
    setTimeout(() => {
      fightPrompt(
        `${enemy.name} attacks and deals ${enemy.strength} damage.`,
        `I'm a ${className}, and an ${enemy.name} attacks, describe what happens.`,
      );
    }, 4000);
  };

  const fightAction = (action) => {
    switch (action) {
      case "punch":
        playAudio("/audio/punch.mp3");
        fightPrompt(
          `You punched the ${enemy.name}`,
          `I'm a fantasy character, I punched a ${enemy.name}, describe what happens.`,
        );
        damageEnemy(Math.floor(stats.strength * 0.5));
        enemyAction();
        break;
      case "dance":
        fightPrompt(
          `You dance with the ${enemy.name}`,
          `I'm a fantasy character, I danced with a ${enemy.name}, describe what happens.`,
        );
        lowerEnemyStrength(5);
        enemyAction();
        break;
      case "classWeapon":
        fightPrompt(
          `You use your ${classWeapon} on the ${enemy.name}`,
          `I'm a fantasy character, I use my ${classWeapon} on a ${enemy.name}, describe what happens.`,
        );
        if (classWeapon === "Sword") {
          playAudio("/audio/sword.mp3");
          if (stats.strength >= 1) {
            damageEnemy(stats.strength * 3);
            setStats((currStats) => ({
              ...currStats,
              stamina: currStats.stamina - 1,
            }));
          } else {
            fightPrompt(
              `You don't have enough stamina!`,
              `I'm a fantasy character, I don't have enough stamina to throw an axe at a ${enemy.name}, describe what happens.`,
            );
          }
        } else if (classWeapon === "Staff") {
          damageEnemy(stats.intelligence * 3);
          setStats((currStats) => ({
            ...currStats,
            stamina: currStats.stamina - 0.25,
          }));
        } else if (classWeapon === "Knife") {
          if (stats.speed > enemy.speed) {
            damageEnemy(stats.strength * 3);
          } else {
            damageEnemy(stats.strength * 2);
          }
          setStats((currStats) => ({
            ...currStats,
            stamina: currStats.stamina - 0.5,
          }));
        }
        enemyAction();
        break;
      default:
    }
  };

  const itemAction = (action) => {
    switch (action) {
      case "A":
        playAudio("/audio/axe.mp3");
        if (stats.strength > 0) {
          // 15 damage
          fightPrompt(
            `You threw an axe on the ${enemy.name}`,
            `I'm a fantasy character, I threw a throwing axe at a ${enemy.name}, describe what happens.`,
          );
          damageEnemy(15);
          setStats((currStats) => ({
            ...currStats,
            stamina: stats.stamina - 1,
          }));
          reduceItem("A");
        } else {
          fightPrompt(
            `You don't have enough strength!`,
            `I'm a fantasy character, I don't have enough strength to throw an axe at a ${enemy.name}, describe what happens.`,
          );
        }
        break;
      case "B":
        playAudio("/audio/bow.mp3");
        // 10 damage twice, 50% chance to hit second shot
        fightPrompt(
          `You shot the ${enemy.name} with a bow`,
          `I'm a fantasy character, I shot a ${enemy.name} with a bow and arrow, describe what happens.`,
        );
        damageEnemy(10);
        if (Math.random() >= 0.5) damageEnemy(10);
        break;
      case "G":
        playAudio("/audio/grenade.mp3");
        // 20 damage, 5 to self
        fightPrompt(
          `You throw a grenade at the ${enemy.name}`,
          `I'm a fantasy character, I threw a grenade at a ${enemy.name}, describe what happens.`,
        );
        damageEnemy(20);
        damagePlayer(5);
        reduceItem("G");
        break;
      case "H":
        playAudio("/audio/health.mp3");
        // Heal 10
        fightPrompt(
          `You used a healing potion`,
          "I'm a fantasy character, I used a healing potion, describe what happens.",
        );
        healPlayer(10);
        reduceItem("H");
        break;
      case "S":
        fightPrompt(
          `You used a Stamina potion`,
          "I'm a fantasy character, I used a stamina potion, describe what happens.",
        );
        setStats((currStats) => ({ ...currStats, stamina: 10 }));
        reduceItem("S");
        break;
      default:
    }
  };

  const handleShowDictionary = () => {
    setShowDictionary((prevShowDictionary) => !prevShowDictionary);
  };

  const updateScoreOnEnemyKill = (killedEnemy) => {
    const averageStats =
      (killedEnemy.strength + killedEnemy.health + killedEnemy.intelligence) /
      3;
    const newScore = score + Math.round(averageStats / 3);
    setScore(newScore);
  };

  const giveStatBuff = (CLASS) => (className === CLASS) + 1;

  const levelUp = (newXp) => {
    const newLevel = stats.level + 1;
    const newStrength = stats.strength + giveStatBuff("warrior");
    const newDefense = stats.defense + giveStatBuff("warrior");
    const newSpeed = stats.speed + giveStatBuff("rogue");
    const newInt = stats.intelligence + giveStatBuff("mage");
    const newRizz = stats.rizz + giveStatBuff("rogue");
    const newStam = stats.stamina + giveStatBuff("mage");

    return {
      health: stats.health,
      strength: newStrength,
      defense: newDefense,
      speed: newSpeed,
      intelligence: newInt,
      stamina: newStam,
      rizz: newRizz,
      level: newLevel,
      xp: newXp,
      maxHealth: stats.maxHealth + Math.round(Math.random() * 2 + 3),
    };
  };

  const updateXp = (xpToGain) => {
    const newXp = stats.xp + xpToGain;
    let newStats;

    const newLevelThreshold = stats.level * 10 + stats.level;
    if (newXp >= newLevelThreshold)
      newStats = levelUp(newXp - newLevelThreshold);
    else {
      newStats = { ...stats, xp: newXp };
    }
    setStats(newStats);
  };

  useEffect(() => {
    if (enemyKilled) {
      const newMap = [...currentMap];
      newMap[position[2]][position[0]][position[1]] = "-";
      setCurrentMap(newMap);
      updateXp(enemy.xp);

      ENEMIES.forEach((killedEnemy) => {
        updateScoreOnEnemyKill(killedEnemy);
      });
      setEnemy(null);
      setEnemyKilled(false);
      closePopup(); // close popup if enemy killed...
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enemyKilled]);

  const updateItem = (itemPressed) => {
    if (itemPressed === "E") {
      statelessEnemy = ENEMIES[getRandom(ENEMIES.length)];
      setEnemy({ ...statelessEnemy, maxHealth: statelessEnemy.health });

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
      playAudio("/audio/collect.mp3");
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
      currentMap[position[2]][position[0]][position[1]] = "-";
    }
  };

  const handleItemUpdate = () => {
    // Reset the item to an empty array
    setItem("");
  };

  const handleSave = () => {
    const userid = session.user.id;

    if (!currentId && showTextInput === false) {
      setShowTextInput(true);
      return;
    }

    const newGame = {
      userid,
      title: currentId ? title : document.getElementById("title_box").value,
      position,
      map: currentMap,
      stats,
      inventory: inventoryList,
    };

    if (currentId) {
      fetch(`/api/games/${currentId}`, {
        method: "PUT",
        body: JSON.stringify({ ...newGame, id: currentId }),
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
      });
    } else if (showTextInput === true) {
      fetch(`/api/games`, {
        method: "POST",
        body: JSON.stringify(newGame),
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
      });
      setShowTextInput(false);
    }
  };

  useEffect(() => {
    const stopAudio = () => {
      // Stop the currently playing audio
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        setCurrentAudio(null); // Reset the currentAudio state
      }
    };

    function handleKeyPress(event) {
      if (!enemyPopup) setPosition(Traversal(currentMap, event.key, position));
      // Stop the currently playing audio
      stopAudio();
    }

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [enemyPopup, currentMap, position, currentAudio]);

  return (
    <main className="gridContainer">
      <div className="mapContainer">
        <MapDisplay
          currentMap={currentMap}
          position={position}
          updateItem={updateItem}
        />
      </div>
      <div className={styles.muteButton}>
        <button type="button" onClick={toggleMute}>
          {mute ? "Unmute" : "Mute"}
        </button>
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
            classWeapon={classWeapon}
          />
        )}
      </div>
      <div className="statsContainer">
        <Stats stats={stats} isEnemy={false} score={score} />
      </div>
      {/* Conditionally render in the enemy container if an enemy exists */}
      {enemy !== null && (
        <div className="enemyContainer">
          <p>{enemy.name}</p>
          <Stats stats={enemy} isEnemy />
        </div>
      )}
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
      <div className="quitSaveDiv">
        <button type="button" onClick={() => router.push("/")}>
          Quit
        </button>
        <button type="button" onClick={() => handleSave()}>
          Save
        </button>
        {showTextInput && <input type="text" id="title_box" />}
      </div>
    </main>
  );
}

GameViewer.propTypes = {
  className: PropTypes.string.isRequired,
  currentId: PropTypes.number.isRequired,
};
