---
order: 5
pcx-content-type: reference
---

# Useful terms

## Tunnel
A tunnel is a secure, outbound-only pathway you can establish between your origin and the Cloudflare edge. Each tunnel you create will be assigned a [name](#tunnel-name) and a [UUID](#tunnel-uuid).

## Tunnel UUID
A tunnel UUID is an alpha-numeric, unique ID assigned to a tunnel. The tunnel UUID can be used in [configuration files](#configuration-file), and in general, whenever you need to reference a specific tunnel. 

## Tunnel name
The `cloudflared tunnel create <NAME>` command creates a tunnel and assigns it a name. Once named, a tunnel is a persistent pathway within which you can stop and start as many [connectors](#connector) as needed, adding stability and ease of use to your tunnel experience. Tunnel names do not need to be hostnames; for example, you can assign your tunnel a name that represents your application/network, a particular server, or the cloud environment where it runs. A human-readable identifier lets you easily reference a tunnel whenever you need.

## Connector
Users can create and configure a tunnel once and run it as multiple different `cloudflared` processes. These processes are known as connectors. DNS records and Cloudflare Load Balancers can still point to the tunnel and its UUID, while that tunnel sends traffic to the multiple instances of cloudflared that run through it. Using multiple connectors provides tunnels with high availability, scalability, and elasticity.

## Configuration file
This is a `.yaml` file that functions as the operating manual for `cloudflared`. By creating a configuration file, you can have fine-grained control over how their instance of cloudflared will operate. This includes operations like what you want `cloudflared` to do with traffic (for example, proxy websockets to port `xxxx`, or ssh to port `yyyy`), where `cloudflared` should search for authorization (credentials file, tunnel token), and what mode it should run in (for example, [`warp-routing`](/connections/connect-networks/private-net/create-tunnel#configure-the-tunnel)). In the absence of a configuration file, cloudflared will proxy outbound traffic through port `8080`. For more information on how to create, store, and structure a configuration file, refer to the [dedicated instructions](/connections/connect-apps/configuration/configuration-file).

## Cert.pem
This is the certificate file issued by Cloudflare when you run `cloudflared tunnel login`. This file uses a certificate to authenticate your instance of `cloudflared` and it is required when you create new tunnels, delete existing tunnels, change DNS records, or configure tunnel routing from cloudflared. This file is not required to perform actions such as running an existing tunnel or managing tunnel routing from the Cloudflare dashboard. The `cert.pem` origin certificate is valid for at least 10 years, and the service token it contains is valid until revoked. 

## Credentials file
This file is created when you run `cloudflared tunnel create <NAME>`. It stores your tunnel’s credentials in JSON format, and is unique to each tunnel. This file functions as a token authenticating the tunnel it is associated with.

## Ingress rule
Ingress rules let users specify which local services traffic should be proxied to. If a rule does not specify a path, all paths will be matched. Ingress rules can be listed in your [configuration file](#configuration-file) or when running `cloudflared tunnel ingress`.  

## Quick tunnels
Quick tunnels, when run, will generate a URL that consists of a random subdomain of the website `trycloudflare.com`, and point traffic to localhost on port 8080. If you have a web service running at that address, users who visit the generated subdomain will be able to visit your web service through Cloudflare’s network. Refer to [TryCloudflare](/connections/connect-apps/do-more-with-tunnels/trycloudflare) for more information on how to run quick tunnels.