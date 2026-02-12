# Common Patterns — What to Verify

Do not memorize patterns. Retrieve current examples from Cloudflare docs and verify code against the current type definitions. This file describes _what to check_, not _what the code should look like_.

## Retrieval

When reviewing a pattern you are unsure about, fetch the current reference:

| Topic                 | Where to look                                                                                                                   |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Handler signatures    | Latest `@cloudflare/workers-types` (see `references/workers-types.md`) — search for `ExportedHandler`, `WorkerEntrypoint`, etc. |
| Binding APIs          | Same types file — search for the binding type name (e.g., `KVNamespace`, `R2Bucket`)                                            |
| Wrangler config shape | Latest wrangler config schema (see `references/wrangler-config.md`)                                                             |
| Platform base classes | Search for imports from `"cloudflare:workers"` in the type definitions                                                          |
| Cloudflare docs       | `https://developers.cloudflare.com/workers/` for guides, examples, and API reference                                            |

## Binding Access

The single most common error in Workers code. The rule is stable:

- **Module export handlers** (`fetch`, `scheduled`, `queue`, `email`): bindings via `env.X` parameter
- **Platform base classes** (WorkerEntrypoint, DurableObject, Workflow, Agent, and subclasses): bindings via `this.env.X`

Flag any code that uses `env.X` inside a class extending a platform base class, or `this.env.X` inside a module export handler.

**Mechanical check**: do not rely on reading alone. Search the file:

```bash
# Inside class bodies: flag bare env.X (should be this.env.X)
grep -n 'env\.' <file> | grep -v 'this\.env\.' | grep -v '//'

# Inside module export handlers: flag this.env.X (should be env.X)
grep -n 'this\.env\.' <file>
```

Cross-reference each match against its surrounding context (class body vs module export) to confirm.

## Stale Class and API Patterns

Cloudflare platform classes evolve. Old patterns survive in docs long after APIs change. Before approving class-based code, verify against the latest type definitions:

- **`extends` vs `implements`**: platform classes (DurableObject, WorkerEntrypoint, WorkflowEntrypoint) use `extends`, not `implements`. The `implements` pattern is legacy and loses access to `this.ctx` and `this.env`. Flag any `implements DurableObject` or similar.
- **Import paths**: verify the module specifier matches what the types actually export. Common mistake: importing from `"cloudflare:workflows"` when the correct path is `"cloudflare:workers"` (or vice versa as APIs evolve). Always check.
- **Renamed properties**: APIs rename properties across versions (e.g., `this.state` to `this.ctx` in Durable Objects). Search the type definitions for the class and confirm which properties exist.
- **Constructor signatures**: base class constructors change. Verify the expected parameters against the type definition rather than assuming `(state, env)` or `(ctx, env)`.

Do not trust your training data for these. Read the types.

## Floating Promises

Unawaited async calls are a frequent source of silent bugs — especially in Workflow `step.*` methods where a missing `await` breaks durability guarantees.

A floating promise is a Promise-valued expression that is not handled via `await`, `return`, `.then()/.catch()`, `void`, or `ctx.waitUntil()`. The `typescript/no-floating-promises` rule from oxlint catches these mechanically when type-aware linting is available.

Check for:

- **`step.do()` and `step.sleep()` without `await`**: silently drops the step result and breaks the Workflow execution order. This is the most common instance in docs.
- **`fetch()` without `await`**: fires the request but never reads the response.
- **`.map(async ...)` producing `Promise[]`**: must be wrapped in `Promise.all()` or similar.
- **Fire-and-forget**: if intentional, use `ctx.waitUntil(promise)` in handlers or `void promise` to signal intent. Bare promise statements are bugs until proven otherwise.

**Mechanical check**: if the project supports it, run oxlint with type-aware linting:

```bash
npx oxlint --type-aware --deny typescript/no-floating-promises <file>
```

Otherwise, search manually for async method calls (especially `step.do`, `step.sleep`, `step.sleepUntil`, `fetch`) and verify each is `await`ed or explicitly handled.

## Serialization Boundaries

Data that crosses a serialization boundary must be structured-clone serializable. This is a runtime constraint — the code compiles fine but fails at runtime.

Serialization boundaries in Workers:

- **Queue messages**: the body passed to `.send()` or `.sendBatch()`
- **Workflow step return values**: whatever `step.do()` callback returns is persisted to durable storage
- **DO storage**: values passed to `storage.put()` or returned from SQL queries
- **`postMessage()`**: data sent to/from Web Workers or WebSocket messages

**Non-serializable types to flag:**

- `Response` and `Request` objects — common mistake in `step.do()` callbacks that `return await fetch(...)`
- `Error` objects — native `Error` is not structured-clone serializable; extract `.message` and `.stack` into a plain object
- Functions, class instances with methods, `Map`/`Set` (unless using structured clone explicitly)
- Symbols

When reviewing code that returns data across these boundaries, verify the value is a plain object, array, string, number, boolean, null, `ArrayBuffer`, or `Date`.

## Streaming

These are runtime constraints, not API-specific. They do not go stale.

- Large or unknown-size payloads must stream. Flag `await response.text()`, `await response.json()`, or `await response.arrayBuffer()` on unbounded data.
- R2 object bodies are streams by default. Flag `.text()` or `.arrayBuffer()` on R2 objects unless the code has already verified the object is small.
- When proxying or transforming a response, pipe the stream rather than buffering it.
- Small, bounded payloads (config files, API responses with known limits) are fine to buffer.

## Error Handling

Minimal but present. The goal is correctness without distracting from the example's purpose.

- **Nullable returns**: APIs that return `T | null` (e.g., KV `.get()`, R2 `.get()`, D1 `.first()`) need null checks before use. Flag code that asserts non-null (`!`) without justification.
- **Network requests**: basic error handling or at minimum a status check.
- **Workflow steps**: validation failures should use `NonRetryableError` (from `"cloudflare:workers"`) to prevent infinite retries. Verify this import path against current types.
- **Verbose try/catch**: flag excessive error handling that obscures the example's core logic. A docs example should show the happy path clearly.

## Security

These are principles, not API-specific.

- **No hardcoded secrets.** API keys, tokens, passwords must come from env bindings set via `wrangler secret put`. Flag any string literal that looks like a credential.
- **No weak hashes for security.** MD5 and SHA-1 must not be used in security contexts (signing, auth, integrity). SHA-256 minimum via the Web Crypto API.
- **Auth as a stub.** If auth is not the point of the example, it should be omitted or shown as a minimal stub. Flag examples that implement full auth flows when the page topic is something else.
- **Correct API usage does not mean correct logic.** When reviewing code involving crypto, timing-sensitive comparisons, auth, or access control, do not stop at verifying the API calls are correct. Examine the surrounding logic for flaws that undermine the security property. Example: calling `timingSafeEqual` correctly but short-circuiting with an early return on length mismatch leaks the secret's length via timing side-channel. The API call is right; the logic is wrong. Escalate security-sensitive code to a higher scrutiny level — verify the invariant the code claims to provide, not just the function signatures.

## Conciseness

Examples should teach one thing clearly. Flag:

- Boilerplate that distracts from the core concept (full error handling, logging, CORS, routing) when those are not the topic
- Unused imports or bindings
- Comments that restate what the code does instead of explaining _why_
- Multiple patterns crammed into a single example when they should be separate

## Durable Objects — Specific Checks

These constraints are architectural, not API-version-specific:

- **Persist state to storage, not in-memory fields.** Class properties are lost on eviction. SQLite storage (via `ctx.storage.sql`) persists.
- **`blockConcurrencyWhile` is for initialization only.** It blocks all concurrent requests. Flag code that calls it on every request or across external I/O.
- **One alarm per DO instance.** Setting a new alarm replaces the previous one. Alarm handlers must be idempotent.
- **Shard by coordination atom.** A single global DO is a bottleneck. Each DO should represent one entity (room, user, session, document).
- **DO migrations required.** New DO classes need a migration entry in the wrangler config. See `references/wrangler-config.md`.
