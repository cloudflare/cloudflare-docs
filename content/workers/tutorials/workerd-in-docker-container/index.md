---
updated: 2024-07-05
difficulty: Intermediate
content_type: 📝 Tutorial
pcx_content_type: tutorial
title: How To Use Workerd In A Docker Container
---

# How To Use Workerd In A Docker Container

{{<tutorial-date-info>}}

This tutorial will teach you how to build and run a custom [Workerd](https://github.com/cloudflare/workerd) container.

{{<render file="_tutorials-before-you-start.md">}}

## Prerequisites

To complete this tutorial, you’ll need:

- [Wrangler](/workers/wrangler/) CLI.
- [Docker Engine](https://docs.docker.com/engine/install/) or [Docker Desktop](https://docs.docker.com/get-docker/).

## 1. Create a Docker file

To get started, create a new `Dockerfile` and paste the content below:

```bash
---
filename: Dockerfile
---
#build image
FROM ubuntu:latest AS builder

ARG TARGETARCH

WORKDIR /workdir

RUN apt-get update && apt-get install -y curl

#downloads latest workerd release
RUN curl -LO \
    $(curl -s https://api.github.com/repos/cloudflare/workerd/releases/latest \
    | grep -wo "https.*linux-$([ $TARGETARCH = "arm64" ] && echo "arm64" || echo "64").gz")

RUN ls -la && gunzip workerd*.gz && mv workerd* workerd && chmod +x workerd

#copies runtime libraries
RUN mkdir lib && \
    cp /lib/*-linux-gnu/libdl.so.2 lib/libdl.so.2 && \
    cp /lib/*-linux-gnu/librt.so.1 lib/librt.so.1

#container image
FROM busybox:glibc

COPY --from=builder /workdir/workerd /usr/bin/workerd
COPY --from=builder /workdir/lib /usr/lib

WORKDIR /worker

ENTRYPOINT [ "workerd" ]

```

This `Dockerfile` builds a container image based on the latest Workerd release. This image also contains the required runtime libraries and `glibc`.

## 2. Build a Workerd image

Open a terminal window in the directory of your `Dockerfile` and run the following command to build a Workerd image:

```sh
$ docker build . -t workerd
```

{{<Aside type="note">}}
If use Docker Desktop, ensure it's running before executing the above command.
{{</Aside>}}

This builds a new image which can be viewed by running `docker image ls`:

```sh
$ docker image ls
REPOSITORY               TAG       IMAGE ID       CREATED      SIZE
workerd                  latest    154e4613e479   1 hour ago   140MB
```

## 3. Run a Workerd container

Workerd is condigured using a file written in Cap’n Proto text format. Let’s create a `hello-world` Worker and a configuration to run it.

Open a terminal window and run the following command to create a `hello-world` Worker:

```sh
$ npm create cloudflare@latest hello-world -- --type=hello-world --ts=false --git=false --deploy=false
```

Then `cd` into the Worker directory and build it with Wrangler by running the following command:

```sh
$ npx wrangler deploy --dry-run --outdir .wrangler/dist
```

This compiles the `hello-world` Worker to `.wrangler/dist/index.js`.

Next, create a `config.capnp` file in the same directory as your `wrangler.toml`. This is used to configure the Workerd runtime:

```jsx
---
filename: config.capnp
---
using Workerd = import "/workerd/workerd.capnp";

const config :Workerd.Config = (
    services = [
        (name = "main", worker = .worker),
    ],
    sockets = [
        (service = "main", name = "http", address = "*:8080", http = ()),
    ]
);

const worker :Workerd.Worker = (
    modules = [
        (name = "worker", esModule = embed ".wrangler/dist/index.js"),
    ],
    compatibilityDate = "2024-02-19",
);
```

Finally, run the Workerd image with the configuration file. This requires you mount the `hello-world` Worker directory into the container:

```sh
$ docker run -d --rm -v $(pwd):/worker -p 8080:8080 workerd serve config.capnp
```

To access your worker, open a browser tab to [`http://localhost:8080`](http://localhost:8080/).
