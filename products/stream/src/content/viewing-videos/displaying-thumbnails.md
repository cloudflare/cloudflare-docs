---
order: 4
---

# Displaying thumbnails

## Use Case 1: Generating a thumbnail on-the-fly

A thumbnail from your video can be generated using a special link where you speicify the time from the video you'd like to get the thumbnail from.

<Example>

```
https://videodelivery.net/5d5bc37ffcf54c9b82e996823bffbb81/thumbnails/thumbnail.jpg?time=68s&height=270
```

<img src="https://videodelivery.net/5d5bc37ffcf54c9b82e996823bffbb81/thumbnails/thumbnail.jpg?time=68s&height=270" />

</Example>


Using the `poster` query parameter in the embed URL, you can set a thumbnail to any time in your video. If [signed URLs](/security/signed-urls/)  are required, you must use signed URL instead of video IDs.

```html
<iframe
  src="https://iframe.videodelivery.net/5d5bc37ffcf54c9b82e996823bffbb81?poster=https%3A%2F%2Fvideodelivery.net%2F5d5bc37ffcf54c9b82e996823bffbb81%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D68s%26height%3D270"
  style="border: none;"
  height="720"
  width="1280"
  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
  allowfullscreen="true"
></iframe>
```

Supported URL attributes are:

- **`time`** (default `0s`, configurable) time from the video e.g. `8m`, `5m2s`
- **`height`** (default `640`)
- **`width`** (default `640`)
- **`fit`** (default `crop`) to clarify what to do when requested height and width doesn't match the original upload, which should be one of:
  - **`crop`**  cut parts of the video that doesn't fit in the given size
  - **`clip`** preserve the entire frame and decrease the size of the image within given size
  - **`scale`** distort the image to fit the given size
  - **`fill`** preserve the entire frame and fill the rest of the requested size with black background

## Use Case 2: Setting the default thumbnail timestamp using the API

By default, the Stream Player sets the thumbnail to the first frame of the video.

You can change this default value by setting the "thumbnailTimestampPct" value using the API:

```bash
curl -X POST \
-H "Authorization: Bearer $TOKEN" \
-d '{"uid": "$VIDEOID", "thumbnailTimestampPct": <pct>}' \
https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/$VIDEOID
```

 `thumbnailTimestampPct` is a value between 0.0 (the first frame of the video) and 1.0 (the last frame of the video). This is particularly useful if you have videos of varying lengths. For example, you wanted the thumbnail to be the frame at the half way point of your videos, you can simply set the  `thumbnailTimestampPct` value to 0.5.

The example will yield a request:
```bash
curl -X POST \
-H "Authorization: Bearer $TOKEN" \
-d '{"uid": "$VIDEOID", "thumbnailTimestampPct": 0.5}' \
https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/$VIDEOID
```

## Use Case 3: Generating animated thumbnails

Stream supports animated GIFs as thumbnails. Views using animated thumbnails do not count in Stream views or watch time for billing or analytics.

### Animated GIF thumbnails

```
https://videodelivery.net/5d5bc37ffcf54c9b82e996823bffbb81/thumbnails/thumbnail.gif?time=38s&height=200&duration=4s
```
<img src="https://videodelivery.net/5d5bc37ffcf54c9b82e996823bffbb81/thumbnails/thumbnail.gif?time=38s&height=200&duration=4s" />

Supported URL attributes for animated thumbnails are:

- **`time`** (default `0s`) time from the video e.g. `8m`, `5m2s`
- **`height`** (default `640`)
- **`width`** (default `640`)
- **`fit`** (default `crop`) to clarify what to do when requested height and width doesn't match the original upload, which should be one of:
  - **`crop`**  cut parts of the video that doesn't fit in the given size
  - **`clip`** preserve the entire frame and decrease the size of the image within given size
  - **`scale`** distort the image to fit the given size
  - **`fill`** preserve the entire frame and fill the rest of the requested size with black background
- **`duration`** (default `5s`)
- **`fps`** (default `8`)
