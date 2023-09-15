---
title: Community projects 
pcx_content_type: concept
---

# Community projects

Members of the Cloudflare developer community and broader developer ecosystem have built and/or contributed tooling — including ORMs (Object Relational Mapper) libraries, query builders, and CLI tools — that build on top of D1.

{{<Aside type="note">}}

Community projects are not maintained by the Cloudflare D1 team. They are managed and updated by the project authors.

{{</Aside>}}

## Projects

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

### t4-app

The T4 Stack is a universal web and native stack focused on developer experience, rapid development, and performance. The T4 Stack uses Cloudflare D1, Workers, Next.js and Hono as core parts of its stack.

Easy integration with Cloudflare services, such as R2 & D1 enable developers to easily and rapidly build apps with AI-powered features.

* [T4 stack documentation](https://t4stack.com/)
* [Getting started guide](https://t4stack.com/getting-started)
* [GitHub repo](https://github.com/timothymiller/t4-app)

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

## Feedback

To report a bug or file feature requests for these community projects, create an issue directly on the project's repository. 

