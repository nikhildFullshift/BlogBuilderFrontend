import React, { useState } from "react";

const Sidenote = () => {
  const [selectedText, setSelectedText] = useState("");
  const [annotation, setAnnotation] = useState("");
  const [sidenotes, setSidenotes] = useState([]);

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const text = selection.toString().trim();

    if (text) {
      setSelectedText(text);
    }
  };

  const handleAddSidenote = () => {
    if (selectedText && annotation) {
      const newSidenote = {
        text: selectedText,
        annotation: annotation,
      };

      setSidenotes([...sidenotes, newSidenote]);
      setSelectedText("");
      setAnnotation("");
    }
  };

  return (
    <div>
      <div>
        <p onMouseUp={handleTextSelection}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div>
        <textarea
          placeholder="Add your annotation here..."
          value={annotation}
          onChange={(e) => setAnnotation(e.target.value)}
        />
        <button onClick={handleAddSidenote}>Add Sidenote</button>
      </div>
      <div>
        <h2>Sidenotes</h2>
        <ul>
          {sidenotes.map((note, index) => (
            <li key={index}>
              <strong>{note.text}</strong>: {note.annotation}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidenote;
