// Copyright (C) 2025 Eray Erdin
//
// This file is part of content-block.
//
// content-block is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// content-block is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with content-block.  If not, see <https://www.gnu.org/licenses/>.

import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardBody, CardHeader, cn, Input, Skeleton } from "@heroui/react";
import { GripVerticalIcon } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import useGetFreeEnabledModels from "@/hooks/data/useGetFreeEnabledModels";
import useGetFreeModelOrder from "@/hooks/data/useGetFreeModelOrder";
import useGetModelResponseTimeout from "@/hooks/data/useGetModelResponseTimeout";
import useSetFreeEnabledModels from "@/hooks/data/useSetFreeEnabledModels";
import useSetFreeModelOrder from "@/hooks/data/useSetFreeModelOrder";
import useSetModelResponseTimeout from "@/hooks/data/useSetModelResponseTimeout";
import useWxtStorage from "@/hooks/useWxtStorage";
import { getProviderByModel, LLMModel, LLMModelMessages } from "@/types/llm";
import ProviderIcon from "@/utils/provider-icons";

type ModelItemComponentProps = {
  readonly isSelected: boolean;
  readonly model: LLMModel;
  readonly onClick: (model: LLMModel) => void;
};

const ModelItemComponent: FC<ModelItemComponentProps> = ({
  isSelected,
  model,
  onClick,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: model });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const provider = getProviderByModel(model);
  const IconComponent = ProviderIcon[provider];

  return (
    <div
      className={cn(
        "flex gap-2 p-2 rounded-md drop-shadow-md select-none items-center",
        isSelected ? "bg-blue-500 text-white" : "bg-gray-100 text-black"
      )}
      ref={setNodeRef}
      style={style}
    >
      <button
        className="cursor-pointer"
        type="button"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...attributes}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...listeners}
      >
        <GripVerticalIcon size={20} />
      </button>
      <button
        className="flex gap-2 items-center cursor-pointer w-full"
        onClick={() => {
          onClick(model);
        }}
        type="button"
      >
        <IconComponent size={20} />
        <p>{LLMModelMessages[model]}</p>
      </button>
    </div>
  );
};

const ModelOrderComponent = () => {
  const { t } = useTranslation();
  const storage = useWxtStorage();
  const getFreeModelOrder = useGetFreeModelOrder({ storage });
  const setFreeModelOrder = useSetFreeModelOrder({ storage });
  const getFreeEnabledModels = useGetFreeEnabledModels({ storage });
  const setFreeEnabledModels = useSetFreeEnabledModels({ storage });

  const isLoading =
    getFreeEnabledModels.state === "loading" ||
    getFreeModelOrder.state === "loading";

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id && getFreeModelOrder.state === "loaded") {
      const items = getFreeModelOrder.data;
      const oldIndex = items.indexOf(active.id as LLMModel);
      const newIndex = items.indexOf(over.id as LLMModel);
      const arr = arrayMove(items, oldIndex, newIndex);
      await setFreeModelOrder.mutateAsync(arr);
    }

    console.log(order);
  };

  const toggleSelection = (model: LLMModel) => {
    if (getFreeEnabledModels.state === "loaded") {
      const selections = getFreeEnabledModels.data;
      if (selections.includes(model)) {
        setFreeEnabledModels.mutateAsync(selections.filter((m) => m !== model));
      } else {
        setFreeEnabledModels.mutateAsync([...selections, model]);
      }
    }
  };

  if (isLoading) {
    return <Skeleton className="h-32" />;
  }

  const order = getFreeModelOrder.data;
  const selections = getFreeEnabledModels.data;

  return (
    <Card>
      <CardHeader className="flex-col items-start">
        <p className="text-lg font-bold">{t("model_selection")}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {t("model_selection_description")}
        </p>
      </CardHeader>
      <CardBody>
        <DndContext
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={order}>
            <div className="flex flex-col gap-2 text-medium overflow-hidden">
              {order.map((model) => (
                <ModelItemComponent
                  isSelected={selections.includes(model)}
                  key={model}
                  model={model}
                  onClick={toggleSelection}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </CardBody>
    </Card>
  );
};

const TimeoutComponent = () => {
  const { t } = useTranslation();
  const storage = useWxtStorage();
  const getModelResponseTimeout = useGetModelResponseTimeout({ storage });
  const setModelResponseTimeout = useSetModelResponseTimeout({ storage });

  const isLoading = getModelResponseTimeout.state === "loading";

  if (isLoading) {
    return <Skeleton className="h-16" />;
  }

  return (
    <Input
      defaultValue={getModelResponseTimeout.data.toString()}
      label={t("timeout_in_ms")}
      onValueChange={async (timeout) => {
        await setModelResponseTimeout.mutateAsync(parseInt(timeout.trim()));
      }}
    />
  );
};

const FreeView = () => {
  return (
    <div className="flex flex-col gap-4">
      <ModelOrderComponent />
      <TimeoutComponent />
    </div>
  );
};

export default FreeView;
