---
pcx_content_type: reference
title: Deploy a Constellation Worker
meta:
    title: Deploy a Constellation Worker
weight: 1
---

# Make your first Constellation Worker

In this guide, you will build an [image classification](https://developers.google.com/machine-learning/practica/image-classification#how_image_classification_works) application powered by a Constellation inference engine and the [SqueezeNet 1.1](https://github.com/onnx/models/blob/main/vision/classification/squeezenet/README.md) ONNX model. SqueezeNet is a convolutional neural network (CNN) that was pre-trained on more than one million images from the open-source ImageNet database and can classify images into 1,000 categories. SqueezeNet compares to AlexNet, one of the original CNNs and benchmarks for image classification, by being faster and smaller, while still achieving similar levels of accuracy.

## Prerequisites

Before continuing, make sure you have:

* A [Cloudflare account](https://dash.cloudflare.com/sign-up).

## Create a new Constellation project

Generate a new Constellation project named `image-classifier` by running the [`create`](/constellation/platform/wrangler/#manage-projects) command. Then run `list` to review the details of your newly created project:

```sh
$ npx wrangler constellation project create "image-classifier" ONNX
$ npx wrangler constellation project list

┌──────────────────────────────────────┬──────────────────────┬─────────┐
│ id                                   │ name                 │ runtime │
├──────────────────────────────────────┼──────────────────────┼─────────┤
│ 2193053a-af0a-40a6-b757-00fa73908ef6 │ image-classifier     │ ONNX    │
└──────────────────────────────────────┴──────────────────────┴─────────┘
```

## Create a new Worker

Create a new [Worker](/workers/) named `image-classifier-worker`. You will install [Wrangler, the developer platform CLI, for Constellation](/constellation/platform/wrangler/#installation).

```sh
$ mkdir image-classifier-worker
$ cd image-classifier-worker
$ npm init -f
$ npm install wrangler --save-dev
$ npx wrangler init
```

Answer Wrangler's configuration questions:

```bash
Would you like to use git to manage this Worker?: N
Would you like to use TypeScript? Y
Would you like to install the type definitions for Workers into your package.json?: Y
Would you like to create a Worker at src/index.ts?: Fetch handler
Would you like us to write your first test with Vitest?: N
```

## Bind your Constellation project to your Worker

In your `image-classifier-worker`, find your [`wrangler.toml`](/workers/wrangler/configuration/) file.

Bindings allow your Workers to interact with resources on the Cloudflare developer platform, such as your Constellation project. Create a [binding](/constellation/platform/wrangler/#bindings) between your `image-classifier` Constellation project and your `image-classifier-worker` Worker in your `image-classifier-worker` Worker's `wrangler.toml` configuration file.

Substitute the `project_id` with the project ID you generated after running `npx wrangler constellation project list` in [Create a new Constellation project](/constellation/get-started/first-constellation-worker/#create-a-new-constellation-project):

```toml
---
filename: wrangler.toml
---
# Top-level configuration
name = "image-classifier-worker"
main = "src/index.ts"
node_compat = true
workers_dev = true
compatibility_date = "2023-05-14"

constellation = [
    {binding = 'CLASSIFIER', project_id = '2193053a-af0a-40a6-b757-00fa73908ef6'},
]
```

## Install the client API library

In your `image-classifier-worker` Worker, install the [client API](/constellation/platform/client-api/) library:

```sh
$ npm install @cloudflare/constellation --save-dev
```

## Upload model

Upload the pre-trained [SqueezeNet 1.1](https://github.com/onnx/models/blob/main/vision/classification/squeezenet/README.md) ONNX model to your `image-classifier` Constellation project:

```sh
$ wget https://github.com/microsoft/onnxjs-demo/raw/master/docs/squeezenet1_1.onnx
$ npx wrangler constellation model upload "image-classifier" "squeezenet11" squeezenet1_1.onnx
$ npx wrangler constellation model list "image-classifier"

┌──────────────────────────────────────┬──────────────────────────────────────┬──────────────┐
│ id                                   │ project_id                           │ name         │
├──────────────────────────────────────┼──────────────────────────────────────┼──────────────┤
│ 297f3cda-5e55-33c0-8ffe-224876a76a39 │ 2193053a-af0a-40a6-b757-00fa73908ef6 │ squeezenet11 │
└──────────────────────────────────────┴──────────────────────────────────────┴──────────────┘
```

Take note of the `id` field as this will be the model ID.

## Download Imagenet classes

The SqueezeNet model was trained on top of the [Imagenet](https://www.image-net.org/) dataset. Make a new `src` folder in your `image-classifier-worker` project directory. Then download the the list of 1,000 image classes that SqueezeNet was trained for:

```sh
$ mkdir src
$ wget -O src/imagenet.ts https://raw.githubusercontent.com/microsoft/onnxjs-demo/master/src/data/imagenet.ts
```

## Install modules

In your `image-classifier-worker` Worker, install [pngjs](https://github.com/pngjs/pngjs), a PNG decoder, and [string-to-stream](https://github.com/feross/string-to-stream):

```sh
$ npm install string-to-stream --save-dev
$ npm install pngjs --save-dev
```

## Code

With your Worker configured, begin coding in your `image-classifier-worker`'s `index.ts` file.

The following script gets a PNG file upload from the request, decodes the image to RGB raw bitmaps, constructs a 3D tensor with the input data, runs the SqueezeNet model, maps the top predictions to the ImagetNet human-readable classes and returns the strongest one in a JSON object.

Replace `297f3cda-5e55-33c0-8ffe-224876a76a39` with your actual model ID.

```javascript
---
filename: src/index.ts
---
import str from "string-to-stream";
import { PNG } from "pngjs/browser";

import { imagenetClasses } from "./imagenet";
import { Tensor, InferenceSession, TensorType } from "@cloudflare/constellation";

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        if (request.method == "POST") {
            const formData = await request.formData();
            if (formData) {
                const file = formData.get("file") as unknown as File;
                if (file) {
                    const data = await file.arrayBuffer();
                    const result = await processImage(env, data);
                    return new Response(JSON.stringify(result));
                }
            }
        }
        const { searchParams } = new URL(request.url);
        let image = searchParams.get("image");
        if (image) {
            const res = await fetch(image);
            const blob = await res.arrayBuffer();
            const result = await processImage(env, blob);
            return new Response(
                `<html><body><img src="${image}"><br/><pre>${JSON.stringify(
                    result
                )}</pre></body></html>`,
                {
                    headers: {
                        "content-type": "text/html;charset=UTF-8",
                    },
                }
            );
        }

        return new Response(
            `try uploading a 224x244 PNG image with:\n\ncurl http://127.0.0.1:9000 -F file=@images/cat.png`
        );
    },
};

async function processImage(env: Env, data: ArrayBuffer) {
    let result;

    const input = await decodeImage(data).catch((err) => {
        result = err;
    });

    if (input) {
        const session = new InferenceSession(
            env.CLASSIFIER,
            "a785280e-86be-4b08-99ea-2b42bbff6d25"
        );
        const tensorInput = new Tensor(TensorType.Float32, input, { shape: [1, 3, 224, 224] });
        const predictionTensor = Object.values(await session.run([tensorInput]))[0];
        const softmaxResult = softmax(predictionTensor.value);
        const results = topClasses(softmaxResult, 5);

        result = results[0];
    }

    return result;
}

/* The model expects input images normalized in the same way, i.e. mini-batches of 3-channel RGB images
   of shape (N x 3 x H x W), where N is the batch size, and H and W are expected to be 224. */

async function decodeImage(
    buffer: ArrayBuffer,
    width: number = 224,
    height: number = 224
): Promise<any> {
    return new Promise(async (ok, err) => {
        // convert string to stream
        const stream: any = str(buffer as unknown as string);

        stream
            .pipe(
                new PNG({
                    filterType: 4,
                })
            )
            .on("parsed", function (this: any) {
                if (this.width != width || this.height != height) {
                    err({
                        err: `expected width to be ${width}x${height}, given ${this.width}x${this.height}`,
                    });
                } else {
                    const [redArray, greenArray, blueArray] = new Array(
                        new Array<number>(),
                        new Array<number>(),
                        new Array<number>()
                    );

                    for (let i = 0; i < this.data.length; i += 4) {
                        redArray.push(this.data[i] / 255.0);
                        greenArray.push(this.data[i + 1] / 255.0);
                        blueArray.push(this.data[i + 2] / 255.0);
                        // skip data[i + 3] to filter out the alpha channel
                    }

                    const transposedData = redArray.concat(greenArray).concat(blueArray);
                    ok(transposedData);
                }
            })
            .on("error", function (error: any) {
                err({ err: error.toString() });
            });
    });
}

// See https://en.wikipedia.org/wiki/Softmax_function
// Transforms values to between 0 and 1
// The sum of all outputs generated by softmax is 1.

function softmax(resultArray: number[]): any {
    const largestNumber = Math.max(...resultArray);
    const sumOfExp = resultArray
        .map((resultItem) => Math.exp(resultItem - largestNumber))
        .reduce((prevNumber, currentNumber) => prevNumber + currentNumber);
    return resultArray.map((resultValue) => {
        return Math.exp(resultValue - largestNumber) / sumOfExp;
    });
}

/* Get the top n classes from ImagetNet */

export function topClasses(classProbabilities: any, n = 5) {
    const probabilities = ArrayBuffer.isView(classProbabilities)
        ? Array.prototype.slice.call(classProbabilities)
        : classProbabilities;

    const sorted = probabilities
        .map((prob: any, index: number) => [prob, index])
        .sort((a: Array<number>, b: Array<number>) => {
            return a[0] == b[0] ? 0 : a[0] > b[0] ? -1 : 1;
        });

    const top = sorted.slice(0, n).map((probIndex: Array<number>) => {
        const iClass = imagenetClasses[probIndex[1]];
        return {
            id: iClass[0],
            index: parseInt(probIndex[1].toString(), 10),
            name: iClass[1].replace(/_/g, " "),
            probability: probIndex[0],
        };
    });

    return top;
}

export interface Env {
    CLASSIFIER: any;
}
```

## Test your project

### Download test images

In your `image-classifier-worker` Worker, download some test `224`x`244` PNG images you can use for tests.

```sh
$ wget https://imagedelivery.net/WPOeHKUnTTahhk4F5twuvg/8b78a6fb-44ac-4a97-121b-fb8f47f1e000/public -O cat.png
$ wget https://imagedelivery.net/WPOeHKUnTTahhk4F5twuvg/05c265ae-d3c0-4114-208b-a2d7709cc100/public -O house.png
$ wget https://imagedelivery.net/WPOeHKUnTTahhk4F5twuvg/4152ee23-f9af-4b21-a636-600e33883400/public -O mountain.png
```

### Run `wrangler dev`

Start a local server to test your `image-classifier-worker` Worker by running [`wrangler dev`](/workers/wrangler/commands/#dev):

```sh
$ npx wrangler dev --remote
⬣ Listening at http://0.0.0.0:8787
```

{{<Aside type="note">}}

If you're still using Wrangler v2 then run:

```sh
$ npx wrangler dev
⬣ Listening at http://0.0.0.0:8787
```

{{</Aside>}}

To classify some test images, run the following commands in your `image-classifier-worker` Worker:

```sh
$ curl http://0.0.0.0:8787 -F file=@cat.png
{"id":"n02124075","index":285,"name":"Egyptian cat","probability":0.5356272459030151}

$ curl http://0.0.0.0:8787 -F file=@house.png
{"id":"n03028079","index":497,"name":"church","probability":0.5730999112129211}

$ curl http://0.0.0.0:8787 -F file=@mountain.png
{"id":"n09246464","index":972,"name":"cliff","probability":0.37886714935302734}
```

Your image classifier is ready. Run it through other `224`x`244` PNG images of your own and review the results.

## Deploy your project

When you are ready, deploy your Worker:

```sh
$ npx wrangler deploy
```

Your `image-classifier-worker` Worker reads an image from a request, decodes it into a multidimensional `float32` tensor, feeds it to the SqueezeNet model running in your Constellation project, gets the results, matches them with the ImageNet classes list, and returns the human-readable tags for the image. This project created in this guide only decodes PNGs, but Constellation supports other formats.

## Related resources

* Learn about the [Constellation data model](/constellation/platform/data-model/).
* Review the list of [Constellation-supported machine learning runtimes](/constellation/platform/runtimes/).