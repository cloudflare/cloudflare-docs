---
title: Troubleshooting
pcx_content_type: concept
---

# Troubleshooting

## Debugging

[`wrangler dev`](/workers/wrangler/commands/#dev) and [`wrangler tail`](/workers/wrangler/commands/#tail) are both available to help you debug your Durable Objects.

The `wrangler dev` command opens a tunnel from your local development environment to Cloudflare's global network, letting you test your Durable Objects code in the Workers environment as you write it.

`wrangler tail` displays a live feed of console and exception logs for each request served by your Worker code, including both normal Worker requests and Durable Object requests. After running `npx wrangler deploy`, you can use `wrangler tail` in the root directory of your Worker project and visit your Worker URL to see console and error logs in your terminal.

## Common errors

### No event handlers were registered. This script does nothing.

In your `wrangler.toml` file, make sure the `dir` and `main` entries point to the correct file containing your Worker code, and that the file extension is `.mjs` instead of `.js` if using ES modules syntax.

### Cannot apply `--delete-class` migration to class.

When deleting a migration using `npx wrangler deploy --delete-class <ClassName>`, you may encounter this error: `"Cannot apply --delete-class migration to class <ClassName> without also removing the binding that references it"`. You should remove the corresponding binding under `[durable_objects]` in `wrangler.toml` before attempting to apply `--delete-class` again.

### Durable Object is overloaded.

A single instance of a Durable Object cannot do more work than is possible on a single thread. These errors mean the Durable Object has too much work to keep up with incoming requests:

- `Error: Durable Object is overloaded. Too many requests queued.` The total count of queued requests is too high.
- `Error: Durable Object is overloaded. Too much data queued.` The total size of data in queued requests is too high.
- `Error: Durable Object is overloaded. Requests queued for too long.` The oldest request has been in the queue too long.

To solve this error, you can either do less work per request, or send fewer requests. For example, you can split the requests among more instances of the Durable Object.

### Your account is generating too much load on Durable Objects. Please back off and try again later.

There is a limit on how quickly you can [create new Durable Objects or lookup different existing Durable Objects](/durable-objects/configuration/create-durable-object-stubs/). Those lookups are usually cached, meaning attempts for the same set of recently accessed Durable Objects should be successful, so catching this error and retrying after a short wait is safe. If possible, also consider spreading those lookups across multiple requests.

### Durable Object reset because its code was updated.

Reset in error messages refers to in-memory state. Any durable state that has already been successfully persisted via `state.storage` is not affected.

Refer to [Global Uniqueness](/durable-objects/platform/known-issues/#global-uniqueness). 

### Durable Object storage operation exceeded timeout which caused object to be reset.

To prevent indefinite blocking, there is a limit on how much time storage operations can take. In Durable Objects containing a sufficiently large number of key-value pairs, `deleteAll()` may hit that time limit and fail. When this happens, note that each `deleteAll()` call does make progress and that it is safe to retry until it succeeds. Otherwise contact [Cloudflare support](/support/contacting-cloudflare-support/).

### Your account is doing too many concurrent storage operations. Please back off and try again later.

Besides the suggested approach of backing off, also consider changing your code to use `state.storage.get(keys Array<string>)` rather than multiple individual `state.storage.get(key)` calls where possible.