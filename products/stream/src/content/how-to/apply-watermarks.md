---
order: 
pcx-content-type: how-to
---

# Apply watermarks

You can add watermarks to videos uploaded using the Stream API.

To add watermarks to your videos, you will first need to create a watermark profile. A watermark profile describes the image you would like to use as a watermark and its position. After you create a watermark profile, you can use it as an option when uploading videos.

To interact with the watermark profile, you will need a [Cloudflare API token](https://www.cloudflare.com/a/account/my-account). 

## Create a watermark profile

Watermark profiles have many customizable options, but the default parameters generally work for most cases. 

1. Create the profile using the API information below.

<TableWrap>

<table>
  <thead>
  <tr>
   <th><strong>Command</strong>
   </th>
   <th><strong>Method</strong>
   </th>
   <th><strong>Endpoint</strong>
   </th>
  </tr>
  </thead>
  <tbody>
  <tr>
   <td><a href="https://api.cloudflare.com/#stream-watermark-profile-create-a-watermark-profile-from-an-url">Create watermark profile</a>
   </td>
   <td><Code>POST</Code>
   </td>
   <td><Code>accounts/:account_identifier/stream/watermarks</Code>
   </td>
  </tr>
  </tbody>
</table>

</TableWrap>

2. Specify the profile UID at upload.

```bash
tus-upload --chunk-size 5242880 \
--header Authentication 'Bearer $TOKEN' \
--metadata watermark $WATERMARKUID \
/Users/rchen/cat.mp4 https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream
```

When you are done, your video displays your watermark.

![Watermarked Video](../static/cat.png)

## Upload a local image file directly

To upload the image directly to your profile, send a `POST` request using `multipart/form-data` as the `content-type` and specify the file under the `file` key. All other fields are optional.

<TableWrap>

<table>
  <thead>
  <tr>
   <th><strong>Command</strong>
   </th>
   <th><strong>Method</strong>
   </th>
   <th><strong>Endpoint</strong>
   </th>
  </tr>
  </thead>
  <tbody>
  <tr>
   <td><a href="https://api.cloudflare.com/#stream-watermark-profile-create-a-watermark-profile-via-basic-upload">Upload local image file</a>
   </td>
   <td><Code>POST</Code>
   </td>
   <td><Code>accounts/:account_identifier/stream/watermarks</Code>
   </td>
  </tr>
  </tbody>
</table>

</TableWrap>

## Pass a URL to an image

To specify a URL for upload, send a `POST` request using `application/json` as the `content-type` and specify the file location using the `url` key using the API information below. All other fields are optional.

<TableWrap>

<table>
  <thead>
  <tr>
   <th><strong>Command</strong>
   </th>
   <th><strong>Method</strong>
   </th>
   <th><strong>Endpoint</strong>
   </th>
  </tr>
  </thead>
  <tbody>
  <tr>
   <td><a href="https://api.cloudflare.com/#stream-watermark-profile-create-a-watermark-profile-from-an-url">Specify URL for image</a>
   </td>
   <td><Code>POST</Code>
   </td>
   <td><Code>accounts/:account_identifier/stream/watermarks</Code>
   </td>
  </tr>
  </tbody>
</table>

</TableWrap>

The `downloadedFrom` field will be populated if the profile was created by downloading from a URL.

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

## List and delete watermark profiles

Use the commands below to list and delete a watermark profiles.

<TableWrap>

<table>
  <thead>
  <tr>
   <th><strong>Command</strong>
   </th>
   <th><strong>Method</strong>
   </th>
   <th><strong>Endpoint</strong>
   </th>
  </tr>
  </thead>
  <tbody>
  <tr>
   <td><a href="https://api.cloudflare.com/#stream-watermark-profile-list-watermark-profiles">List watermark profiles</a>
   </td>
   <td><Code>GET</Code>
   </td>
   <td><Code>accounts/:account_identifier/stream/watermarks</Code>
   </td>
  </tr>
  <tr>
   <td><a href="https://api.cloudflare.com/#stream-watermark-profile-delete-watermark-profile">Delete watermark profiles</a>
   </td>
   <td><Code>DELETE</Code>
   </td>
   <td><Code>accounts/:account_identifier/stream/watermarks/:identifier</Code>
   </td>
  </tr>
  </tbody>
</table>

</TableWrap>

## Limitations

* After the watermark profile is created, you cannot change its parameters. If you need to edit your watermark profile, you must delete the profile and create a new one.
* After the watermark is applied to a video, you cannot change the watermark without re-uploading the video to apply a different profile.
* After the watermark is applied to a video, deleting the watermark profile will not remove the watermark from the video.
* The maximum file size is 2MiB (2097152 bytes), and only PNG files are supported.
