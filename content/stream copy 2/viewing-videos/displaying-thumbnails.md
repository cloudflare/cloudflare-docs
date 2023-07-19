---
pcx_content_type: how-to
title: Display thumbnails
weight: 5
---

# Display thumbnails

{{<Aside>}}

Stream thumbnails are not supported for videos with non-square pixels. 

{{</Aside>}}

## Use Case 1: Generating a thumbnail on-the-fly

A thumbnail from your video can be generated using a special link where you specify the time from the video you'd like to get the thumbnail from.

`
https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3eda/thumbnails/thumbnail.jpg?time=1s&height=270
`

<img src="https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3eda/thumbnails/thumbnail.jpg?time=1s&height=270" alt="Example of thumbnail image generated from example video" />

Using the `poster` query parameter in the embed URL, you can set a thumbnail to any time in your video. If [signed URLs](/stream/viewing-videos/securing-your-stream/) are required, you must use a signed URL instead of video UIDs.

```html
<iframe
  src="https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3eda/iframe?poster=https%3A%2F%2Fcustomer-m033z5x00ks6nunl.cloudflarestream.com%2Fb236bde30eb07b9d01318940e5fc3eda%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D1s%26height%3D600"
  style="border: none"
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
  - **`crop`** cut parts of the video that doesn't fit in the given size
  - **`clip`** preserve the entire frame and decrease the size of the image within given size
  - **`scale`** distort the image to fit the given size
  - **`fill`** preserve the entire frame and fill the rest of the requested size with black background

## Use Case 2: Set the default thumbnail timestamp using the API

By default, the Stream Player sets the thumbnail to the first frame of the video. You can change this on a per-video basis by setting the "thumbnailTimestampPct" value using the API:

```bash
curl -X POST \
-H "Authorization: Bearer <API_TOKEN>" \
-d '{"thumbnailTimestampPct": 0.5}' \
https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/<VIDEO_UID>
```

`thumbnailTimestampPct` is a value between 0.0 (the first frame of the video) and 1.0 (the last frame of the video). For example, you wanted the thumbnail to be the frame at the half way point of your videos, you can simply set the `thumbnailTimestampPct` value to 0.5. Using relative values in this way allows you to set the default thumbnail even if you or your users' videos vary in duration.

## Use Case 3: Generating animated thumbnails

Stream supports animated GIFs as thumbnails. Viewing animated thumbnails does not count toward billed minutes delivered or minutes viewed in [Stream Analytics](/stream/getting-analytics/).

### Animated GIF thumbnails

`
 https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3eda/thumbnails/thumbnail.gif?time=1s&height=200&duration=4s
`

<img src="https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3eda/thumbnails/thumbnail.gif?time=1s&height=200&duration=4s" alt="Animated gif example, generated on-demand from Cloudflare Stream" />

Supported URL attributes for animated thumbnails are:

- **`time`** (default `0s`) time from the video e.g. `8m`, `5m2s`
- **`height`** (default `640`)
- **`width`** (default `640`)
- **`fit`** (default `crop`) to clarify what to do when requested height and width doesn't match the original upload, which should be one of:
  - **`crop`** cut parts of the video that doesn't fit in the given size
  - **`clip`** preserve the entire frame and decrease the size of the image within given size
  - **`scale`** distort the image to fit the given size
  - **`fill`** preserve the entire frame and fill the rest of the requested size with black background
- **`duration`** (default `5s`)
- **`fps`** (default `8`)
