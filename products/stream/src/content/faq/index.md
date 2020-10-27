---
order: 6
---

# FAQ

## What formats and quality levels are delivered through Cloudflare Stream?

Cloudflare decides on which bitrate, resolution and codec is best for you. We deliver all videos to industry standard H264 codec. We use to few different adaptive streaming levels from 360p to 1080p to ensure smooth streaming for your audience watching on different devices and bandwidth constraints.

## Can I download original video files from Stream?

Video cannot be downloaded from Cloudflare Stream.

## Is there a limit to the amount of videos I can upload?

Each account starts with a 500 GB weekly rolling upload limit, which means that videos uploaded in the past 7 days regardless of the day of week will be counted. This only includes original videos uploaded.

A video file can be at most 20 GB. Please write to Cloudflare support or your customer success contact for higher limits.

## Can I embed videos on Stream even if my domain is not on Cloudflare?

Yes. Stream videos can be embedded on any domain, even domains not on Cloudflare.

## What input file formats are supported?

Users can upload video in the following file formats:

MP4, MKV, MOV, AVI, FLV, MPEG-2 TS, MPEG-2 PS, MXF, LXF, GXF, 3GP, WebM, MPG, QuickTime

## What frame rates (FPS) are supported?

Cloudflare Stream supports video file uploads for any FPS, however videos will be re-encoded for 30 FPS playback. If the original video file has a frame rate lower than 30 FPS, Stream will re-encode at the original frame rate.

If the frame rate is variable we will drop frames (e.g. if there are more than 1 frames within 1/30 seconds, we will drop the extra frames within that period).

## What browsers does stream work on?

The Stream player can be successfully embedded on the following platforms:

<TableWrap>

Browser         | Version
----------------|-----------------------------------
Chrome          | Supported since Chrome version 30+
Firefox         | Supported since Firefox version 42+
Internet Explorer | Supported since IE 11 (Windows 8+ only)
Safari          | Supported since Safari version 8+
Opera           | Supported since Opera version 15+

</TableWrap>

<TableWrap>

Mobile Platform   | Version
------------------|-----------------------------------------------------------------------------------
Chrome on Android | Supported on Chrome and Firefox for Android 4.0+ and all browsers for Android 4.1+
UC Browser on Android | Supported on version 11.8+
Samsung Internet | Supported on 5+
iOS               | Supported on iOS 8+
Windows           | Supported on Windows Phone 8+

</TableWrap>

## What are the recommended upload settings for video uploads?

If you're producing a brand new file for Cloudflare Stream, we recommend you use the following settings:

 - MP4 containers, AAC audio codec, H264 video codec, 30 or below frames per second
 - moov atom should be at the front of the file (Fast Start)
 - H264 progressive scan (no interlacing)
 - H264 high profile
 - Closed GOP
 - Content should be encoded and uploaded in the same frame rate it was recorded
 - Mono or Stereo audio (Stream does not support audio tracks with more than 2 channels)

Below are bitrate reccomendations for encoding new videos for Stream:

<TableWrap>

Resolution  |  Recommended bitrate
------------|---------
1080p  |	8 Mbps
720p  |	4.8 Mbps
480p  |	2.4 Mbps
360p | 1 Mbps

</TableWrap>