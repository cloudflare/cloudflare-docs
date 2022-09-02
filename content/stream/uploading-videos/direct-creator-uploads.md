---
pcx_content_type: tutorial
title: Direct creator uploads
weight: 4
---

# Direct creator uploads

Direct creator uploads let your end users to upload videos directly to Cloudflare Stream, without exposing your API token to clients.

**Two options:**

1. For videos under 200MB, [generate URLs that accept simple HTTP POST requests](/stream/uploading-videos/direct-creator-uploads#basic-upload-flow-for-small-videos).
2. For videos over 200MB, or if you need to allow users to resume uploads that may be interrupted by poor network connections or users closing apps while videos are still uploading, [generate URLs that use the TUS protocol](/stream/uploading-videos/direct-creator-uploads#tus).

### Example Apps

- [Direct Creator Uploads (using simple POST requests)](https://workers.new/stream/upload/direct-creator-uploads)
- [Direct Creator Uploads (using TUS for resumable, multi-part uploads)](https://workers.new/stream/upload/direct-creator-uploads-tus)

## Basic upload flow, for small videos

Use this if your users upload videos under 200MB, and you do not need to allow resumable uploads.

### Step 1: Generate a unique one-time upload URL

```bash
---
header: Request
---
curl -X POST \
 -H 'Authorization: Bearer <API_TOKEN>' \
https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/direct_upload \
 --data '{
    "maxDurationSeconds": 3600,
    "expiry": "2020-04-06T02:20:00Z"
 }'
```

<!-- videodelivery.net is correct domain. See STREAM-4364 -->
```bash
---
header: Response
---
{
  "result": {
    "uploadURL": "https://upload.videodelivery.net/f65014bc6ff5419ea86e7972a047ba22",
    "uid": "f65014bc6ff5419ea86e7972a047ba22"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

<!-- TODO: Make sure these are up-to-date, look at old content from this page -->
[API Reference Docs for `/direct_upload`](https://api.cloudflare.com/#stream-videos-upload-videos-via-direct-upload-urls)

## Step 2: Use the upload URL in your app 

Using the `uploadURL` provided in the previous request, users can upload video
files. Uploads are limited to 200 MB in size.

<!-- videodelivery.net is correct domain. See STREAM-4364 -->
```bash
---
header: Upload a video file to the unique one-time upload URL
---
curl -X POST \
  -F file=@/Users/mickie/Downloads/example_video.mp4 \
  https://upload.videodelivery.net/f65014bc6ff5419ea86e7972a047ba22
```

A successful upload will receive a `200` HTTP status code response. If the upload does not meet
the upload constraints defined at time of creation or is larger than 200 MB in
size, you will receive a `4xx` HTTP status code response.

## Advanced upload flow using TUS, for large videos

[tus](https://tus.io/) is a protocol that supports resumable uploads. Use TUS if your users upload videos over 200MB **or** you need to allow resumable uploads. If your users upload via a mobile app or often use your app or website using a mobile network (ex: LTE, 5G), we strongly encourage you to use TUS.

### Step 1: Create your own API endpoint that returns an upload URL

[Run and edit this code in your browser using Stackblitz](https://workers.new/stream/upload/direct-creator-uploads-tus)

<!-- TODO: The direct_user query param is not in our API docs -->
```javascript
---
header: Example API endpoint that requests a TUS upload URL, and returns it in the location header
---
export async function onRequest(context) {
	const { request, env } = context;
	const { CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN } = env;
	const endpoint = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/stream?direct_user=true`;

	const response = await fetch(endpoint, {
		method: 'POST',
		headers: {
			'Authorization': `bearer ${CLOUDFLARE_API_TOKEN}`,
			'Tus-Resumable': '1.0.0',
			'Upload-Length': request.headers.get('Upload-Length'),
			'Upload-Metadata': request.headers.get('Upload-Metadata'),
		},
	});

	const destination = response.headers.get('Location');

	return new Response(null, {
		headers: {
			'Access-Control-Expose-Headers': 'Location',
			'Access-Control-Allow-Headers': '*',
			'Access-Control-Allow-Origin': '*',
			'Location': destination,
		},
	});
}
```

Note in the example above that the one-time upload URL is returned in the `Location` header of the response, not in the response body.

### Step 2: Use this API endpoint with your TUS client

[Run and edit this code in your browser using Stackblitz](https://workers.new/stream/upload/direct-creator-uploads-tus)

```
---
header: Upload a video, using your API endpoint with a TUS client
---
<!-- TODO: Super minimal TUS example, maybe use node client? -->
```

For more details on using a tus and example client code, refer to [Resumable uploads with tus](/stream/uploading-videos/upload-video-file/#resumable-uploads-with-tus-for-large-files).

### Upload-Metadata header syntax

You can apply the same constraints as Direct Creator Upload via basic upload when using tus. To do so, you must pass the expiry and maxDurationSeconds as part of the `Upload-Metadata` request header as part of the first request (made by the Worker in the example above.) The `Upload-Metadata` values are ignored from subsequent requests that do the actual file upload.

Upload-Metadata header should contain key-value pairs. The keys are text and the values should be base64. Separate the key and values by a space, _not_ an equal sign. To join multiple key-value pairs, include a comma with no additional spaces.

In the example below, the `Upload-Metadata` header is instructing Stream to only accept uploads with max video duration of 10 minutes and to make this video private:

`'Upload-Metadata: maxDurationSeconds NjAw,requiresignedurls'`

_NjAw_ is the base64 encoded value for "600" (or 10 minutes).

## Tracking user upload progress

After the creation of a unique one-time upload URL, you may wish to retain the
`uid` returned in the response to track the progress of a user's upload.

You can do that two ways:

1.  You can [query the media API](/stream/manage-video-library/searching/) with the UID
    to understand it's status.

2.  You can [create a webhook subscription](/stream/manage-video-library/using-webhooks/) to receive notifications
    regarding the status of videos. These notifications include the video's UID.



### Billing considerations

- Pending uploads count towards your storage limit.