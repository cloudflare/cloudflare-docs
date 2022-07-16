---
pcx-content-type: changelog
title: Changelog
---

# Changelog

## 2022-05-24

### Picture-in-Picture Support

The [Stream Player](/stream/viewing-videos/using-the-stream-player/) now displays a button to activate Picture-in-Picture mode, if the viewer's web browser supports the [Picture-in-Picture API](https://developer.mozilla.org/en-US/docs/Web/API/Picture-in-Picture_API).

## 2022-05-13

### Creator ID property

During or after uploading a video to Stream, you can now specify a value for a new field, `creator`. This field can be used to identify the creator of the video content, linking the way you identify your users or creators to videos in your Stream account. For more, read the [blog post](https://blog.cloudflare.com/stream-creator-management/)

## 2022-03-17

### Analytics panel in Stream Dashboard

The Stream Dashboard now has an analytics panel that shows the number of minutes of both live and recorded video delivered. This view can be filtered by **Creator ID**, **Video ID**, and **Country**. For more in-depth analytics data, refer to the [bulk analytics documentation](/stream/getting-analytics/fetching-bulk-analytics/)

## 2022-03-16

### Custom letterbox color configuration option for Stream Player

The Stream Player can now be configured to use a custom letterbox color, displayed around the video ("letterboxing" or "pillarboxing") when the video's aspect ratio does not match the player's aspect ratio. Refer to the documentation on configuring the Stream Player [here](/stream/viewing-videos/using-the-stream-player/#basic-options).

## 2022-02-17

### Faster video quality switching in Stream Player

When viewers manually change the resolution of video they want to receive in the Stream Player, this change now happens immediately, rather than once the existing resolution playback buffer has finished playing.

## 2022-02-09

### Volume and playback controls accessible during playback of VAST Ads

When viewing ads in the [VAST format](https://www.iab.com/guidelines/vast/#:~:text=VAST%20is%20a%20Video%20Ad,of%20the%20digital%20video%20marketplace.) in the Stream Player, viewers can now manually start and stop the video, or control the volume.

## 2022-01-25

### DASH and HLS manifest URLs accessible in Stream Dashboard

If you choose to use a third-party player with Cloudflare Stream, you can now easily access HLS and DASH manifest URLs from within the Stream Dashboard. For more about using Stream with third-party players, read the docs [here](/stream/viewing-videos/using-own-player/).

## 2022-01-22

### Input health status in the Stream Dashboard

When a live input is connected, the Stream Dashboard now displays technical details about the connection, which can be used to debug configuration issues.

## 2022-01-06

### Live viewer count in the Stream Player

The [Stream Player](/stream/viewing-videos/using-the-stream-player/) now shows the total number of people currently watching a video live.

## 2022-01-04

### Webhook notifications for live stream connections events

You can now configure Stream to send webhooks each time a live stream connects and disconnects. For more information, refer to the [Webhooks documentation](/stream/stream-live/webhooks).

## 2021-09-30

### Serverless Live Streaming

Stream now supports live video content! For more information, read the [blog post](https://blog.cloudflare.com/stream-live/) and get started by reading the [docs](/stream/stream-live/).
...

## 2021-07-26

### Thumbnail previews in Stream Player seek bar

The Stream Player now displays preview images when viewers hover their mouse over the seek bar, making it easier to skip to a specific part of a video.



## 2021-05-03

### MP4 video file downloads

You can now give your viewers the option to download videos uploaded to Stream as an MP4 video file. For more, read the docs [here](/stream/viewing-videos/download-videos/).

## 2021-03-29

### Picture quality improvements

Cloudflare Stream now encodes videos with fewer artifacts, resulting in improved video quality for your viewers.

## 2021-03-25

### Improved client bandwidth hints for third-party video players

If you use Cloudflare Stream with a third party player, and send the `clientBandwidthHint` parameter in requests to fetch video manifests, Cloudflare Stream now selects the ideal resolution to provide to your client player more intelligently. This ensures your viewers receive the ideal resolution for their network connection.

## 2021-03-17

### Less bandwidth, identical video quality

Cloudflare Stream now delivers video using 3-10x less bandwidth, with no reduction in quality. This ensures faster playback for your viewers with less buffering, particularly when viewers have slower network connections.

## 2021-01-17

### Removed weekly upload limit, increased max video upload size

- You can now upload videos up to 30GB in size to Cloudflare Stream
- You can now upload an unlimited number of videos to Cloudflare Stream each week

## 2020-12-14

### Tus support for direct creator uploads

You can now use the [tus protocol](/stream/uploading-videos/direct-creator-uploads/#using-tus-recommended-for-videos-over-200mb) when allowing creators (your end users) to upload their own videos directly to Cloudflare Stream.

In addition, all uploads to Cloudflare Stream made using tus are now faster and more reliable as part of this change.

## 2020-12-09

### Multiple audio track mixdown

Videos with multiple audio tracks (ex: 5.1 surround sound) are now mixed down to stereo when uploaded to Stream. The resulting video, with stereo audio, is now playable in the Stream Player.

## 2020-12-02

### Storage limit notifications

Cloudflare now emails you if your account is using 75% or more of your prepaid video storage, so that you can take action and plan ahead.
