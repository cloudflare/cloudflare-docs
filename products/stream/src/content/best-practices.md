---
order: 4
pcx-content-type: concept
---

# Best practices

## Recommended upload settings

If you are producing a brand new file for Cloudflare Stream, Cloudflare recommends using the following settings:

 - MP4 containers, AAC audio codec, H264 video codec, 30 or below frames per second.
 - moov atom should be at the front of the file (Fast Start).
 - H264 progressive scan (no interlacing).
 - H264 high profile.
 - Closed GOP.
 - Content should be encoded and uploaded in the same frame rate it was recorded.
 - Mono or stereo audio (Stream will mix audio tracks with more than two channels down to stereo). Stream does not currently support multi-audio tracks. For files with multiple audio tracks, Stream uses the first available audio track.

## Recomended bitrate settings

<TableWrap>

Resolution  |  Recommended bitrate
------------|---------
1080p  |	8 Mbps
720p  |	4.8 Mbps
480p  |	2.4 Mbps
360p | 1 Mbps

</TableWrap>