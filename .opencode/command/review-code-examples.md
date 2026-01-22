---
description: Review code snippets in documentation files
agent: review-code-examples
model: anthropic/claude-opus-4-5
---

Review code snippets in documentation files for correctness and best practices.

## User Context

$ARGUMENTS

## Instructions

1. **Determine scope**:
   - If the user provides file paths, review those files
   - If no files specified, find changed `.mdx` files:
     ```sh
     git diff --name-only HEAD -- '*.mdx'
     git diff --cached --name-only -- '*.mdx'
     ```
   - If no changes found, ask the user which files to review

2. **Read target files**: Use the Read tool to get the full content of each file.

3. **Identify code blocks**: Look for:
   - `<TypeScriptExample>` components (TypeScript with auto JS transpilation)
   - `<WranglerConfig>` components (Wrangler configuration)
   - `<WranglerCommand>` components (CLI command docs)
   - Fenced code blocks with language hints (`ts, `js, `json, `jsonc)

4. **For each code block, verify**:

   **Syntax**
   - TypeScript/JavaScript compiles without errors
   - JSON/JSONC is valid
   - Imports are present and correct

   **Binding patterns**
   - Workers fetch handler: `env.BINDING`
   - Classes (DO, Workflow, Agent, WorkerEntrypoint): `this.env.BINDING`
   - All bindings used in code appear in accompanying `WranglerConfig`
   - Binding names match exactly between code and config

   **Streaming**
   - Large/unknown payloads use streams, not `await response.text()` or `await response.json()`
   - No accumulation of chunks into memory
   - `response.body.pipeTo()` without await for concurrent streaming

   **Error handling**
   - Network requests have basic error handling
   - Error handling is minimal, not verbose
   - Errors are not silently swallowed

   **Configuration**
   - JSONC is the default format (not TOML)
   - Required fields present: `name`, `compatibility_date`, `main`
   - Bindings declared for all code usage

5. **Report findings** grouped by severity:
   - **Important**: Blocking issues — code will not work
   - **Needs Improvement**: Code works but should be fixed
   - **Minor Nits**: Style and preference issues

6. **End with a summary** count or "All code snippets pass review."

## Example Output

````
## Important

### Incorrect binding access in Durable Object

**File**: src/content/docs/durable-objects/examples/counter.mdx:45
**Problem**: Using `env.KV` inside a DurableObject class method. Should be `this.env.KV`.

**Before**:
```ts
export class Counter extends DurableObject<Env> {
  async fetch(request: Request) {
    const value = await env.KV.get("count");
  }
}
````

**After**:

```ts
export class Counter extends DurableObject<Env> {
	async fetch(request: Request) {
		const value = await this.env.KV.get("count");
	}
}
```

---

## Needs Improvement

### Buffering large response body

**File**: src/content/docs/workers/examples/fetch-html.mdx:32
**Problem**: Using `await response.text()` on a response of unknown size. Consider streaming.

**Before**:

```ts
const html = await response.text();
return new Response(html);
```

**After**:

```ts
return new Response(response.body, {
	headers: { "content-type": "text/html" },
});
```

---

## Summary

- Important: 1
- Needs Improvement: 1
- Minor Nits: 0

```

```
