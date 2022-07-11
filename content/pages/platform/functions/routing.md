---
pcx-content-type: how-to
title: Routing
weight: 4
---

# Functions routing

Using a `/functions` directory will generate a routing table based on the files present in the directory. You may use JavaScript (`*.js`) or TypeScript (`*.ts`) to write your Functions. A `PagesFunction` type is declared in the [@cloudflare/workers-types](https://github.com/cloudflare/workers-types) library which you can use to type-check your Functions.

For example, assume this directory structure:

    ├── ...
    ├── functions
    |   └── api
    │       ├── [[path]].ts
    │       ├── [username]
    │       │   └── profile.ts
    │       ├── time.ts
    │       └── todos
    │           ├── [[path]].ts
    │           ├── [id].ts
    │           └── index.ts
    └── ...

The following routes will be generated based on the file structure, mapping the URL pattern to the `/functions` file that will be invoked:

    /api/time => ./functions/api/time.ts
    /api/todos => ./functions/api/todos/index.ts
    /api/todos/* => ./functions/api/todos/[id].ts
    /api/todos/*/** => ./functions/api/todos/[[path]].ts
    /api/*/profile => ./functions/api/[username]/profile.ts
    /api/** => ./functions/api/[[path]].ts

## Path segments

In the [example above](/pages/platform/functions/#functions-routing):

- A `*` denotes a placeholder for a single path segment (for example, `/todos/123`).
- A `**` matches one or more path segments (for example, `/todos/123/dates/confirm`).

When naming your files:

- `[name]` is a placeholder for a single path segment.
- `[[name]]` matches any depth of route below this point.

{{<Aside type="note" header="Route specificity">}}

More specific routes (that is, those with fewer wildcards) take precedence over less specific routes.

{{</Aside>}}

When a filename includes a placeholder, the `name` must be alphanumeric and cannot contain spaces. In turn, the URL segment(s) that match the placeholder will be available under the `context.params` object using the filename placeholder as the key.
