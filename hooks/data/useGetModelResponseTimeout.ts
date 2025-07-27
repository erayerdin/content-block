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

import getModelResponseTimeout from "@/actions/getModelResponseTimeout";

type Params = {
  storage: WxtStorage;
};

type Return =
  | {
      data: number;
      state: "loaded";
    }
  | {
      data: undefined;
      state: "loading";
    };

const useGetModelResponseTimeout = ({ storage }: Params): Return => {
  const query = useQuery({
    queryFn: () => getModelResponseTimeout({ storage }),
    queryKey: ["modelResponseTimeout"],
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

export default useGetModelResponseTimeout;
