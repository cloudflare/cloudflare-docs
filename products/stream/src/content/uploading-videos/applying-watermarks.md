---
order: 5
---

# Applying watermarks

You can add watermarks to videos uploaded using the Stream API.

To add watermarks to your videos, first create a watermark profile. A watermark profile describes the image you would like to be used as a watermark and the position of that image. Once you have a watermark profile, you can use it as an option when uploading videos.


## Quick start

Watermark profile has many customizable options. However, the default parameters generally work for most cases. Please see "Profiles" below for more details.

### Step 1: Create a profile

```bash
curl -X POST -H 'Authorization: Bearer $TOKEN' \
-F file=@/Users/rchen/cloudflare.png \
https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/watermarks
```

### Step 2: Specify the profile UID at upload

```bash
tus-upload --chunk-size 5242880 \
--header Authentication 'Bearer $TOKEN' \
--metadata watermark $WATERMARKUID \
/Users/rchen/cat.mp4 https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream
```

### Step 3: Done
![Watermarked Video](./cat.png)

## Profiles

To create, list, delete, or get information about the profile, you will need your
[Cloudflare API token](https://www.cloudflare.com/a/account/my-account).

### Optional parameters

<Definitions>

  - `name` <Type>string</Type> <PropMeta>default: _empty string_</PropMeta>

    - A short description for the profile. For example, "marketing videos."

  - `opacity` <Type>float</Type> <PropMeta>default: 1.0</PropMeta>

    - Translucency of the watermark. 0.0 means completely transparent, and 1.0 means completely opaque. Note that if the watermark is already semi-transparent, setting this to 1.0 will not make it completely opaque.

  - `padding` <Type>float</Type> <PropMeta>default: 0.05</PropMeta>

    - Whitespace between the adjacent edges (determined by position) of the video and the watermark. 0.0 means no padding, and 1.0 means padded full video width or length.
    
    - Stream will make sure that the watermark will be at about the same position across videos with different dimensions.

  - `scale` <Type>float</Type> <PropMeta>default: 0.15 </PropMeta>

    - The size of the watermark relative to the overall size of the video. This parameter will adapt to horizontal and vertical videos automatically. 0.0 means no scaling (use the size of the watermark as-is), and 1.0 fills the entire video.

    - The algorithm will make sure that the watermark will look about the same size across videos with different dimensions.

  - `position` <Type>string (enum)</Type> <PropMeta>default: "upperRight"</PropMeta>

    - Location of the watermark. Valid positions are: `upperRight`, `upperLeft`, `lowerLeft`, `lowerRight`, and `center`.

      <Aside>

        Note that `center` will ignore the `padding` parameter.
  
      </Aside>
  
</Definitions>

## Creating a Watermark profile

### Use Case 1: Upload a local image file directly

To upload the image directly, please send a POST request using `multipart/form-data` as the content-type and specify the file under the `file` key. All other fields are optional.
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

### Use Case 2: Pass a URL to an image

To specify a URL for upload, please send a POST request using `application/json` as the content-type and specify the file location using the `url` key. All other fields are optional.
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

#### Example response to creating a watermark profile

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

## Using a watermark profile on a video

Once you created a watermark profile, you can now use the profile at upload time for watermarking videos.

### Simple uploads

Unfortunately, Stream does not currently support specifying watermark profile at upload time for Simple Uploads.

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

#### Example response to upload video with a link

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
The video uploaded with the generated unique one-time URL will be watermarked with the profile specified.

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

#### Example response to direct user uploads

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


## Get a watermark profile
To view a watermark profile that you created:

```bash
curl -H "Authorization: Bearer $TOKEN" \
https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/watermarks/$WATERMARKUID
```

### Example response to get a watermark profile

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

To list watermark profiles that you created:

```bash
curl -H "Authorization: Bearer $TOKEN" \
https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/watermarks/
```

### Example response to list watermark profiles

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

To delete a watermark profile that you created:

```bash
curl -X DELETE -H 'Authorization: Bearer $TOKEN' \
https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/watermarks/$WATERMARKUID
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

## Limitations

* Once the watermark profile is created, you cannot change its parameters. If you need to edit your watermark profile, please delete it and create a new one.
* Once the watermark is applied to a video, you cannot change the watermark without re-uploading the video to apply a different profile.
* Once the watermark is applied to a video, deleting the watermark profile will not also remove the watermark from the video.
* The maximum file size is 2MiB (2097152 bytes), and only PNG files are supported.
