---
pcx_content_type: concept
title: Troubleshoot and debug
weight: 10
---

# Troubleshoot and debug

Troubleshoot and debug errors commonly associated with connecting to a database with Hyperdrive.

## Configuration errors

When creating a new Hyperdrive configuration, or updating the connection parameters associated with an existing configuration, Hyperdrive performs a test connection to your database in the background before creating or updating the configuration.

Hyperdrive will also issue an empty test query, a `;` in PostgreSQL, to validate that it can pass queries to your database.

| Error Code | Details                                                                                          | Recommended fixes                                                                                                                                              |
| ---------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `2008`     | Bad hostname.                                                                                    | Hyperdrive could not resolve the database hostname. Confirm it exists in public DNS.                                                                           |
| `2009`     | The hostname does not resolve to a public IP address, or the IP address is not a public address. | Hyperdrive can only connect to public IP addresses. Private IP addresses, like `10.1.5.0` or `192.168.2.1`, are not currently supported.                       |
| `2010`     | Cannot connect to the host:port.                                                                 | Hyperdrive could not route to the hostname: ensure it has a public DNS record that resolves to a public IP address. Check that the hostname is not misspelled. |
| `2011`     | Connection refused.                                                                              | A network firewall or access control list (ACL) is likely rejecting requests from Hyperdrive. Ensure you have allowed connections from the public Internet.    |
| `2012`     | TLS (SSL) not supported by the database.                                                         | Hyperdrive requires TLS (SSL) to connect. Configure TLS on your database.                                                                                      |
| `2013`     | Invalid database credentials.                                                                    | Ensure your username is correct (and exists), and the password is correct (case-sensitive).                                                                    |
| `2014`     | The specified database name does not exist.                                                      | Check that the database (not table) name you provided exists on the database you are asking Hyperdrive to connect to.                                          |
| `2015`     | Generic error.                                                                                   | Hyperdrive failed to connect and could not determine a reason. Open a support ticket so Cloudflare can investigate.                                            |
| `2016`     | Test query failed.                                                                               | Confirm that the user Hyperdrive is connecting as has permissions to issue read and write queries to the given database.                                       |

## Connection errors

Hyperdrive may also return errors at runtime. This can happen during initial connection setup, or in response to a query or other wire-protocol command sent by your driver.

These errors are returned as `ErrorResponse` wire protocol messages, which are handled by most drivers by throwing from the responsible query or by triggering an error event.
Hyperdrive errors that do not map 1:1 with an error message code [documented by PostgreSQL](https://www.postgresql.org/docs/current/errcodes-appendix.html) use the `58000` error code.

Hyperdrive may also encounter `ErrorResponse` wire protocol messages sent by your database. Hyperdrive will pass these errors through unchanged when possible.

### Hyperdrive specific errors

| Error Message                                             | Details                                                                                          | Recommended fixes                                                                                                                                              |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Internal error.`                                         | Something is broken on our side.                                                                 | Check for an ongoing incident affecting Hyperdrive, and contact Cloudflare Support.                                                                            |
| `Failed to acquire a connection from the pool.`           | Hyperdrive timed out while waiting for a connection to your database, or cannot connect at all.  | If you are seeing this error intermittently, your Hyperdrive pool is being exhausted because too many connections are being held open for too long by your worker. This can be caused by a myriad of different issues, but long-running queries/transactions are a common offender. |
| `Server connection attempt failed: connection_refused`    | Hyperdrive is unable to create new connections to your origin database.                          | A network firewall or access control list (ACL) is likely rejecting requests from Hyperdrive. Ensure you have allowed connections from the public Internet. Sometimes, this can be caused by your database host provider refusing incoming connections when you go over your connection limit. |