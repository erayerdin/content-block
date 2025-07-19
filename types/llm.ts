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

import * as z from "zod";

export const LLMProviderTypes = ["free", "api"] as const;
export const LLMProviderTypeSchema = z.enum(LLMProviderTypes);
export type LLMProviderType = z.infer<typeof LLMProviderTypeSchema>;
export const LLMProviderTypeMessages: Record<LLMProviderType, string> = {
  api: "API Key", // TODO: localize
  free: "Free", // TODO: localize
};

export const LLMProviders = ["google", "openai"] as const;
export const LLMProviderSchema = z.enum(LLMProviders);
export type LLMProvider = z.infer<typeof LLMProviderSchema>;
export const LLMProviderMessages: Record<LLMProvider, string> = {
  google: "Google",
  openai: "OpenAI",
};

export const LLMModels = [
  "gemini-2.5-flash-lite",
  "gemini-2.5-flash",
  "gemini-2.5-pro",
  "gpt-4.1-mini",
  "gpt-4.1-nano",
  "gpt-4.1",
  "gpt-4o",
] as const;
export const LLMModelSchema = z.enum(LLMModels);
export type LLMModel = z.infer<typeof LLMModelSchema>;
export const LLMModelMessages: Record<LLMModel, string> = {
  "gemini-2.5-flash": "Gemini 2.5 Flash",
  "gemini-2.5-flash-lite": "Gemini 2.5 Flash Lite",
  "gemini-2.5-pro": "Gemini 2.5 Pro",
  "gpt-4.1": "GPT-4.1",
  "gpt-4.1-mini": "GPT-4.1 Mini",
  "gpt-4.1-nano": "GPT-4.1 Nano",
  "gpt-4o": "GPT-4o",
};
