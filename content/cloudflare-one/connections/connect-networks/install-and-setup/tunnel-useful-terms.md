---
pcx_content_type: reference
title: Useful terms
weight: 4
---

# Useful terms

{{<render file="_cloudflared-new-ui.md">}}

Review terminology for tunnels setup locally through the CLI.

## Tunnel

A tunnel is a secure, outbound-only pathway you can establish between your origin and the Cloudflare global network. Each tunnel you create will be assigned a [name](#tunnel-name) and a [UUID](#tunnel-uuid).

## Tunnel UUID

A tunnel UUID is an alphanumeric, unique ID assigned to a tunnel. The tunnel UUID can be used in [configuration files](#configuration-file), and in general, whenever you need to reference a specific tunnel.

## Tunnel name

The `cloudflared tunnel create <NAME>` command creates a tunnel and assigns it a name. Once named, a tunnel is a persistent pathway within which you can stop and start as many [connectors](#connector) as needed, adding stability and ease of use to your tunnel experience. Tunnel names do not need to be hostnames; for example, you can assign your tunnel a name that represents your application/network, a particular server, or the cloud environment where it runs. Just choose any identifier that lets you easily reference a tunnel whenever you need.

## Connector

The connector, referred to as `cloudflared`, establishes connectivity from your origin server to the Cloudflare global network. Our connector offers high availability by creating four long-lived connections to two distinct data centers within Cloudflare’s global network. This built-in redundancy means that if an individual connection, server, or data center goes down, your origin remains available.
  
## Replica

You can create and configure a tunnel once and run that tunnel through multiple, unique instances of the connector, `cloudflared`. These instances are known as replicas. DNS records and Cloudflare Load Balancers will still point to the tunnel and its DNS Record (`UUID.cfargotunnel.com`), while that tunnel sends traffic to the multiple instances of `cloudflared` that run through it. Today, there is no guarantee about which replica will be chosen. Replicas are often deployed to provide tunnels with high availability in the event a given host running `cloudflared` is interrupted or taken offline.

## Default `cloudflared` directory

`cloudflared` uses a default directory when storing credentials files for your tunnels, as well as the `cert.pem` file it generates when you run `cloudflared login`. The default directory is also where `cloudflared` will look for a [configuration file](#configuration-file) if no other file path is [specified](/cloudflare-one/connections/connect-networks/install-and-setup/tunnel-guide/local/local-management/configuration-file/#naming-and-storing-a-configuration-file) when running a tunnel.

| OS                          | Path to default directory                                                              |
| --------------------------- | -------------------------------------------------------------------------------------- |
| Windows                     | `%USERPROFILE%\.cloudflared`                                                           |
| macOS and Unix-like systems | `~/.cloudflared`, `/etc/cloudflared`, and `/usr/local/etc/cloudflared`, in this order. |

## Configuration file

This is a `.yaml` file that functions as the operating manual for `cloudflared`. `cloudflared` will automatically look for the configuration file in the [default `cloudflared` directory](/cloudflare-one/connections/connect-networks/install-and-setup/tunnel-useful-terms/#default-cloudflared-directory), but you can store your configuration file in any directory. It is recommended to always specify the file path for your configuration file whenever you reference it. By creating a configuration file, you can have fine-grained control over how their instance of `cloudflared` will operate. This includes operations like what you want `cloudflared` to do with traffic (for example, proxy websockets to port `xxxx`, or ssh to port `yyyy`), where `cloudflared` should search for authorization (credentials file, tunnel token), and what mode it should run in (for example, [`warp-routing`](/cloudflare-one/connections/connect-networks/private-net/)). In the absence of a configuration file, cloudflared will proxy outbound traffic through port `8080`. For more information on how to create, store, and structure a configuration file, refer to the [dedicated instructions](/cloudflare-one/connections/connect-networks/install-and-setup//tunnel-guide/local/local-management/configuration-file/).

## Ingress rule

[Ingress rules](/cloudflare-one/connections/connect-networks/install-and-setup/tunnel-guide/local/local-management/ingress/) let you specify which local services traffic should be proxied to. If a rule does not specify a path, all paths will be matched. Ingress rules can be listed in your [configuration file](#configuration-file) or when running `cloudflared tunnel ingress`.

## Cert.pem

This is the certificate file issued by Cloudflare when you run `cloudflared tunnel login`. This file uses a certificate to authenticate your instance of `cloudflared` and it is required when you create new tunnels, delete existing tunnels, change DNS records, or configure tunnel routing from cloudflared. This file is not required to perform actions such as running an existing tunnel or managing tunnel routing from the Cloudflare dashboard. Refer to the [Tunnel permissions page](/cloudflare-one/connections/connect-networks/install-and-setup/tunnel-permissions/) for more details on when this file is needed.

The `cert.pem` origin certificate is valid for at least 10 years, and the service token it contains is valid until revoked.

## Credentials file

This file is created when you run `cloudflared tunnel create <NAME>`. It stores your tunnel’s credentials in JSON format, and is unique to each tunnel. This file functions as a token authenticating the tunnel it is associated with. Refer to the [Tunnel permissions page](/cloudflare-one/connections/connect-networks/install-and-setup/tunnel-permissions/) for more details on when this file is needed.

## Quick tunnels

Quick tunnels, when run, will generate a URL that consists of a random subdomain of the website `trycloudflare.com`, and point traffic to localhost on port 8080. If you have a web service running at that address, users who visit the generated subdomain will be able to visit your web service through Cloudflare’s network. Refer to [TryCloudflare](/cloudflare-one/connections/connect-networks/do-more-with-tunnels/trycloudflare/) for more information on how to run quick tunnels.

## Virtual networks

A software abstraction that allows you to logically segregate resources on your private network.  [Tunnel Virtual Networks](/cloudflare-one/connections/connect-networks/private-net/tunnel-virtual-networks/) are especially useful for exposing resources which have overlapping IP routes. To connect to a resource, end users would select a virtual network in their WARP client settings before entering the destination IP.
