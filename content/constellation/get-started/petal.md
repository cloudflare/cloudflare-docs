---
pcx_content_type: reference
title: Petal Length Example
meta:
    title: Petal Length Example
weight: 1
---

# Petal Length Model

This example runs a petal length model on both the XGBoost and the ONNX runtimes. For more information about the Petal Length model, see the [Iris flower data set](https://en.wikipedia.org/wiki/Iris_flower_data_set).


## Prerequisites

Before continuing, make sure you have:

* A [Cloudflare account](https://dash.cloudflare.com/sign-up).

## Create two new Constellation projects

Generate two new Constellation projects named `petal-length-xgboost` and `petal-length-onnx` by running the [`create`](/constellation/platform/wrangler/#manage-projects) command. Then run `list` to review the details of your newly created projects:

```sh
$ npx wrangler constellation project create "petal-length-xgboost" XGBoost
$ npx wrangler constellation project create "petal-length-onnx" ONNX
$ npx wrangler constellation project list

┌──────────────────────────────────────┬──────────────────────┬─────────┐
│ id                                   │ name                 │ runtime │
├──────────────────────────────────────┼──────────────────────┼─────────┤
│ 2193053a-af0a-40a6-b757-00fa73908ef6 │ petal-length-xgboost │ XGBoost │
│ 1193053a-9f0a-30a6-a757-30fa73908ef2 │ petal-length-onnx    │ ONNX    │
└──────────────────────────────────────┴──────────────────────┴─────────┘
```

## Create a new Worker

Create a new [Worker](/workers/) named `petal-length-worker`. You will install [Wrangler, the developer platform CLI, for Constellation](/constellation/platform/wrangler/#installation).

```sh
$ mkdir petal-length-worker
$ cd petal-length-worker
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

In your `petal-length-worker`, find your [`wrangler.toml`](/workers/wrangler/configuration/) file.

Bindings allow your Workers to interact with resources on the Cloudflare developer platform, such as your Constellation project. Create a [binding](/constellation/platform/wrangler/#bindings) between your `petal-length-xgboost` and `petal-length-onnx` Constellation projects and your `petal-length-worker` Worker in your `petal-length-worker` Worker's `wrangler.toml` configuration file.

Substitute the `project_id` with the project IDs you generated after running `npx wrangler constellation project list` in [Create a new Constellation project](/constellation/get-started/first-constellation-worker/#create-a-new-constellation-project):

```toml
---
filename: wrangler.toml
---
# Top-level configuration
name = "petal-length-worker"
main = "src/index.ts"
compatibility_date = "2023-03-14"
node_compat = true
workers_dev = true

constellation = [
    {binding = 'XGBOOST_CLASSIFIER', project_id = '2193053a-af0a-40a6-b757-00fa73908ef6'},
    {binding = 'ONNX_CLASSIFIER', project_id = '1193053a-9f0a-30a6-a757-30fa73908ef2'}
]
```

## Install the client API library

In your `petal-length-worker` Worker, install the [client API](/constellation/platform/client-api/) library:

```sh
$ npm install @cloudflare/constellation --save-dev
```

## Upload models

Upload the Petal Length models for XGBoost and ONNX in your `petal-length-xgboost` and `petal-length-onnx` Constellation projects:

```sh
$ wget https://pub-244e7ff663764dd99f3290aad8ea0ba7.r2.dev/petals.json
$ wget https://pub-244e7ff663764dd99f3290aad8ea0ba7.r2.dev/petals.onnx
$ npx wrangler constellation model upload "petal-length-xgboost" "petals" petals.json
$ npx wrangler constellation model upload "petal-length-onnx" "petals" petals.onnx
$ npx wrangler constellation model list "petal-length-xgboost"

┌──────────────────────────────────────┬──────────────────────────────────────┬──────────────┐
│ id                                   │ project_id                           │ name         │
├──────────────────────────────────────┼──────────────────────────────────────┼──────────────┤
│ 939ac893-5e55-32c0-0223-929edb231929 │ 2193053a-af0a-40a6-b757-00fa73908ef6 │ petals       │
└──────────────────────────────────────┴──────────────────────────────────────┴──────────────┘

$ npx wrangler constellation model list "petal-length-onnx"

┌──────────────────────────────────────┬──────────────────────────────────────┬──────────────┐
│ id                                   │ project_id                           │ name         │
├──────────────────────────────────────┼──────────────────────────────────────┼──────────────┤
│ 12312cda-5e55-33c0-8ffe-34r24aa76a39 │ 1193053a-9f0a-30a6-a757-30fa73908ef2 │ petals       │
└──────────────────────────────────────┴──────────────────────────────────────┴──────────────┘
```

Take note of the `id` fields as this will be the model IDs.

## Code

With your Worker configured, begin coding in your `petal-length-worker`'s `index.ts` file.

Replace `939ac893-5e55-32c0-0223-929edb231929` and `12312cda-5e55-33c0-8ffe-34r24aa76a39` with your actual model IDs.

```javascript
---
filename: src/index.ts
---
import { Tensor, InferenceSession, TensorType } from "@cloudflare/constellation";

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        if (request.method == "POST") {
            let payload: any = await request.json();
            const xgboostSession = new InferenceSession(
                env.XGBOOST_CLASSIFIER,
                "939ac893-5e55-32c0-0223-929edb231929"
            );
            const onnxSession = new InferenceSession(
                env.ONNX_CLASSIFIER,
                "12312cda-5e55-33c0-8ffe-34r24aa76a39"
            );

            const tensorInput = new Tensor(
                TensorType.Float32,
                Array.prototype.concat(...payload.data),
                { shape: [payload.batch_size, payload.feature_size] }
            );

            const onnxOutputTensor = Object.values(await onnxSession.run([tensorInput]))[0];
            const xgboostOutputTensor = Object.values(
                await xgboostSession.run({ input: tensorInput })
            )[0];

            return new Response(
                JSON.stringify({
                    xgboost_prob: xgboostOutputTensor.value,
                    onnx_prob: onnxOutputTensor.value,
                })
            );
        }
        return new Response(
            `try curl http://127.0.0.1:9000 -H "Content-Type: application/json" -d '{"data":[4.8, 3.0, 1.4, 0.1], "batch_size": 1, "feature_size": 4}'`
        );
    },
};

export interface Env {
    XGBOOST_CLASSIFIER: any;
    ONNX_CLASSIFIER: any;
}
```

## Test your project

### Run `wrangler dev`

Start a local server to test your `petal-length-worker` Worker by running [`wrangler dev`](/workers/wrangler/commands/#dev):

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

To test the models, run the following command:

```sh
$ curl http://127.0.0.1:9000 -H "Content-Type: application/json" -d '{"data":[4.8, 3.0, 1.4, 0.1], "batch_size": 1, "feature_size": 4}'
{"xgboost_prob":[0.35374999046325684],"onnx_prob":[0.35374999046325684]}
```

As you can see, you get the predicted values from the XGBoost and the ONNX Petal Length models.

## Deploy your project

When you are ready, deploy your Worker:

```sh
$ npx wrangler deploy
```

## Related resources

* Learn about the [Constellation data model](/constellation/platform/data-model/).
* Review the list of [Constellation-supported machine learning runtimes](/constellation/platform/runtimes/).