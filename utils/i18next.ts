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
import { initReactI18next } from "react-i18next";

import enTranslation from "@/assets/locales/en.toml";

const initI18Next = () => {
  return i18n
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
    });
};

export default initI18Next;
