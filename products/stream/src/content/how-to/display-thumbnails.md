---
pcx-content-type: how-to
---

# Display thumbnails

When creating thumbnails for your video, you can choose from one of three options: generate a thumbnail from a video, use a thumbnail from a timestamp, or use an animated thumbnail.

## Generate a thumbnail from a video

A thumbnail from your video can be generated using a special link where you specify the time from the video you want to use for your thumbnail. Refer to the link below for an example.

```
https://videodelivery.net/5d5bc37ffcf54c9b82e996823bffbb81/thumbnails/thumbnail.jpg?time=68s&height=270
```

Using the `poster` query parameter in the embed URL, you can set a thumbnail to any time in your video. If [signed URLs](/how-to/secure-your-stream#signed-url-tokens) are required, you must use a signed URL instead of a video ID.

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

## Set the default thumbnail timestamp using the API

By default, the Stream Player sets the thumbnail to the first frame of the video.

You can change this default value by setting the `thumbnailTimestampPct` using a `POST` request.

```bash
curl -X POST \
-H "Authorization: Bearer $TOKEN" \
-d '{"uid": "$VIDEOID", "thumbnailTimestampPct": <pct>}' \
https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/$VIDEOID
```

`thumbnailTimestampPct` is a value between 0.0 (the first frame of the video) and 1.0 (the last frame of the video). Using this value is particularly useful if you have videos of varying lengths. For example, if you want the thumbnail to use the frame at the halfway point of your video, you can simply set the `thumbnailTimestampPct` value to 0.5.

Below is an example of the scenario mentioned above.

```bash
curl -X POST \
-H "Authorization: Bearer $TOKEN" \
-d '{"uid": "$VIDEOID", "thumbnailTimestampPct": 0.5}' \
https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/$VIDEOID
```

## Generate animated thumbnails

Stream supports animated GIFs as thumbnails, and views using animated thumbnails do not count in Stream views or watch time for billing or analytics. Refer to the link below for an example.

```
https://videodelivery.net/5d5bc37ffcf54c9b82e996823bffbb81/thumbnails/thumbnail.gif?time=38s&height=200&duration=4s
```
<img src="https://videodelivery.net/5d5bc37ffcf54c9b82e996823bffbb81/thumbnails/thumbnail.gif?time=38s&height=200&duration=4s" />

  
For a list of supported attributed, see the [Supported attributes](#supported-attributes).

## Supported attributes

Below are the list of supported URL attributes:

- **`time`** — Time from the video. Default: `0s`, configurable. Exmaple: `8m`, `5m2s`.
- **`height`** — Default: `640`.
- **`width`** — Default: `640`.
- **`fit`** — Specifies behavior when the requested height and width do not match the original upload. Default: `crop`. Other acceptable values:
  - **`crop`**  — Cuts parts of the video that do not fit in the given size.
  - **`clip`** — Preserves the entire frame and decreases the size of the image within the given size.
  - **`scale`** — Distorts the image to fit the given size.
  - **`fill`** — Preserves the entire frame and fills the rest of the requested size with a black background.

Animated thumbnails support the attributes listed above in addition to:

- **`duration`** — Specifies the length of the animated thumbnail. Default: `5s`.
- **`fps`** — Specifies the frames per second of the animated thumbnail. Default `8`.