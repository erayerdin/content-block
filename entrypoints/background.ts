import { storage } from "#imports";

import analyze from "@/actions/analyze";
import checkEnabled from "@/actions/checkEnabled";
import setCurrentURL from "@/actions/setCurrentURL";
import { models, OllamaTag } from "@/types/model";
import openDB from "@/utils/idb";

import AIProtocol from "./messaging/ai";
import FilterProtocol from "./messaging/filter";
import URLProtocol from "./messaging/url";

export default defineBackground(async () => {
  const db = await openDB();

  FilterProtocol.onMessage("list", async () => {
    const filters = await db.getAll("filters");
    return filters;
  });

  AIProtocol.onMessage("analyze", async ({ data: { content, prompt } }) => {
    const enabled = await checkEnabled({ storage });

    if (enabled === false) {
      console.warn("Extension is disabled. Skipping analysis.");
      return false;
    }

    const selectedModelTag = await storage.getItem<OllamaTag>(
      "local:selected_model"
    );

    if (selectedModelTag === null) {
      throw new Error("No model selected. Skipping analysis.");
    }

    const selectedModel = models.find(({ tag }) => tag === selectedModelTag);

    if (selectedModel === undefined) {
      throw new Error(
        `No predefined models found with tag ${selectedModelTag}. Skipping analysis.`
      );
    }

    return analyze({ content, model: selectedModel, prompt });
  });

  URLProtocol.onMessage("set", async ({ data: url }) => {
    setCurrentURL({ storage, url });
  });
});
