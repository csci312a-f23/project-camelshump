/* eslint-disable react/jsx-no-bind */
import { HfInference } from "@huggingface/inference";
import PropTypes from "prop-types";
import TextPrompt from "./TextPrompt";
import styles from "../styles/TextBox.module.css";

const hf = new HfInference("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");

export default function TextBox({
  generatedText,
  setGeneratedText,
  invisiblePrompt,
  setInvisiblePrompt,
}) {
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
  }

  return (
    <div>
      <TextPrompt
        getText={getText}
        invisiblePrompt={invisiblePrompt}
        setInvisiblePrompt={setInvisiblePrompt}
      />
      <div className={styles.textBox}>
        <p id="textBox">{generatedText}</p>
        {document.getElementById("textBox") ? scrollToBottom() : <div />}
      </div>
    </div>
  );
}

TextBox.propTypes = {
  // eslint-disable-next-line react/require-default-props
  generatedText: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  setGeneratedText: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  invisiblePrompt: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  setInvisiblePrompt: PropTypes.func,
};
