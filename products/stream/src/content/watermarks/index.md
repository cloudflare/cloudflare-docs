# Watermarks

You can add watermarks to videos uploaded using the Stream API.

To add watermarks to your videos, first create a Watermark Profile. A watermark profile describes the image you would like to be used as a watermark and the position. Once you have a watermark profile, add an additional property when uploading videos.

## A few things to note:

* Once the watermark profile is created, you cannot change its parameters. If you need to edit your watermark profile, please delete it and create a new one.
* Once the watermark is applied to a video, you cannot change the watermark without re-uploading the video to apply a different profile.
* Once the watermark is applied to a video, deleting the watermark profile will not also remove the watermark from the video.
* The maximum file size is 2MiB (2097152 bytes), and only PNG files are supported.

## Quick Start

Watermark profile has many customizable options. However, the default parameters generally work for most cases. Please see "Profiles" below for more details.

Step 1: Create a profile
```bash
curl -X POST -H "X-Auth-Key: {api-key}" -H "X-Auth-Email: {email}" \
-F file=@/Users/rchen/cloudflare.png \
https://api.cloudflare.com/client/v4/accounts/{account_id}/stream/watermarks
```
Step 2: Specify the profile UID at upload
```bash
tus-upload --chunk-size 5242880 \
--header X-Auth-Key {api-key} \
--header X-Auth-Email {email} \
--metadata watermark {watermark-uid} \
/Users/rchen/cat.mp4 https://api.cloudflare.com/client/v4/accounts/{account_id}/stream
```
Step 3: Done
![Watermarked Video](./cat.png)

## Profiles

To create, list, delete, or get information about the profile, you will need your
[Cloudflare API key](https://www.cloudflare.com/a/account/my-account)
and your email address.

### Optional Parameters

| Parameter | Type | Default | Explanation |
|-|-|-|-|
| name | string | _Empty String_ | A short description for the profile. For example, "marketing videos." |
| opacity | percentage | 1.0 | Translucency of the watermark. 0.0 means completely transparent, and 1.0 means completely opaque. Note that if the watermark is already semi-transparent, setting this to 1.0 will not make it completely opaque. |
| padding | percentage | 0.05 | Whitespace between the adjacent edges (determined by position) of the video and the watermark. 0.0 means no padding, and 1.0 means padded full video width or length, determined by the algorithm. <br/><br/>The algorithm will make sure that the watermark will be at about the same position across videos with different dimensions. |
| scale | percentage | 0.15 | The size of the watermark relative to the overall size of the video. This parameter will adapt to horizontal and vertical videos automatically. 0.0 means no scaling (use the size of the watermark as-is), and 1.0 fills the entire video.<br/><br/>The algorithm will make sure that the watermark will look about the same size across videos with different dimensions. |
| position | string | upperRight | Location of the watermark. Valid positions are: "upperRight", "upperLeft", "lowerLeft", "lowerRight", and "center." Note that "center" will ignore the "padding" parameter. |

## Creating a Watermark Profile

### Use Case 1: Upload a local image file directly

To upload the image directly, please send a POST request using `multipart/form-data` as the content-type and specify the file under the `file` key. All other fields are optional.
```bash
curl -X POST -H "X-Auth-Key: {api-key}" -H "X-Auth-Email: {email}" \
-F file=@{path-to-image-locally} \
-F name='marketing videos' \
-F opacity=1.0 \
-F padding=0.05 \
-F scale=0.15 \
-F position=upperRight \
https://api.cloudflare.com/client/v4/accounts/{account_id}/stream/watermarks
```

### Use Case 2: Pass a URL to an image

To specify a URL for upload, please send a POST request using `application/json` as the content-type and specify the file location using the `url` key. All other fields are optional.
```bash
curl -X POST -H "X-Auth-Key: {api-key}" -H "X-Auth-Email: {email}" \
-H 'Content-Type: application/json' \
-d '{
  "url": "{url-to-image}",
  "name": "marketing videos",
  "opacity": 1.0,
  "padding": 0.05,
  "scale": 0.15,
  "position": "upperRight"
}' \
https://api.cloudflare.com/client/v4/accounts/{account_id}/stream/watermarks
```

#### Example Response to Creating a Watermark Profile

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
`downloadedFrom` will be populated if the profile was created via downloading from URL.

## Using a Watermark Profile on a Video

Once you created a watermark profile, you can now use the profile at upload time for watermarking videos.

### Simple Uploads

Unfortunately, Stream does not currently support specifying watermark profile at upload time for Simple Uploads.

### Upload Video With a Link

```bash
curl -X POST -H "X-Auth-Key: {api-key}" -H "X-Auth-Email: {email}" \
-H 'Content-Type: application/json' \
-d '{
  "url": "{url-to-video}",
  "watermark": {
    "uid": "{watermark-uid}"
  }
}' \
https://api.cloudflare.com/client/v4/accounts/{account_id}/stream/copy
```

#### Example Response to Upload Video With a Link

```json
{
  "result": {
    "uid": "8d3a5b80e7437047a0fb2761e0f7a645",
    "thumbnail": "https://videodelivery.net/8d3a5b80e7437047a0fb2761e0f7a645/thumbnails/thumbnail.jpg",
    ...
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
    ...
}
```

### Upload Video With TUS
```bash
tus-upload --chunk-size 5242880 \
--header X-Auth-Key {api-key} \
--header X-Auth-Email {email} \
--metadata watermark {watermark-uid} \
{path-to-video} https://api.cloudflare.com/client/v4/accounts/{account_id}/stream
```

### Direct User Uploads
The video uploaded with the generated unique one-time URL will be watermarked with the profile specified.
```bash
curl -X POST -H "X-Auth-Key: {api-key}" -H "X-Auth-Email: {email}" \
-H 'Content-Type: application/json' \
-d '{
  "maxDurationSeconds": 3600,
  "watermark": {
    "uid": "{watermark-uid}"
  }
}' \
https://api.cloudflare.com/client/v4/accounts/{account_id}/stream/direct_upload
```
#### Example Response to Direct User Uploads
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
`watermark` will be `null` if no watermark was specified.


## Get a Watermark Profile
To view a watermark profile that you created:
```bash
curl -X GET -H "X-Auth-Key: {api-key}" -H "X-Auth-Email: {email}" \
https://api.cloudflare.com/client/v4/accounts/{account_id}/stream/watermarks/{watermark-uid}
```
#### Example Response to Get a Watermark Profile
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

## List Watermark Profiles
To list watermark profiles that you created:
```bash
curl -X GET -H "X-Auth-Key: {api-key}" -H "X-Auth-Email: {email}" \
https://api.cloudflare.com/client/v4/accounts/{account_id}/stream/watermarks/
```
#### Example Response to List Watermark Profiles
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

## Delete a Watermark Profiles

To delete a watermark profiles that you created:
```bash
curl -X DELETE -H "X-Auth-Key: {api-key}" -H "X-Auth-Email: {email}" \
https://api.cloudflare.com/client/v4/accounts/{account_id}/stream/watermarks/{watermark-uid}
```
If the operation was successful, it will return a success response:
```json
{
  "result": "",
  "success": true,
  "errors": [],
  "messages": []
}
```
