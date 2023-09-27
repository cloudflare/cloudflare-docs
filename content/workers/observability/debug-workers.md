---
pcx_content_type: troubleshooting
title: Debug Workers
---

# Debug Workers

Having visibility into issues, and being able to address them quickly is a critical part of developing an application. There are many tools to help identify issues in your Cloudflare Workers so you can respond appropriately.

{{<youtube id="8iPmy7ePYDE">}}

---

## Debug locally

For local development, the Wrangler CLI provides many resources to debug your Worker application. Running the [`wrangler dev`](/workers/wrangler/commands/#dev) command, you can start a local server for developing your Worker. `wrangler dev` will run the preview of the Worker directly on your local machine using the open source Cloudflare Workers runtime, [workerd](https://github.com/cloudflare/workerd) and the Miniflare simulator.

Read more about this in our [local development and testing guide](/local-development-and-testing).

### DevTools

When running `wrangler dev`, you will see the following in your CLI:

```sh
------------------
wrangler dev now uses local mode by default, powered by 🔥 Miniflare and 👷 workerd.
To run an edge preview session for your Worker, use wrangler dev --remote

⎔ Starting local server...

[mf:inf] Ready on http://127.0.0.1:8787/
╭─────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ [b] open a browser, [d] open Devtools, [l] turn off local mode, [c] clear console, [x] to exit          │
╰─────────────────────────────────────────────────────────────────────────────────────────────────────────╯
```

If you press `d` on your keyboard, a new DevTools session will open up so you can debug. Here, you can view console logs, view network requests, take memory snapshots, and see CPU usage.

{{<Aside type="note">}}

In addition to the CLI, DevTools sessions are also available via the Workers Dashboard editor.

{{</Aside>}}

### Breakpoint debugging

As of Wrangler v3.9.0, you can set and debug breakpoints locally in DevTools, and IDEs like VSCode.

#### DevTools setup 

Run `wrangler dev` and press `d` on your keyboard. This will open a DevTools session where you can set breakpoints via the `Sources` panel.

#### VSCode setup

{{<Aside type="note">}}

Before setting this up, make sure you have no other Wrangler processes running.

{{</Aside>}}

1. In the root of your project folder, add `.vscode/launch.json` file with contents:

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

2. Run `npx wrangler dev --inspector-port 9229`. `inspector-port` is an optional flag that defaults to `9229`.  
3. Set a breakpoint in your `.{ts/js}` file.
4. Launch 'run and debug' command "Wrangler" (the one configured in your `launch.json`).
5. Make a request to the Worker URL (default: `http://localhost:8787`) via the browser or curl.

## Debug via logs

There are a variety of ways to get log messages from Workers, to view them, and to store them. Read the [Log from Workers guide](/log-from-workers) for detailed information.
