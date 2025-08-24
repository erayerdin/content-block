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

import { Ollama } from "ollama/browser";
import { createContext, FC, useEffect, useState } from "react";

import useWxtStorage from "@/hooks/useWxtStorage";
import ChildrenProps from "@/types/ChildrenProps";

export const OllamaContext = createContext<null | Ollama>(null);

const OllamaProvider: FC<ChildrenProps> = ({ children }) => {
  const storage = useWxtStorage();
  const [ollama, setOllama] = useState<null | Ollama>(null);

  useEffect(() => {
    (async () => {
      setOllama(await initOllama({ storage }));
    })();
  }, [storage]);

  return (
    <OllamaContext.Provider value={ollama}>{children}</OllamaContext.Provider>
  );
};

export default OllamaProvider;
