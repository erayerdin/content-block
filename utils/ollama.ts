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

import { WxtStorage } from "#imports";
import { Ollama } from "ollama/browser";

type Params = {
  storage: WxtStorage;
};

export const initOllama = async ({
  storage,
}: Params): Promise<null | Ollama> => {
  console.log("Initializing Ollama...");
  const host =
    (await storage.getItem<string>("local:ollama_host")) ?? "localhost";
  const port = (await storage.getItem<number>("local:ollama_port")) ?? 11434;
  const addr = `http://${host}:${port}`;

  const response = await fetch(addr);
  const text = await response.text();

  if (text !== "Ollama is running") {
    console.error("Ollama does not respond fine.", response, addr);
    return null;
  }

  const ollama = new Ollama({ host: addr });
  return ollama;
};

export default initOllama;
