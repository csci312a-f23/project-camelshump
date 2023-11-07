/*
 * Inventory.js
 */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "../styles/Inventory.module.css";

export default function Inventory({ item, onItemUpdate }) {
  const [inventoryList, setInventoryList] = useState([]);

  const updateInventory = (newItem) => {
    // Check if the item is already in the inventory
    const itemExists = inventoryList.find(
      (inventoryItem) => inventoryItem.name === newItem,
    );

    if (itemExists) {
      // If the item exists, update the inventory by mapping through and modifying the target item
      const updatedInventory = inventoryList.map((inventoryItem) =>
        inventoryItem.name === newItem
          ? { ...inventoryItem, quantity: inventoryItem.quantity + 1 }
          : inventoryItem,
      );
      setInventoryList(updatedInventory);
    } else {
      // If the item is new, add it to the inventory with a count of 1
      setInventoryList([...inventoryList, { name: newItem, quantity: 1 }]);
    }
  };

  useEffect(() => {
    if (item) {
      updateInventory(item);
    }
    onItemUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  return (
    <div className={styles.InventoryContainer}>
      Inventory
      {inventoryList.map((inventoryItem, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <p key={index}>
          <span className={styles.InventoryItem}>{inventoryItem.name}</span>
          {`: ${inventoryItem.quantity}`}
        </p>
      ))}
    </div>
  );
}

Inventory.propTypes = {
  item: PropTypes.string.isRequired,
  onItemUpdate: PropTypes.func.isRequired,
};
