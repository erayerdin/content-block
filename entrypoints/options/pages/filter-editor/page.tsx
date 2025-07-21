// entrypoints/options/tabs/filter-editor/page.tsx
import { Button, Input, Spinner } from "@heroui/react";
import { PenIcon, PlusIcon } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import { z } from "zod";

import TagsInput from "@/components/TagsInput";
import useCreateFilter from "@/hooks/data/useCreateFilter";
import useGetFilter from "@/hooks/data/useGetFilter";
import useIDB from "@/hooks/useIDB";
import { defaultFilter, type Filter, FilterSchema } from "@/types/filter";

const FilterEditorPage: FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const idb = useIDB();
  const createFilter = useCreateFilter({ idb });
  const { data: filter, state } = useGetFilter({ id: id!, idb });

  const [draft, setDraft] = useState<Filter>(filter || defaultFilter());
  const [parseResult, setParseResult] = useState(() =>
    FilterSchema.safeParse(draft)
  );

  // TODO: error messages are not descriptive

  useEffect(() => {
    if (state === "loaded" && filter) {
      setDraft(filter);
      setParseResult(FilterSchema.safeParse(filter));
    }
  }, [filter, state]);

  const onChange = (next: Partial<Filter>) => {
    const updated = { ...draft, ...next };
    setDraft(updated);
    setParseResult(FilterSchema.safeParse(updated));
  };

  const validationTree = parseResult.success
    ? null
    : z.treeifyError(parseResult.error);

  const getFirstError = (field: keyof Filter) =>
    validationTree?.properties?.[field]?.errors?.[0] ?? "";

  const hasError = (field: keyof Filter) =>
    (validationTree?.properties?.[field]?.errors || [])?.length > 0;

  if (state === "loading") {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 p-4">
      <Input
        errorMessage={getFirstError("title")}
        isInvalid={hasError("title")}
        label={t("title")}
        onValueChange={(val) => onChange({ title: val })}
        value={draft.title}
      />

      <Input
        errorMessage={getFirstError("description")}
        isInvalid={hasError("description")}
        label={t("description")}
        onValueChange={(val) => onChange({ description: val })}
        value={draft.description}
      />

      <TagsInput
        data={{ keywords: draft.domains }}
        errorMessage={getFirstError("domains")}
        isInvalid={hasError("domains")}
        label={t("domains")}
        onTagsChange={(tags) => onChange({ domains: tags.map((t) => t) })}
        placeholder={
          t("x_and_y", {
            x: t("press_enter_to_add"),
            y: t("you_can_use_regex").toLowerCase(),
          }) + "."
        }
      />

      <TagsInput
        data={{ keywords: draft.selectors }}
        errorMessage={getFirstError("selectors")}
        isInvalid={hasError("selectors")}
        label={t("selectors")}
        onTagsChange={(tags) => onChange({ selectors: tags.map((t) => t) })}
      />

      <Input
        errorMessage={getFirstError("prompt")}
        isInvalid={hasError("prompt")}
        label={t("prompt")}
        onValueChange={(val) => onChange({ prompt: val })}
        value={draft.prompt}
      />

      <Button
        disabled={!parseResult.success}
        onPress={async () => {
          if (parseResult.success) {
            await createFilter.mutateAsync(parseResult.data);
            await navigate("/filters");
          }
        }}
        type="button"
      >
        {filter ? <PenIcon /> : <PlusIcon />}
        <span>{t(filter ? "update_filter" : "add_filter")}</span>
      </Button>
    </div>
  );
};

export default FilterEditorPage;
