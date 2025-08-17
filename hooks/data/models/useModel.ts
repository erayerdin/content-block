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

import getModel from "@/actions/getModel";
import Model, { models, Tag } from "@/types/model";

const useModel = (tag: Tag): Model => {
  const ollama = useOllama();
  const query = useQuery<Model>({
    queryFn: () => getModel({ ollama, tag }),
    queryKey: ["ollama", "model", tag],
  });

  const localModel = models.find(({ tag: t }) => t === tag);

  if (localModel === undefined) {
    throw new Error(
      `Local model does not exist for ${tag}. Possibly unsupported model.`
    );
  }

  return query.data ?? localModel;
};

export default useModel;
