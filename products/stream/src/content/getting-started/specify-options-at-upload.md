# Specifying Options at Upload

Instead of changing the settings (such as `requireSignedURLs`) after the videos have been uploaded, you can specify these options at upload time.

## Simple Uploads

Unfortunately, Stream does not currently support specifying options at upload time for Simple Uploads.

## TUS Uploads

The tus protocol allows you to add optional parameters [in the `Upload-Metadata` header](https://tus.io/protocols/resumable-upload.html#upload-metadata).

### Supported options in "Upload-Metadata"

| Key | Value |
|-------|-------|
| requiresignedurls | None. If this key is present, it is interpreted as "true." Otherwise, it is interpreted as "false." |
| allowedorigins | A comma separated strings containing the domains. See ["Security Considerations"](/stream/security/security-considerations) |
| thumbnailtimestamppct | Specify the default thumbnail timestamp percentage. See ["Changing The Default Timestamp For Still Thumbnail"](/stream/thumbnails) |
| watermark | The watermark profile UID. See ["Watermarks"](/stream/watermarks) |

Note that percentage is a floating point value between 0.0 and 1.0.

For example, if you are using the `tus-upload` utility, the command will look like this:

```bash
tus-upload --chunk-size 5242880 \
--header X-Auth-Key $APIKEY \
--header X-Auth-Email $EMAIL \
--metadata thumbnailtimestamppct 0.4221 \
--metadata requiresignedurls "" \
--metadata allowedorigins google.com,twitter.com \
--metadata watermark $WATERMARKUID \
$PATH_TO_VIDEO https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream
```

## Uploads using a link

Please refer to the [API Documentation for "Upload a video from a URL"](https://api.cloudflare.com/#stream-videos-upload-a-video-from-a-url)

## Uploads using generated one-time URL

When you are generating an authenticated URL for one-time URL, you can include these options in the request. Please refer to the [API Documentation for "Create a video and get authenticated direct upload URL"](https://api.cloudflare.com/#stream-videos-create-a-video-and-get-authenticated-direct-upload-url)
