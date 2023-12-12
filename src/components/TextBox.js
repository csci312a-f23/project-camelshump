/* eslint-disable react/jsx-no-bind */
import PropTypes from "prop-types";
import { useRef, useEffect } from "react";
import styles from "../styles/TextBox.module.css";

export default function TextBox({ generatedText }) {
  const textBox = useRef();

  useEffect(() => {
    if (generatedText) {
      const area = textBox.current;
      area.scrollTop = area.scrollHeight;
    }
  }, [generatedText]);

  // if there is more to go in list of text to show then display some sort of arrow or something
  // should just add next and last button at the bottom of the textbox div

  return (
    <div>
      <div className={styles.textBox}>
        <p id="textBox" ref={textBox}>
          {generatedText}
        </p>
        <button className={styles.button} type="button">
          Next
        </button>
      </div>
    </div>
  );
}

TextBox.propTypes = {
  generatedText: PropTypes.string.isRequired,
};
