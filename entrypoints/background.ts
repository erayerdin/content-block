import { storage } from "#imports";

import analyze from "@/actions/analyze";
import openDB from "@/utils/idb";

import AIProtocol from "./messaging/ai";
import FilterProtocol from "./messaging/filter";

export default defineBackground(() => {
  FilterProtocol.onMessage("list", async () => {
    const db = await openDB();
    const filters = await db.getAll("filters");
    return filters;
  });

  AIProtocol.onMessage(
    "analyze",
    async ({ data: { content, prompt, provider } }) => {
      const key = await storage.getItem<string>("local:google_ai_studio_key");

      if (key === null) {
        throw new Error("Google AI Studio key is not set.");
      }

      return analyze({ content, prompt, provider: { key, type: provider } });
    }
  );
});
