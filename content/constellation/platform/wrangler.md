---
pcx_content_type: concept
title: Wrangler
weight: 30
---

# Wrangler Support

[Wrangler](https://developers.cloudflare.com/workers/wrangler/) our command-line tool for configuring, building and deploying applications with Cloudflare developer products. You can use Wrangler to manipulate your Constellation projects and machine-learning models or search for verified models in our catalog.

## Installation

Wrangler for Constellation is still in Beta. To install it, do:

```bash
$ npm install wrangler@beta --save-dev
```

Test it with [npx](https://github.com/npm/npx):

```bash
$ npx wrangler constellation
wrangler constellation

🤖 Interact with Constellation models

Commands:
  wrangler constellation project  Manage your projects
  wrangler constellation model    Manage your models
  wrangler constellation catalog  Check the curated model catalog
  wrangler constellation runtime  Check the suported runtimes

Flags:
  -j, --experimental-json-config  Experimental: Support wrangler.json  [boolean]
  -c, --config                    Path to .toml configuration file  [string]
  -e, --env                       Environment to use for operations and .env files  [string]
  -h, --help                      Show help  [boolean]
  -v, --version                   Show version number  [boolean]
```

## Manage Projects

Use Wrangler to [list, create or delete your projects](/constellation/platform/data-model/#projects).

```bash
$ npx wrangler constellation project --help
wrangler constellation project

Manage your projects

Commands:
  wrangler constellation project list                     List your projects
  wrangler constellation project create <name> <runtime>  Create project
  wrangler constellation project delete <name>            Delete project
```

**Create a project**

```bash
$ npx wrangler constellation project create "mldemo" ONNX
```

**List your projects**

```bash
$ npx wrangler constellation project list

┌──────────────────────────────────────┬────────┬─────────┬─────────────────────────────┬─────────────┐
│ id                                   │ name   │ runtime │ created_at                  │ model_count │
├──────────────────────────────────────┼────────┼─────────┼─────────────────────────────┼─────────────┤
│ 06123bab-a5d8-4b63-90bd-52ebbfbc2ed1 │ mldemo │ ONNX    │ 2023-05-04T18:00:45.973211Z │ 0           │
└──────────────────────────────────────┴────────┴─────────┴─────────────────────────────┴─────────────┘
```

**Delete a project**


```bash
$ npx wrangler constellation project delete "mldemo"

About to delete Project 'mldemo' (06173b0b-e5d8-4b64-90bd-53efffbc2ed5).
✔ Ok to proceed? … yes
Deleting...
Deleted 'mldemo' successfully.
```

## Manage Models

You can use Wrangler to [list, create or delete your models](/constellation/platform/data-model/#models).

```bash
$ npx wrangler constellation model --help
wrangler constellation model

Manage your models

Commands:
  wrangler constellation model upload <projectName> <modelName> <modelFile>  Upload a model for an existing project
  wrangler constellation model list <projectName>                            List models of a project
  wrangler constellation model delete <projectName> <modelName>              Delete a model of a project
```

**Upload a model**

Let's upload the [SqueezeNet1.1 CNN model](https://github.com/onnx/models/tree/main/vision/classification/squeezenet#model) to our project.

```bash
$ npx wrangler constellation model upload "mldemo" "squeezenet11" squeezenet1.1.onnx

✅ Successfully uploaded Model "squeezenet11"!
```

**List models**

You can list the models in a project.

```bash
$ npx wrangler constellation model list "mldemo"

┌──────────────────────────────────────┬──────────────────────────────────────┬──────────────┬─────────────┬─────────────────────────────┐
│ id                                   │ project_id                           │ name         │ description │ created_at                  │
├──────────────────────────────────────┼──────────────────────────────────────┼──────────────┼─────────────┼─────────────────────────────┤
│ eaf22e20-3886-4387-bfa3-b1670aac8aaf │ 06123bab-a5d8-4b63-90bd-52ebbfbc2ed1 │ squeezenet11 │             │ 2023-05-05T10:55:31.014061Z │
└──────────────────────────────────────┴──────────────────────────────────────┴──────────────┴─────────────┴─────────────────────────────┘
```

**Delete model**

You can delete a model in a project.

```bash
$ npx wrangler constellation model delete  "mldemo" "squeezenet11"

About to delete Model 'squeezenet11' (eaf22e20-3886-4387-bfa3-b1670aac8aaf).
✔ Ok to proceed? … yes
Deleting...
Deleted 'squeezenet11' successfully.
```

## Access the catalog

The [catalog](/constellation/platform/data-model/#catalog) has ready-to-use pre-verified models for our supported runtimes that you can start using in any script without additional configurations. Here's how you interact with it from wrangler.

**List catalog models**

You can list the models in a project.

```bash
$ npx wrangler constellation catalog list

┌──────────────────────────────────────┬──────────────────────┬─────────────────┬───────────────┐
│ project_id                           │ project_name         │ project_runtime │ models        │
├──────────────────────────────────────┼──────────────────────┼─────────────────┼───────────────┤
│ b162a29d-0a6d-4155-bedf-54a01fc8d0ef │ image-classification │ ONNX            │ squeezenet1_1 │
└──────────────────────────────────────┴──────────────────────┴─────────────────┴───────────────┘
```

## Bindings

To deploy a Constellation Worker, you must declare one or more bindings for the projects you want to use in your wrangler.toml configuration file.

```toml
---
filename: wrangler.toml
---
# Top-level configuration
name = "my-worker"
main = "src/index.js"
compatibility_date = "2022-07-12"

workers_dev = false
route = { pattern = "example.org/*", zone_name = "example.org" }

constellation = [
    {binding = 'AI', project_id = '9d478427-dea6-4988-9b16-f6f8888d974c'},
    {binding = 'SENTIMENT_AI', project_id = '8128ac62-0010-5441-beaf-c001e1ee5939'}
]
```
