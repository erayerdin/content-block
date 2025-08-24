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

export type OllamaModel = BaseModel & { location: "ollama"; tag: OllamaTag };
export type OllamaTag = "llama3.1:8b" | "llama3.2:1b" | "llama3.2:3b";

// eslint-disable-next-line sonarjs/redundant-type-aliases
export type Tag = OllamaTag;
type BaseModel = {
  ctxWindowLength: number;
  knowledgeCutoff: Date;
  size: number;
  status:
    | {
        progress: number;
        state: "downloading";
      }
    | {
        state: "downloaded";
      }
    | {
        state: "not-downloaded";
      };
  title: string;
};
// eslint-disable-next-line sonarjs/redundant-type-aliases
type Model = OllamaModel;

const Llama3p1a8b: OllamaModel = {
  ctxWindowLength: 128000,
  knowledgeCutoff: new Date("2023-12-31"),
  location: "ollama",
  size: 4.7 * 1024 * 1024 * 1024, // in bytes
  status: {
    state: "not-downloaded",
  },
  tag: "llama3.1:8b",
  title: "Llama 3.1 8B",
} as const;

const Llama3p2a1b: OllamaModel = {
  ctxWindowLength: 128000,
  knowledgeCutoff: new Date("2023-12-31"),
  location: "ollama",
  size: 1.3 * 1024 * 1024 * 1024, // in bytes
  status: {
    state: "not-downloaded",
  },
  tag: "llama3.2:1b",
  title: "Llama 3.2 1B",
} as const;

const Llama3p2a3b: OllamaModel = {
  ctxWindowLength: 128000,
  knowledgeCutoff: new Date("2023-12-31"),
  location: "ollama",
  size: 2 * 1024 * 1024 * 1024, // in bytes
  status: {
    state: "not-downloaded",
  },
  tag: "llama3.2:3b",
  title: "Llama 3.2 3B",
} as const;

export const models: Model[] = [Llama3p1a8b, Llama3p2a1b, Llama3p2a3b] as const;

export default Model;
