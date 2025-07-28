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

import { Spinner } from "@heroui/react";
import { type FC, useContext, useEffect, useMemo, useState } from "react";

import ChildrenProps from "@/types/ChildrenProps";

import { I18NextContext } from "./I18NextProvider";
import { IDBContext } from "./IDBProvider";
import { ZodContext } from "./ZodProvider";

const LoadingProvider: FC<ChildrenProps> = ({ children }) => {
  const idb = useContext(IDBContext);
  const i18next = useContext(I18NextContext);
  const zod = useContext(ZodContext);

  const dependencies = useMemo(() => [i18next, idb, zod], [i18next, idb, zod]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(dependencies.some((elm) => elm === null));
  }, [dependencies]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return children;
};

export default LoadingProvider;
