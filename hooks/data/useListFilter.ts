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

import type { IDBPDatabase } from "idb";

import { useQuery } from "@tanstack/react-query";

import listFilter from "@/actions/listFilter";
import { type Filter, migrateFilter } from "@/types/filter";

type Params = {
  idb: IDBPDatabase;
};

type Return =
  | {
      data: Filter[];
      state: "loaded";
    }
  | {
      data: undefined;
      state: "loading";
    };

const useListFilter = ({ idb }: Params): Return => {
  console.log("Listing filters...");
  const query = useQuery({
    queryFn: () => listFilter({ idb }),
    queryKey: ["list-filter"],
  });

  const data = query.data as Filter[] | undefined;

  if (data === undefined) {
    return {
      data: [],
      state: "loaded",
    };
  }

  return {
    data: data.map(migrateFilter),
    state: "loaded",
  };
};

export default useListFilter;
