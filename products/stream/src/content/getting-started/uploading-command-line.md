# Uploading with command line

## What You Will Need

To make API requests you will need your [Cloudflare API key](https://www.cloudflare.com/a/account/my-account), your email address and your Cloudflare [account ID](https://www.cloudflare.com/a/overview/).

You will also need to download a tus client. Tus is an open source protocol that Cloudflare uses to upload large files.
This tutorial will use the [tus python client](https://github.com/tus/tus-py-client), available through pip, pythons's package manager.

```bash
pip install -U tus.py
```

## Uploading your video

The X-Auth-Key and X-Auth-Email you see below are your Cloudflare API key and Cloudflare email. You can  find your API key in your [Cloudflare account settings.](https://www.cloudflare.com/a/account/my-account)

The account ID corresponds to the Cloudflare account you’d like to upload your video to. You can find the acccount ID for any domain in the [overview tab of the Cloudflare dashboard.](https://www.cloudflare.com/a/overview/)

```bash
tus-upload --chunk-size 5242880 --header X-Auth-Key {api-key} --header X-Auth-Email {email} {path-to-video} https://api.cloudflare.com/client/v4/accounts/{account_id}/stream
```

In the beginning of the response from tus, you’ll see the endpoint for getting information about your newly uploaded video.

    INFO Creating file endpoint
    INFO Created: https://api.cloudflare.com/client/v4/accounts/d467d4f0fcbcd9791b613bc3a9599cdc/stream/dd5d531a12de0c724bd1275a3b2bc9c6
    ...

The file size limit for video upload is 5GB.

Alternatively, you may also upload videos with a link using a cURL `POST` command:

```bash
curl -X POST -d '{"url":"<video_url>","meta":{"name":"<video_name>"}}' -H "X-Auth-Key: <api-key>" -H "X-Auth-Email: {email}" https://api.cloudflare.com/client/v4/accounts/{account_id}/stream/copy
```

## Track the video as it gets encoded

Your next step is to check for when the video is done encoding. You will use the endpoint with the video id you received in the previous step.

```bash
curl 'https://api.cloudflare.com/client/v4/accounts/{account_id}/stream/{video-id}' \
    -H 'X-Auth-Email: {email}' \
    -H 'X-Auth-Key: {api-key}' \
    -H 'Content-Type: application/json'
```

In the response you will see some information about the video and whether it is encoded and ready to stream:

```json
{
  "result": {
    "uid": "dd5d531a12de0c724bd1275a3b2bc9c6",
    "thumbnail": "https://cloudflarestream.com/dd5d531a12de0c724bd1275a3b2bc9c6/thumbnails/thumb.png",
    "readyToStream": false,
    "status": {
      "state": "inprogress",
      "step": "encoding",
      "pctComplete": "78.18"
    },
    "meta": {},
    "labels": [],
    "created": "2018-01-01T01:00:00.474936Z",
    "modified": "2018-01-01T01:02:21.076571Z",
    "size": 62335189,
    "preview": "https://watch.cloudflarestream.com/dd5d531a12de0c724bd1275a3b2bc9c6"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

after some time:

```json
{
  "result": {
    "uid": "dd5d531a12de0c724bd1275a3b2bc9c6",
    "thumbnail": "https://cloudflarestream.com/dd5d531a12de0c724bd1275a3b2bc9c6/thumbnails/thumb.png",
    "readyToStream": true,
    "status": {
      "state": "ready"
    },
    "meta": {},
    "labels": [],
    "created": "2018-01-01T01:00:00.474936Z",
    "modified": "2018-01-01T01:02:21.076571Z",
    "size": 62335189,
    "preview": "https://watch.cloudflarestream.com/dd5d531a12de0c724bd1275a3b2bc9c6"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

## Get The Embed Code

Once readyToStream is true, you are now ready to embed your video. First get your embed code:

```bash
curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/stream/{video-id}/embed" \
    -H 'X-Auth-Email: {email}' \
    -H 'X-Auth-Key: {api-key}' \
    -H 'Content-Type: application/json'
```

```html
<stream src="dd5d531a12de0c724bd1275a3b2bc9c6" site="badtortilla.com"></stream><script data-cfasync="false" defer type="text/javascript" src="https://embed.cloudflarestream.com/embed/r4xu.fla9.latest.js?video=0337fcdb00cccdce2a2e83681e1c616c"></script>
```
