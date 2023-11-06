/* eslint-disable react/jsx-no-bind */
import { HfInference } from "@huggingface/inference";
import { useState } from "react";
import TextPrompt from "./TextPrompt";
import styles from "../styles/TextBox.module.css";

const hf = new HfInference("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");

// NOTE ABOUT ENEMY DESCRIPTIONs
// Pass hard-coded questions when we go over enemies or items on map

export default function TextBox() {
  const [generatedText, setGeneratedText] = useState("");

  const genKwargs = {
    max_new_tokens: 128,
    top_k: 30,
    top_p: 0.9,
    temperature: 0.2,
    repetition_penalty: 1.02,
    stopSequences: ["\nUser:", "<|endoftext|>", "</s>"],
  };

  async function getText(question) {
    setGeneratedText();
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
    }
    setGeneratedText(textStream);
    // console.log(generatedText);
  }

  return (
    <div>
      <TextPrompt getText={getText} />
      <div className={styles.textBox}>
        <p>{generatedText}</p>
      </div>
    </div>
  );
}
