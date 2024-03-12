---
pcx_content_type: reference
title: C3 arguments
weight: 2
meta:
  title: Configuration
  description: Review the full format of a C3 invocation and the possible CLI arguments.
---

# C3 arguments

C3 collects any required input through a series of interactive prompts. You may also specify your choices via command line arguments, which will skip these prompts. To use C3 in a non-interactive context such as CI, specify all required arguments via the command line.

This is the full format of a C3 invocation alongside the possible CLI arguments:

```sh
$ npm create cloudflare@latest [--] [<DIRECTORY>] [OPTIONS] [-- <NESTED ARGS...>]
```

{{<definitions>}}

- `DIRECTORY` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The directory where the application should be created. The name of the application is taken from the directory name.
- `NESTED ARGS..` {{<type>}}string[]{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - CLI arguments to pass to eventual third party CLIs C3 might invoke (in the case of full-stack applications).
- `--type` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The type of application that should be created.

  - The possible values for this option are:

    - `webFramework`: A website or web application.
    - `hello-world`: A basic "Hello World" Cloudflare Worker.
    - `common`: A Cloudflare Worker which implements a common example of routing/proxying functionalities.
    - `scheduled`: A scheduled Cloudflare Worker (triggered via [Cron Triggers](/workers/configuration/cron-triggers/)).
    - `queues`: A Cloudflare Worker which is both a consumer and produced of [Queues](/queues/).
    - `chatgptPlugin`: A ChatGPT plugin.
    - `openapi`: A Worker implementing an OpenAPI REST endpoint.

- `--framework` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}
  - The type of framework to use to create a web application (when using this option, `--type` is ignored).

  - The possible values for this option are:

    - `angular`
    - `astro`
    - `docusaurus`
    - `gatsby`
    - `hono`
    - `next`
    - `nuxt`
    - `qwik`
    - `react`
    - `remix`
    - `solid`
    - `svelte`
    - `vue`

- `--deploy` {{<type>}}boolean{{</type>}} {{<prop-meta>}}(default: true){{</prop-meta>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Deploy your application after it has been created.

- `--ts`{{<type>}}boolean{{</type>}} {{<prop-meta>}}(default: true){{</prop-meta>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Use TypeScript in your application.

- `--git` {{<type>}}boolean{{</type>}} {{<prop-meta>}}(default: true){{</prop-meta>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Initialize a local git repository for your application.

- `--open` {{<type>}}boolean{{</type>}} {{<prop-meta>}}(default: true){{</prop-meta>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Open with your browser the deployed application (this option is ignored if the application is not deployed).

- `-y`, `--accept-defaults` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Use all the default C3 options each can also be overridden by specifying it.

- `--auto-update` {{<type>}}boolean{{</type>}} {{<prop-meta>}}(default: true){{</prop-meta>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Automatically uses the latest version of C3.

- `-v`, `--version` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Show version number.

- `-h`, `--help` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Show a help message.

{{<Aside type="note">}}

All the boolean options above can be specified with or without a value, for example `--open` and `--open true` have the same effect, prefixing `no-` to the option's name negates it, so for example `--no-open` and `--open false` have the same effect.

{{</Aside>}}

{{</definitions>}}