---
title: SubtractIPCalculator
description: Rules for the SubtractIPCalculator component.
---

## Rules

- If `<SubtractIPCalculator>` uses `import SubtractIPCalculator from "~/components"` → **warning**: this component must import directly from its file: `import SubtractIPCalculator from "~/components/SubtractIPCalculator.tsx"`.
- If `<SubtractIPCalculator>` is missing the `client:load` directive → **warning**: requires `client:load` for client-side interactivity.

## Example

```mdx
import SubtractIPCalculator from "~/components/SubtractIPCalculator.tsx";

<SubtractIPCalculator client:load />

<!-- With defaults: -->

<SubtractIPCalculator
	client:load
	defaults={{ base: "10.0.0.0/8", subtract: ["10.0.0.0/24"] }}
/>
```
