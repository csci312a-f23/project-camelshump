/*
 * play.js
 */
import PropTypes from "prop-types";
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

const itemDictionary = {
  A: "Axe",
  B: "Bow",
  G: "Grenade",
  H: "Health Potion",
  S: "Stamina Potion",
};

const ENEMIES = [
  {
    name: "Spider Monster",
    health: 60,
    strength: 6,
    art: `           ____                      , \n
          /---.'.__             ____// \n
               '--.\\           /.---' \n
          _______  \\\\         // \n
        /.------.\\  \\|      .'/  ______ \n
       //  ___  \\ \\ ||/|\\  //  _/_----.\\__ \n
      |/  /.-.\\  \\ \\:|< >|// _/.'..\\   '--' \n
         //   \\'. | \\'.|.'/ /_/ /  \\\\ \n
        //     \\ \\_\\/" ' ~\\-'.-'    \\\\ \n
       //       '-._| :H: |'-.__     \\\\ \n
      //           (/'==='\\)'-._\\     || \n
      ||                        \\\\    \\| \n
      ||                         \\\\    ' \n
      |/                          \\\\ \n
                                   || \n
                                   || \n
                                   \\\\ \n
                                    '  \n
  `,
  },
  {
    name: "Dragon",
    health: 55,
    strength: 8,
    art: `          /                            ) \n
          (                             |\\ \n
         /|                              \\\\ \n
        //                                \\\\ \n
       ///                                 \\| \n
      /( \\                                  )\\ \n
      \\\\  \\_                               //) \n
       \\\\  :\\__                           /// \n
        \\\\     )                         // \\ \n
         \\\\:  /                         // |/ \n
          \\\\ / \\                       //  \\ \n
           /)   \\   ___..-'           (|  \\_| \n
          //     /   _.'              \\ \\  \\ \n
         /|       \\ \\________          \\ | / \n
        (| _ _  __/          '-.       ) /.' \n
         \\\\ .  '-.__            \\_    / / \\ \n
          \\\\_'.     > --._ '.     \\  / / / \n
           \\ \\      \\     \\  \\     .' /.' \n
            \\ \\  '._ /     \\ )    / .' | \n
             \\ \\_     \\_   |    .'_/ __/ \n
              \\  \\      \\_ |   / /  _/ \\_ \n
               \\  \\       / _.' /  /     \\ \n
               \\   |     /.'   / .'       '-,_ \n
                \\   \\  .'   _.'_/             \\ \n
   /\\    /\\      ) ___(    /_.'           \\    | \n
  | _\\__// \\    (.'      _/               |    | \n
  \\/_  __  /--''    ,                   __/    / \n
  (_ ) /b)  \\  '.   :            \\___.-'_/ \\__/ \n
  /:/:  ,     ) :        (      /_.'__/-'|_ _ / \n
 /:/: __/\\ >  __,_.----.__\\    /        (/(/(/ \n
(_(,_/V .'/--'    _/  __/ |   / \n
 VvvV  //'    _.-' _.'     \\   \\ \n
   n_n//     (((/->/        |   / \n
   '--'         ~='          \\  | \n
                              | |_,,, \n
                              \\  \\  / \n
                               '.__) \n
`,
  },
  {
    name: "Thief",
    health: 20,
    strength: 4,
    art: ` -'   ||             , \n
      ||           _,''/ \n
      ||         ,/'   < \n
      ||       .-'\\\\_.-' \n
      ||      /'' '| \n
     _!|      |o o ?    \n
     |/\\      '.=.'.__   . \n
     '| L   _.-J ' L '\\.' '. \n
      ||/'.'  | \\ /'_.'  .  \\  \n
        \\   .=\\__v__<    \\.  L   \n
         '-'   |    _\\    \\. | \n
                \\'_'  \\.     F \n
                )\\/    '-.__J \n
               /  |   -| \n
              /   |   / \n
             ( ' <|' | \n
              \\_.'\\. \\ \n
               '. |._ | \n
                 'J' / \n
             ,    _)'|>.__,_\\ \n
       ' .,-.+- .'_._\\  "'-=-i"" ---- \n
                _,. -''' \n
`,
  },
  {
    name: "Skeleton",
    health: 14,
    strength: 5,
    art: `              .7 \n
            .'/ \n
           / / \n
          / / \n
         / / \n
        / / \n
       / / \n
      / / \n
     / / \n     
    / / \n      
  __|/ \n
,-\\__\\ \n
|f-"Y\\| \n
\\()7L/ \n
 cgD                            __ _ \n
 |\\(                          .'  Y '>, \n
  \\ \\                        / _   _   \\ \n
   \\\\\\                       )(_) (_)(|} \n
    \\\\\\                      {  4A   } / \n
     \\\\\\                      \\uLuJJ/\\l \n
      \\\\\\                     |3    p)/ \n
       \\\\\\___ __________      /nnm_n// \n
       c7___-__,__-)\\,__)(".  \\_>-<_/D \n
                  //V     \\_"-._.__G G_c__.-__<"/ ( \\ \n
                         <"-._>__-,G_.___)\\   \\7\\ \n
                        ("-.__.| \\"<.__.-" )   \\ \\ \n
                        |"-.__"\\  |"-.__.-".\\   \\ \\ \n
                        ("-.__"". \\"-.__.-".|    \\_\\ \n
                        \\"-.__""|!|"-.__.-".)     \\ \\ \n
                         "-.__""\\_|"-.__.-"./      \\ l \n
                          ".__""">G>-.__.-">       .--,_ \n
                              ""  G \n
`,
  },
  {
    name: "Dark Wizard",
    health: 10,
    strength: 8,
    art: `                                  .... \n
                                .'' .''' \n
.                             .'   : \n
                          .:    : \n
                         _:    :       ..----.._ \n
                      .:::.....:::.. .'         ''. \n
\\                   .'  #-. .-######'     #        '. \n
\\\\                 '.##'/ ' ################       : \n
 \\\\                  #####################         : \n
  \\\\               ..##.-.#### .''''###'.._        : \n
   \\\\             :--:########:            '.    .' : \n
    \\\\..__...--.. :--:#######.'   '.         '.     : \n
    :     :  : : '':'-:'':'::        .         '.  .' \n
    '---'''..: :    ':    '..'''.      '.        :' \n
       \\\\  :: : :     '      ''''''.     '.      .: \n
        \\\\ ::  : :     '            '.      '      : \n
         \\\\::   : :           ....' ..:       '     '. \n
          \\\\::  : :    .....####\\\\ .~~.:.             : \n
           \\\\':.:.:.:'#########.===. ~ |.'-.   . '''.. : \n
            \\\\    .'  ########## \\ \\ _.' '. '-.       '''. \n
            :\\\\  :     ########   \\ \\      '.  '-.        : \n
           :  \\\\'    '   #### :    \\ \\      :.    '-.      : \n
          :  .'\\\\   :'  :     :     \\ \\       :      '-.    : \n
         : .'  .\\\\  '  :      :     :\\ \\       :        '.   : \n
         ::   :  \\\\'  :.      :     : \\ \\      :          '. : \n
         ::. :    \\\\  : :      :    ;  \\ \\     :           '.: \n
          : ':    '\\\\ :  :     :     :  \\:\\     :        ..' \n
             :    ' \\\\ :        :     ;  \\|      :   .''' \n
             '.   '  \\\\:                         :.'' \n
              .:..... \\\\:       :            ..'' \n
             '._____|'.\\\\......'''''''.:..''' \n
                        \\\\ \n
`,
  },
  {
    name: "An Evil Ampersand",
    health: 100,
    strength: 10,
    art: ` 
                            ,-.                               \n
       ___,---.__          /'|'\\          __,---,___          \n
    ,-'    \\'    '-.____,-'  |  '-.____,-'    //    '-.       \n
  ,'        |           ~'\\     /'~           |        '.      \n
 /      ___//              '. ,'          ,  , \\___      \\    \n
|    ,-'   '-.__   _         |        ,    __,-'   '-.    |    \n
|   /          /\\_  '   .    |    ,      _/\\          \\   |   \n
\\  |           \\ \\'-.___ \\   |   / ___,-'/ /           |  /  \n
 \\  \\           | '._   '\\\\  |  //'   _,' |           /  /     \n 
  '-.\\         /'  _ '---'' , . ''---' _  '\\         /,-'     \n
     ''       /     \\    ,='/ \\'=.    /     \\       ''         \n 
             |__   /|\\_,--.,-.--,--._/|\\   __|                  \n
             /  './  \\\\'\\ |  |  | /,//' \\,'  \\                 \n 
            /   /     ||--+--|--+-/-|     \\   \\                 \n
           |   |     /'\\_\\_\\ | /_/_/'\\     |   |                \n
            \\   \\__, \\_     '~'     _/ .__/   /            \n
             '-._,-'   '-._______,-'   '-._,-'\n
`,
  },
];

let statelessEnemy;

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
  useSession({ required: true });

  const sectionLength = 16;
  const numSections = 9;
  // Create a new map with 9 sections and each map is 16x16 characters
  const initialMap = JSON.parse(MapJSON({ sectionLength, numSections }));
  const classWeapon = classDict[className];

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
  const [health, setHealth] = useState(50);
  const [strength, setStrength] = useState(10);

  const [enemy, setEnemy] = useState(null);
  // Might be an extraneous piece of state
  // const [additionalText, setAdditionalText] = useState("");

  const [position, setPosition] = useState([
    Math.floor(currentMap[0].length / 2),
    Math.floor(currentMap[0].length / 2),
    5,
  ]);

  // Disable arrow scrolling
  const keys = { 38: 1, 40: 1 };

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
          ? { ...inventoryItem, quantity: inventoryItem.quantity - 1 }
          : inventoryItem,
      );
      setInventoryList(updatedInventory);
    }
  };

  const deathPrompt = () => {
    setTextPrompt(
      `I'm a fantasy character, I died to a ${enemy}, describe what happened.`,
    );
  };

  const raiseStrength = (amount) => {
    setStrength(strength + amount);
  };

  const lowerEnemyStrength = (amount) => {
    setEnemy({ ...enemy, strength: Math.max(1, enemy.strength - amount) });
  };

  const healPlayer = (toHeal) => {
    // TODO: Right now we have hard-coded max healths, we can add max healths by class to dict
    setHealth(Math.min(50, health + toHeal));
  };

  const damagePlayer = (damage) => {
    setHealth(Math.max(health - damage, 0));
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

  // Might be a better way to do this!
  const getEnemy = (name) => ENEMIES.find((element) => element.name === name);

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
    fightPrompt(
      `${enemy.name} attacks and deals ${enemy.strength} damage.`,
      `I'm a ${className}, and an ${enemy.name} attacks, describe what happens.`,
    );
  };

  const fightAction = (action) => {
    switch (action) {
      case "punch":
        fightPrompt(
          `You punched the ${enemy.name}`,
          `I'm a fantasy character, I punched a ${enemy.name}, describe what happens.`,
        );
        damageEnemy(Math.floor(strength * 0.5));
        setTimeout(() => enemyAction(), 4000);
        break;
      case "dance":
        fightPrompt(
          `You dance with the ${enemy.name}`,
          `I'm a fantasy character, I danced with a ${enemy.name}, describe what happens.`,
        );
        lowerEnemyStrength(5);
        setTimeout(() => enemyAction(), 4000);
        break;
      default:
    }
  };

  const itemAction = (action) => {
    switch (action) {
      case "A":
        // 15 damage
        fightPrompt(
          `You used an axe on the ${enemy.name}`,
          `I'm a fantasy character, I used an axe on a ${enemy.name}, describe what happens.`,
        );
        damageEnemy(15);
        break;
      case "B":
        // 10 damage twice, 50% chance to hit second shot
        fightPrompt(
          `You shot the ${enemy.name} with a bow`,
          `I'm a fantasy character, I shot a ${enemy.name} with a bow and arrow, describe what happens.`,
        );
        damageEnemy(10);
        if (Math.random() >= 0.5) damageEnemy(10);
        break;
      case "G":
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
        // Heal 10
        fightPrompt(
          `You used a healing potion`,
          "I'm a fantasy character, I used a healing potion, describe what happens.",
        );
        healPlayer(10);
        reduceItem("H");
        break;
      case "S":
        // Buff strength for now
        fightPrompt(
          `You used a Stamina potion`,
          "I'm a fantasy character, I used a stamina potion, describe what happens.",
        );
        raiseStrength(5);
        reduceItem("S");
        break;
      case classWeapon:
        fightPrompt(
          `You use your ${classWeapon} on the ${enemy.name}`,
          `I'm a fantasy character, I use my ${classWeapon} on a ${enemy.name}, describe what happens.`,
        );
        damageEnemy(strength);
        break;
      default:
    }
  };

  const handleShowDictionary = () => {
    setShowDictionary((prevShowDictionary) => !prevShowDictionary);
  };

  useEffect(() => {
    if (enemyKilled) {
      const newMap = [...currentMap];
      newMap[position[2]][position[0]][position[1]] = "-";
      setCurrentMap(newMap);
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
      currentMap[position[2]][position[0]][position[1]] = "-";
    }
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
        {/* Hardcoding max health and strength values for now */}
        <Stats
          health={health}
          strength={strength}
          maxHealth={50}
          maxStrength={10}
        />
      </div>
      {/* Conditionally render in the enemy container if an enemy exists */}
      {enemy !== null && (
        <div className="enemyContainer">
          <p>{enemy.name}</p>
          <Stats
            health={enemy.health}
            strength={enemy.strength}
            maxHealth={getEnemy(enemy.name).health}
            maxStrength={getEnemy(enemy.name).strength}
            art={getEnemy(enemy.name).art}
          />
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
