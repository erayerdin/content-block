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

import { useQuery } from "@tanstack/react-query";
import { IDBPDatabase } from "idb";

import getFilter from "@/actions/getFilter";
import { Filter } from "@/types/filter";

type Params = {
  id: string;
  idb: IDBPDatabase<unknown>;
};

type Return =
  | {
      data: Filter | null;
      state: "loaded";
    }
  | {
      data: undefined;
      state: "loading";
    };

const useGetFilter = ({ id, idb }: Params): Return => {
  console.log("Getting filter...", id);
  const query = useQuery({
    queryFn: () => getFilter({ id, idb }),
    queryKey: ["filter", id],
  });

  const data = query.data as Filter | null;

  return {
    data,
    state: "loaded",
  };
};

export default useGetFilter;
