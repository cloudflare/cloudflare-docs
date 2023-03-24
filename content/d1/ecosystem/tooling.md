---
title: Tooling 
pcx_content_type: concept
weight: 2
---

# D1 Tooling

During D1's alpha period, members of the Cloudflare developer community have contributed valuable tooling to the D1 ecosystem. Below are some useful projects to use throughout development.

{{<Aside type="note">}}
Community projects are not maintained by the Cloudflare D1 team. They are managed and updated by the project authors.
{{</Aside>}}

## Query builders

### workers-qb

`workers-qb` is a zero-dependency query builder that provides a simple standardized interface while keeping the benefits and speed of using raw queries over a traditional ORM. While not intended to provide ORM-like functionality, `workers-qb` makes it easier to interact with your database from code for direct SQL access.
 
* [GitHub](https://github.com/G4brym/workers-qb)
* [Documentation](https://workers-qb.massadas.com/)

### D1 adapter for Kysely

Kysely is a type-safe and autocompletion-friendly typescript SQL query builder. With this adapter you can interact with D1 with the familiar Kysely interface.

* [Kysely GitHub](https://github.com/koskimas/kysely)
* [D1 adapter](https://github.com/aidenwallis/kysely-d1)

## Query consoles

### d1-console 

Instead of running the `wrangler d1 execute` command in your terminal every time you want to interact with your database, you can interact with D1 from within the `d1-console`. Created by a Discord Community Champion, this gives the benefit of executing multi-line queries, obtaining command history, and viewing a cleanly formatted table output.

* [GitHub](https://github.com/isaac-mcfadyen/d1-console)

## Feedback

To report a bug or file feature requests for these community projects, create an issue directly on the project's repository. 

