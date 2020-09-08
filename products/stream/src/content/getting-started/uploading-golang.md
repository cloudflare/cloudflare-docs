# Uploading with Golang

## What You Will Need

To make API requests you will need your [Cloudflare API key](https://www.cloudflare.com/a/account/my-account), your email address and your Cloudflare [account ID](https://www.cloudflare.com/a/overview/).

You will also need to import a [tus](https://tus.io) client. You can use the [go-tus](https://github.com/eventials/go-tus) by eventials to upload from your Go applications.

## Example

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
	headers.Add("X-Auth-Email", "{EMAIL}")
	headers.Add("X-Auth-Key", "{API KEY}")

	config := &tus.Config{
		ChunkSize:           5 * 1024 * 1024, // Cloudflare Stream requires a minimum chunk size of 5MB.
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

Please see [go-tus](https://github.com/eventials/go-tus) on Github for functionality such as resuming uploads and getting more details about the progress of the upload.
