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

import { openDB as _openDB, type IDBPDatabase } from "idb";

const DB_NAME = "content-block";
const DB_VERSION = 1;

const migrators = [
  // Ver: 0
  (db: IDBPDatabase) => {
    db.createObjectStore("filters");
    db.createObjectStore("results");
  },
];

const openDB = (): Promise<IDBPDatabase> => {
  return _openDB(DB_NAME, DB_VERSION, {
    upgrade: (db, oldV, newV) => {
      if (oldV < (newV ?? 0)) {
        for (let i = oldV; i < (newV ?? 0); i++) {
          migrators[i](db);
        }
      }
    },
  });
};

export default openDB;
