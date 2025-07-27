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

import { createContext, FC, useEffect, useState } from "react";

import useWxtStorage from "@/hooks/useWxtStorage";
import ChildrenProps from "@/types/ChildrenProps";
import { LLMModels } from "@/types/llm";

export const WxtStorageContext = createContext<"wxtStorage" | null>(null);

const WxtStorageProvider: FC<ChildrenProps> = ({ children }) => {
  const storage = useWxtStorage();
  const [loaded, setLoaded] = useState<"wxtStorage" | null>(null);

  useEffect(() => {
    (async () => {
      const snapshot = await storage.snapshot("sync");
      await storage.setItems([
        { key: "sync:freeModelOrder", value: LLMModels },
        { key: "sync:freeEnabledModels", value: LLMModels },
        { key: "sync:modelResponseTimeout", value: 100 },
      ]);
      await storage.restoreSnapshot("sync", snapshot);
      setLoaded("wxtStorage");
    })();
  }, [storage]);

  return (
    <WxtStorageContext.Provider value={loaded}>
      {children}
    </WxtStorageContext.Provider>
  );
};

export default WxtStorageProvider;
