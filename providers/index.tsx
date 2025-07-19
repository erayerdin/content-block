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

import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC } from "react";

import ChildrenProps from "@/types/ChildrenProps";

import IDBProvider from "./IDBProvider";
import LoadingProvider from "./LoadingProvider";

const queryClient = new QueryClient();

const GlobalProvider: FC<ChildrenProps> = ({ children }) => {
  return (
    <HeroUIProvider>
      <QueryClientProvider client={queryClient}>
        <IDBProvider>
          <LoadingProvider>{children}</LoadingProvider>
        </IDBProvider>
      </QueryClientProvider>
    </HeroUIProvider>
  );
};

export default GlobalProvider;
