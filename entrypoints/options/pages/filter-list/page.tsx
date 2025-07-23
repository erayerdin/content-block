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
} from "@heroui/react";
import { PenIcon, PlusIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { match } from "ts-pattern";

import useListFilter from "@/hooks/data/useListFilter";
import { defaultFilter } from "@/types/filter";

import DeletionDialog from "./components/DeletionDialog";
import ImportDialog from "./components/ImportDialog";

const FilterListPage = () => {
  const idb = useIDB();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const listFilter = useListFilter({ idb });

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
                      <button
                        onClick={async () => {
                          await navigate(`/filter/${filter.id}`);
                        }}
                        type="button"
                      >
                        <PenIcon />
                      </button>
                      <DeletionDialog filter={filter} />
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
