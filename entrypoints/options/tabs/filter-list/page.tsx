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

import { Button } from "@heroui/react";
import { PlusIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import { defaultFilter } from "@/types/filter";

const FilterListPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4">
      <Button
        onPress={async () => {
          const filter = defaultFilter();
          await navigate(`/filter/${filter.id}`);
        }}
        size="sm"
        type="button"
      >
        <PlusIcon />
        <span>{t("add_filter")}</span>
      </Button>
    </div>
  );
};

export default FilterListPage;
