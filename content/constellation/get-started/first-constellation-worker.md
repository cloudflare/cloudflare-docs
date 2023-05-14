---
pcx_content_type: reference
title: Deploy a Constellation Worker
meta:
    title: Deploy a Constellation Worker
weight: 1
---

# Make your first Constellation Worker

In this example, we will build an Image Classification app powered by a Constellation inference engine and the [SqueezeNet 1.1](https://github.com/onnx/models/blob/main/vision/classification/squeezenet/README.md) ONNX model. SqueezeNet is a small CNN which achieves AlexNet level accuracy on ImageNet with 50x fewer parameters.


## Setup project

First, let's [create](/constellation/platform/wrangler/#manage-projects) the new project:

```bash
$ npx wrangler constellation project create "image-classifier" ONNX
$ npx wrangler constellation project list

┌──────────────────────────────────────┬──────────────────────┬─────────┐
│ id                                   │ name                 │ runtime │
├──────────────────────────────────────┼──────────────────────┼─────────┤
│ 2193053a-af0a-40a6-b757-00fa73908ef6 │ image-classifier     │ ONNX    │
└──────────────────────────────────────┴──────────────────────┴─────────┘
```

Next, create a new Worker project. You can follow the instructions [here](/workers/get-started/guide/), or the following commands and follow the prompts: 

```bash
mkdir image-classifier-worker
cd image-classifier-worker
wrangler generate
```

In your folder, you should now find a wrangler.toml file. 

Now add the Constellation configuration to the wrangler.toml configuration file with the project [binding](/constellation/platform/wrangler/#bindings):

```toml
---
filename: wrangler.toml
---
# Top-level configuration
name = "image-classifier-worker"
main = "src/index.ts"
compatibility_date = "2022-07-12"

constellation = [
    {binding = 'CLASSIFIER', project_id = '2193053a-af0a-40a6-b757-00fa73908ef6'},
]
```

Make sure to substitute the `project_id` with the one enumerated when you ran `npx wrangler constellation project list`.

Install the client API library:

```bash
$ npm install @cloudflare/constellation --save-dev
```

## Upload model

Upload the pre-trained [SqueezeNet 1.1](https://github.com/onnx/models/blob/main/vision/classification/squeezenet/README.md) ONNX model to your project.

```bash
$ wget https://github.com/microsoft/onnxjs-demo/raw/master/docs/squeezenet1_1.onnx
$ npx wrangler constellation model upload "image-classifier" "squeezenet11" squeezenet1_1.onnx
$ npx wrangler constellation model list "image-classifier"

┌──────────────────────────────────────┬──────────────────────────────────────┬──────────────┐
│ id                                   │ project_id                           │ name         │
├──────────────────────────────────────┼──────────────────────────────────────┼──────────────┤
│ 297f3cda-5e55-33c0-8ffe-224876a76a39 │ 2193053a-af0a-40a6-b757-00fa73908ef6 │ squeezenet11 │
└──────────────────────────────────────┴──────────────────────────────────────┴──────────────┘
```

Take note of the id field as this will be the model id.

## Download Imagenet Classes

The SqueezeNet model was trained on top of the [Imagenet](https://www.image-net.org/) dataset. Let's download the the list of 1000 image classes that it was trained for.

```bash
$ mkdir src
$ cd src
$ wget https://raw.githubusercontent.com/microsoft/onnxjs-demo/master/src/data/imagenet.ts
```

## Code

Finally let's deploy our Worker.

```javascript
...
```

You can see this demo online.