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

import AIProtocol from "./messaging/ai";
import FilterProtocol from "./messaging/filter";

export default defineContentScript({
  main: async () => {
    const observer = new MutationObserver(async () => {
      const matchPattern = (pattern: string): boolean => {
        try {
          return new RegExp(pattern).test(url);
        } catch {
          return false;
        }
      };

      const filters = await FilterProtocol.sendMessage("list", undefined);
      const url = window.location.href;
      const matching = filters.filter((f) => f.domains.some(matchPattern));

      matching.forEach(async ({ prompt, selectors }) => {
        const elements = selectors
          .flatMap((selector) =>
            Array.from(document.querySelectorAll(selector))
          )
          .filter((elm) => elm instanceof HTMLElement);

        elements.forEach(async (elm) => {
          const content = elm.textContent;
          if (content) {
            const result = await AIProtocol.sendMessage("analyze", {
              content,
              prompt,
            });

            if (result) {
              elm.style.border = "2px solid red";
            }
          }
        });
      });
    });

    observer.observe(document, { childList: true, subtree: true });
  },
  matches: ["<all_urls>"],
});
