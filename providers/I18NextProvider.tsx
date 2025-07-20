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

import i18n, { ResourceKey } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { createContext, FC, useEffect, useState } from "react";
import { initReactI18next } from "react-i18next";

import enTranslation from "@/assets/locales/en.toml";
import ChildrenProps from "@/types/ChildrenProps";

export const I18NextContext = createContext<"i18next" | null>(null);

const I18NextProvider: FC<ChildrenProps> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState<"i18next" | null>(null);

  useEffect(() => {
    i18n
      .use(initReactI18next)
      .use(LanguageDetector)
      .init({
        fallbackLng: "en",
        interpolation: {
          escapeValue: false,
        },
        lng: "en",
        resources: {
          en: {
            translation: enTranslation as ResourceKey,
          },
        },
        supportedLngs: ["en"],
      })
      .then(() => {
        setIsLoaded("i18next");
      })
      .catch((e) => {
        throw e;
      });
  }, []);

  return (
    <I18NextContext.Provider value={isLoaded}>
      {children}
    </I18NextContext.Provider>
  );
};

export default I18NextProvider;
