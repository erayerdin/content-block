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

import { match } from "ts-pattern"
import { v7 as uuidv7 } from "uuid"
import z from "zod"

import { NonBlankString, NonEmptyArray } from "./common/schemata"

export const FILTER_SCHEMA_VERSION = 1 as const

export const FilterSchema = z.object({
  description: z.string(),
  domains: NonEmptyArray(NonBlankString),
  id: z.string(),
  prompt: NonBlankString,
  selectors: NonEmptyArray(NonBlankString),
  title: NonBlankString,
  version: z.number()
})

export type Filter = z.infer<typeof FilterSchema>

/**
 * Migrates Filter's version to the latest. It does not parse safely.
 *
 * @param filter - The filter object to migrate.
 * @returns
 */
export const migrateFilter = (filter: { version: number }): Filter => {
  return (
    match(filter)
      .with({ version: 1 }, (v) => v)
      // TODO: implement migration if new version is defined
      .otherwise((v) => {
        throw new Error(`Unknown filter version: ${v}`)
      }) as Filter
  )
}

export const defaultFilter = (): Filter => ({
  description: "",
  domains: [],
  id: uuidv7(),
  prompt: "",
  selectors: [],
  title: "",
  version: FILTER_SCHEMA_VERSION
})
