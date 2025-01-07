---
order: 4
title: "🐛 Attaching a Debugger"
---

:::caution
This documentation describes breakpoint debugging when using Miniflare directly, which is only relevant for advanced use cases. Instead, most users should refer to the [Workers Observability documentation for how to set this up when using Wrangler](/workers/observability/dev-tools/breakpoints/).
:::

You can use regular Node.js tools to debug your Workers. Setting breakpoints,
watching values and inspecting the call stack are all examples of things you can
do with a debugger.

## Visual Studio Code

### Create configuration

The easiest way to debug a Worker in VSCode is to create a new configuration.

Open the **Run and Debug** menu in the VSCode activity bar and create a
`.vscode/launch.json` file that contains the following:

```json
---
filename: .vscode/launch.json
---
{
  "configurations": [
    {
      "name": "Miniflare",
      "type": "node",
      "request": "attach",
      "port": 9229,
      "cwd": "/",
      "resolveSourceMapLocations": null,
      "attachExistingChildren": false,
      "autoAttachChildProcesses": false,
    }
  ]
}
```

From the **Run and Debug** menu in the activity bar, select the `Miniflare`
configuration, and click the green play button to start debugging.

## WebStorm

Create a new configuration, by clicking **Add Configuration** in the top right.

![WebStorm add configuration button](./debugger-webstorm-node-add.png)

Click the **plus** button in the top left of the popup and create a new
**Node.js/Chrome** configuration. Set the **Host** field to `localhost` and the
**Port** field to `9229`. Then click **OK**.

![WebStorm Node.js debug configuration](./debugger-webstorm-settings.png)

With the new configuration selected, click the green debug button to start
debugging.

![WebStorm configuration debug button](./debugger-webstorm-node-run.png)

## DevTools

Breakpoints can also be added via the Workers DevTools. For more information,
[read the guide](/workers/observability/dev-tools)
in the Cloudflare Workers docs.
