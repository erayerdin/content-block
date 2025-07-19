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

import { type Filter, FilterSchema } from "@/types/filter";

type Params = {
  idb: IDBPDatabase
}

/**
 * Lists all filters from the IDB. Validates each filter against the FilterSchema and returns only the valid ones.
 * @param idb - The IDB instance.
 * @returns A promise that resolves to an array of filters.
 */
const listFilter = async ({ idb }: Params): Promise<Filter[]> => {
  const filters = await idb.getAll("filters")
  return filters.filter((filter) => {
    const result = FilterSchema.safeParse(filter)
    
    if (!result.success) {
      console.error(result.error)
      return false
    }

    return true
  });
}

export default listFilter