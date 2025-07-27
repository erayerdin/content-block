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
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";

import setModelResponseTimeout from "@/actions/setModelResponseTimeout";

type Params = {
  storage: WxtStorage;
};

type Return = UseMutationResult<void, unknown, number>;

const useSetModelResponseTimeout = ({ storage }: Params): Return => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (timeout: number) =>
      setModelResponseTimeout({ storage, timeout }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["modelResponseTimeout"] });
    },
  });
  return mutation;
};

export default useSetModelResponseTimeout;
