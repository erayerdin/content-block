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

import checkEnabled from "./checkEnabled";

type Params = {
  storage: WxtStorage;
};

const toggleExtension = async ({ storage }: Params) => {
  const enabled = await checkEnabled({ storage });
  await storage.setItem("local:enabled", !enabled);
};

export default toggleExtension;
