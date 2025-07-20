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

import i18next from "i18next";
import * as z from "zod";
import { type ZodTypeAny } from "zod";

export const NonBlankString = z.string().refine((v) => v.trim().length > 0, {
  message: i18next.t("this_must_not_be_blank"),
});

export const NonEmptyArray = <T extends ZodTypeAny>(schema: T) =>
  z.array(schema).refine((v) => v.length > 0, {
    message: i18next.t("this_must_not_be_empty"),
  });
