---
order: 5
---

# Direct user uploads

Direct uploads allow users to upload videos without API keys. A common place to
use direct uploads is on web apps, client side applications, or on mobile devices
where users upload content directly to Stream.

## Generate a unique one-time upload URL

To enable users the ability to directly upload their videos, first generate and
provide them with a unique one-time upload URL with the following API request.

To make API requests you will need your [Cloudflare API key](https://www.cloudflare.com/a/account/my-account)
your email address and your Cloudflare [account ID](https://www.cloudflare.com/a/overview/).

### Upload constraints

There are several constraints you can enforce on your user's uploads through the
body of the `POST` request:

`maxDurationSeconds` is a required integer field that enforces the maximum
duration in seconds for a video the user uploads.  For direct uploads, Stream
requires videos are at least 1 second in length, and restricts to a maximum of 6
hours.  Therefore, this field must be greater than 1 and less than 21,600.

`expiry` is an optional string field that enforces the time after which
the unique one-time upload URL is invalid.  The time value must be formatted
in RFC3339 layout and will be interpretted against UTC time zone.  If an expiry
is set, it must be no less than two minutes in the future, and not more than 6
hours in the future.  If an expiry is not set, the upload URL will expire 30
minutes after it's creation.

Additionally, you can limit where the video can be embedded through these fields:

`requireSignedURLs` is an optional boolean field that limits the permission to
view the video.  This field must be a boolean value.  To learn more about signed
URLs, please visit our [documentation](/stream/security/signed-urls/).

`allowedOrigins` is an optional array of strings field that limits the domains a
video can be embedded on.  To learn more about allowed domains, please visit our
[security considerations](/stream/security/security-considerations/).

`thumbnailTimestampPct` is an optional number field that sets the timestamp
location of thumbnail image. To learn more about timestamp,
please visit our [documentation](/stream/thumbnails/).

`watermark` is an optional field that contains the `uid` of watermark profile.
Video uploaded by the link will be watermarked automatically. To learn more about
watermark profile, please visit our [documentation](/stream/watermarks/).

`meta` is an optional field that allows you to set the video's `name` along with
any other additional arbitrary keys for metadata to be stored.

### Example request

```bash
curl -X POST \
 -H 'X-Auth-Key:$APIKEY' \
 -H 'X-Auth-Email:$EMAIL' \
https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/direct_upload \
 --data '{
    "maxDurationSeconds": 3600,
    "expiry": "2020-04-06T02:20:00Z",
    "requireSignedURLs": true,
    "allowedOrigins": ["example.com"],
    "thumbnailTimestampPct": 0.568427,
    "watermark": {
        "uid": "{watermark_uid}"
    }
 }'
```

### Example responses

A successful response looks like:

```bash
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

An unsuccessful response might look like:

```bash
{
  "result": null,
  "success": false,
  "errors": [
    {
      "code": 10005,
      "message": "Bad Request"
    }
  ],
  "messages": [
    {
      "code": 10005,
      "message": "required field maxDurationSeconds is missing"
    }
  ]
}
```

The `uploadURL` provided in the `result` body of a successful request should be
passed along to the end-user to make their upload request.

The `uid` references the reserved media object's unique identifier and can be
kept as a reference to query our [API](/stream/getting-started/searching/).

## Direct Upload Request from end users

Using the `uploadURL` provided in the previous request, users can upload video
files.  Uploads are limited to 200 MB in size.

```bash
curl -X POST \
  -F file=@/Users/mickie/Downloads/example_video.mp4 \
  https://upload.videodelivery.net/f65014bc6ff5419ea86e7972a047ba22
```

A successful upload will receive a `200` response.  If the upload does not meet
the upload constraints defined at time of creation or is larger than 200 MB in
size, the user will receive a `4xx` response.

### Using the uploadURL from within a browser

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

## Tracking user upload progress

After the creation of a unique one-time upload URL, you may wish to retain the
`uid` returned in the response to track the progress of a user's upload.

You can do that two ways:

1. You can [query the media API](/stream/getting-started/searching/) with the UID
to understand it's status.

2. You can [create a webhook subscription](/stream/webhooks/) to receive notifications
regarding the status of videos.  These notifications include the video's UID.
