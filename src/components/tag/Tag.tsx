import { useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import "./Tag.css";

const suggestions = [
  "redis",
  "data structures",
  "algorithms",
  "elasticsearch",
  "kibana",
].map((country) => {
  // console.log("suggestions called, country: ", country);
  return {
    id: country,
    text: country,
  };
});

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default function Tag() {
  const [tags, setTags] = useState([
    { id: "Software Engineering", text: "Software Engineering" },
    { id: "Nodejs", text: "Nodejs" },
    { id: "Reactjs", text: "Reactjs" },
    { id: "Docker", text: "Docker" },
  ]);

  const handleDelete = (i: number) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag: any) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag: any, currPos: number, newPos: number) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = (index: number) => {
    console.log("The tag at index " + index + " was clicked");
  };

  return (
    <ReactTags
      tags={tags}
      suggestions={suggestions}
      delimiters={delimiters}
      handleDelete={handleDelete}
      handleAddition={handleAddition}
      handleDrag={handleDrag}
      handleTagClick={handleTagClick}
      inputFieldPosition="bottom"
      autocomplete={true}
    />
  );
}