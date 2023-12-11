import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function TextPrompt({
  getText,
  invisiblePrompt,
  setInvisiblePrompt,
}) {
  const [question, setQuestion] = useState();

  useEffect(() => {
    if (invisiblePrompt) {
      getText(invisiblePrompt);
      setInvisiblePrompt("");
      setQuestion("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invisiblePrompt]);

  return (
    <div>
      <label> Text Input </label>
      <input
        type="text"
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
      />
      <button
        type="button"
        name="Save"
        disabled={!question}
        onClick={() => {
          getText(question);
        }}
      >
        Save
      </button>
    </div>
  );
}

TextPrompt.propTypes = {
  // eslint-disable-next-line react/require-default-props
  getText: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  invisiblePrompt: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  setInvisiblePrompt: PropTypes.func,
};
