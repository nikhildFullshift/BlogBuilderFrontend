import { Controller, useFormContext } from "react-hook-form";
import { useState } from "react";
import "../tag/Tag.css";
import { WithContext as ReactTags } from "react-tag-input";

interface FormInputProps {
  name: string;
  control: any;
  setValue?: any;
}

export const FormTag = ({ name, control, setValue }: FormInputProps) => {
  const suggestions = ["Software Engineering", "C++", "Java", "Javascript"].map(
    (item) => {
      return {
        id: item,
        text: item,
      };
    }
  );

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];
  const [tags, setTags] = useState([
    { id: "Software Engineering", text: "Software Engineering" },
  ]);

  const handleDelete = (i: number) => {
    const updatedTags = tags.filter((tag, index) => index !== i);
    setTags(updatedTags);
    setValue("tags", updatedTags);
  };

  const handleAddition = (tag: any) => {
    const updatedTags = [...tags, tag];
    setTags(updatedTags);
    setValue("tags", updatedTags);
  };

  const handleDrag = (tag: any, currPos: number, newPos: number) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  // const handleTagClick = (index: number) => {
  //   console.log("The tag at index " + index + " was clicked");
  // };

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <ReactTags
          name="tags"
          tags={tags || value}
          suggestions={suggestions}
          delimiters={delimiters}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          inputFieldPosition="bottom"
          autocomplete={true}
        />
      )}
    />
  );
};
