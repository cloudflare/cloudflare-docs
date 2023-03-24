---
title: Supported ORMs
pcx_content_type: concept
weight: 1
---

# Supported ORMs

While you can access your D1 data by querying the [D1 client API](/d1/platform/client-api/) directly, you can also use the following ORMs to interface with D1 more easily in your application logic. 

{{<Aside type="note">}}
Note: these ORMs are not maintained by the Cloudflare D1 team. They are managed and updated by the project authors.
{{</Aside>}}

## d1-orm
An Object Relational Mapping (ORM) is a way for you to query and manipulate data by using JavaScript. Created by a Cloudflare Discord Community Champion, the `d1-orm` seeks to provide a strictly typed experience while using D1.

* [GitHub](https://github.com/Interactions-as-a-Service/d1-orm/issues)
* [Documentation](https://docs.interactions.rest/d1-orm/)

## Drizzle ORM

Drizzle ORM is a TypeScript ORM for SQL databases designed with maximum type safety in mind. It also comes with an automatic migrations generation tool. Drizzle automatically generates your D1 schema based on types you define in TypeScript, and exposes an API that allows you to query your database directly.

* [GitHub](https://github.com/drizzle-team/drizzle-orm)
* [D1 example](https://github.com/drizzle-team/drizzle-orm/tree/main/examples/cloudflare-d1)
* [SQLite API surface](https://github.com/drizzle-team/drizzle-orm/blob/main/drizzle-orm/src/sqlite-core/README.md)

## Feedback

To report a bug or file feature requests for these community projects, create an issue directly on the project's repository. 

