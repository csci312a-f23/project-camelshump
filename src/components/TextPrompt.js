// import { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import styles from "../styles/TextPrompt.module.css";

export default function TextPrompt() {
  // const [question, setQuestion] = useState();

  // useEffect(() => {
  //   if (invisiblePrompt) {
  //     getText(invisiblePrompt);
  //     setInvisiblePrompt("");
  //     setQuestion("");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [invisiblePrompt]);

  return (
    <div className={styles.textPrompt}>
      <label> Text Input </label>
      <input
        type="text"
        // value={question}
        // onChange={(event) => setQuestion(event.target.value)}
      />
      <button
        type="button"
        name="Save"
        // disabled={!question}
        // onClick={() => {
        //   getText(question);
        // }}
      >
        Save
      </button>
    </div>
  );
}

TextPrompt.propTypes = {
  // getText: PropTypes.func.isRequired,
  // invisiblePrompt: PropTypes.string.isRequired,
  // setInvisiblePrompt: PropTypes.func.isRequired,
};
