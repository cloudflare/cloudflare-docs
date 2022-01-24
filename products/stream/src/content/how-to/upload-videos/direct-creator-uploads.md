---
order: 3
pcx-content-type: tutorial
---

# Direct creator uploads

Direct creator uploads allow users to upload videos without API tokens. A common place to use Direct creator uploads is on web apps, client side applications, or on mobile apps where users upload content directly to Stream.

Limits apply to Direct Creator Uploads at the time of upload URL creation. Uploads over these limits will receive a `429` (Too Many Requests) or `413` (Payload too large) HTTP status code with more information in the response body. Contact support or your customer success manager for higher limits.

## Generate one-time upload URL

To give users the ability to directly upload their videos, first generate and provide them with a unique one-time upload URL with the following API request. To make API requests you will need your Cloudflare API token and your Cloudflare account ID. 

There are several constraints you can enforce on your user's uploads through the
body of the `POST` request. Refer to the [Create a video and get authenticated direct upload URL endpoint](https://api.cloudflare.com/#stream-videos-create-a-video-and-get-authenticated-direct-upload-url) for a list of required and optional parameters that you can use to control security features.

## Basic Uploads

If the uploads from your creators are under 200 MB, you can use basic uploads. For videos over 200 MB, use [tus](#tus).

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
   <td><a href="https://api.cloudflare.com/#stream-videos-create-a-video-and-get-authenticated-direct-upload-url">Get authenticated direct upload URL</a>
   </td>
   <td><Code>POST</Code>
   </td>
   <td><Code>accounts/:account_identifier/stream/direct_upload</Code>
   </td>
  </tr>
  </tbody>
</table>

</TableWrap>


The `uploadURL` provided in the `result` body of a successful request should be passed along to the end user to make their upload request.

The `uid` references the reserved media object's unique identifier and can be kept as a reference to query our [API](/how-to/search-for-videos/).

## Request from end users

Using the `uploadURL` provided in the previous request, users can upload video files limited to 200 MB in size.

```bash
curl -X POST \
  -F file=@/Users/mickie/Downloads/example_video.mp4 \
  https://upload.videodelivery.net/f65014bc6ff5419ea86e7972a047ba22
```

A successful upload will receive a `200` response. If the upload does not meet the upload constraints defined at time of creation or is larger than 200 MB in size, the user will receive a `4xx` response.

```html
<!DOCTYPE html>
<html lang="en">
  <head></head>
  <body>
    <form id="form">
      <input type="file" accept="video/*" id="video" />
      <button type="submit">
        Upload Video
      </button>
    </form>
    <script>
      async function getOneTimeUploadUrl() {
        // The real implementation of this function should make an API call to your server
        // where a unique one-time upload URL should be generated and returned to the browser.
        // Here we will use a fake one that looks real but won't actually work.
        return "https://upload.videodelivery.net/f65014bc6ff5419ea86e7972a047ba22";
      }

      const form = document.getElementById("form");
      const videoInput = document.getElementById("video");

      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const oneTimeUploadUrl = await getOneTimeUploadUrl();
        const video = videoInput.files[0];
        const formData = new FormData();
        formData.append("file", video);
        const uploadResult = await fetch(oneTimeUploadUrl, {
          method: "POST",
          body: formData,
        });
        form.innerHTML = "<h3>Upload successful!</h3>"
      });
    </script>
  </body>
</html>
```

## tus

tus is a protocol that supports resumable uploads and is recommended for videos over 200 MB.

Typically, tus uploads require the authentication information to be sent with every request, which is not ideal for direct creators uploads because it exposes your API key (or token) to the end user.

To get around this, you can request a one-time tokenized URL by making a POST request to the `/stream?direct_user=true` endpoint.

```
curl -H "Authorization: bearer $TOKEN" -X POST -H 'Tus-Resumable: 1.0.0' -H 'Upload-Length: $VIDEO_LENGTH' 'https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream?direct_user=true'
```

The response will contain a `Location` header which provides the one-time URL that can be use to upload the video with tus.

Below is a demo Cloudflare Worker script which returns the one-time upload URL.

```js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {
  const response = await fetch("https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream?direct_user=true", {
    method: 'POST',
    headers: {
      'Authorization': 'bearer $TOKEN',
      'Tus-Resumable': '1.0.0',
      'Upload-Length': request.headers.get('Upload-Length'),
      'Upload-Metadata': request.headers.get('Upload-Metadata')
    },
  })

  const destination = response.headers.get('Location')

  return new Response(null, {
    headers: {
      'Access-Control-Expose-Headers': 'Location',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin':'*',
      'Location': destination
    }
  })
}
```

After you have an endpoint that returns the tokenized upload URL from the `location` header, you can use it by setting the tus client to make a request to your endpoint. For details on using a tus client, refer to the [Resumable uploads with tus ](/how-to/upload-videos/upload-video-file#resumable-uploads-with-tus-for-large-files).

### Test the endpoint

After building your endpoint which calls Stream and returns the tokenized URL in the `location` header, you can test it with the [tus codepen demo](https://codepen.io/cfzf/pen/wvGMRXe). In the codepen demo, paste your endpoint URL in the **Upload endpoint** field and then try to upload a video. 

When using Direct Creator Uploads, the **Upload endpoint** field in the demo should contain the URL to your endpoint, not to the `videodelivery.net` tokenized URL, which is the most common reason Direct Creator Uploads fail using tus. Users often set the tus url to the `videodelivery.net` URL instead of to their endpoint which *returns* the `videodelivery.net` URL. 

<Aside>

If you are developing on localhost, your test using the codepen may fail. Before testing, push your endpoint to a server with an IP or domain so you are not using localhost. Alternatively, you can setup a Worker with the example code provided above.

</Aside type="note">

### Upload-Metadata header syntax

You can apply the same constraints as Direct Creator Upload via basic upload when using tus. To do so, you must pass the `expiry` and `maxDurationSeconds` as part of the `Upload-Metadata` request header in the first request (made by the Worker in the example above.) The `Upload-Metadata` values are ignored from subsequent requests that do the actual file upload.

The `Upload-Metadata` header should contain key-value pairs. The keys are text and the values should be base64. Separate the key and values by a space, not an equal sign. To join multiple key-value pairs, include a comma with no additional spaces.

In the example below, the `Upload-Metadata` header is instructing Stream to only accept uploads with maximum video duration of 10 minutes, and to make this video private.

```'Upload-Metadata: maxDurationSeconds NjAw,requiresignedurls'```

`NjAw` is the base64 encoded value for "600" (or 10 minutes).

## Track user upload progress

After the creation of a unique one-time upload URL, you can retain the `uid` returned in the response to track the progress of a user's upload in one of two ways:

- [Query the media API](/how-to/search-for-videos/) with the UID to understand its status.
- [Create a webhook subscription](/how-to/use-webhooks/) to receive notifications
regarding the status of videos.  These notifications include the video's UID.
