# Recommended input files

Cloudflare Stream supports a wide range of video files and most files will work without any issue. However, we recommend using the maximum bitrate settings below to ensure fast upload and processing speeds.

## Upload bitrate recommendations

Resolution  |  Recommended bitrate
------------|---------
1080p  |	8 Mbps
720p  |	4.8 Mbps
480p  |	2.4 Mbps
360p | 1 Mbps

## Encoding for Cloudflare Stream

If you're producing a brand new file for Cloudflare Stream, we recommend you use the following settings:

 - MP4 containers, AAC audio codec, H264 video codec, 30 or below frames per second
 - moov atom should be at the front of the file (Fast Start)
 - H264 progressive scan (no interlacing)
 - H264 high profile
 - Closed GOP
 - Content should be encoded and uploaded in the same frame rate it was recorded
