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

import { GoogleGenAI } from "@google/genai";
import { match } from "ts-pattern";

import { LLMProvider } from "@/types/llm";
import stringToSha256 from "@/utils/crypto";
import initI18Next from "@/utils/i18next";
import openDB from "@/utils/idb";

const getFromCache = async (content: string): Promise<boolean | undefined> => {
  const hash = await stringToSha256(content);
  const idb = await openDB();
  const val: boolean | undefined = await idb.get("results", hash);
  return val;
};

const putToCache = async (content: string, result: boolean): Promise<void> => {
  const hash = await stringToSha256(content);
  const idb = await openDB();
  await idb.put("results", result, hash);
};

const analyzeWithGemini = async ({
  content,
  key,
  prompt,
}: {
  content: string;
  key: string;
  prompt: string;
}): Promise<boolean> => {
  const _result = await getFromCache(content);

  if (_result !== undefined) {
    return _result;
  }

  const ai = new GoogleGenAI({
    apiKey: key,
  });
  const t = await initI18Next();

  const response = await ai.models.generateContent({
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "boolean",
      },
    },
    contents: t("analyze_content_prompt", { content, prompt }),
    model: "gemini-2.5-flash-lite",
  });

  const text = response.text;

  if (text === undefined) {
    console.error("Gemini response is undefined.");
    return false;
  }

  const result: boolean = JSON.parse(text);
  await putToCache(content, result);
  return result;
};

type Params = {
  content: string;
  prompt: string;
  provider: {
    key: string;
    type: LLMProvider;
  };
};

const analyze = ({ content, prompt, provider }: Params): Promise<boolean> => {
  console.log("Analyzing content...");

  return match(provider)
    .with({ type: "google" }, ({ key }) =>
      analyzeWithGemini({ content, key, prompt })
    )
    .with({ type: "openai" }, () => {
      // TODO implement later
      throw new Error("Not implemented");
    })
    .exhaustive();
};

export default analyze;
