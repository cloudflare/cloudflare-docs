---
order: 7
hidden: true
---

# Other Protocols

Cloudflare Access can secure connections to applications over arbitrary TCP protocols using Argo Tunnel. The feature includes support for commands to specify SMB connections to SMB file shares as well as a command for arbitrary TCP traffic.

Doing so requires both the protected server and the client use Argo Tunnel. Argo Tunnel exposes your origin server directly to Cloudflare, avoiding external internet connections. Using Argo Tunnel ensures that Cloudflare evaluates all requests to your application.

Establishing an arbitrary TCP or SMB connection to an Access-protected server requires installing Cloudflare's `cloudflared` command-line tool on the client machine so that it can connect over Argo Tunnel.

|Guide|Description|
|---|---|
|[SMB](/other-protocols/smb-guide/)|Guide to securing SMB file shares.|
|[Arbitrary TCP](/other-protocols/tcp-guide/)|Guide to proxying arbitrary TCP.|
|[kubectl](/other-protocols/kubectl/)|Guide to protecting Kubernetes API servers.|
