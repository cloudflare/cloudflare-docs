---
pcx_content_type: concept
title: Supported databases
weight: 2
---

## Database support

{{<Aside type="note" header="Open beta">}}

Hyperdrive supports any PostgreSQL and/or PostgreSQL wire protocol compatible database directly. Support for more database engines, including MySQL, is on the roadmap.

{{</Aside>}}

Details on which database engines and/or specific database providers are supported are detailed in the following table.

| Database Engine | Supported                | Known supported versions | Details                                                                                              |
| --------------- | ------------------------ | ------------------------ | ---------------------------------------------------------------------------------------------------- |
| PostgreSQL      | ✅                       | `9.0` to `16.x`          | Both self-hosted and managed (AWS, Google Cloud, Oracle) instances are supported.                    |
| Neon            | ✅                       | All                      | Neon currently runs Postgres 15.x                                                                    |
| Supabase        | ✅                       | All                      | Supabase currently runs Postgres 15.x                                                                |
| Timescale       | ✅                       | All                      | See the [Timescale guide](/hyperdrive/examples/timescale/) to connect.                               |
| Materialize     | ✅                       | All                      | Postgres-compatible. Refer to the [Materialize guide](/hyperdrive/examples/materialize/) to connect. |
| CockroachDB     | ✅                       | All                      | Postgres-compatible. Refer to the [CockroachDB](/hyperdrive/examples/cockroachdb/) guide to connect. |
| MySQL           | Coming soon              |                          |                                                                                                      |
| SQL Server      | Not currently supported. |                          |                                                                                                      |
| MongoDB         | Not currently supported. |                          |                                                                                                      |
