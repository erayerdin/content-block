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
import { useQuery } from "@tanstack/react-query";

import getFreeEnabledModels from "@/actions/getFreeEnabledModels";
import { LLMModel } from "@/types/llm";

type Params = {
  storage: WxtStorage;
};

type Return =
  | {
      data: LLMModel[];
      state: "loaded";
    }
  | {
      data: undefined;
      state: "loading";
    };

const useGetFreeEnabledModels = ({ storage }: Params): Return => {
  const query = useQuery({
    queryFn: () => getFreeEnabledModels({ storage }),
    queryKey: ["freeEnabledModels"],
  });

  if (query.isLoading) {
    return {
      data: undefined,
      state: "loading",
    };
  }

  return {
    data: query.data!,
    state: "loaded",
  };
};

export default useGetFreeEnabledModels;
