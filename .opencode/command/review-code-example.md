---
description: Review code examples in specified folder or page
subtask: true
---

# CRITICAL: Code Block Standards

When reviewing or fixing code examples, ALWAYS follow these MDX standards:

## Code Blocks - ALWAYS Use Exactly 3 Backticks

**RULE: Code blocks MUST use exactly 3 backticks (```) for opening AND closing fences.**

### ❌ NEVER Do This:
- Using 4 backticks: ` ```` `
- Using 5 backticks: ` ````` `
- Mixing different counts

### ✅ ALWAYS Do This:
- Opening fence: ` ``` `
- Closing fence: ` ``` `
- Specify language: ` ```js `, ` ```py `, ` ```sh `

### Common Mistake to Avoid:
When editing the latter half of a code block, DO NOT accidentally add an extra backtick to the closing fence.

**Before editing, count the backticks. After editing, verify exactly 3 backticks.**

## Why This Matters:
- 4+ backticks breaks MDX parsing
- Causes build failures
- Makes code examples unreadable
- Violates Cloudflare style guide

## Exception:
Only use 4 backticks when documenting how to write code blocks (meta-documentation).

---

For full code review command documentation, see the main task agent prompts.
