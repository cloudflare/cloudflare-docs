---
order: 1
pcx-content-type: concept
---

# Upload videos

Stream provides four ways to upload videos to cover different use cases and accepts the following formats for upload: MP4, MKV, MOV, AVI, FLV, MPEG-2 TS, MPEG-2 PS, MXF, LXF, GXF, 3GP, WebM, MPG, and QuickTime.

<TableWrap>

| Upload method | When to use |
|------------------|-------------|
| [Stream Dashboard](https://dash.cloudflare.com?to=/:account/stream) | Quick, one-time uploads where automation is not required. |
| [Upload via link](/uploading-videos/upload-via-link) | The video library is stored in a cloud storage bucket. |
| [Direct creator uploads](/uploading-videos/direct-creator-uploads) | The end user is uploading videos but does not have access to your API tokens. For example, users are uploading content to your website or mobile app. |
| [Upload video file](/uploading-videos/upload-video-file) | The video file is stored on a computer with access to your API tokens. |

</TableWrap>

After you upload a video, you must wait for the video to finish processing before you can stream it. Refer to [Webhooks for notifications](/how-to/use-webhooks) to learn how to use webhooks to notify your service when a video is ready to stream.

## Supported framerates (FPS)

Cloudflare Stream supports video file uploads for any FPS, however videos will be re-encoded for 30 FPS playback. If the original video file has a frame rate lower than 30 FPS, Stream will re-encode at the original frame rate.

If the frame rate is variable, Stream drops frames. For example, if there is more than one frame within 1/30 seconds, Stream drops the extra frames within that period.

## Limitations

- Video uploads cannot exceed 30 GB.
- By default, you can have up to 120 videos in the `inprogress`, `queued`, or `downloading` state at the same time. Videos in the `error`, `ready`, or p`endingupload` state do not count toward this limit. If you need the concurrency limit raised, please contact Support explaining your use case and need for a higher limit.

  <Aside type="note">

  The limit to the number of videos only applies to videos being uploaded to Cloudflare Stream. This limit is not related to the number of end users streaming videos.

  </Aside>

- An account cannot upload videos if the total video duration exceeds the video storage capacity purchased. 

## Best practices

For recommended upload and bitrate settings, refer to [Best practices](/best-practices).
