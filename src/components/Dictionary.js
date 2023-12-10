// Dictionary.js

import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/Dictionary.module.css";

export default function Dictionary({ onClose, itemDictionary }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.closeButton} onClick={onClose}>
          <span className={styles.closeIcon}>&times;</span>
        </button>
        <div className={styles.dictionaryContent}>
          {Object.entries(itemDictionary).map(([key, value]) => (
            <div key={key} className={styles.dictionaryItem}>
              <strong>{key}</strong> - {value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Dictionary.propTypes = {
  onClose: PropTypes.func.isRequired,
  itemDictionary: PropTypes.objectOf(PropTypes.string).isRequired,
};
