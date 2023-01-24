---
pcx_content_type: how-to
title: View logs
weight: 1
---

# View logs

## Retrieve WARP logs

### macOS

In the Terminal, type `warp-diag` (full path: `/usr/local/bin/warp-diag`) and press **Enter**. This will place a `warp-debugging-info.zip` on your Desktop.

### Windows

1. In Explorer, open `C:\Program Files\Cloudflare\Cloudflare WARP`.
2. Double-click on `warp-diag.exe`. This will place a `warp-debugging-info.zip` on your Desktop.

### Linux

In the Terminal, type `sudo warp-diag` and press **Enter**. This will place a `warp-debugging-info.zip` in the same folder you ran the command from.

### iOS

1. Open the 1.1.1.1 app.
2. Go to **Settings** > **Advanced** > **Diagnostics** > **Console Logs**.
3. View the following logs:
    - **Extension Logs**: ?
    - **Application Logs**: ps.txt?

### Android/ChromeOS

1. Open the 1.1.1.1 app.
2. Go to **Settings** > **Advanced** > **Diagnostics**.
3. View the following logs:
    - **DNS Logs**: 
    - **Console Logs**: `daemon.log`?
    - **Native Logs**: `boringtun.log`=?

## Log files

The `warp-debugging-info.zip` folder contains the following files:

| File name        | Description |
| ---------------- | ----------- |
| `boringtun.log`    |  Communication around keeping the Wireguard tunnel alive |
| `connectivity.txt` |
| `ipconfig.txt` </br> `ifconfig.txt` | |

{{<Aside type="note" header= "Multiple versions of the same log">}}
content
{{</Aside>}}

## WARP Diag Explorer

[Warp Diag Explorer](https://warp-diag-log-viewer.pages.dev) makes it easier to investigate WARP client issues by providing a clean interface for searching, filtering, collating, and parsing `warp-diag` logs. To start using the tool, simply upload [`warp-debugging-info.zip`](#retrieve-logs) to [WARP Diag Explorer](https://warp-diag-log-viewer.pages.dev).

The explorer supports a number of features that a local file viewer does not:

- Include and exclude search lists
- Line collapsing and expansion
- Filter by log level
- Filter by time of log
- Filter by location of logging span within the codebase
- Coloring of logs by their log level
- Time offset of log from start of program

