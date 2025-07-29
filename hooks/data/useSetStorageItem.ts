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

import { StorageItemKey, WxtStorage } from "#imports";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";

type Params = {
  key: StorageItemKey;
  storage: WxtStorage;
};

type Return<T> = UseMutationResult<void, unknown, T>;

const useSetStorageItem = <T>({ key, storage }: Params): Return<T> => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (value: T) => {
      await storage.setItem(key, value);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["storage", key] });
    },
  });
  return mutation;
};

export default useSetStorageItem;
