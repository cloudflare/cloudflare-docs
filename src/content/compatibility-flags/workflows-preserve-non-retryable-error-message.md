---
_build:
  publishResources: false
  render: never
  list: never

name: "Workflows preserve `NonRetryableError` message"
sort_date: "2026-05-14"
enable_date: "2026-05-14"
enable_flag: "workflows_preserve_non_retryable_error_message"
disable_flag: "workflows_replace_non_retryable_error_message"
---

When enabled, if a [Workflow](/workflows/) step throws a [`NonRetryableError`](/workflows/build/workers-api/#nonretryableerror), the error `message` and `name` properties are preserved on the thrown exception instead of being replaced with a generic termination string.

Previously, throwing a `NonRetryableError` with a custom message would result in the original error message being lost and replaced with `"The execution of the Workflow instance was terminated, as a step threw an NonRetryableError and it was not handled"`:

```js
import { WorkflowEntrypoint, NonRetryableError } from "cloudflare:workers";

export class MyWorkflow extends WorkflowEntrypoint {
  async run(event, step) {
    await step.do("my-step", async () => {
      throw new NonRetryableError("custom error message");
      // Without this flag: error.message === "The execution of the Workflow instance was terminated, as a step threw an NonRetryableError and it was not handled"
      // With this flag: error.message === "custom error message"
    });
  }
}
```

With the `workflows_preserve_non_retryable_error_message` flag enabled, the original error message and name are preserved, making it easier to debug and handle specific error cases in your Workflow code.
