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
import { createContext, FC } from "react";

import useGetStorageItem from "@/hooks/data/useGetStorageItem";
import useWxtStorage from "@/hooks/useWxtStorage";
import ChildrenProps from "@/types/ChildrenProps";

export const OllamaContext = createContext<null | Ollama>(null);

const OllamaProvider: FC<ChildrenProps> = ({ children }) => {
  const storage = useWxtStorage();
  const { data: ollamaHost } = useGetStorageItem<string>({
    key: "local:ollama_host",
    storage,
  });
  const { data: ollamaPort } = useGetStorageItem<number>({
    key: "local:ollama_port",
    storage,
  });
  const [state, setState] = useState<null | Ollama>(null);

  useEffect(() => {
    const host = ollamaHost ?? "localhost";
    const port = ollamaPort ?? 11434;
    const addr = `http://${host}:${port}`;
    const ollama = new Ollama({ host: addr });

    fetch(addr).then(async (res) => {
      const text = (await res.text()).trim();
      if (text === "Ollama is running") {
        setState(ollama);
      }
    });

    setState(ollama);
  }, [ollamaHost, ollamaPort]);

  return (
    <OllamaContext.Provider value={state}>{children}</OllamaContext.Provider>
  );
};

export default OllamaProvider;
