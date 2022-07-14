---
pcx-content-type: changelog
title: Changelog
---

# Changelog

## 2022-05-24 Picture-in-Picture Support

The [Stream Player](https://developers.cloudflare.com/stream/viewing-videos/using-the-stream-player/) now displays a button to activate Picture-in-Picture mode, if the viewer's web browser supports the [Picture-in-Picture API](https://developer.mozilla.org/en-US/docs/Web/API/Picture-in-Picture_API).

## 2022-03-17 Analytics panel in Stream Dashboard

The Stream Dashboard now has an analytics panel that shows the number of minutes of both live and recorded video delivered. This view can be filtered by Creator ID, Video ID and country. For more in-depth analytics data, refer to the [bulk analytics documentation](https://developers.cloudflare.com/stream/getting-analytics/fetching-bulk-analytics/)


## 2022-03-16 Custom letterbox color configuration option for Stream Player

The Stream Player can now be configured to use a custom letterbox color, displayed around the video ("letterboxing" or "pillarboxing") when the video's aspect ratio does not match the player's aspect ratio. Refer to the documentation on configuring the Stream Player [here](https://developers.cloudflare.com/stream/viewing-videos/using-the-stream-player/#basic-options).

## 2022-02-17 Faster video quality switching in Stream Player

When viewers manually change the resolution of video they want to receive in the Stream Player, this change now happens immediately, rather than once the existing resolution playback buffer has finished playing.

...
