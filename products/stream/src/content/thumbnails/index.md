---
order: 9
---

# Thumbnails

## Use Case 1: Generating a thumbnail on-the-fly

Using the `poster` attribute in the `<stream>` tag, you can set a thumbnail to any time in your video. If [signed URLs](/stream/security/signed-urls/)  are required, you must use signed URL instead of video IDs.

```
poster="https://videodelivery.net/5d5bc37ffcf54c9b82e996823bffbb81/thumbnails/thumbnail.jpg?time=68s&height=270"
```
<img src="https://videodelivery.net/5d5bc37ffcf54c9b82e996823bffbb81/thumbnails/thumbnail.jpg?time=68s&height=270" />

Here's an example using a thumbnail:

```html
<stream src="5d5bc37ffcf54c9b82e996823bffbb81" poster="https://videodelivery.net/5d5bc37ffcf54c9b82e996823bffbb81/thumbnails/thumbnail.jpg?time=68s&height=270" controls preload height="270px" width="480px"></stream><script data-cfasync="false" defer type="text/javascript" src="https://embed.cloudflarestream.com/embed/r4xu.fla9.latest.js?video=5d5bc37ffcf54c9b82e996823bffbb81"></script>
```

<stream src="5d5bc37ffcf54c9b82e996823bffbb81" poster="https://videodelivery.net/5d5bc37ffcf54c9b82e996823bffbb81/thumbnails/thumbnail.jpg?time=68s&height=270" controls preload height="270px" width="480px"></stream><script data-cfasync="false" defer type="text/javascript" src="https://embed.cloudflarestream.com/embed/r4xu.fla9.latest.js?video=5d5bc37ffcf54c9b82e996823bffbb81"></script>

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
-H "X-Auth-Key: {api-key}" -H "X-Auth-Email: {email}" \
-d '{"uid": "{video-id}", "thumbnailTimestampPct": <pct>}' \
https://api.cloudflare.com/client/v4/accounts/{account_id}/stream/{video-id}
```

 `thumbnailTimestampPct` is a value between 0.0 (the first frame of the video) and 1.0 (the last frame of the video). This is particularly useful if you have videos of varying lengths. For example, you wanted the thumbnail to be the frame at the half way point of your videos, you can simply set the  `thumbnailTimestampPct` value to 0.5.

The example will yield a request:
```bash
curl -X POST \
-H "X-Auth-Key: {api-key}" -H "X-Auth-Email: {email}" \
-d '{"uid": "{video-id}", "thumbnailTimestampPct": 0.5}' \
https://api.cloudflare.com/client/v4/accounts/{account_id}/stream/{video-id}
```

## Use Case 3: Generating animated thumbnails

Stream supports animated GIFs as thumbnails. Views using animated thumbnails do not count in Stream views or watch time for billing or analytics.

### Animated GIF Thumbnail

```
https://videodelivery.net/5d5bc37ffcf54c9b82e996823bffbb81/thumbnails/thumbnail.gif?time=38s&height=200&duration=4s
```
<img src="https://videodelivery.net/5d5bc37ffcf54c9b82e996823bffbb81/thumbnails/thumbnail.gif?time=38s&height=200&duration=4s" />

Here's an example using an animated thumbnail:

```html
<stream src="5d5bc37ffcf54c9b82e996823bffbb81" poster="https://videodelivery.net/5d5bc37ffcf54c9b82e996823bffbb81/thumbnails/thumbnail.gif?time=38s&height=200&duration=4s" controls preload height="270px" width="480px"></stream><script data-cfasync="false" defer type="text/javascript" src="https://embed.cloudflarestream.com/embed/r4xu.fla9.latest.js?video=5d5bc37ffcf54c9b82e996823bffbb81"></script>
```

<stream src="5d5bc37ffcf54c9b82e996823bffbb81" poster="https://videodelivery.net/5d5bc37ffcf54c9b82e996823bffbb81/thumbnails/thumbnail.gif?time=38s&height=200&duration=4s" controls preload height="270px" width="480px"></stream><script data-cfasync="false" defer type="text/javascript" src="https://embed.cloudflarestream.com/embed/r4xu.fla9.latest.js?video=5d5bc37ffcf54c9b82e996823bffbb81"></script>

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

