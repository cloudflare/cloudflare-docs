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

### iOS/Android/ChromeOS

1. Open the 1.1.1.1 app.
2. Go to **Settings** > **Advanced** > **Diagnostics**.
3. Scroll down to **Debug logs** and select the desired log.

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

