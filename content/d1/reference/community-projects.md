---
title: Community projects
pcx_content_type: concept
weight: 3
---

# Community projects

Members of the Cloudflare developer community and broader developer ecosystem have built and/or contributed tooling — including ORMs (Object Relational Mapper) libraries, query builders, and CLI tools — that build on top of D1.

{{<Aside type="note">}}

Community projects are not maintained by the Cloudflare D1 team. They are managed and updated by the project authors.

{{</Aside>}}

## Projects

### Backup/export tools

Two community tools are available for creating backups/exports of D1 databases as `.sql` files. D1 exports can be restored using Wrangler.

* [Cretezy/cloudflare-d1-backup](https://github.com/Cretezy/cloudflare-d1-backup) which runs in your command line using the [D1 API](https://developers.cloudflare.com/api/operations/cloudflare-d1-query-database) (slower but simpler.)
* [nora-soderlund/cloudflare-d1-backups](https://github.com/nora-soderlund/cloudflare-d1-backups) which runs in deployed Workers using [D1 Bindings](https://developers.cloudflare.com/workers/configuration/bindings/) (faster but more complex.)

### Prisma ORM

[Prisma ORM](https://www.prisma.io/orm) is a next-generation JavaScript and TypeScript ORM that unlocks a new level of developer experience when working with databases thanks to its intuitive data model, automated migrations, type-safety and auto-completion.

* [Tutorial](/d1/tutorials/d1-and-prisma-orm/)
* [Docs](https://www.prisma.io/docs/orm/prisma-client/deployment/edge/deploy-to-cloudflare#d1)


### D1 adapter for Kysely ORM

Kysely is a type-safe and autocompletion-friendly typescript SQL query builder. With this adapter you can interact with D1 with the familiar Kysely interface.

* [Kysely GitHub](https://github.com/koskimas/kysely)
* [D1 adapter](https://github.com/aidenwallis/kysely-d1)

### feathers-kysely

The `feathers-kysely` database adapter follows the FeathersJS Query Syntax standard and works with any framework. It is built on the D1 adapter for Kysely and supports passing queries directly from client applications. Since the FeathersJS query syntax is a subset of MongoDB's syntax, this is a great tool for MongoDB users to use Cloudflare D1 without previous SQL experience.

* [feathers-kysely on npm](https://www.npmjs.com/package/feathers-kysely)
* [feathers-kysely on GitHub](https://github.com/marshallswain/feathers-kysely)

### Drizzle ORM

Drizzle ORM is a TypeScript ORM for SQL databases designed with maximum type safety in mind. It also comes with an automatic migrations generation tool. Drizzle automatically generates your D1 schema based on types you define in TypeScript, and exposes an API that allows you to query your database directly.

* [GitHub](https://github.com/drizzle-team/drizzle-orm)
* [D1 example](https://github.com/drizzle-team/drizzle-orm/tree/main/examples/cloudflare-d1)
* [SQLite API surface](https://github.com/drizzle-team/drizzle-orm/blob/main/drizzle-orm/src/sqlite-core/README.md)

### d1-orm

Object Relational Mapping (ORM) is a technique to query and manipulate data by using JavaScript. Created by a Cloudflare Discord Community Champion, the `d1-orm` seeks to provide a strictly typed experience while using D1.

* [GitHub](https://github.com/Interactions-as-a-Service/d1-orm/issues)
* [Documentation](https://docs.interactions.rest/d1-orm/)

### workers-qb

`workers-qb` is a zero-dependency query builder that provides a simple standardized interface while keeping the benefits and speed of using raw queries over a traditional ORM. While not intended to provide ORM-like functionality, `workers-qb` makes it easier to interact with your database from code for direct SQL access.

* [GitHub](https://github.com/G4brym/workers-qb)
* [Documentation](https://workers-qb.massadas.com/)

### d1-console

Instead of running the `wrangler d1 execute` command in your terminal every time you want to interact with your database, you can interact with D1 from within the `d1-console`. Created by a Discord Community Champion, this gives the benefit of executing multi-line queries, obtaining command history, and viewing a cleanly formatted table output.

* [GitHub](https://github.com/isaac-mcfadyen/d1-console)

### L1

`L1` is a package that brings some Cloudflare Worker ecosystem bindings into PHP and Laravel via the Cloudflare API. It provides interaction with D1 via PDO, KV and Queues, with more services to add in the future, making PHP integration with Cloudflare a real breeze.

* [GitHub](https://github.com/renoki-co/l1)
* [Packagist](https://packagist.org/packages/renoki-co/l1)

### Staff Directory - a D1-based demo

Staff Directory is a demo project using D1, [HonoX](https://github.com/honojs/honox), and [Cloudflare Pages](/pages/). It uses D1 to store employee data, and is an example of a full-stack application built on top of D1.

* [GitHub](https://github.com/lauragift21/staff-directory)
* [D1 functionality](https://github.com/lauragift21/staff-directory/blob/main/app/db.ts)

### NuxtHub

`NuxtHub` is a Nuxt module that brings Cloudflare Worker bindinds into your Nuxt application with zero configuration. It leverages [Cloudflare Wrangler Plaform Proxy](https://developers.cloudflare.com/workers/wrangler/api/#getplatformproxy) in development and direct binding in production to interact with D1, KV and R2 with server composables (`hubDatabase()`, `hubKV()` and `hubBlob()`). It also provide a way to use your remote D1 database in development using the `nuxi dev --remote` command.

* [GitHub](https://github.com/nuxt-hub/core)
* [Documentation](https://hub.nuxt.com)
* [Example](https://github.com/Atinux/nuxt-todos-edge)

## Feedback

To report a bug or file feature requests for these community projects, create an issue directly on the project's repository.
