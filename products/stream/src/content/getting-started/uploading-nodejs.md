# Uploading with Node.js

## What you will need

To make API requests you will need your [Cloudflare API key](https://www.cloudflare.com/a/account/my-account), your email address and your Cloudflare [account ID](https://www.cloudflare.com/a/overview/).

You will also need a [tus](https://tus.io) client. You can use the [tus-js-client](https://github.com/tus/tus-js-client) package to upload from your Node.js applications.

## Example

Install tus-js-client

```bash
npm install tus-js-client
```

Set up an index.js and configure:

* API endpoint with your Cloudflare Account ID
* Request headers to include your Cloudflare Email and API Key

```javascript
var fs = require("fs");
var tus = require("tus-js-client");

// specify location of file you'd like to upload below
var path = __dirname + "/test.mp4";
var file = fs.createReadStream(path);
var size = fs.statSync(path).size;

var options = {
  endpoint: "https://api.cloudflare.com/client/v4/accounts/{ACCOUNT ID}/stream",
  headers: {
    'X-Auth-Email': '$EMAIL',
    'X-Auth-Key': '$APIKEY',
  },
  chunkSize: 5 * 1024 * 1024, // Cloudflare Stream requires a minimum chunk size of 5MB.
  resume: true,
  metadata: {
    filename: "test.mp4",
    filetype: "video/mp4",
    defaulttimestamppct: 0.5,
    watermark: "$WATERMARKUID"
  },
  uploadSize: size,
  onError: function (error) {
    throw error;
  },
  onProgress: function (bytesUploaded, bytesTotal) {
    var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2);
    console.log(bytesUploaded, bytesTotal, percentage + "%");
  },
  onSuccess: function () {
    console.log("Upload finished:", upload.url);
    var index = upload.url.lastIndexOf("/") + 1;
    var mediaId = upload.url.substr(index)
    console.log("Media id:", mediaId);
  }
};

var upload = new tus.Upload(file, options);
upload.start();
```
