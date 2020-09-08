# Simple uploads

## Uploading without tus protocol

For most users, [tus protocol](https://tus.io) is the recommended method for uploading content to Cloudflare Stream. You can follow our guides to upload through [the dashboard](/stream/getting-started/uploading-cloudflare-dashboard), with [Golang](/stream/getting-started/uploading-golang), or with the [command line](/stream/getting-started/uploading-command-line). Most popular programming languages have tus client [implementations](https://tus.io/implementations.html).

> tus is a protocol based on HTTP for resumable file uploads. Resumable means that an upload can be interrupted at any moment and can be resumed without re-uploading the previous data again. An interruption may happen willingly, if the user wants to pause, or by accident in case of an network issue or server outage.

For files smaller than 200MB you can use simple form based uploads. This is an easier way to upload but does not support resumable downloads like tus.

## What You Will Need

To make API requests you will need your [Cloudflare API key](https://www.cloudflare.com/a/account/my-account), your email address and your Cloudflare [account ID](https://www.cloudflare.com/a/overview/).

To upload without tus, make an HTTP request with content-type header set to `multipart/form-data` and include the media as an input with the name set to `file`.

## cURL example

```bash
curl -X POST \
  -H "X-Auth-Key: {api-key}" \
  -H "X-Auth-Email: {email}" \
  -F file=@/Users/kyle/Desktop/skiing.mp4 \
  https://api.cloudflare.com/client/v4/accounts/{account_id}/stream
```

Note that `-F` flag automatically configures the content-type header and maps `skiing.mp4` to a form input called `file`.

## HTML form example with Golang server

A common use case for Stream is building a drag and drop or a form based file upload UI.

You can use a very simple form like this to accept uploads:

### HTML form

```html
<form action="http://localhost:8080/upload" method="post" enctype="multipart/form-data">
   File: <input type="file" name="file"><br />
   <input type="submit" value="Submit">
</form>
```

### HTML example

![Upload form](./stream/form-example.png)

### Go server

In addition to a form, you'll need a service that accepts the upload and proxies it to the Cloudflare Stream API.

The following snippet sets up a web server in Go that does this:

```go
package main

import (
	"flag"
	"fmt"
	"io"
	"log"
	"net/http"
)

var (
	authKey   = flag.String("k", "<default cloudflare api key>", "cloudflare api key")
	authEmail = flag.String("e", "<default cloudflare email>", "cloudflare email")
	accountID = flag.String("a", "<default cloudflare account id>", "cloudflare account id")
)

func main() {
	flag.Parse()

	http.HandleFunc("/upload", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "invalid method, requires post", http.StatusBadRequest)
			return
		}

		// proxy request to Cloudflare api
		url := fmt.Sprintf("https://api.cloudflare.com/client/v4/accounts/%s/stream", *accountID)
		req, err := http.NewRequest(http.MethodPost, url, r.Body)
		if err != nil {
			log.Printf("request error: %v\n", err)
			http.Error(w, "request generating error", http.StatusInternalServerError)
			return
		}

		// configure headers
		req.Header.Set("X-Auth-Key", *authKey)
		req.Header.Set("X-Auth-Email", *authEmail)
		req.Header.Set("Content-Type", r.Header.Get("Content-Type"))

		resp, err := http.DefaultClient.Do(req)
		if err != nil {
			log.Printf("upload error: %v\n", err)
			http.Error(w, "could not upload", http.StatusInternalServerError)
			return
		}

		// copy headers to client
		for name, values := range resp.Header {
			w.Header()[name] = values
		}

		// copy response to client
		io.Copy(w, resp.Body)
		defer resp.Body.Close()
	})

	// listen on localhost:8080
	log.Fatal(http.ListenAndServe(":8080", nil))
}
```

Save this to a file such as `main.go` and run the server with your Cloudflare credentials:

```bash
go run main.go -k <API KEY> -e <EMAIL> -a <ACCOUNT ID>
```
