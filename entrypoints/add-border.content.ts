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

import FilterProtocol from "./messaging/filter";

export default defineContentScript({
  main: async () => {
    console.log("Add border script.");

    const filters = await FilterProtocol.sendMessage("list", undefined);
    const url = window.location.href;
    const matching = filters.filter((f) =>
      f.domains.some((pattern) => {
        try {
          return new RegExp(pattern).test(url);
        } catch {
          return false;
        }
      })
    );
    const selectors = matching.flatMap((f) => f.selectors);
    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((elm) => {
        if (elm instanceof HTMLElement) {
          elm.style.border = "1px solid red";
        }
      });
    });
  },
  matches: ["<all_urls>"],
});
