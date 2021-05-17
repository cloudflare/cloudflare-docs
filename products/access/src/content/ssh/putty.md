---
order: 12
---

# Connecting from a PuTTY Client

<Aside type='warning' header='⚠️ THIS PAGE IS OUTDATED'>

We're no longer maintaining this page. **It will be deleted on Feb 8, 2021**. Please visit the new [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/teams-docs-changes) instead.

</Aside>

[PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/) is a free implementation of SSH for Windows and Unix platforms. You can configure your machine to use PuTTy to connect to an SSH host secured with Cloudflare Access.

## Before you begin

[Download](https://developers.cloudflare.com/argo-tunnel/downloads/) the `cloudflared.exe` file from the options available.

## Establish a `cloudflared` connection to the host machine

You need the hostname of the machine you are reaching through Access. With that hostname, run the following command, which launches a browser window that prompts you to authenticate your identity credentials.

```sh
$ cloudflared.exe access ssh --hostname <the hostname of the SSH server> --url localhost:<unused port>
```

## Configure PuTTY

1. Open the PuTTY application and connect to your SSH username at the address of the port you defined to connect to the target machine.

![New Drop](../static/putty-config.png)

2. (Optional) Define your private key, and click **Open** to initiate the SSH session.

![New Drop](../static/putty-open.png)

The output below will be returned when the session has started successfully.

![New Drop](../static/putty-start.png)
