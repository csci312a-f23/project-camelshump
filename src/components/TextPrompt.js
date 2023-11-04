import {useState} from "react";
import PropTypes from "prop-types";

export default function TextPrompt({getText}){
    const [question, setQuestion] = useState();

    return(
        <div>
            <label>Text Input</label>
            <input 
                type="text"
                value={question}
                onChange={(event) => setQuestion(event.target.value) }
            />
            <button
                type="button"
                name="Save"
                disabled={!question}
                onClick={() => {getText(question)}}
            >
                Save
            </button>

        </div>
    )

}

TextPrompt.propTypes = {
    // eslint-disable-next-line react/require-default-props
    getText: PropTypes.func,
};