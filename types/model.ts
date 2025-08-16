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

type Model = {
  ctxWindowLength: number;
  knowledgeCutoff: Date;
  location: "ollama";
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
  tag: string;
  title: string;
};

const Llama3p1a8b: Model = {
  ctxWindowLength: 128000,
  knowledgeCutoff: new Date("2023-12-31"),
  location: "ollama",
  size: 4.7 * 1024 * 1024 * 1024, // in bytes
  status: {
    state: "not-downloaded",
  },
  tag: "llama3.1:8b",
  title: "Llama 3.1 8B",
};

const Llama3p2a1b: Model = {
  ctxWindowLength: 128000,
  knowledgeCutoff: new Date("2023-12-31"),
  location: "ollama",
  size: 1.3 * 1024 * 1024 * 1024, // in bytes
  status: {
    state: "not-downloaded",
  },
  tag: "llama3.2:1b",
  title: "Llama 3.2 1B",
};

const Llama3p2a3b: Model = {
  ctxWindowLength: 128000,
  knowledgeCutoff: new Date("2023-12-31"),
  location: "ollama",
  size: 2 * 1024 * 1024 * 1024, // in bytes
  status: {
    state: "not-downloaded",
  },
  tag: "llama3.2:3b",
  title: "Llama 3.2 3B",
};

export const models = [Llama3p1a8b, Llama3p2a1b, Llama3p2a3b];

export default Model;
