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

import { cn, Switch } from "@heroui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { FreeView, ManagedView } from "./views";

const AIPage = () => {
  const { t } = useTranslation();
  const [isFree, setFree] = useState(true);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-center">
        <Switch
          classNames={{
            base: cn(
              "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
              "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
              "data-[selected=true]:border-primary"
            ),
            thumb: cn(
              "w-6 h-6 border-2 shadow-lg",
              "group-data-[hover=true]:border-primary",
              //selected
              "group-data-[selected=true]:ms-6",
              // pressed
              "group-data-[pressed=true]:w-7",
              "group-data-pressed:group-data-selected:ms-4"
            ),
            wrapper: "p-0 h-4 overflow-visible",
          }}
          isSelected={isFree}
          onValueChange={setFree}
        >
          <div className="flex flex-col gap-1">
            <p className="text-medium">{t(isFree ? "free" : "managed")}</p>
            <p className="text-tiny text-default-400">
              {t(isFree ? "free_description" : "managed_description")}
            </p>
          </div>
        </Switch>
      </div>
      {isFree ? <FreeView /> : <ManagedView />}
    </div>
  );
};

export default AIPage;
