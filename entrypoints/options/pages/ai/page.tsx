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

import { Input, Skeleton } from "@heroui/react";
import { useTranslation } from "react-i18next";

import useGetStorageItem from "@/hooks/data/useGetStorageItem";
import useSetStorageItem from "@/hooks/data/useSetStorageItem";
import useWxtStorage from "@/hooks/useWxtStorage";

const AIPage = () => {
  const { t } = useTranslation();
  const storage = useWxtStorage();
  const getGoogleAIStudioKey = useGetStorageItem({
    key: "local:google_ai_studio_key",
    storage,
  });
  const setGoogleAIStudioKey = useSetStorageItem({
    key: "local:google_ai_studio_key",
    storage,
  });

  if (getGoogleAIStudioKey.state === "loading") {
    return <Skeleton className="h-16" />;
  }

  return (
    <div className="flex flex-col gap-4">
      <Input
        // to satisfy string requirement because data is unknown
        defaultValue={`${getGoogleAIStudioKey.data}`}
        label={t("google_ai_studio_key")}
        onValueChange={async (value) => {
          await setGoogleAIStudioKey.mutateAsync(value);
        }}
      />
    </div>
  );
};

export default AIPage;
