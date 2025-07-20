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

import { Tooltip } from "@heroui/react";
import { CircleQuestionMarkIcon, FunnelIcon, PowerIcon } from "lucide-react";

const BottomBar = () => {
  return (
    <div className="flex gap-4 justify-evenly bg-gray-300 py-2">
      <Tooltip content="View and edit filters.">
        {/* TODO: localize this */}
        <button
          onClick={() => {
            browser.tabs.create({
              // @ts-expect-error - This asks for a PublicPath but it still works.
              url: browser.runtime.getURL("options.html#/filters"),
            });
          }}
          type="button"
        >
          <FunnelIcon size={20} />
        </button>
      </Tooltip>
      <Tooltip content="About this extension">
        {/* TODO: localize this */}
        <button
          onClick={() => {
            browser.tabs.create({
              // @ts-expect-error - This asks for a PublicPath but it still works.
              url: browser.runtime.getURL("options.html#/about"),
            });
          }}
          type="button"
        >
          <CircleQuestionMarkIcon size={20} />
        </button>
      </Tooltip>
    </div>
  );
};

const App = () => {
  const [url, setURL] = useState<URL>(new URL("https://www.foobar.com"));

  return (
    <div className="flex flex-col items-stretch justify-between h-full">
      <div />
      <div className="flex flex-col items-stretch p-4">
        <div className="flex flex-col gap-4 items-center">
          <PowerIcon color="green" size={60} />
          <p>{url.hostname}</p>
        </div>
      </div>
      <BottomBar />
    </div>
  );
};

export default App;
