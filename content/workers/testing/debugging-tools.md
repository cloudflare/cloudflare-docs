---
title: Debugging tools
weight: 4
pcx_content_type: concept
meta:
  description: Debug your local and deployed Workers using a variety of tools.
---

# Debugging tools

Being able to assess how your Workers are functioning at various points in the development cycle is vital to identifying the root causes of bugs or issues.

Cloudflare provides a variety of tools to help you debug your Workers.

## Chrome DevTools

Wrangler supports using [Chrome DevTools](https://developer.chrome.com/docs/devtools/) to view logs/sources, set breakpoints, and profile CPU/memory usage. To open a DevTools session connected to your Worker from any Chromium-based browser, run [`wrangler dev`](/workers/wrangler/commands/#dev) and press the <kbd>d</kbd> key in your terminal.

## Debug via breakpoints

As of Wrangler 3.9.0, you can debug via breakpoints in your Worker. Breakpoints provide the ability to review what is happening at a given point in the execution of your Worker. Breakpoint functionality exists in both DevTools and VS Code.

For more information on breakpoint debugging via Chrome's DevTools, refer to [Chrome's article on breakpoints](https://developer.chrome.com/docs/devtools/javascript/breakpoints/).

### Setup VS Code to use breakpoints

To setup VS Code for breakpoint debugging in your Worker project:

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

3. Open your project in VS Code, open a new terminal window from VS Code, and run `npx wrangler dev` to start the local dev server.

4. At the top of the **Run & Debug** panel, you should see an option to select a configuration. Choose **Wrangler**, and select the play icon. **Wrangler: Remote Process [0]** should show up in the Call Stack panel on the left.

5. Go back to a `.js` or `.ts` file in your project and add at least one breakpoint.

5. Open your browser and go to the Worker's local URL (default `http://127.0.0.1:8787`). The breakpoint should be hit, and you should be able to review details about your code at the specified line.

{{<Aside type="warning">}}

Breakpoint debugging in `wrangler dev` using `--remote` could extend Worker CPU time and incur additional costs since you are testing against actual resources that count against usage limits. It is recommended to use `wrangler dev` without the `--remote` option. This ensures you are developing locally.

{{</Aside>}}

{{<Aside type="note">}}

The `.vscode/launch.json` file only applies to a single workspace. If you prefer, you can add the above launch configuration to your User Settings (per the [official VS Code documentation](https://code.visualstudio.com/docs/editor/debugging#_global-launch-configuration)) to have it available for all your workspaces.

{{</Aside>}}

## Related resources

* [Local Development](/workers/testing/local-development/) - Develop your Workers and connected resources locally via Wrangler and [`workerd`](https://github.com/cloudflare/workerd), for a fast, accurate feedback loop.
