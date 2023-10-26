---
pcx_content_type: reference
title: Tunnel permissions
weight: 8
---

# Tunnel permissions

Tunnel permissions determine who can run and manage a Cloudflare Tunnel. Two files control permissions for a locally-managed tunnel:

- **An account certificate** (`cert.pem`) is issued for a Cloudflare account when you login to `cloudflared`.  Make sure you are intentional about the locations and machines you store this certificate on, as this certificate allows users to create, delete, and manage all tunnels for the account.
- **A tunnel credentials file** (`<TUNNEL-UUID>.json`) is issued for a tunnel when you create the tunnel. The credentials file only allows the user to run that specific tunnel, and do nothing else. Hence, as an admin, you can share tunnel credentials with users who will run the tunnel.

Refer to the table below for a comparison between the two files and the purposes for which they are intended.

{{<table-wrap>}}

|                         | Account certificate                                                                                                                    | Tunnel credential                                                                                                                    |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **File name**           | `cert.pem`                                                                                                                             | `<TUNNEL-UUID>.json`                                                                                                                   |
| **Purpose**             | Authenticates your instance of `cloudflared` against your Cloudflare account                                                           | Authenticates the tunnel it is associated with                                                                                         |
| **Scope**               | Account-wide                                                                                                                           | Tunnel-specific                                                                                                                        |
| **File type**           | `.pem`                                                                                                                                 | `.json`                                                                                                                                |
| **Stored in**           | [Default directory](/cloudflare-one/connections/connect-networks/get-started/tunnel-useful-terms/#default-cloudflared-directory) | [Default directory](/cloudflare-one/connections/connect-networks/get-started/tunnel-useful-terms/#default-cloudflared-directory) |
| **Issued when running** | `cloudflared tunnel login`                                                                                                             | `cloudflared tunnel create <NAME>`                                                                                                     |
| **Valid for**           | At least 10 years, and the service token it contains is valid until revoked                                                            | Does not expire                                                                                                                        |
| **Needed to**           | Manage tunnels (for example, create, route, delete and list tunnels)                                                                   | Run a tunnel. Create a config file.                                                                                                    |

{{</table-wrap>}}

## Tunnel ownership

Tunnel ownership is bound to the Cloudflare account for which the `cert.pem` file was issued upon authenticating `cloudflared`. If a user in a Cloudflare account creates a tunnel, any other user in the same account who has access to the `cert.pem` file for the account can delete, list, or otherwise manage tunnels within it.
