// Barrel for agent-setup MDX pages.
// Import all page-level components from one place:
//   import {
//     AgentHeader, QuickStart, PlatformAccess, ExamplePromptsList,
//     TipsList, FAQList, FAQItem, TroubleshootingList, TroubleshootingItem,
//     BuildAgentsCallout, OtherAgents,
//   } from "~/components/agent-setup";
export { default as AgentHeader } from "./AgentHeader.astro";
export { default as AgentSteps } from "./AgentSteps.astro";
export { default as PlatformAccess } from "./PlatformAccessSection.astro";
export { default as RandomPrompt } from "./RandomPrompt.astro";
export { default as ExamplePromptsList } from "./ExamplePromptsList.astro";
export { default as TipsList } from "./TipsList.astro";
export { default as FAQList } from "./FAQList.astro";
export { default as FAQItem } from "./FAQItem.astro";
export { default as TroubleshootingList } from "./TroubleshootingList.astro";
export { default as TroubleshootingItem } from "./TroubleshootingItem.astro";
export { default as BuildAgentsCallout } from "./BuildAgentsCallout.astro";
export { default as OtherAgents } from "./OtherAgents.astro";
