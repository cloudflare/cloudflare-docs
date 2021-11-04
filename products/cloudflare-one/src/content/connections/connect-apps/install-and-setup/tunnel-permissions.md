---
order: 4
title: Tunnel guide
pcx-content-type: reference
---

---
order: 3
pcx-content-type: reference
---

# Tunnel permissions

Cloudflare Tunnel requires two files: 

* An [account certificate](/connections/connect-apps/install-and-setup/tunnel-useful-terms#cert-pem) (the `cert.pem`)
* A tunnel [credentials file](/connections/connect-apps/install-and-setup/tunnel-useful-terms#credentials-file) (`<TUNNEL-UUID>.json`) for each tunnel

Refer to the table below for a comparison between the two files and the purposes for which they are intended.

<TableWrap>

| | Account certificate | Tunnel certificate |
| -- | -- | -- |
| **File name** | `cert.pem` | `<TUNNEL-UUID>.json` |
| **Purpose** | Authenticates your instance of `cloudflared` against your Cloudflare account | Authenticates the tunnel it is associated with |
| **Scope** | Account-wide | Tunnel-specific |
| **File type** | `.pem` | `.json` |
| **Stored in** | [Default directory](/connections/connect-apps/install-and-setup/tunnel-useful-terms#default-cloudflared-directory) | [Default directory](/connections/connect-apps/install-and-setup/tunnel-useful-terms#default-cloudflared-directory) |
| **Issued when running** | `cloudflared tunnel login` | `cloudflared tunnel create <NAME>` | Valid for | at least 10 years, and the service token it contains is valid until revoked | | 
| **Needed to** | Create, delete and route tunnels. Change DNS records. | Run a tunnel. Create a config file. |

</TableWrap>

## Tunnel ownership

Tunnel ownership is bound to the Cloudflare account for which the `cert.pem` file was issued upon authenticating `cloudflared`. If a user in a Cloudflare account creates a tunnel, any other user in the same account who has access to the `cert.pem` file for the account can delete, list, or otherwise manage tunnels within it.