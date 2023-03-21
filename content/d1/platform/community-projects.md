---
title: Community projects 
pcx_content_type: concept
---

# Community projects

During D1's alpha period, members of the Cloudflare developer community have made some valuable contributions to the D1 ecosystem. Below are some useful projects to use throughout development.

{{<Aside type="note">}}
Community projects are not maintained by the Cloudflare D1 team. They are managed and updated by the project authors.
{{</Aside>}}

## Projects

### d1-orm
An Object Relational Mapping (ORM) is a way for you to query and manipulate data by using JavaScript. Created by a Cloudflare Discord Community Champion, the `d1-orm` seeks to provide a strictly typed experience while using D1.

* [GitHub](https://github.com/Interactions-as-a-Service/d1-orm/issues)
* [Documentation](https://docs.interactions.rest/d1-orm/)

### workers-qb

`workers-qb` is a zero-dependency query builder that provides a simple standardized interface while keeping the benefits and speed of using raw queries over a traditional ORM. While not intended to provide ORM-like functionality, `workers-qb` makes it easier to interact with your database from code for direct SQL access.
 
* [GitHub](https://github.com/G4brym/workers-qb)
* [Documentation](https://workers-qb.massadas.com/)

### d1-console 

Instead of running the `wrangler d1 execute` command in your terminal every time you want to interact with your database, you can interact with D1 from within the `d1-console`. Created by a Discord Community Champion, this gives the benefit of executing multi-line queries, obtaining command history, and viewing a cleanly formatted table output.

* [GitHub](https://github.com/isaac-mcfadyen/d1-console)

### D1 adapter for Kysely

Kysely is a type-safe and autocompletion-friendly typescript SQL query builder. With this adapter you can interact with D1 with the familiar Kysely interface.

* [Kysely GitHub](https://github.com/koskimas/kysely)
* [D1 adapter](https://github.com/aidenwallis/kysely-d1)

### Drizzle ORM

Drizzle ORM is a TypeScript ORM for SQL databases designed with maximum type safety in mind. It also comes with an automatic migrations generation tool. Drizzle automatically generates your D1 schema based on types you define in TypeScript, and exposes an API that allows you to query your database directly.

* [GitHub](https://github.com/drizzle-team/drizzle-orm)
* [D1 example](https://github.com/drizzle-team/drizzle-orm/tree/main/examples/cloudflare-d1)
* [SQLite API surface](https://github.com/drizzle-team/drizzle-orm/blob/main/drizzle-orm/src/sqlite-core/README.md)

## Feedback

To report a bug or file feature requests for these community projects, create an issue directly on the project's repository. 

