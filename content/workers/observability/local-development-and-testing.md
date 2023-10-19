---
title: Local development and testing
weight: 6
pcx_content_type: concept
---

# Local development and testing

Cloudflare Workers can be fully developed and tested locally - providing confidence that the applications you develop locally work the same way in production. This allows you to be more efficient and effective by providing a faster feedback loop and removing the need to test against remote resources. Local development runs against the same production runtime used by Cloudflare Workers, [workerd](https://github.com/cloudflare/workerd).

In addition to testing Workers locally with `wrangler dev`, the use of Miniflare allows you to test other Developer Platform products locally, such as [R2](/r2/), [KV](/kv/), [D1](/d1/), and [Durable Objects](/durable-objects/).


## Start a local development server

{{<Aside type="note">}}

This guide assumes you are using [Wrangler v3.0](https://blog.cloudflare.com/wrangler3/) or later.

Users new to Wrangler CLI and Cloudflare Workers should visit the [Wrangler Install/Update guide](/workers/wrangler/install-and-update) to install `wrangler`.

{{</Aside>}}

Wrangler provides a [`dev`](/workers/wrangler/commands/#dev) command that starts a local server for developing your Worker. Make sure you have `npm` installed and run the following in the folder containing your Worker application:

```sh
$ npx wrangler dev
```

`wrangler dev` will run the preview of the Worker directly on your local machine. `wrangler dev` uses a combination of `workerd` and [Miniflare](https://github.com/cloudflare/miniflare), a simulator that allows you to test your Worker against additional resources like KV, Durable Objects, WebSockets, and more.

### Develop locally using remote resources and bindings

{{<Aside type="note">}}

Developing against remote resources will count towards billable usage. `wrangler dev --remote` will leverage remote production resources specified in your `wrangler.toml`. These resources will use production data, and will count towards account usage for billing purposes.

{{</Aside>}}

`wrangler dev` runs locally by default. This means that all resources and bindings are simulated locally as well. However, there may be times you need to develop against remote resources and bindings. To run `wrangler dev` remotely, add the `--remote flag`:

```sh
$ npx wrangler dev --remote
```

### Customize `wrangler dev`

You can customize how `wrangler dev` works to fit your needs. Refer to [the `wrangler dev` documentation](/workers/wrangler/commands/#dev) for available configuration options.

{{<Aside type="warning">}}

There is a bug associated with how outgoing requests are handled when using `wrangler dev --remote`. For more information, read the [Known issues section](/workers/platform/known-issues/#wrangler-dev).

{{</Aside>}}

## DevTools

Wrangler supports using the [Chrome DevTools](https://developer.chrome.com/docs/devtools/) to view logs/sources, set breakpoints, and profile CPU/memory usage. With `wrangler dev` running, press the <kbd>d</kbd> key in your terminal to open a DevTools session connected to your Worker from any Chromium-based browser.

## Debug via breakpoints

As of Wrangler 3.9.0, you can debug via breakpoints in your Worker. Breakpoints provide the ability to see exactly what is happening at a given point in the execution of your Worker. This functionality exists in both DevTools and VSCode.

For more information on breakpoint debugging via Chrome's DevTools, refer to [Chrome's article on breakpoints](https://developer.chrome.com/docs/devtools/javascript/breakpoints/).

### Setup VSCode to use breakpoints

To setup VSCode for breakpoint debugging Workers:

1. Create a `.vscode` folder in your project's root folder if one does not exist.
2. Within that folder, create a `launch.json` file with the following content:

```json
{
  "configurations": [
      {
          "name": "Wrangler",
          "type": "node",
          "request": "attach",
          "port": 9229,
          "cwd": "/",
          "resolveSourceMapLocations": null,
          "attachExistingChildren": false,
          "autoAttachChildProcesses": false,
          "sourceMaps": true // works with or without this line
      }
  ]
}
```

3. Open your project in VSCode, open a new terminal window from VSCode, and run `npx wrangler dev` to start the local dev server.

4. At the top of the **Run & Debug** panel, you should see an option to select a configuration. Choose **Wrangler**, and select the play icon. You should see **Wrangler: Remote Process [0]** show up in the Call Stack panel on the left.

5. Go back to a `.js` or `.ts` file in your project and add at least one breakpoint.

5. Open your browser and go to the Worker's local URL (default `http://127.0.0.1:8787`). The breakpoint should be hit, and you should see details about your code at the specified line.

## Test Workers

### Integration testing

Wrangler offers an experimental API, `unstable_dev`, that will allow you to start a server for integration testing.

For more information and examples, refer to the [`unstable_dev` guide](/workers/wrangler/api/#unstable_dev).

### Advanced local testing via Miniflare

[Miniflare](https://github.com/cloudflare/miniflare/blob/v3.20231016.0/packages/miniflare/README.md) is a simulator for developing and testing Workers. It supports simulating and mocking resources like: KV, Durable Objects, R2, D1, and Queues.

Miniflare is fully local, and is built on top of the Workers runtime, [`workerd`](https://github.com/cloudflare/workerd) to ensure that local behavior accurately reflects production. All of this makes it a great tool for writing tests or advanced use cases.

## Related resources

* [Log from Workers](/workers/observability/log-from-workers/) - Access logs and exceptions for your Workers using the dashboard or [`wrangler tail`](/workers/wrangler/commands/#tail).
