---
updated: 2023-03-27
difficulty: Intermediate
content_type: 📝 Tutorial
pcx_content_type: tutorial
title: Generate YouTube thumbnails with Workers and Cloudflare Image Resizing
layout: single
---

# Generate YouTube thumbnails with Workers and Cloudflare Image Resizing

{{<render file="_tutorials-before-you-start.md">}}

## Overview

In this tutorial, you will learn how to programmatically generate a custom YouTube thumbnail using Cloudlfare Workers and Cloudflare Image Resizing. You may want to generate a custom YouTube thumbnail to customize the thumbnail's design, call-to-actions and images used to encourage more viewers to watch your video.

This tutorial will help you understand how to work with [Images](/images/cloudflare-images/),[Image Resizing](/images/image-resizing/) and [Cloudflare Workers](/workers/).

## Prerequisites

To follow this tutorial, make sure you have Node, Cargo, and [Wrangler](/workers/wrangler/install-and-update/) installed on your machine.

## Learning goals

In this tutorial, you will learn how to:

- Upload Images to Cloudflare with the Cloudflare dashboard or API.
- Set up a Worker project with Wrangler.
- Manipulate images with Image Resizing in your Worker.

## Upload your image

To generate a custom thumbnail image, you first need to upload a background image to Cloudflare Images. This will serve as the image you use for transformations to generate the thumbnails.

Cloudflare Images allows you to store, resize, optimize and deliver images in a fast and secure manner. To get started, upload your images to the Cloudflare dashboard or use the Upload API.

### Upload with the dashboard

To upload an image using the Cloudflare dashboard:

1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com) and select your account.
2. Select **Images**.
3. Use **Quick Upload** to either drag and drop an image or click to browse and choose a file from your local files.
4. After the image is uploaded, view it using the generated URL.

### Upload with the API

To upload your image with the [Upload via URL](/images/cloudflare-images/upload-images/upload-via-url/) API, refer to the example below:

```sh
$ curl --request POST \
 --url https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/images/v1 \
 --header 'Authorization: Bearer <API_TOKEN>' \
 --form 'url=<PATH_TO_IMAGE>' \
 --form 'metadata={"key":"value"}' \
 --form 'requireSignedURLs=false'

```

- `ACCOUNT_ID`: The current user's account id which can be found in your account settings.
- `API_TOKEN`: Needs to be generated to scoping Images permission.
- `PATH_TO_IMAGE`: Indicates the URL for the image you want to upload.

You will then receive a response similar to this:

```json
{
"result": {
 "id": "2cdc28f0-017a-49c4-9ed7-87056c83901",
 "filename": "image.jpeg",
 "metadata": {
   "key": "value":
 },
 "uploaded": "2022-01-31T16:39:28.458Z",
 "requireSignedURLs": false,
 "variants": [
   "https://imagedelivery.net/Vi7wi5KSItxGFsWRG2Us6Q/2cdc28f0-017a-49c4-9ed7-87056c83901/public","https://imagedelivery.net/Vi7wi5KSItxGFsWRG2Us6Q/2cdc28f0-017a-49c4-9ed7-87056c83901/thumbnail"
 ]
},
"success": true,
"errors": [],
"messages": []

}
```

Now that you have uploaded your image, you will use it as the background image for your video's thumbnail.

## Create a Worker to transform text to image

After uploading your image, create a Worker that will enable you to transform text to image. This image can be used as an overlay on the background image you uploaded. Use the [rustwasm-worker-template](https://github.com/cloudflare/workers-sdk/tree/main/templates/worker-rust). 

Create a new Worker project called `worker-to-text` using the `worker-rust` template:

```sh
$ npx wrangler generate worker-to-text worker-rust
```

You will now make a few changes to the files in your project directory. 

1. In the `lib.rs` file, add the following code block:

```rs
---
filename: src/lib.rs
---
use worker::*;
mod utils;

#[event(fetch)]
pub async fn main(req: Request, env: Env, _ctx: worker::Context) -> Result<Response> {
   // Optionally, get more helpful error messages written to the console in the case of a panic.
   utils::set_panic_hook();

   let router = Router::new();
   router
       .get("/", |_, _| Response::ok("Hello from Workers!"))
       .run(req, env)
       .await
}
```

2. Update the `Cargo.toml` file in your `worker-to-text` project directory to use [text-to-png](https://github.com/RookAndPawn/text-to-png), a Rust package for rendering text to PNG. Add the package as a dependency by running:

```sh
$ cargo add text-to-png@0.2.0
```

3. Import the `text_to_png` library into your `worker-to-text` project's `lib.rs` file.


```rs
---
filename: lib.rs
highlight: [1]
---
use text_to_png::{TextPng, TextRenderer};
use worker::*;
mod utils;

#[event(fetch)]
pub async fn main(req: Request, env: Env, _ctx: worker::Context) -> Result<Response> {
   // Optionally, get more helpful error messages written to the console in the case of a panic.
   utils::set_panic_hook();

   let router = Router::new();
   router
       .get("/", |_, _| Response::ok("Hello from Workers!"))
       .run(req, env)
       .await
}
```

4. Update `lib.rs` to create a `handle-slash` function that will activate the image transformation based on the text passed to the URL as a query parameter.

```rs
---
filename: lib.rs
highlight: [17]
---
use text_to_png::{TextPng, TextRenderer};
use worker::*;
mod utils;

#[event(fetch)]
pub async fn main(req: Request, env: Env, _ctx: worker::Context) -> Result<Response> {
   // Optionally, get more helpful error messages written to the console in the case of a panic.
   utils::set_panic_hook();

   let router = Router::new();
   router
       .get("/", |_, _| Response::ok("Hello from Workers!"))
       .run(req, env)
       .await
}

async fn handle_slash(text: String) -> Result<Response> {}
```

5. In the `handle-slash` function, call the `TextRenderer` by assigning it to a renderer value, specifying that you want to use a custom font. Then, use the `render_text_to_png_data` method to transform the text into image format. In this example, the custom font (`Inter-Bold.ttf`) is located in an `/assets` folder at the root of the project which will be used for generating the thumbnail. You must update this portion of the code to point to your custom font file.

```rs
---
filename: lib.rs
highlight: [17, 18, 19, 20, 21, 22, 23, 24]
---
use text_to_png::{TextPng, TextRenderer};
use worker::*;
mod utils;

#[event(fetch)]
pub async fn main(req: Request, env: Env, _ctx: worker::Context) -> Result<Response> {
   // Optionally, get more helpful error messages written to the console in the case of a panic.
   utils::set_panic_hook();

   let router = Router::new();
   router
       .get("/", |_, _| Response::ok("Hello from Workers!"))
       .run(req, env)
       .await
}

async fn handle_slash(text: String) -> Result<Response> {
  let renderer = TextRenderer::try_new_with_ttf_font_data(include_bytes!("../assets/Inter-Bold.ttf"))
    .expect("Example font is definitely loadable");

  let text_png: TextPng = renderer.render_text_to_png_data(text.replace("+", " "), 60, "003682").unwrap();
}
```

6. Rewrite the `Router` function to call `handle_slash` when a query is passed in the URL, otherwise return the `"Hello Worker!"` as the response.

```rs
---
filename: lib.rs
highlight: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
---
use text_to_png::{TextPng, TextRenderer};
use worker::*;
mod utils;

#[event(fetch)]
pub async fn main(req: Request, env: Env, _ctx: worker::Context) -> Result<Response> {
   // Optionally, get more helpful error messages written to the console in the case of a panic.
   utils::set_panic_hook();

  let router = Router::new();
    router
      .get_async("/", |req, _| async move {
        if let Some(text) = req.url()?.query() {
          handle_slash(text.into()).await
        } else {
          handle_slash("Hello Worker!".into()).await
        }
      })
      .run(req, env)
        .await
}

async fn handle_slash(text: String) -> Result<Response> {
  let renderer = TextRenderer::try_new_with_ttf_font_data(include_bytes!("../assets/Inter-Bold.ttf"))
    .expect("Example font is definitely loadable");

  let text_png: TextPng = renderer.render_text_to_png_data(text.replace("+", " "), 60, "003682").unwrap();
}
```

7. In your `lib.rs` file, set the headers to `content-type: image/png` so that the response is correctly rendered as a PNG image.

```rs
---
filename: lib.rs
highlight: [29, 30, 31, 32]
---
use text_to_png::{TextPng, TextRenderer};
use worker::*;
mod utils;

#[event(fetch)]
pub async fn main(req: Request, env: Env, _ctx: worker::Context) -> Result<Response> {
   // Optionally, get more helpful error messages written to the console in the case of a panic.
   utils::set_panic_hook();

   let router = Router::new();
    router
      .get_async("/", |req, _| async move {
        if let Some(text) = req.url()?.query() {
          handle_slash(text.into()).await
        } else {
          handle_slash("Hello Worker!".into()).await
        }
      })
      .run(req, env)
        .await
}

async fn handle_slash(text: String) -> Result<Response> {
  let renderer = TextRenderer::try_new_with_ttf_font_data(include_bytes!("../assets/Inter-Bold.ttf"))
    .expect("Example font is definitely loadable");

  let text_png: TextPng = renderer.render_text_to_png_data(text.replace("+", " "), 60, "003682").unwrap();

  let mut headers = Headers::new();
  headers.set("content-type", "image/png")?;

  Ok(Response::from_bytes(text_png.data)?.with_headers(headers))
}
```

The final `lib.rs` file should look as follows. Find the full code as an example repository on [GitHub](https://github.com/cloudflare/workers-sdk/tree/main/templates/examples/worker-to-text).

```rs
---
filename: lib.rs
---
use text_to_png::{TextPng, TextRenderer};
use worker::*;

mod utils;

#[event(fetch)]
pub async fn main(req: Request, env: Env, _ctx: worker::Context) -> Result<Response> {
    // Optionally, get more helpful error messages written to the console in the case of a panic.
    utils::set_panic_hook();

    let router = Router::new();

    router
        .get_async("/", |req, _| async move {
            if let Some(text) = req.url()?.query() {
                handle_slash(text.into()).await
            } else {
                handle_slash("Hello Worker!".into()).await
            }
        })
        .run(req, env)
        .await
}

async fn handle_slash(text: String) -> Result<Response> {
    let renderer = TextRenderer::try_new_with_ttf_font_data(include_bytes!("../assets/Inter-Bold.ttf"))
    .expect("Example font is definitely loadable");

    let text = if text.len() > 128 {
        "Nope".into()
    } else {
        text
    };

    let text = urlencoding::decode(&text).map_err(|_| worker::Error::BadEncoding)?;

    let text_png: TextPng = renderer.render_text_to_png_data(text.replace("+", " "), 60, "003682").unwrap();

    let mut headers = Headers::new();
    headers.set("content-type", "image/png")?;

    Ok(Response::from_bytes(text_png.data)?.with_headers(headers))
}
```

After you have finished updating your project, start a local server for developing your Worker by running:

```sh
$ wrangler dev
```

This should spin up a `localhost` instance with the image displayed:

![Run `wrangler dev` to start a local server for your Worker](./media/hello-worker.png)

Adding a query parameter with custom text, you should receive:

![Follow the instructions above to receive an output image](./media/build-serverles.png)

To publish your Worker, open your `wrangler.toml` file and update the `name` key with your project's name. Below is an example with this tutorial's project name:

```toml
---
filename: wrangler.toml
---

name = "worker-to-text"

```

Then run the `wrangler publish` command to publish your Worker.

```sh
$ wrangler publish
```

A `.workers.dev` domain will be generated for your Worker after running `wrangler publish`. You will use this domain in the main thumbnail image.

## Create a Worker to display the original image

Create a Worker to serve the image you uploaded to Images by running:

```sh
$ wrangler init thumbnail-image
```

This will create a new Worker project named `thumbnail-image`. In the `src/index.js` file, add the following code block:

```js
---
filename: index.js
---
export default {
 async fetch(request, env) {
   const url = new URL(request.url)
   if (url.pathname === '/original-image') {
     const image = await fetch(
       `https://imagedelivery.net/${env.CLOUDFLARE_ACCOUNT_HASH}/${IMAGE_ID}/public`
     );
     return image;
   }
   return new Response('Image Resizing with a Worker')
 }
}
```

Update `env.CLOUDFLARE_ACCOUNT_HASH` with your [Cloudflare account ID](/fundamentals/get-started/basic-tasks/find-account-and-zone-ids/). Update `env.IMAGE_ID` with your [image ID](/images/cloudflare-images/api-request/).

Run your Worker and go to the `/original-image` route to review your image.

## Add custom text on your image

You will now use [Cloudflare Image Resizing](/images/image-resizing/), with the `fetch` method, to add your dynamic text image as an overlay on top of your background image. Start by displaying the resulting image on a different route. Call the new route `/thumbnail`.


```js
---
filename: index.js
highlight: [11]
---
export default {
 async fetch(request, env) {
   const url = new URL(request.url)
   if (url.pathname === '/original-image') {
     const image = await fetch(
       `https://imagedelivery.net/${env.CLOUDFLARE_ACCOUNT_HASH}/${IMAGE_ID}/public`
     );
     return image;
   }

   if (url.pathname === '/thumbnail') { }

   return new Response('Image Resizing with a Worker')
 }
}
```

Next, use the `fetch` method to apply the Image Resizing changes on top of the background image. The overlay options are nested in `options.cf.image`.

```js
---
filename: index.js
highlight: [12, 13, 14, 15, 16, 17, 18]
---
export default {
 async fetch(request, env) {
   const url = new URL(request.url)

   if (url.pathname === '/original-image') {
     const image = await fetch(
       `https://imagedelivery.net/${env.CLOUDFLARE_ACCOUNT_HASH}/${IMAGE_ID}/public`
     );
     return image;
   }

  if (url.pathname === '/thumbnail') {
    fetch(imageURL, {
      cf: {
        image: {}
      }
    })
  }

   return new Response('Image Resizing with a Worker')
 }
}
```

The `imageURL` is the URL of the image you want to use as a background image. In the `cf.image` object, specify the options you want to apply to the background image.

{{<Aside type="note">}}

At time of publication, Cloudflare Image Resizing does not allow resizing images in a Worker that is stored in Cloudflare Images. Instead of using the image you served on the `/original-image` route, you will use the same image from a different source.

{{</Aside>}}

Add your background image to an assets directory on GitHub and push your changes to GitHub. Copy the URL of the image upload by performing a left click on the image and selecting the **Copy Remote File Url** option.

Replace the `imageURL` value with the copied remote URL.


```js
---
filename: index.js
highlight: [2, 3]
---
if (url.pathname === '/thumbnail') {
 const imageURL = "https://github.com/lauragift21/social-image-demo/blob/1ed9044463b891561b7438ecdecbdd9da48cdb03/assets/cover.png?raw=true"
 fetch(imageURL, {
   cf: {
     image: {}
   }
 })
}
```

Next, add overlay options in the image object. Resize the image to the preferred width and height for YouTube thumbnails and use the [draw](/images/image-resizing/draw-overlays/#draw-options) option to add overlay text using the deployed URL of your `text-to-image` Worker.

```js
---
highlight: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
---
fetch(imageURL, {
 cf: {
   image: {
     width: 1280,
     height: 720,
     draw: [
       {
         url: 'https://text-to-image.examples.workers.dev',
         left: 40,
       },
     ],
   },
 },
});
```

Image Resizing can only be tested when you deploy your Worker. 

To deploy your Worker, open your `wrangler.toml` file and update the `name` key with your project's name. Below is an example with this tutorial's project name:

```toml
---
filename: wrangler.toml
---

name = "thumbnail-image"

```

Deploy your Worker by running:

```sh
$ wrangler publish
```

The command deploys your Worker to custom `workers.dev` subdomain. Go to your `.workers.dev` subdomain and go to the `/thumbnail` route.

You should see the resized image with the text `Hello Workers!`.

![Follow the steps above to generate your resized image.](./media/thumbnail.png)

You will now make text applied dynamic. Making your text dynamic will allow you change the text and have it update on the image automatically.

To add dynamic text, append any text attached to the `/thumbnail` URL using query parameters and pass it down to the `text-to-image` Worker URL as a parameter.


```js
for (const title of url.searchParams.values()) {
  try {
    const editedImage = await fetch(imageURL, {
      cf: {
        image: {
          width: 1280,
          height: 720,
          draw: [
            {
              url: `https://text-to-image.examples.workers.dev/?${title}`,
              left: 50
            }
          ],
        },
      },
    });
    return editedImage;
  } catch (error) {
    console.log(error);
  }
}
```

This will always return the text you pass as a query string in the generated image. This example URL, https://socialcard.cdnuptime.com/thumbnail?Getting%20Started%20With%20Cloudflare%20Images, will generate the following image:

![An example thumbnail.](./media/thumbnail2.png)

By completing this tutorial, you have successfully made a custom YouTube thumbnail generator.

## Related resources

In this tutorial, you learned how to use Cloudflare Workers and Cloudflare Image Resizing to generate custom YouTube thumbnails. To learn more about Cloudflare Workers and Image resizing, refer to the following resources:

- [Draw overlay and watermarks](/images/image-resizing/draw-overlays/)
- [Resize an image with a Worker](/images/image-resizing/resize-with-workers/)
