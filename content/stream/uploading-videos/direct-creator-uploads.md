---
pcx_content_type: tutorial
title: Direct creator uploads
weight: 4
---

# Direct creator uploads

Direct creator uploads let your end users to upload videos directly to Cloudflare Stream, without exposing your API token to clients.

**Two options:**

1. For videos under 200MB, [generate URLs that accept an HTTP POST request](/stream/uploading-videos/direct-creator-uploads#basic-upload-flow-for-small-videos).
2. For videos over 200 MB, or if you need to allow users to resume uploads that may be interrupted by poor network connections or users closing your app while videos are still uploading, [generate URLs that use the tus protocol](/stream/uploading-videos/direct-creator-uploads#advanced-upload-flow-using-tus-for-large-videos).

## Basic upload flow, for small videos

Use this if your users upload videos under 200MB, and you do not need to allow resumable uploads.

### Step 1: Generate a unique one-time upload URL

[API Reference Docs for `/direct_upload`](/api/operations/stream-videos-upload-videos-via-direct-upload-ur-ls)


```bash
---
header: Request
---
curl -X POST \
 -H 'Authorization: Bearer <API_TOKEN>' \
https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/direct_upload \
 --data '{
    "maxDurationSeconds": 3600
 }'
```

<!-- videodelivery.net is correct domain. See STREAM-4364 -->
```json
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

## Advanced upload flow using tus, for large videos

[tus](https://tus.io/) is a protocol that supports resumable uploads. Use TUS if your users upload videos over 200MB **or** you need to allow resumable uploads. If your users upload via a mobile app or often use your app or website using a mobile network (ex: LTE, 5G), we strongly encourage you to use TUS.

### Step 1: Create your own API endpoint that returns an upload URL

```javascript
---
header: Example API endpoint that requests a one-time tus upload URL from Cloudflare Stream, and returns it in the location header
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

### Step 2: Use this API endpoint with your tus client

Use this API endpoint **directly** in your tus client. A common mistake is to extract the upload URL from your new API endpoint, and use this directly. See below for a complete example of how to use the API from Step 1 with the uppy tus client.


```html
---
header: Upload a video, using your API endpoint using the uppy tus client
---
<html>
	<head>
		<link href="https://releases.transloadit.com/uppy/v3.0.1/uppy.min.css" rel="stylesheet" />
	</head>
	<body>
		<div id="drag-drop-area" style="height: 300px"></div>
		<div class="for-ProgressBar"></div>
		<button class="upload-button" style="font-size: 30px; margin: 20px">Upload</button>
		<div class="uploaded-files" style="margin-top: 50px">
			<ol></ol>
		</div>
		<script type="module">
			import {
				Uppy,
				Tus,
				DragDrop,
				ProgressBar,
			} from 'https://releases.transloadit.com/uppy/v3.0.1/uppy.min.mjs';

			const uppy = new Uppy({ debug: true, autoProceed: true });

			const onUploadSuccess = el => (file, response) => {
				const li = document.createElement('li');
				const a = document.createElement('a');
				a.href = response.uploadURL;
				a.target = '_blank';
				a.appendChild(document.createTextNode(file.name));
				li.appendChild(a);

				document.querySelector(el).appendChild(li);
			};

			uppy
				.use(DragDrop, { target: '#drag-drop-area' })
				.use(Tus, { endpoint: '/api/get-upload-url', chunkSize: 150 * 1024 * 1024 })
				.use(ProgressBar, { target: '.for-ProgressBar', hideAfterFinish: false })
				.on('upload-success', onUploadSuccess('.uploaded-files ol'));

			const uploadBtn = document.querySelector('button.upload-button');
			uploadBtn.addEventListener('click', () => uppy.upload());
		</script>
	</body>
</html>
```

For more details on using tus and example client code, refer to [Resumable uploads with tus](/stream/uploading-videos/upload-video-file/#resumable-uploads-with-tus-for-large-files).

### Upload-Metadata header syntax

You can apply the [same constraints](/api/operations/stream-videos-upload-videos-via-direct-upload-ur-ls) as Direct Creator Upload via basic upload when using tus. To do so, you must pass the `expiry` and `maxDurationSeconds` as part of the `Upload-Metadata` request header as part of the first request (made by the Worker in the example above.) The `Upload-Metadata` values are ignored from subsequent requests that do the actual file upload.

Upload-Metadata header should contain key-value pairs. The keys are text and the values should be base64. Separate the key and values by a space, _not_ an equal sign. To join multiple key-value pairs, include a comma with no additional spaces.

In the example below, the `Upload-Metadata` header is instructing Stream to only accept uploads with max video duration of 10 minutes, uploaded prior to the expiry timestamp, and to make this video private:

`'Upload-Metadata: maxDurationSeconds NjAw,requiresignedurls,expiry MjAyNC0wMi0yN1QwNzoyMDo1MFo='`

`NjAw` is the base64 encoded value for "600" (or 10 minutes).
`MjAyNC0wMi0yN1QwNzoyMDo1MFo=` is the base64 encoded value for "2024-02-27T07:20:50Z" (an RFC3339 format timestamp)

## Tracking user upload progress

After the creation of a unique one-time upload URL, you may wish to retain the unique identifier (`uid`) returned in the response to track the progress of a user's upload.

You can do that two ways:

1.  You can [search for a video](/stream/manage-video-library/searching/) with the UID
    to understand it's status.

2.  You can [create a webhook subscription](/stream/manage-video-library/using-webhooks/) to receive notifications
    regarding the status of videos. These notifications include the video's UID.


### Billing considerations

- One-time upload URLs count towards your storage limit, even if your users have not yet uploaded video to this URL. For example, if you generate a one-time upload URL with a `maxDurationSeconds` value of `60`, that expires 30 minutes from now (the default value of `expiry`), until the upload URL expires, this will count as one minute of video stored. This ensures that you do not inadvertently generate upload URLs that fail for your users once you've reached your storage limit. You can add storage to your subscription anytime via the Cloudflare Dashboard, and customize the `expiry` to a duration of your choosing. We recommend setting a short duration and generating this URL on-demand, at the moment when the user needs to upload a video.
