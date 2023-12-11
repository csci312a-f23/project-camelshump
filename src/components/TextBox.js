/* eslint-disable react/jsx-no-bind */
import { HfInference } from "@huggingface/inference";
import PropTypes from "prop-types";
import { useRef, useEffect } from "react";
import TextPrompt from "./TextPrompt";
import styles from "../styles/TextBox.module.css";

const hf = new HfInference("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");

export default function TextBox({
  generatedText,
  setGeneratedText,
  invisiblePrompt,
  setInvisiblePrompt,
  // setTextList,
  // textList,
  // textListIndex,
  // setTextListIndex,
}) {
  const textBox = useRef();
  const genKwargs = {
    max_new_tokens: 128,
    top_k: 30,
    top_p: 0.9,
    temperature: 0.2,
    repetition_penalty: 1.02,
    stopSequences: ["\nUser:", "<|endoftext|>", "</s>"],
  };

  const scrollToBottom = () => {
    const log = document.getElementById("textBox");
    log.scrollTop = log.scrollHeight;
  };

  async function getText(question) {
    setGeneratedText(`${generatedText}\n`);
    let textStream = "";
    const stream = await hf.textGenerationStream({
      model: "tiiuae/falcon-7b-instruct",
      inputs: question,
      parameters: genKwargs,
    });
    // eslint-disable-next-line no-restricted-syntax
    for await (const r of stream) {
      if (r.token.special) {
        // eslint-disable-next-line no-continue
        continue;
      }
      // stop if we encounter a stop sequence
      if (genKwargs.stopSequences.includes(r.token.text)) {
        break;
      }
      textStream += r.token.text;
      setGeneratedText(`${generatedText + textStream}\n`);
      scrollToBottom();
    }
    scrollToBottom();
  }

  useEffect(() => {
    const area = textBox.current;
    area.scrollTop = area.scrollHeight;
  }, [generatedText]);

  // if there is more to go in list of text to show then display some sort of arrow or something
  // should just add next and last button at the bottom of the textbox div

  return (
    <div>
      <TextPrompt
        getText={getText}
        invisiblePrompt={invisiblePrompt}
        setInvisiblePrompt={setInvisiblePrompt}
      />
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
  setGeneratedText: PropTypes.func.isRequired,
  invisiblePrompt: PropTypes.string.isRequired,
  setInvisiblePrompt: PropTypes.func.isRequired,
  // setTextList: PropTypes.func.isRequired,
  // textList: PropTypes.arrayOf(PropTypes.string).isRequired,
  // setTextListIndex: PropTypes.func.isRequired,
  // textListIndex: PropTypes.number.isRequired,
};
