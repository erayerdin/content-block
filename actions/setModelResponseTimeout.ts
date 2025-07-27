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

type Params = {
  storage: WxtStorage;
  timeout: number;
};

const setModelResponseTimeout = async ({
  storage,
  timeout: value,
}: Params): Promise<void> => {
  console.log("Setting model response timeout...");
  await storage.setItem("sync:modelResponseTimeout", value);
};

export default setModelResponseTimeout;
