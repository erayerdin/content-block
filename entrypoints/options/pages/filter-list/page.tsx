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

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Spinner,
  Tooltip,
} from "@heroui/react";
import slug from "limax";
import { DownloadIcon, PenIcon, PlusIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { match } from "ts-pattern";

import useListFilter from "@/hooks/data/useListFilter";
import { defaultFilter, Filter } from "@/types/filter";

import DeletionDialog from "./components/DeletionDialog";
import ImportDialog from "./components/ImportDialog";

const FilterListPage = () => {
  const idb = useIDB();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const listFilter = useListFilter({ idb });

  const exportFilter = (filter: Filter) => {
    const filename = slug(filter.title) + ".json";
    const json = JSON.stringify(filter);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style.display = "none";
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
    a.remove();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 *:grow">
        <Button
          onPress={async () => {
            const filter = defaultFilter();
            await navigate(`/filter/${filter.id}`);
          }}
          type="button"
        >
          <PlusIcon />
          <span>{t("add_filter")}</span>
        </Button>
        <ImportDialog />
      </div>
      <div className="flex flex-col gap-2">
        {match(listFilter)
          .with({ state: "loading" }, () => (
            <div className="flex flex-col items-center justify-center">
              <Spinner />
            </div>
          ))
          .with({ state: "loaded" }, ({ data: filters }) =>
            filters.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center">
                <p>{t("no_filters_found")}</p>
              </div>
            ) : (
              filters.map((filter) => (
                <Card key={filter.id}>
                  <CardHeader className="justify-between">
                    <div className="flex flex-col">
                      <p className="text-lg">{filter.title}</p>
                      <p>{filter.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Tooltip content={t("export_filter")}>
                        <button
                          onClick={() => {
                            exportFilter(filter);
                          }}
                          type="button"
                        >
                          <DownloadIcon />
                        </button>
                      </Tooltip>
                      <Tooltip content={t("edit_filter")}>
                        <button
                          onClick={async () => {
                            await navigate(`/filter/${filter.id}`);
                          }}
                          type="button"
                        >
                          <PenIcon />
                        </button>
                      </Tooltip>
                      <Tooltip content={t("remove_filter")}>
                        <DeletionDialog filter={filter} />
                      </Tooltip>
                    </div>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <p>{filter.prompt}</p>
                  </CardBody>
                  <Divider />
                  <CardFooter className="gap-2">
                    {filter.domains.map((domain) => (
                      <Chip color="primary" key={domain}>
                        {domain}
                      </Chip>
                    ))}
                    {filter.selectors.map((selector) => (
                      <Chip color="secondary" key={selector}>
                        {selector}
                      </Chip>
                    ))}
                  </CardFooter>
                </Card>
              ))
            )
          )
          .exhaustive()}
      </div>
    </div>
  );
};

export default FilterListPage;
