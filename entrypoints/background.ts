import openDB from "@/utils/idb";

import FilterProtocol from "./messaging/filter";

export default defineBackground(() => {
  FilterProtocol.onMessage("list", async () => {
    const db = await openDB();
    const filters = await db.getAll("filters");
    return filters;
  });
});
