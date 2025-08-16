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

import { Ollama } from "ollama";

import Model, { models as _models } from "@/types/model";

type Params = {
  ollama: null | Ollama;
  tag: string;
};

const getModel = async ({ ollama, tag }: Params): Promise<Model> => {
  console.log("Getting model...", tag);
  const localModel = _models.find(({ tag: t }) => t === tag);
  if (localModel === undefined) {
    throw new Error(
      `Local model cannot be found for ${tag}. Possibly unsupported model.`
    );
  }

  if (ollama === null) {
    console.error("Ollama is not initialized. Returning local model.");
    return localModel;
  }

  const { models } = await ollama.list();
  const remoteModel = models.find(({ name }) => name === tag); // model from ollama

  if (remoteModel === undefined) {
    return localModel;
  }

  return {
    ...localModel,
    status: { state: "downloaded" },
  };
};

export default getModel;
