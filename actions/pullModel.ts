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

import { QueryClient } from "@tanstack/react-query";
import { Ollama } from "ollama/browser";

import Model, { models } from "@/types/model";

type Params = {
  ollama: null | Ollama;
  queryClient: QueryClient;
  tag: string;
};

type Return = {
  abort: () => void;
};

const pullModel = async ({
  ollama,
  queryClient,
  tag,
}: Params): Promise<Return> => {
  console.log("Pulling model...", tag);

  if (ollama === null) {
    throw new Error(
      `Ollama model was not initialized while pulling model ${tag}.`
    );
  }

  const localModel = models.find(({ tag: t }) => t === tag);

  if (localModel === undefined) {
    throw new Error(`Model ${tag} not found in supported models.`);
  }

  const stream = await ollama.pull({ model: tag, stream: true });

  (async () => {
    for await (const { completed, status, total } of stream) {
      if (status === "success") {
        queryClient.setQueryData(["ollama", "model", tag], {
          ...localModel,
          status: { state: "downloaded" },
        } satisfies Model);
      }

      const progress = (1 / total) * completed;

      queryClient.setQueryData(["ollama", "model", tag], {
        ...localModel,
        status: {
          progress,
          state: progress === 1 ? "downloaded" : "downloading",
        },
      } satisfies Model);
    }
  })();

  return { abort: stream.abort };
};

export default pullModel;
