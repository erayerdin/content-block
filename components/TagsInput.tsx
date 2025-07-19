// REF: https://github.com/heroui-inc/heroui/issues/4630

import { Chip, Input, type InputProps } from "@heroui/react";
import clsx from "clsx";
import React, { type KeyboardEvent, useState } from "react";

interface TagsInputProps extends InputProps {
  readonly data: { keywords: string[] };
  readonly onTagsChange?: (tags: string[]) => void;
}

const TagsInput: React.FC<TagsInputProps> = ({
  data,
  onTagsChange,
  ...rest
}) => {
  const [tags, setTags] = React.useState<string[]>(
    data?.keywords ? data?.keywords : data?.keywords || []
  );
  const [inputValue, setInputValue] = useState<string>("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmedValue = inputValue.trim();

      if (trimmedValue && !tags.includes(trimmedValue)) {
        const newTags = [...tags, trimmedValue];
        setTags(newTags);

        if (onTagsChange) onTagsChange(newTags);

        setInputValue("");
      }
    }

    if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      const updatedTags = Array.from(
        new Set(tags.map((t) => t.trim().toLowerCase()))
      );
      setTags(updatedTags);
      if (onTagsChange) onTagsChange(updatedTags);
    }
  };

  const handleRemoveTag = (index: number) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
    if (onTagsChange) onTagsChange(updatedTags);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className={clsx(rest.className, "flex flex-wrap items-center gap-2")}>
      <Input
        placeholder="Press Enter to add" // TODO: localize
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        className={clsx("flex-grow")}
        isClearable={false}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        value={inputValue}
      />
      {tags.map((tag, index) => (
        <Chip
          className="flex p-2 mb-1"
          key={tag}
          onClose={() => handleRemoveTag(index)}
        >
          {tag}
        </Chip>
      ))}
    </div>
  );
};

export default TagsInput;
