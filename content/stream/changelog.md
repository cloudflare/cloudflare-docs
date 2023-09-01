---
pcx_content_type: changelog
title: Changelog
weight: 11
rss: file
---

# Changelog

## 2023-08-08

### Scheduled Deletion

Stream now supports adding a scheduled deletion date to new and existing videos. Live inputs support deletion policies for automatic recording deletion.

For more, refer to the [video on demand](/stream/uploading-videos/) or [live input](/stream/stream-live/) docs.

## 2023-05-16

### Multiple audio tracks now generally available

Stream supports adding multiple audio tracks to an existing video.

For more, refer to the [documentation](https://developers.cloudflare.com/stream/edit-videos/adding-additional-audio-tracks/) to get started.

## 2023-04-26

### Player Enhancement Properties

Cloudflare Stream now supports player enhancement properties.

With player enhancements, you can modify your video player to incorporate elements of your branding, such as your logo, and customize additional options to present to your viewers.

For more, refer to the [documentation](https://developers.cloudflare.com/stream/edit-videos/player-enhancements/) to get started.

## 2023-03-21

### Limits for downloadable MP4s for live recordings

Previously, generating a download for a live recording exceeding four hours resulted in failure.

To fix the issue, now video downloads are only available for live recordings under four hours. Live recordings exceeding four hours can still be played but cannot be downloaded. 

## 2023-01-04

### Earlier detection (and rejection) of non-video uploads

Cloudflare Stream now detects non-video content on upload using [the POST API](/stream/uploading-videos/upload-video-file/) and returns a 400 Bad Request HTTP error with code `10059`.

Previously, if you or one of your users attempted to upload a file that is not a video (ex: an image), the request to upload would appear successful, but then fail to be encoded later on.

With this change, Stream responds to the upload request with an error, allowing you to give users immediate feedback if they attempt to upload non-video content.

## 2022-12-08

### Faster mp4 downloads of live recordings

Generating MP4 downloads of live stream recordings is now significantly faster. For more, refer to [the docs](/stream/stream-live/download-stream-live-videos/).

## 2022-11-29

### Multiple audio tracks (closed beta)

Stream now supports adding multiple audio tracks to an existing video upload. This allows you to:

- Provide viewers with audio tracks in multiple languages
- Provide dubbed audio tracks, or audio commentary tracks (ex: Director’s Commentary)
- Allow your users to customize the customize the audio mix, by providing separate audio tracks for music, speech or other audio tracks.
- Provide Audio Description tracks to ensure your content is accessible. ([WCAG 2.0 Guideline 1.2 1](https://www.w3.org/TR/WCAG20/#media-equiv-audio-desc-only))

To request an invite to the beta, refer to [this post](https://community.cloudflare.com/t/new-in-beta-support-for-multiple-audio-tracks/439629).

## 2022-11-22

### VP9 support for WebRTC live streams (beta)

Cloudflare Stream now supports [VP9](https://developers.google.com/media/vp9) when streaming using [WebRTC (WHIP)](/stream/webrtc-beta/), currently in beta.

## 2022-11-08

### Reduced time to start WebRTC streaming and playback with Trickle ICE

Cloudflare Stream's [WHIP](https://datatracker.ietf.org/doc/draft-ietf-wish-whip/) and [WHEP](https://www.ietf.org/archive/id/draft-murillo-whep-01.html) implementations now support [Trickle ICE](https://datatracker.ietf.org/doc/rfc8838/), reducing the time it takes to initialize WebRTC connections, and increasing compatibility with WHIP and WHEP clients.

For more, refer to [the docs](/stream/webrtc-beta/).

## 2022-11-07

### Deprecating the "per-video" Analytics API

The “per-video” analytics API is being deprecated. If you still use this API, you will need to switch to using the [GraphQL Analytics API](/stream/getting-analytics/fetching-bulk-analytics/) by February 1, 2023. After this date, the per-video analytics API will be no longer available.

The GraphQL Analytics API provides the same functionality and more, with additional filters and metrics, as well as the ability to fetch data about multiple videos in a single request. Queries are faster, more reliable, and built on a shared analytics system that you can [use across many Cloudflare products](/analytics/graphql-api/features/data-sets/).

For more about this change and how to migrate existing API queries, refer to [this post](https://community.cloudflare.com/t/migrate-to-the-stream-graphql-analytics-api-by-feb-1st-2023/433252) and the [GraphQL Analytics API docs](/stream/getting-analytics/fetching-bulk-analytics/).

## 2022-11-01

### Create an unlimited number of live inputs

Cloudflare Stream now has no limit on the number of [live inputs](/api/operations/stream-live-inputs-retrieve-a-live-input) you can create. Stream is designed to allow your end-users to go live — live inputs can be created quickly on-demand via a single API request for each of user of your platform or app.

For more on creating and managing live inputs, get started with the [docs](/stream/stream-live/).

## 2022-10-20

### More accurate bandwidth estimates for live video playback

When playing live video, Cloudflare Stream now provides significantly more accurate estimates of the bandwidth needs of each quality level to client video players. This ensures that live video plays at the highest quality that viewers have adequate bandwidth to play.

As live video is streamed to Cloudflare, we transcode it to make it available to viewers at mulitple quality levels. During transcoding, we learn about the real bandwidth needs of each segment of video at each quality level, and use this to provide an estimate of the bandwidth requirements of each quality level the in HLS (`.m3u8`) and DASH (`.mpd`) manifests.

If a live stream contains content with low visual complexity, like a slideshow presentation, the bandwidth estimates provided in the HLS manifest will be lower, ensuring that the most viewers possible view the highest quality level, since it requires relatively little bandwidth. Conversely, if a live stream contains content with high visual complexity, like live sports with motion and camera panning, the bandwidth estimates provided in the HLS manifest will be higher, ensuring that viewers with inadequate bandwidth switch down to a lower quality level, and their playback does not buffer.

This change is particularly helpful if you're building a platform or application that allows your end users to create their own live streams, where these end users have their own streaming software and hardware that you can't control. Because this new functionality adapts based on the live video we receive, rather than just the configuration advertised by the broadcaster, even in cases where your end users' settings are less than ideal, client video players will not receive excessively high estimates of bandwidth requirements, causing playback quality to decrease unnecessarily. Your end users don't have to be OBS Studio experts in order to get high quality video playback.

No work is required on your end — this change applies to all live inputs, for all customers of Cloudflare Stream. For more, refer to the [docs](/stream/stream-live/#bitrate-estimates-at-each-quality-level-bitrate-ladder).

## 2022-10-05

### AV1 Codec support for live streams and recordings (beta)

Cloudflare Stream now supports playback of live videos and live recordings using the [AV1 codec](https://aomedia.org/av1/), which uses 46% less bandwidth than H.264.

For more, read the [blog post](https://blog.cloudflare.com/av1-cloudflare-stream-beta) or the get started with the [docs](/stream/viewing-videos/av1-playback).

## 2022-09-27

### WebRTC live streaming and playback (beta)

Cloudflare Stream now supports live video streaming over WebRTC, with sub-second latency, to unlimited concurrent viewers.

For more, read the [blog post](https://blog.cloudflare.com/webrtc-whip-whep-cloudflare-stream) or the get started with example code in the [docs](/stream/webrtc-beta).

## 2022-09-15

### Manually control when you start and stop simulcasting

You can now enable and disable individual live outputs via the API or Stream dashboard, allowing you to control precisely when you start and stop simulcasting to specific destinations like YouTube and Twitch. For more, [read the docs](/stream/stream-live/simulcasting/#control-when-you-start-and-stop-simulcasting).

## 2022-08-15

### Unique subdomain for your Stream Account

URLs in the Stream Dashboard and Stream API now use a subdomain specific to your Cloudflare Account: `customer-{CODE}.cloudflarestream.com`. This change allows you to:

1. Use [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) (CSP) directives specific to your Stream subdomain, to ensure that only videos from your Cloudflare account can be played on your website. 
2. Allowlist only your Stream account subdomain at the network-level to ensure that only videos from a specific Cloudflare account can be accessed on your network.

No action is required from you, unless you use Content Security Policy (CSP) on your website. For more on CSP, read the docs [here](/stream/faq/#i-use-content-security-policy-csp-on-my-website-what-domains-do-i-need-to-add-to-which-directives).

## 2022-08-02

### Clip videos using the Stream API

You can now change the start and end times of a video uploaded to Cloudflare Stream. For more information, refer to [Clip videos](/stream/edit-videos/video-clipping/).

## 2022-07-26

### Live inputs

The Live Inputs API now supports optional pagination, search, and filter parameters. For more information, refer to the [Live Inputs API documentation](/api/operations/stream-live-inputs-list-live-inputs).

## 2022-05-24

### Picture-in-Picture support

The [Stream Player](/stream/viewing-videos/using-the-stream-player/) now displays a button to activate Picture-in-Picture mode, if the viewer's web browser supports the [Picture-in-Picture API](https://developer.mozilla.org/en-US/docs/Web/API/Picture-in-Picture_API).

## 2022-05-13

### Creator ID property

During or after uploading a video to Stream, you can now specify a value for a new field, `creator`. This field can be used to identify the creator of the video content, linking the way you identify your users or creators to videos in your Stream account. For more, read the [blog post](https://blog.cloudflare.com/stream-creator-management/)

## 2022-03-17

### Analytics panel in Stream Dashboard

The Stream Dashboard now has an analytics panel that shows the number of minutes of both live and recorded video delivered. This view can be filtered by **Creator ID**, **Video UID**, and **Country**. For more in-depth analytics data, refer to the [bulk analytics documentation](/stream/getting-analytics/fetching-bulk-analytics/)

## 2022-03-16

### Custom letterbox color configuration option for Stream Player

The Stream Player can now be configured to use a custom letterbox color, displayed around the video ("letterboxing" or "pillarboxing") when the video's aspect ratio does not match the player's aspect ratio. Refer to the documentation on configuring the Stream Player [here](/stream/viewing-videos/using-the-stream-player/#basic-options).

## 2022-03-10

### Support for SRT live streaming protocol

Cloudflare Stream now supports the SRT live streaming protocol. SRT is a modern, actively maintained streaming video protocol that delivers lower latency, and better resilience against unpredictable network conditions. SRT supports newer video codecs and makes it easier to use accessibility features such as captions and multiple audio tracks.

For more, read the [blog post](https://blog.cloudflare.com/stream-now-supports-srt-as-a-drop-in-replacement-for-rtmp/).

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

## 2021-12-07

### FedRAMP Support

The Stream Player can now be served from a [FedRAMP](https://www.cloudflare.com/press-releases/2021/cloudflare-hits-milestone-in-fedramp-approval/) compliant subdomain.

## 2021-11-23

### 24/7 Live streaming support

You can now use Cloudflare Stream for 24/7 live streaming.

## 2021-11-17

### Persistent Live Stream IDs

You can now start and stop live broadcasts without having to provide a new video UID to the Stream Player (or your own player) each time the stream starts and stops. [Read the docs](/stream/stream-live/watch-live-stream/#view-by-live-input-id).

## 2021-10-14

### MP4 video file downloads for live videos

Once a live video has ended and been recorded, you can now give viewers the option to download an MP4 video file of the live recording. For more, read the docs [here](/stream/stream-live/download-stream-live-videos/).

## 2021-09-30

### Serverless Live Streaming

Stream now supports live video content! For more information, read the [blog post](https://blog.cloudflare.com/stream-live/) and get started by reading the [docs](/stream/stream-live/).

## 2021-07-26

### Thumbnail previews in Stream Player seek bar

The Stream Player now displays preview images when viewers hover their mouse over the seek bar, making it easier to skip to a specific part of a video.

### MP4 video file downloads (GA)

All Cloudflare Stream customers can now give viewers the option to download videos uploaded to Stream as an MP4 video file. For more, read the docs [here](/stream/viewing-videos/download-videos/).

## 2021-07-10

### Stream Connect (open beta)

You can now opt-in to the Stream Connect beta, and use Cloudflare Stream to restream live video to any platform that accepts RTMPS input, including Facebook, YouTube and Twitch.

For more, read the [blog post](https://blog.cloudflare.com/restream-with-stream-connect/) or the [docs](/stream/stream-live/simulcasting/).

## 2021-06-10

### Simplified signed URL token generation

You can now obtain a signed URL token via a single API request, without needing to generate signed tokens in your own application. [Read the docs](/stream/viewing-videos/securing-your-stream)

## 2021-06-08

### Stream Connect (closed beta)

You can now use Cloudflare Stream to restream or simulcast live video to any platform that accepts RTMPS input, including Facebook, YouTube and Twitch.

For more, read the [blog post](https://blog.cloudflare.com/restream-with-stream-connect/) or the [docs](/stream/stream-live/simulcasting/).

## 2021-05-03

### MP4 video file downloads (beta)

You can now give your viewers the option to download videos uploaded to Stream as an MP4 video file. For more, read the docs [here](/stream/viewing-videos/download-videos/).

## 2021-03-10

### Stream Player 2.0 (preview)

A brand new version of the Stream Player is now available for preview. New features include:

- Unified controls across desktop and mobile devices
- Keyboard shortcuts
- Intelligent mouse cursor interactions with player controls
- Phased out support for Internet Explorer 11

For more, refer to [this post](https://community.cloudflare.com/t/announcing-the-preview-build-for-stream-player-2-0/243095) on the Cloudflare Community Forum.

## 2021-03-04

### Faster video encoding

Videos uploaded to Cloudflare Stream are now available to view 5x sooner, reducing the time your users wait between uploading and viewing videos.

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

You can now use the [tus protocol](/stream/uploading-videos/direct-creator-uploads/#advanced-upload-flow-using-tus-for-large-videos) when allowing creators (your end users) to upload their own videos directly to Cloudflare Stream.

In addition, all uploads to Cloudflare Stream made using tus are now faster and more reliable as part of this change.

## 2020-12-09

### Multiple audio track mixdown

Videos with multiple audio tracks (ex: 5.1 surround sound) are now mixed down to stereo when uploaded to Stream. The resulting video, with stereo audio, is now playable in the Stream Player.

## 2020-12-02

### Storage limit notifications

Cloudflare now emails you if your account is using 75% or more of your prepaid video storage, so that you can take action and plan ahead.

...
