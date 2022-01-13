---
order: 
pcx-content-type: how-to
---

# Apply watermarks

You can add watermarks to videos uploaded using the Stream API.

To add watermarks to your videos, you will first need to create a watermark profile. A watermark profile describes the image you would like to use as a watermark and its position. After you create a watermark profile, you can use it as an option when uploading videos.

## Create a watermark profile

Watermark profiles have many customizable options, but the default parameters generally work for most cases. 

To create, list, delete, or get information about the profile, you will need a [Cloudflare API token](https://www.cloudflare.com/a/account/my-account). For a list of the optional parameters associated with the `watermarks` endpoint, refer to [Create a Watermark Profile from a URL](https://api.cloudflare.com/#stream-watermark-profile-create-a-watermark-profile-from-an-url) in the API documentation.

1. Create the profile.

```bash
curl -X POST -H 'Authorization: Bearer $TOKEN' \
-F file=@/Users/rchen/cloudflare.png \
https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/watermarks
```

2. Specify the profile UID at upload.

```bash
tus-upload --chunk-size 5242880 \
--header Authentication 'Bearer $TOKEN' \
--metadata watermark $WATERMARKUID \
/Users/rchen/cat.mp4 https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream
```

3. When you are done, your video displays your watermark.

![Watermarked Video](../static/cat.png)

## Upload a local image file directly

To upload the image directly to your profile, send a `POST` request using `multipart/form-data` as the `content-type` and specify the file under the `file` key. All other fields are optional.

```bash
curl -X POST -H "Authorization: Bearer $TOKEN" \
-F file=@{path-to-image-locally} \
-F name='marketing videos' \
-F opacity=1.0 \
-F padding=0.05 \
-F scale=0.15 \
-F position=upperRight \
https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/watermarks
```

## Pass a URL to an image

To specify a URL for upload, send a `POST` request using `application/json` as the `content-type` and specify the file location using the `url` key. All other fields are optional.

```bash
curl -X POST -H "Authorization: Bearer $TOKEN" \
-H 'Content-Type: application/json' \
-d '{
  "url": "{url-to-image}",
  "name": "marketing videos",
  "opacity": 1.0,
  "padding": 0.05,
  "scale": 0.15,
  "position": "upperRight"
}' \
https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/watermarks
```

Example response for creating a watermark profile. `downloadedFrom` will be populated if the profile was created by downloading from URL.

```json
{
  "result": {
    "uid": "d6373709b7681caa6c48ef2d8c73690d",
    "size": 11248,
    "height": 240,
    "width": 720,
    "created": "2020-07-29T00:16:55.719265Z",
    "downloadedFrom": null,
    "name": "marketing videos",
    "opacity": 1.0,
    "padding": 0.05,
    "scale": 0.15,
    "position": "upperRight"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

## Use watermark profiles on a video

After you create a watermark profile, you can use the profile at upload time for watermarking videos. 

Stream does not currently support specifying watermark profiles at upload time for Simple Uploads.

### Upload video with a link

```bash
curl -X POST -H "Authorization: Bearer $TOKEN" \
-H 'Content-Type: application/json' \
-d '{
  "url": "{url-to-video}",
  "watermark": {
    "uid": "$WATERMARKUID"
  }
}' \
https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/copy
```

 Example response to upload video with a link.

```json
---
highlight: [10,11,12,13,14,15,16,17,18,19,20,21,22]
---
{
  "result": {
    "uid": "8d3a5b80e7437047a0fb2761e0f7a645",
    "thumbnail": "https://videodelivery.net/8d3a5b80e7437047a0fb2761e0f7a645/thumbnails/thumbnail.jpg",

    "playback": {
      "hls": "https://videodelivery.net/8d3a5b80e7437047a0fb2761e0f7a645/manifest/video.m3u8",
      "dash": "https://videodelivery.net/8d3a5b80e7437047a0fb2761e0f7a645/manifest/video.mpd"
    },
    "watermark": {
      "uid": "d6373709b7681caa6c48ef2d8c73690d",
      "size": 11248,
      "height": 240,
      "width": 720,
      "created": "2020-07-29T00:16:55.719265Z",
      "downloadedFrom": null,
      "name": "marketing videos",
      "opacity": 1.0,
      "padding": 0.05,
      "scale": 0.15,
      "position": "upperRight"
    }
}
```

### Upload video with tus

```bash
tus-upload --chunk-size 5242880 \
--header Authentication 'Bearer $TOKEN' \
--metadata watermark $WATERMARKUID \
$PATH_TO_VIDEO https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream
```

### Direct creator uploads

The video uploaded with the generated unique one-time URL will be watermarked with the specified profile.

```bash
curl -X POST -H "Authorization: Bearer $TOKEN" \
-H 'Content-Type: application/json' \
-d '{
  "maxDurationSeconds": 3600,
  "watermark": {
    "uid": "$WATERMARKUID"
  }
}' \
https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/direct_upload
```

Example response to direct user uploads. `watermark` will be `null` if a watermark was not specified.

```json
{
  "result": {
    "uploadURL": "https://upload.videodelivery.net/c32d98dd671e4046a33183cd5b93682b",
    "uid": "c32d98dd671e4046a33183cd5b93682b",
    "watermark": {
      "uid": "d6373709b7681caa6c48ef2d8c73690d",
      "size": 11248,
      "height": 240,
      "width": 720,
      "created": "2020-07-29T00:16:55.719265Z",
      "downloadedFrom": null,
      "name": "marketing videos",
      "opacity": 1.0,
      "padding": 0.05,
      "scale": 0.15,
      "position": "upperRight"
    }
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

## Get a watermark profile

Use the command below to view a watermark profile you created.

```bash
curl -H "Authorization: Bearer $TOKEN" \
https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/watermarks/$WATERMARKUID
```

Example response to get a watermark profile.

```json
{
  "result": {
    "uid": "d6373709b7681caa6c48ef2d8c73690d",
    "size": 11248,
    "height": 240,
    "width": 720,
    "created": "2020-07-29T00:16:55.719265Z",
    "downloadedFrom": null,
    "name": "marketing videos",
    "opacity": 1.0,
    "padding": 0.05,
    "scale": 0.15,
    "position": "center"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

## List watermark profiles

Use the command below to list watermark profiles that you created.

```bash
curl -H "Authorization: Bearer $TOKEN" \
https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/watermarks/
```

Example response to list watermark profiles.

```json
{
  "result": [
    {
      "uid": "9de16afa676d64faaa7c6c4d5047e637",
      "size": 207710,
      "height": 626,
      "width": 1108,
      "created": "2020-07-29T00:23:35.918472Z",
      "downloadedFrom": null,
      "name": "marketing videos",
      "opacity": 1.0,
      "padding": 0.05,
      "scale": 0.15,
      "position": "upperLeft"
    },
    {
      "uid": "9c50cff5ab16c4aec0bcb03c44e28119",
      "size": 207710,
      "height": 626,
      "width": 1108,
      "created": "2020-07-29T00:16:46.735377Z",
      "downloadedFrom": "https://company.com/logo.png",
      "name": "internal training videos",
      "opacity": 1.0,
      "padding": 0.05,
      "scale": 0.15,
      "position": "center"
    }
  ],
  "success": true,
  "errors": [],
  "messages": []
}
```

## Delete a  watermark profile

To delete a watermark profile that you created, send a `DELETE` REQUEST.

```bash
curl -X DELETE -H 'Authorization: Bearer $TOKEN' \
https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/watermarks/$WATERMARKUID
```

If the operation was successful, you will receive a success response.

```json
{
  "result": "",
  "success": true,
  "errors": [],
  "messages": []
}
```

## Limitations

* After the watermark profile is created, you cannot change its parameters. If you need to edit your watermark profile, you must delete the profile and create a new one.
* After the watermark is applied to a video, you cannot change the watermark without re-uploading the video to apply a different profile.
* After the watermark is applied to a video, deleting the watermark profile will not remove the watermark from the video.
* The maximum file size is 2MiB (2097152 bytes), and only PNG files are supported.
