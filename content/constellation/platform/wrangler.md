---
pcx_content_type: configuration
title: Wrangler
weight: 30
---

{{<Aside>}}
Wrangler local development for Constellation is not supported yet. You need to use the [`--remote`](https://developers.cloudflare.com/workers/wrangler/commands/#dev) flag.
{{</Aside>}}


# Wrangler Support

[Wrangler](/workers/wrangler/) is our command-line tool for configuring, building and deploying applications with Cloudflare developer products. Use Wrangler to manipulate your Constellation projects and machine-learning models or search for verified models in our [catalog](/constellation/platform/data-model/#catalog).

## Installation

To install Wrangler for Constellation, run:

```sh
$ npm install wrangler --save-dev
```

Test Wrangler with [npx](https://github.com/npm/npx):

```sh
$ npx wrangler constellation
wrangler constellation

🤖 Interact with Constellation models

Commands:
  wrangler constellation project  Manage your projects
  wrangler constellation model    Manage your models
  wrangler constellation catalog  Check the curated model catalog
  wrangler constellation runtime  Check the supported runtimes

Flags:
  -j, --experimental-json-config  Experimental: Support wrangler.json  [boolean]
  -c, --config                    Path to .toml configuration file  [string]
  -e, --env                       Environment to use for operations and .env files  [string]
  -h, --help                      Show help  [boolean]
  -v, --version                   Show version number  [boolean]
```

## Commands
### Manage projects

Use Wrangler to list, create or delete your [projects](/constellation/platform/data-model/#projects).

```sh
$ npx wrangler constellation project --help
wrangler constellation project

Manage your projects

Commands:
  wrangler constellation project list                     List your projects
  wrangler constellation project create <name> <runtime>  Create project
  wrangler constellation project delete <name>            Delete project
```

#### Create a project

Create a Constellation project.

```sh
$ npx wrangler constellation project create "<YOUR_PROJECT_NAME>" ONNX
```

#### List your projects

List your Constellation project.

```sh
$ npx wrangler constellation project list
```

#### Delete a project

Delete a Constellation project.

```sh
$ npx wrangler constellation project delete "<YOUR_PROJECT_NAME"
```

### Manage models

You can use Wrangler to list, create or delete your [models](/constellation/platform/data-model/#models).

```sh
$ npx wrangler constellation model --help
wrangler constellation model

Manage your models

Commands:
  wrangler constellation model upload <projectName> <modelName> <modelFile>  Upload a model for an existing project
  wrangler constellation model list <projectName>                            List models of a project
  wrangler constellation model delete <projectName> <modelName>              Delete a model of a project
```

#### Upload a model

To upload the [SqueezeNet1.1 CNN model](https://github.com/onnx/models/tree/main/vision/classification/squeezenet#model) to your project, run:

```sh
$ npx wrangler constellation model upload "<YOUR_PROJECT_NAME>" "squeezenet11" squeezenet1.1.onnx
```

#### List models

List the models in your Constellation project.

```sh
$ npx wrangler constellation model list "<YOUR_PROJECT_NAME>"
```

#### Delete model

Delete a model in your Constellation project.

```sh
$ npx wrangler constellation model delete  "<YOUR_PROJECT_NAME>" "squeezenet11"
```

### Access the catalog

The [catalog](/constellation/platform/data-model/#catalog) has ready-to-use pre-verified models for our supported runtimes that you can start using in any script without additional configurations. Review the following commands on how you interact with the catalog from Wrangler.

#### List catalog models

List the models in the catalog.

```sh
$ npx wrangler constellation catalog list
```

## Bindings

To deploy a Constellation Worker, you must declare one or more [bindings](/workers/configuration/bindings/) for the Constellation projects you want to use in your `wrangler.toml` configuration file.

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