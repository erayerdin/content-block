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
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import { PlusIcon, XIcon } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { match } from "ts-pattern";

import useDeleteFilter from "@/hooks/data/useDeleteFilter";
import useListFilter from "@/hooks/data/useListFilter";
import { defaultFilter, Filter } from "@/types/filter";

const DeletionDialog: FC<{ readonly filter: Filter }> = ({ filter }) => {
  const idb = useIDB();
  const { t } = useTranslation();
  const [deletionDialog, setDeletionDialog] = useState<null | string>(null);
  const deleteFilter = useDeleteFilter({ idb });

  return (
    <>
      <Modal
        isOpen={deletionDialog === filter.id}
        onOpenChange={(isOpen) => {
          if (isOpen) {
            setDeletionDialog(filter.id);
          } else {
            setDeletionDialog(null);
          }
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {t("are_you_sure_to_remove_filter_x", {
                  x: filter.title,
                })}
              </ModalHeader>
              <ModalBody>{t("this_action_cannot_be_undone")}</ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  onPress={async () => {
                    await deleteFilter.mutateAsync(filter.id);
                    onClose();
                  }}
                >
                  {t("remove_this_filter")}
                </Button>
                <Button color="primary" onPress={onClose}>
                  {t("cancel")}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <button
        onClick={() => {
          setDeletionDialog(filter.id);
        }}
        type="button"
      >
        <XIcon />
      </button>
    </>
  );
};

const FilterListPage = () => {
  const idb = useIDB();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const listFilter = useListFilter({ idb });

  return (
    <div className="flex flex-col gap-4">
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
                    <DeletionDialog filter={filter} />
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
