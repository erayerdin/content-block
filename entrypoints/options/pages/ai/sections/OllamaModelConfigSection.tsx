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

import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  CircularProgress,
  Tooltip,
} from "@heroui/react";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { formatDistanceToNow } from "date-fns";
import { CheckIcon, DownloadIcon } from "lucide-react";
import prettyBytes from "pretty-bytes";
import { useTranslation } from "react-i18next";
import { match } from "ts-pattern";

import pullModel from "@/actions/pullModel";
import useModels from "@/hooks/data/models/useModels";
import useGetStorageItem from "@/hooks/data/useGetStorageItem";
import useSetStorageItem from "@/hooks/data/useSetStorageItem";
import useWxtStorage from "@/hooks/useWxtStorage";

const OllamaModelConfigSection = () => {
  const { i18n, t } = useTranslation();
  const storage = useWxtStorage();
  const ollama = useOllama();
  const queryClient = useQueryClient();
  const models = useModels();
  const selectedModel = useGetStorageItem<null | string>({
    key: "local:selected_model",
    storage,
  });
  const setSelectedModel = useSetStorageItem<null | string>({
    key: "local:selected_model",
    storage,
  });

  const ctxWindowLengthFormatter = new Intl.NumberFormat(i18n.language, {
    maximumFractionDigits: 1,
    notation: "compact",
  });

  const knowledgeCutoffFormatter = new Intl.DateTimeFormat(i18n.language, {
    dateStyle: "short",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  return (
    <Card>
      <CardHeader>
        <h1 className="text-2xl">{t("ollama_model_configuration")}</h1>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {models.map(
            ({
              ctxWindowLength,
              knowledgeCutoff,
              size,
              status,
              tag,
              title,
            }) => (
              <Card key={tag}>
                <CardHeader className="justify-between">
                  <h1 className="text-xl">{title}</h1>
                  {match(status)
                    .with({ state: "not-downloaded" }, () => (
                      <button
                        className="hover:cursor-pointer"
                        onClick={() => {
                          pullModel({ ollama, queryClient, tag });
                        }}
                        type="button"
                      >
                        <DownloadIcon />
                      </button>
                    ))
                    .with({ state: "downloading" }, ({ progress }) => (
                      <CircularProgress
                        aria-label="???"
                        showValueLabel
                        value={progress * 100}
                      />
                    ))
                    .with({ state: "downloaded" }, () => (
                      <button
                        className={clsx(
                          "rounded-full p-1 hover:cursor-pointer",
                          selectedModel.data === tag
                            ? "bg-blue-500 text-white"
                            : "border-gray-500 border-1 text-gray-500"
                        )}
                        onClick={async () => {
                          await setSelectedModel.mutateAsync(tag);
                        }}
                        type="button"
                      >
                        <CheckIcon />
                      </button>
                    ))
                    .exhaustive()}
                </CardHeader>
                <CardBody className="flex-row gap-2 flex-wrap">
                  <Tooltip content={t("model_size")}>
                    <Chip>{prettyBytes(size)}</Chip>
                  </Tooltip>
                  <Tooltip content={t("context_window_length")}>
                    <Chip>
                      {ctxWindowLengthFormatter.format(ctxWindowLength) +
                        " " +
                        t("tokens")}
                    </Chip>
                  </Tooltip>
                  <Tooltip
                    content={t("knowledge_cutoff_date_is_date", {
                      date: knowledgeCutoffFormatter.format(knowledgeCutoff),
                    })}
                  >
                    <Chip>{formatDistanceToNow(knowledgeCutoff)}</Chip>
                  </Tooltip>
                </CardBody>
              </Card>
            )
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default OllamaModelConfigSection;
