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

import { storage } from "#imports";
import { match } from "ts-pattern";

import Model, { OllamaModel } from "@/types/model";
import initOllama from "@/utils/ollama";

type AnalyzeWithOllamaParams = {
  content: string;
  model: OllamaModel;
  prompt: string;
};

const analyzeWithOllama = async ({
  content,
  model,
  prompt,
}: AnalyzeWithOllamaParams): Promise<boolean> => {
  const ollama = await initOllama({ storage });

  if (ollama === null) {
    throw new Error(`Ollama is not initialized. Cannot analyze content.`);
  }

  const { response: raw } = await ollama.generate({
    format: "json",
    model: model.tag,
    prompt: `${prompt}\n\n${content}`,
    stream: false,
  });
  const response: boolean = JSON.parse(raw);
  return response;
};

type Params = {
  content: string;
  model: Model;
  prompt: string;
};

const analyze = (params: Params): Promise<boolean> => {
  console.log("Analyzing content...");

  return match(params)
    .with({ model: { location: "ollama" } }, analyzeWithOllama)
    .exhaustive();
};

export default analyze;
