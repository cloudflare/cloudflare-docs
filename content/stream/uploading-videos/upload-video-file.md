---
pcx_content_type: how-to
title: Upload a video file
weight: 3
---

# Upload a video file

## Basic Uploads (for small videos)

For files smaller than 200MB you can use simple form based uploads. This is an easy way to upload but does not support resumable uploading.

Make an HTTP request with content-type header set to `multipart/form-data` and include the media as an input with the name set to `file`.

### cURL example

```bash
curl -X POST \
-H "Authorization: Bearer <API_TOKEN>" \
-F file=@/Users/kyle/Desktop/video.mp4 \
https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream
```

{{<Aside>}}

Note that cURL `-F` flag automatically configures the content-type header and maps `skiing.mp4` to a form input called `file`.

{{</Aside>}}

## Resumable uploads with tus (for large files)

### What is tus?

> tus is a protocol based on HTTP for resumable file uploads. Resumable means that an upload can be interrupted at any moment and can be resumed without re-uploading the previous data again. An interruption may happen willingly, if the user wants to pause, or by accident in case of an network issue or server outage.

[tus protocol](https://tus.io) is the recommended method for uploading large files to Cloudflare Stream from a computer. Popular programming languages have [tus client implementations](https://tus.io/implementations.html).

{{<Aside>}}

Important: Cloudflare Stream requires a minimum chunk size of 5,242,880 bytes when using TUS, unless the entire file is less than this amount.

We recommend increasing the chunk size to 52,428,800 bytes for better performance when the client connection is expected to be reliable.

Maximum chunk size can be 209,715,200 bytes.

{{</Aside>}}

{{<Aside>}}

Important: Cloudflare Stream requires a chunk size divisible by 256KiB (256x1024 bytes). Please round your desired chunk size to the nearest multiple of 256KiB.

The final chunk of an upload or uploads that fit within a single chunk are exempt from this requirement.

{{</Aside>}}

### Specifying upload options

The tus protocol allows you to add optional parameters [in the `Upload-Metadata` header](https://tus.io/protocols/resumable-upload.html#upload-metadata).

### Supported options in "Upload-Metadata"

Setting arbitrary metadata values in the `Upload-Metadata` header sets values the [meta key in Stream API](/api/operations/stream-videos-list-videos).

{{<definitions>}}

- `name`

  - Setting this key will set `meta.name` in the API and display the value as the name of the video in the dashboard.

- `requiresignedurls`

  - If this key is present, the video playback for this video will be required to use signed urls after upload.

- `scheduleddeletion`

  - Specifies a date and time when a video will be deleted. After a video is deleted, it is no longer viewable and no longer counts towards storage for billing. The specified date and time cannot be earlier than 30 days from the video's created timestamp.

- `allowedorigins`

  - An array of strings listing origins allowed to display the video. This will set the [allowed origins setting](/stream/viewing-videos/securing-your-stream/#security-considerations) for the video.

- `thumbnailtimestamppct`

  - Specify the default thumbnail [timestamp percentage](/stream/viewing-videos/displaying-thumbnails/). Note that percentage is a floating point value between 0.0 and 1.0.

- `watermark`

  - The watermark profile UID.

{{</definitions>}}

### Set creator property

Setting a creator value in the `Upload-Creator` header can be used to identify the creator of the video content, linking the way you identify your users or creators to videos in your Stream account.

For examples of how to set and modify the creator ID, refer to [Associate videos with creators](/stream/manage-video-library/creator-id/).

### Getting the video ID when using TUS

When an initial TUS request is made, Stream responds with a URL in the location header. While this URL may contain the video ID, it is not recommend to parse this URL to get the ID.

Instead, the `stream-media-id` HTTP header in the response should be used to retrieve the video ID.

For example, a request made to `https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream` with the TUS protocol, the response will contain a HTTP header like this:

    stream-media-id: cab807e0c477d01baq20f66c3d1dfc26cf

### Command-line example

You will also need to download a tus client. This tutorial will use the [tus Python client](https://github.com/tus/tus-py-client), available through pip, Python's package manager.

```sh
$ pip install -U tus.py
```

```sh
$ tus-upload --chunk-size 52428800 --header Authorization "Bearer <API_TOKEN>" <PATH_TO_VIDEO> https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream
```

In the beginning of the response from tus, you’ll see the endpoint for getting information about your newly uploaded video.

```bash
INFO Creating file endpoint
INFO Created: https://api.cloudflare.com/client/v4/accounts/d467d4f0fcbcd9791b613bc3a9599cdc/stream/dd5d531a12de0c724bd1275a3b2bc9c6
...
```

### Golang Example

To get started, import a [tus](https://tus.io) client. You can use the [go-tus](https://github.com/eventials/go-tus) by [eventials](https://github.com/eventials) to upload from your Go applications.

```go
package main

import (
	"net/http"
	"os"

	tus "github.com/eventials/go-tus"
)

func main() {
	accountID := "ACCOUNT ID"

	f, err := os.Open("videofile.mp4")

	if err != nil {
		panic(err)
	}

	defer f.Close()

	headers := make(http.Header)
	headers.Add("Authorization", "Bearer <API_TOKEN>")

	config := &tus.Config{
		ChunkSize:           50 * 1024 * 1024, // Required a minimum chunk size of 5MB, here we use 50MB.
		Resume:              false,
		OverridePatchMethod: false,
		Store:               nil,
		Header:              headers,
		HttpClient:          nil,
	}

	client, _ := tus.NewClient("https://api.cloudflare.com/client/v4/accounts/"+ accountID +"/stream", config)

	upload, _ := tus.NewUploadFromFile(f)

	uploader, _ := client.CreateUpload(upload)

	uploader.Upload()
}
```

You can also get the progress of the upload if you're running the upload in a goroutine.

```go
// returns the progress percentage.
upload.Progress()

// returns whether or not the upload is complete.
upload.Finished()
```

Please see [go-tus](https://github.com/eventials/go-tus) on GitHub for functionality such as resuming uploads and getting more details about the progress of the upload.

### Node.js Example

1. Install tus-js-client

```sh
$ npm install tus-js-client
```

1. Set up an index.js and configure:

- API endpoint with your Cloudflare Account ID
- Request headers to include a API token

```js
var fs = require('fs');
var tus = require('tus-js-client');

// specify location of file you'd like to upload below
var path = __dirname + '/test.mp4';
var file = fs.createReadStream(path);
var size = fs.statSync(path).size;
var mediaId = '';

var options = {
  endpoint: 'https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream',
  headers: {
    Authorization: 'Bearer <API_TOKEN>',
  },
  chunkSize: 50 * 1024 * 1024, // Required a minimum chunk size of 5MB, here we use 50MB.
  retryDelays: [0, 3000, 5000, 10000, 20000], // Indicates to tus-js-client the delays after which it will retry if the upload fails
  metadata: {
    filename: 'test.mp4',
    filetype: 'video/mp4',
    defaulttimestamppct: 0.5,
    watermark: '<WATERMARK_UID>',
  },
  uploadSize: size,
  onError: function (error) {
    throw error;
  },
  onProgress: function (bytesUploaded, bytesTotal) {
    var percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
    console.log(bytesUploaded, bytesTotal, percentage + '%');
  },
  onSuccess: function () {
    console.log('Upload finished');
  },
  onAfterResponse: function (req, res) {
    return new Promise(resolve => {
      var mediaIdHeader = res.getHeader('stream-media-id');
      if (mediaIdHeader) {
        mediaId = mediaIdHeader;
      }
      resolve();
    });
  },
};

var upload = new tus.Upload(file, options);
upload.start();
```
