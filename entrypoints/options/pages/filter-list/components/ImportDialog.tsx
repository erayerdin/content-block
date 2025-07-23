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
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
} from "@heroui/react";
import clsx from "clsx";
import { ImportIcon } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { v7 as uuidV7 } from "uuid";

import useCreateFilter from "@/hooks/data/useCreateFilter";
import { Filter, migrateFilter } from "@/types/filter";

type ImportState =
  | {
      error: unknown;
      file: File;
      state: "failure";
    }
  | {
      file: File;
      state: "ready" | "running" | "success";
    };

const ImportStatus: FC<{ readonly status: ImportState[] }> = ({ status }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap gap-1">
      {status.map((state) => (
        <Tooltip
          content={
            <div className="flex flex-col gap-1 text-sm">
              <div className="flex gap-1">
                <p className="font-bold">{t("file_name") + ":"}</p>
                <p>{state.file.name}</p>
              </div>
              <div className="flex gap-1">
                <p className="font-bold">{t("status") + ":"}</p>
                <p>{t(state.state)}</p>
              </div>
              {state.state === "failure" && (
                <div className="flex gap-1">
                  <p className="font-bold">{t("error_message") + ":"}</p>
                  <p>{`${state.error}`}</p>
                </div>
              )}
            </div>
          }
          key={`${state.file.name}-${state.file.size}-${state.file.lastModified}`}
        >
          <div
            className={clsx("size-2 rounded-sm", {
              "bg-gray-500": state.state === "ready",
              "bg-green-500": state.state === "success",
              "bg-red-500": state.state === "failure",
            })}
          />
        </Tooltip>
      ))}
    </div>
  );
};

const ImportDialog = () => {
  const { t } = useTranslation();
  const idb = useIDB();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [files, setFiles] = useState<ImportState[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const createFilter = useCreateFilter({ idb });

  const isReady = files.every(({ state }) => state === "ready");
  const isRunning = files.some(({ state }) => state === "running");
  const isDone = files.some(
    ({ state }) => state !== "ready" && state !== "running"
  );

  const replaceFiles = (status: ImportState, idx: number) => {
    return setFiles((prev) => [
      ...prev.slice(0, idx),
      status,
      ...prev.slice(idx + 1),
    ]);
  };

  const handleFileImports = (files: ImportState[]) => {
    files.forEach((status, idx) => {
      const runningStatus: ImportState = {
        ...status,
        state: "running",
      };
      replaceFiles(runningStatus, idx);

      const { file } = status;

      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = async (e) => {
        const text = e.target?.result;
        if (typeof text !== "string") {
          return;
        }
        const filter: Filter = {
          ...migrateFilter(JSON.parse(text)),
          id: uuidV7(),
        };
        await createFilter.mutateAsync(filter);
        replaceFiles({ ...status, state: "success" }, idx);
      };
      reader.onerror = (e) => {
        replaceFiles({ ...status, error: e, state: "failure" }, idx);
      };
    });
  };

  return (
    <>
      <input
        accept=".json"
        className="hidden"
        multiple
        onChange={(e) => {
          if (e.target.files) {
            setFiles(
              Array.from(e.target.files || []).map((file) => ({
                file,
                state: "ready",
              }))
            );
          } else {
            setFiles([]);
          }
        }}
        ref={fileInputRef}
        type="file"
      />
      <Modal
        isOpen={isDialogOpen}
        onOpenChange={(isOpen) => {
          setIsDialogOpen(isOpen);
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{t("import_filters")}</ModalHeader>
              <ModalBody>
                {files.length === 0 ? (
                  <p>{t("select_files_to_import_filters")}</p>
                ) : (
                  <>
                    <p>{t("hover_over_to_see_more_details")}</p>
                    <ImportStatus status={files} />
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                {files.length === 0 ? (
                  <Button
                    color="primary"
                    onPress={() => {
                      fileInputRef.current?.click();
                    }}
                    type="button"
                  >
                    {t("select_files")}
                  </Button>
                ) : (
                  <Button
                    color={isDone ? "success" : "primary"}
                    disabled={isRunning}
                    onPress={() => {
                      if (isReady) {
                        handleFileImports(files);
                      } else if (isDone) {
                        onClose();
                      }
                    }}
                    type="button"
                  >
                    {t(isDone ? "complete_import" : "begin_to_import")}
                  </Button>
                )}
                {!isDone && (
                  <Button onPress={onClose} type="button">
                    {t("cancel")}
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Button
        onPress={async () => {
          setIsDialogOpen(true);
        }}
        type="button"
      >
        <ImportIcon />
        <span>{t("import_filters")}</span>
      </Button>
    </>
  );
};

export default ImportDialog;
