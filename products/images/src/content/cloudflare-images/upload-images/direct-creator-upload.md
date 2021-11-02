---
order: 2
pcx-content-type: reference
---

# Direct Creator Upload

The Direct Creator Upload feature in Cloudflare Images lets your users upload pictures with a one-time upload URL. By using Direct Creator Upload, you can accept uploads without exposing your API key or token to the client. It also eliminates the need for an intermediary storage bucket and the storage/egress costs associated with it.

To request a one-time upload URL, simply have your backend (or Worker script) call the `direct_upload` endpoint:

```bash
curl --request POST \
  --url https://api.cloudflare.com/client/v4/accounts/:account_id/images/v1/direct_upload \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer :token'
```

You will receive a response similar to this:

```json
{
  "result": {
    "id": "2cdc28f0-017a-49c4-9ed7-87056c839c2",
    "uploadURL": "https://upload.imagedelivery.net/2cdc28f0-017a-49c4-9ed7-87056c839c2"
  },
  "result_info": null,
  "success": true,
  "errors": [],
  "messages": []
}
```

Your backend endpoint should return the `uploadURL` property to the client enabling it to upload the image without needing to pass any authentication information with it. Here is a simple HTML page that takes a one-time upload URL and uploads any selected image:

```html
<html>
  <body>
    <form
      action="INSERT_UPLOAD_URL_HERE"
      method="post"
      enctype="multipart/form-data"
    >
      <input type="file" id="myFile" name="file" />
      <input type="submit" />
    </form>
  </body>
</html>
```

By default, the uploadURL will expire after 30 minutes if unused.

If you want to override this option, add the following argument to the cURL command:

```bash
  --data '{"expiry":"2021-09-14T16:00:00Z"}'
```

The expiry value must be a minimum of two minutes and maximum of six hours in the future.
