---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/360021621972-Exposing-applications-running-on-Microsoft-Azure-with-Cloudflare-Argo-Tunnel
title: Exposing applications running on Microsoft Azure with Cloudflare Argo Tunnel
---

# Exposing applications running on Microsoft Azure with Cloudflare Argo Tunnel



## Overview

Cloudflare Argo Tunnel can expose applications running on the Microsoft Azure platform. Refer to Cloudflare's [install & configure Argo Tunnel](/cloudflare-one/connections/connect-apps/) guide. Also, a prebuilt Cloudflare Linux image exists on the Azure Marketplace. To simplify the process of connecting Azure applications to Cloudflare’s network, deploy the prebuilt image to an Azure resource group.

Prerequisites include:

-   a Cloudflare account enabled with Argo Tunnel
-   at least one domain connected to the Cloudflare account

___

## Installing the prebuilt Linux image

The prebuilt Cloudflare Linux image resides on the [Azure Marketplace](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/cloudflare.cloudflare_tunnel_vm?tab=Overview) or can be opened in the [Azure Portal](https://portal.azure.com/#create/cloudflare.cloudflare_azurecloudflare_azure).

The Cloudflare virtual machine (VM) is customizable. However, we recommend the following:

-   Do not alter the disk image for the VM.
-   Switch **authentication type** to _password_ and create a username and password.
-   Enable SSH in the **inbound port rules**.
-   Add the Cloudflare VM to the same virtual network as the exposed Azure applications.

___

## Configuring the VM

SSH into the Cloudflare VM. A simple application called **example.py** is included in the VM for testing. The test application launches a Python Flask service that listens on localhost port 5000. To start the test application, type the _screen_ command at the command prompt. Then, start the application in the screen session by running:

```sh
$ python /usr/cloudflare/example.py
```

Exit the screen session with a keyboard shortcut _Ctrl_ + _a_ + _d._ To reattach the screen session, enter the following command:

```sh
$ screen -r
```

Also, to permanently end the screen session and related processes, type the following command within the screen session:

```sh
$ exit
```

The Azure Cloudflare image is preinstalled with the [**cloudflared** client for Argo Tunnel](/cloudflare-one/connections/connect-apps).  However, configuration is required to connect an application to the Cloudflare network. The first step is to run the following command within the Cloudflare VM:

```sh
$ cloudflared login
```

The command outputs a link that allows a domain to be authorized for use with Argo Tunnel. After the Cloudflare account is authorized, run the following command to configure Argo Tunnel with the information necessary to expose the Azure application:

```sh
$ cloudsetup
```

{{<Aside type="tip">}}
Set the **origin IP** to *127.0.0.1* if the application is running on
the Cloudflare VM instance.
{{</Aside>}}

When using the Cloudflare VM to expose an Azure resource on a different instance, the **origin IP** is the private virtual network IP of the resource running the exposed application. The _cloudsetup_ utility automatically starts **cloudflared** as a service within the instance.

Check the status of the **cloudflared** service:

```sh
$ service cloudflared status
```

At this point, the application should be live at the authorized Cloudflare domain and using the hostname supplied within the _cloudsetup_ utility.

___

## Changing the Cloudflared configuration

1\. Stop the **cloudflared** tunnel service before changing the configuration of the Cloudflare Argo Tunnel VM:

```sh
$ service cloudflared stop
```

{{<Aside type="tip">}}
If switching domains, first delete the certificate stored in
*\~/.cloudflared/* or to authorize a different domain, run: *cloudflared
login*
{{</Aside>}}

2\. Delete the **cloudflared** config:

```sh
$ sudo rm /etc/cloudflared/config.yml
```

3\. Run _cloudsetup_ again to reconfigure subdomain info, origin IP, and port settings. The _cloudsetup_ utility automatically restarts the tunnel service.

___

## Relevant resources

-   [Add a domain to Cloudflare](https://support.cloudflare.com/hc/articles/201720164)
-   [Argo Tunnel Developer Documentation](/cloudflare-one/connections/connect-apps/)
