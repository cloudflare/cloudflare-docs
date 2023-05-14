---
pcx_content_type: concept
title: Connect to PostgreSQL
weight: 2
---

# Connect to PostgreSQL

TODO - this guide uses the Socket API built into Workers:


## Supported connection modes

PostgreSQL defines several [SSL modes](https://www.postgresql.org/docs/current/libpq-ssl.html) 


| SSL Mode          | Currently Supported                         |
| ------------------| ------------------------------------------- |
| `disable`         | Yes, but not recommended as it is insecure. |
| `allow`           | Yes                                         |
| `prefer`          | Yes                                         |
| `require`         | **Recommended** Yes.                        |
| `verify-ca`       | Not currently supported.                    |
| `verify-full`     | Not currently supported.                    | 

## Using node-postgres

...

```ts
import { Client } from 'pg'

export interface Env {
  DB_USER: string
  DB_NAME: string
  DB_HOSTNAME: string
  DB_PASSWORD: string
  DB_PORT: string
  DB_USE_SSL: string
  QUERY: string
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    if (request.url.endsWith('/favicon.ico')) return new Response(null, { status: 404 })

    var client = new Client({
      user: env.DB_USER,
      database: env.DB_NAME,
      password: env.DB_PASSWORD,
      host: env.DB_HOSTNAME,
      port: parseInt(env.DB_PORT, 10),
      ssl: env.DB_USE_SSL === 'true',
    })
    await client.connect()
    // Make the query three times just to show that we can!
    const { rows: query1 } = await client.query(env.QUERY)
    const { rows: query2 } = await client.query(env.QUERY)
    const { rows: query3 } = await client.query(env.QUERY)
    // Clean up the client, ensuring we don't kill the worker before that is completed.
    ctx.waitUntil(client.end())
    return new Response(JSON.stringify({ query1, query2, query3 }, null, 2), {
      headers: { 'content-type': 'application/json' },
    })
  },
}
```

## Example configurations

...

* Neon - connection string, supported modes
* AWS Aurora or RDS - connection string, create security group
* Google Cloud SQL - connection string, create IP ACL

## Common issues 

## Next steps