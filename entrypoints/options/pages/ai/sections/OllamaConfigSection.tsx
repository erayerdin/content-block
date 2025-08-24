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

import { Card, CardBody, CardHeader, Input } from "@heroui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import z from "zod";

import useGetStorageItem from "@/hooks/data/useGetStorageItem";
import useSetStorageItem from "@/hooks/data/useSetStorageItem";
import useWxtStorage from "@/hooks/useWxtStorage";

const HostSchema = z.string();
const PortSchema = z.number().min(1).max(65535);

const OllamaConfigSection = () => {
  const { t } = useTranslation();
  const storage = useWxtStorage();
  const { data: ollamaHost } = useGetStorageItem<string>({
    key: "local:ollama_host",
    storage,
  });
  const { data: ollamaPort } = useGetStorageItem<number>({
    key: "local:ollama_port",
    storage,
  });
  const saveHost = useSetStorageItem({
    key: "local:ollama_host",
    storage,
  });
  const savePort = useSetStorageItem({
    key: "local:ollama_port",
    storage,
  });

  const [hostResult, setHostResult] = useState(
    HostSchema.safeParse(ollamaHost)
  );
  const [portResult, setPortResult] = useState(
    PortSchema.safeParse(ollamaPort)
  );

  useEffect(() => {
    setHostResult(HostSchema.safeParse(ollamaHost));
    setPortResult(PortSchema.safeParse(ollamaPort));
  }, [ollamaHost, ollamaPort]);

  const handleSave = (type: "host" | "port") => {
    return (val: string) => {
      const value = val.trim();
      if (type === "host") {
        const result = HostSchema.safeParse(value);
        if (result.success) {
          saveHost.mutateAsync(value);
        }
        setHostResult(result);
      } else {
        const numberVal = parseInt(value);
        const result = PortSchema.safeParse(numberVal);
        if (result.success) {
          savePort.mutateAsync(numberVal);
        }
        setPortResult(result);
      }
    };
  };

  return (
    <Card>
      <CardHeader>
        <h1 className="text-2xl font-bold">{t("ollama_configuration")}</h1>
      </CardHeader>
      <CardBody className="gap-2">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            defaultValue={ollamaHost ?? "localhost"}
            errorMessage={
              hostResult.success === false
                ? z.treeifyError(hostResult.error).errors[0]
                : undefined
            }
            isInvalid={hostResult.success === false}
            label={t("ollama_api_host")}
            onValueChange={handleSave("host")}
            placeholder="localhost"
            type="text"
          />
          <Input
            defaultValue={`${ollamaPort ?? 11434}`}
            errorMessage={
              portResult.success === false
                ? z.treeifyError(portResult.error).errors[0]
                : undefined
            }
            isInvalid={portResult.success === false}
            label={t("ollama_api_port")}
            onValueChange={handleSave("port")}
            placeholder="11434"
            type="number"
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default OllamaConfigSection;
