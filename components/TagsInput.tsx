// REF: https://github.com/heroui-inc/heroui/issues/4630

import { Chip, Input, type InputProps } from "@heroui/react";
import clsx from "clsx";
// components/TagsInput.tsx
import { type FC, type KeyboardEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface TagsInputProps extends InputProps {
  readonly data: { keywords: string[] };
  readonly onTagsChange?: (tags: string[]) => void;
}

const TagsInput: FC<TagsInputProps> = ({ data, onTagsChange, ...rest }) => {
  const { t } = useTranslation();

  const [tags, setTags] = useState<string[]>(data.keywords);
  useEffect(() => {
    setTags(data.keywords);
  }, [data.keywords]);

  const [inputValue, setInputValue] = useState("");

  const pushTag = (tag: string) => {
    const newTags = [...tags, tag];
    setTags(newTags);
    onTagsChange?.(newTags);
  };

  const popTag = () => {
    const newTags = tags.slice(0, -1);
    setTags(newTags);
    onTagsChange?.(newTags);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const val = inputValue.trim();
      if (val && !tags.includes(val)) {
        pushTag(val);
        setInputValue("");
      }
    } else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      popTag();
    }
  };

  return (
    <div className={clsx(rest.className, "flex flex-wrap items-center gap-2")}>
      <Input
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        className="flex-grow"
        isClearable={false}
        onChange={(e) => setInputValue(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
        placeholder={t("press_enter_to_add")}
        value={inputValue}
      />
      {tags.map((tag, idx) => (
        <Chip
          key={tag}
          onClose={() => {
            const newTags = tags.filter((_, i) => i !== idx);
            setTags(newTags);
            onTagsChange?.(newTags);
          }}
        >
          {tag}
        </Chip>
      ))}
    </div>
  );
};

export default TagsInput;
