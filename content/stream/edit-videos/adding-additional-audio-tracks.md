---
pcx_content_type: how to
title: Add additional audio tracks
weight: 5
---

# Add Audio Tracks

Adding audio tracks to your video library.

## Add an audio track to a video

A video must be uploaded before additional audio tracks can be attached to it. In the following example URLs, the video’s UID is referenced as `VIDEO_UID`.

To add an audio track to a video a [Cloudflare API Token](https://www.cloudflare.com/a/account/my-account) is required.

The API will make a best effort to handle any mismatch between the duration of the uploaded audio file and the video duration, though we recommend uploading audio files that match the duration of the video. If the duration of the audio file is longer than the video, the additional audio track will be truncated to match the video duration. If the duration of the audio file is shorter than the video, silence will be appended at the end of the audio track to match the video duration.

### Upload via a link

If you have audio files stored in a cloud storage bucket, you can simply pass a HTTP link for the file. Stream will fetch the file and make it available for streaming.

`label` is required and must uniquely identify the track amongst other audio track labels for the specified video.

```bash
curl -X POST \
 -H 'Authorization: Bearer <API_TOKEN>' \
 -d '{"url": "https://www.examplestorage.com/audio_file.mp3", "label": "Example Audio Label"}' \
https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/<VIDEO_UID>/audio/copy
```

### Example Response to Add Additional Audio Tracks

```json
{
 "result": {
   "uid": "<AUDIO_UID>",
   "label": "Example Audio Label",
   "default": false
   "status": "queued"
 },
 "success": true,
 "errors": [],
 "messages": []
}
```

The `uid` uniquely identifies the audio track and can be used for editing or deleting the audio track. Please see instructions below on how to perform these operations.

The `default` field denotes whether the audio track will be played by default in a player. Additional audio tracks have a `false` default status, but can be edited following instructions below.

The `status` field will change to `ready` after the audio track is successfully uploaded and encoded. Should an error occur during this process, the status will denote `error`.

### Upload via HTTP

Make an HTTP request and include the audio file as an input with the name set to `file`.

Audio file uploads cannot exceed 200 MB in size. If your audio file is larger, please compress the file prior to upload. 

The form input `label` is required and must uniquely identify the track amongst other audio track labels for the specified video.

Note that cURL `-F` flag automatically configures the content-type header and maps `audio_file.mp3` to a form input called `file`.

```bash
curl -X POST \
 -H 'Authorization: Bearer <API_TOKEN>' \
 -F file=@/Desktop/audio_file.mp3 \
 -F label='Example Audio Label' \
https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/<VIDEO_UID>/audio
```

### Example Response to Add Additional Audio Tracks

```json
{
 "result": {
   "uid": "<AUDIO_UID>",
   "label": "Example Audio Label",
   "default": false
   "status": "queued"
 },
 "success": true,
 "errors": [],
 "messages": []
}
```

## List the additional audio tracks on a video

To view additional audio tracks added to a video:

```bash
curl \
 -H 'Authorization: Bearer <API_TOKEN>' \
https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/<VIDEO_UID>/audio
```

### Example response to get the audio tracks associated with a video

```json
{
  "result": {
    "audio": [
      {
        "uid": "<AUDIO_UID>",
        "label": "Example Audio Label",
        "default": false,
        "status": "ready"
      },
      {
        "uid": "<AUDIO_UID>",
        "label": "Another Audio Label",
        "default": false,
        "status": "ready"
      }
    ]
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

Note this API will not return information for audio attached to the video upload.

## Edit an additional audio track

To edit the `default` status or `label` of an additional audio track:

```bash
curl -X PATCH \
 -H 'Authorization: Bearer <API_TOKEN>' \
 -d '{"label": "Edited Audio Label", "default": true}' \
https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/<VIDEO_UID>/audio/<AUDIO_UID>
```

Editing the `default` status of an audio track to `true` will mark all other audio tracks on the video `default` status to `false`.

### Example response to edit the audio tracks associated with a video

```json
{
  "result": {
    "uid": "<AUDIO_UID>",
    "label": "Edited Audio Label",
    "default": true
    "status": "ready"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

## Delete an additional audio track

To remove an additional audio track associated with your video:

```bash
curl -X DELETE \
 -H 'Authorization: Bearer <API_TOKEN>' \
https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/<VIDEO_UID>/audio/<AUDIO_UID>
```

Deleting a `default` audio track is not allowed.  You must assign another audio track as `default` prior to deletion.

If there is an entry in `errors` response field, the audio track has not been
deleted.

### Example response to delete an audio track

```json
{
  "result": "ok",
  "success": true,
  "errors": [],
  "messages": []
}
```