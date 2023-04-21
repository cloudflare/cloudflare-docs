---
title: Aruba EdgeConnect Enterprise
pcx_content_type: integration-guide
weight: 1
---

# Aruba EdgeConnect Enterprise

Cloudflare partners with Aruba’s EdgeConnect SD-WAN solution to provide users with an integrated solution. The EdgeConnect appliances manage subnets associated with branch offices or retail locations. Anycast tunnels are set up between the EdgeConnect appliances and Cloudflare to securely route traffic. 

This tutorial describes how to configure the EdgeConnect device for both east-west (branch to branch) and north-south (Internet-bound) use cases.

{{<Aside type="warning">}}

Note that north-south traffic routed through Cloudflare’s Secure Web Gateway is an optional add-on feature set and requires a Cloudflare Zero Trust account. 

{{</Aside>}}

### Prerequisites

Before setting up a connection between EdgeConnect and Cloudflare, you must have:

- A contract that includes Magic WAN and Secure Web Gateway.
- Received two Cloudflare endpoints (Anycast IP address).
- Determined a private static /31 IP pair to use with each tunnel. The /31 pairs should be from a different private subnet, separate from the private subnets used behind each EdgeConnect appliance.
- The EdgeConnect devices used in this tutorial and on v9.0. 

## Example scenario 

<details>
<summary>
  GRE tunnel configuration
</summary>
 <div class="special-class" markdown="1">

For the purpose of this tutorial, the integration will refer to a scenario with two branch offices, each with distinct subnets.

There are 2 branch offices each with distinct subnets.

- The east branch office has a `10.3.0.0/16` network with an EdgeConnect terminating the Anycast GRE tunnel.
- The west branch office has a `10.30.0.0/16` network with an EdgeConnect terminating the Anycast GRE tunnel.

![Table of branch subnet information](/magic-wan/static/branch-subnets.png)

Below is an example of the **east_branch** deployment on the Orchestrator.

![GCP East deployment configuraiton](/magic-wan/static/east-branch-deployment.png)

The Deployment screenshot displays several different IP addresses and interfaces. From left to right:
- **Next Hop 10.3.0.1**  - This example uses Google Cloud. This IP defines the default gateway IP for the subnet and is built into GCP. 
- **IP/Mask (LAN) 10.3.0.2/24** - This defines the LAN0 interface IP of the EdgeConnect appliance.
- **IP/Mask (WAN) 10.2.0.2/24** - This defines the WAN0 interface IP of the EdgeConnect appliance.
- **Next Hop 10.2.0.1**  - This example uses Google Cloud. This IP defines the default gateway IP for the subnet and is built into GCP.
</div>
</details>

<details>
<summary>
  IPsec tunnel configuration
</summary>
 <div class="special-class" markdown="1">

For the purpose of this tutorial, the integration will refer to a scenario with two branch offices, each with distinct subnets.

The central branch office has a `10.22.0.0/24` network with an EdgeConnect terminating the Anycast IPsec tunnel. 

The west branch office has a `10.77.0.0/24` network with an EdgeConnect terminating the Anycast IPsec tunnel.

![IPsec tunnel values for east and west branches](/magic-wan/static/central-west-branch-ipsec.png)

Below is an example of the **central_branch** deployment on the Orchestrator.

![Values for central branch configuration within Orchestrator](/magic-wan/static/orchestrator-ipsec.png)

The Deployment screenshot displays several different IP addresses and interfaces. From left to right:
- **Next Hop 10.22.0.1**  - This example uses Google Cloud. This IP defines the default gateway IP for the subnet and is built into GCP. 
- **IP/Mask (LAN) 10.22.0.2/24** - This defines the LAN0 interface IP of the EdgeConnect appliance.
- **IP/Mask (WAN) 10.32.0.2/24** - This defines the WAN0 interface IP of the EdgeConnect appliance.
- **Next Hop 10.32.0.1**  - This example uses Google Cloud. This IP defines the default gateway IP for the subnet and is built into GCP.
</div>
</details>

## 1. Define a common site on the Orchestrator

For all EdgeConnect devices using Cloudflare, modify the devices to put them on the same site. This disables automatic IPsec tunnel creation between the EdgeConnect devices using the same labels for the WAN interfaces in use.

This step is only required if Cloudflare is used for east-west traffic routing.

## 2. Configure overlay policies 

We use Aruba Orchestrator’s Business Intent Overlays to create intuitive policies which automatically identify and steer application traffic to Cloudflare. Two Business Intent Overlay (BIO) policies are created in this example.

<details>
<summary>
  GRE tunnel configuration
</summary>
 <div class="special-class" markdown="1">

Cloudflare’s [tunnel health checks](/magic-transit/reference/probe-construction/) are ping reply packets encapsulated in GRE packets. The source IP is the Edgeconnect WAN interface used to establish a tunnel, and the destination IP is Cloudflare servers. These packets need to be sent directly from the WAN interface and not through the established tunnels.

To create the overlay policy:

1. Create a compound application, which is a combination of all [Cloudflare public IPs](https://www.cloudflare.com/ips/) and ICMP packets.

![Application definition screen with IP values](/magic-wan/static/app-definition.png)

2. Create a breakout Business Intent Overlay (BIO) to bypass the GRE tunnel as the first policy and use this newly created application as the match criteria. 

3. Define at least one additional overlay policy and the traffic you want to send to Cloudflare over the GRE tunnels.

The service name used to send traffic through the tunnel created in the next step is **Cloudflare_GRE**. The example uses **Match Everything** to send all other traffic through the established tunnel (both private east-west traffic & Internet bound north-south traffic through Cloudflare’s Secure Web Gateway). 

![Business Intent Overlay screen with breakout and CF overlays](/magic-wan/static/biz-intent-overlay.png)
</div>
</details>

<details>
<summary>
  IPsec tunnel configuration
</summary>
 <div class="special-class" markdown="1">

Cloudflare’s [tunnel health checks](/magic-transit/reference/probe-construction/) are ping reply packets encapsulated in IPsec packets. The source IP is the Edgeconnect WAN interface used to establish a tunnel, and the destination IP is Cloudflare servers. These packets need to be sent directly from the WAN interface and not through the established tunnels.

To create the overlay policy:

1. Create a compound application, which is a combination of all [Cloudflare public IPs](https://www.cloudflare.com/ips/) and ICMP packets.

![Application definition screen with IP values](/magic-wan/static/app-definition.png)

2. Create a breakout Business Intent Overlay (BIO) to bypass the IPsec tunnel as the first policy and use this newly created application as the match criteria. 

3. Define at least one additional overlay policy and the traffic you want to send to Cloudflare over the IPsec tunnels.

The service name used to send traffic through the tunnel created in the next step is **Cloudflare_IPsec**. The example uses **Match Everything** to send all other traffic through the established tunnel (both private east-west traffic and Internet bound north-south traffic through Cloudflare’s Secure Web Gateway). 

![Business Intent Overlay screen with breakout and CF overlays for IPsec](/magic-wan/static/biz-intent-overlay-ipsec.png)
</div>
</details>

## 3. Create tunnels on Cloudflare and EdgeConnect

<details>
<summary>
  GRE tunnel configuration
</summary>
 <div class="special-class" markdown="1">

![Diagram of GCP, Aruba Orchestratror, and Cloudflare products](/magic-wan/static/gcp-edgeconnect-diagram.png)

1. Create a tunnel on the EdgeConnect using Cloudflare’s assigned public Anycast IP and the service used in the overlay policy in the [previous step](#2-configure-overlay-policies). 
2. Create a Virtual Tunnel Interface (VTI) using the private IP pair shared with CF GRE tunnel endpoint and the passthrough tunnel to match the newly created tunnel alias (**CF_GRE_east** in our example).

![Modify Passthrough Tunnel screen](/magic-wan/static/modify-passthrough.png)

![Edit Virtual Tunnel Interface screen](/magic-wan/static/edit-vti.png)

3. Define a GRE tunnel on the Cloudflare dashboard using the EdgeConnect appliance’s public IP and the private IP pair /31 shared with the appliance. 

![GRE tunnels information for each branch](/magic-wan/static/gre-tunnels-edgeconnect.png)
</div>
</details>

<details>
<summary>
  IPsec tunnel configuration
</summary>
 <div class="special-class" markdown="1">

![Diagram of GCP, Aruba Orchestratror, and Cloudflare products for IPsec tunnels](/magic-wan/static/gcp-edgeconnect-diagram-ipsec.png)

For additional information on creating IPsec tunnels, refer to [API documentation for IPsec tunnels](/api/operations/magic-i-psec-tunnels-create-i-psec-tunnels).

- `X-Auth-Email`: Your Cloudflare email ID
- `X-Auth-Key`: Seen in the URL (dash.cloudflare.com/<X-Auth-Key>/....)
- `Account key`: Global API token in Cloudflare dashboard

1. Test new IPsec tunnel creation

```bash
---
header: Request
---
curl -X POST "https://api.cloudflare.com/client/v4/accounts/<account_id>/magic/ipsec_tunnels?validate_only=true" \
     -H "X-Auth-Email: user@example.com" \
     -H "X-Auth-Key: XXXXXXXXXX" \
     -H "Content-Type: application/json" \
     --data '{"ipsec_tunnels":[{"name":"EdgeConnect_IPSEC_1","customer_endpoint":"35.188.72.56","cloudflare_endpoint":"172.64.241.205","interface_address":"192.168.10.11/31","description":"Tunnel for EdgeConnect - GCP Central"}]}'
```

2. Create a new IPsec tunnel

```bash
---
header: Request
---
curl -X POST "https://api.cloudflare.com/client/v4/accounts/<account_id>/magic/ipsec_tunnels" \
     -H "X-Auth-Email: user@example.com" \
     -H "X-Auth-Key: XXXXXXXXXX" \
     -H "Content-Type: application/json" \
--data '{"ipsec_tunnels":[{"name":"EdgeConnect_IPSEC_1","customer_endpoint":"35.188.72.56","cloudflare_endpoint":"172.64.241.205","interface_address":"192.168.10.11/31","description":"Tunnel for EdgeConnect - GCP Central"}]}'
```

```json
---
header: Response
---
{
  "result": {
    "ipsec_tunnels": [
      {
        "id": "tunnel_id",
        "interface_address": "192.168.10.11/31",
        "created_on": "2022-04-14T19:57:43.938376Z",
        "modified_on": "2022-04-14T19:57:43.938376Z",
        "name": "EdgeConnect_IPSEC_1",
        "cloudflare_endpoint": "172.64.241.205",
        "customer_endpoint": "35.188.72.56",
        "description": "Tunnel for EdgeConnect - GCP Central",
        "health_check": {
          "enabled": true,
          "target": "35.188.72.56",
          "type": "reply"
        }
      }
    ]
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

3. Generate Pre Shared Key (PSK) for tunnel

Use the tunnel ID from the response in Step 2. Save the pre-shared key generated in this step as you will need it to set up tunnels on the Orchestrator.

```bash
---
header: Request
---
curl -X POST "https://api.cloudflare.com/client/v4/accounts/<account_id>/magic/ipsec_tunnels/e70536b11daa47e09ff046fbb9800e4f/psk_generate?validate_only=true" \
     -H "X-Auth-Email: user@example.com" \
     -H "X-Auth-Key: XXXXXXXXXX" \
     -H "Content-Type: application/json"
```

```bash
---
header: Response
---
{
"result": {
"ipsec_id": "<ipsec_id>",
"ipsec_tunnel_id": "<tunnel_id>",
"psk": "XXXXXXXXXXXXXXXXX",
"psk_metadata": {
"last_generated_on": "2022-04-14T20:05:29.756514071Z"
}
},
"success": true,
"errors": [],
"messages": []
}
```

**Create an IPsec tunnel on EdgeConnect**

You can create a tunnel after the Business Intent Overlay policies have been defined. Use the correct policy or service created in [configure overlay policy](/magic-wan/tutorials/aruba-edgeconnect/#2-configure-overlay-policies). The local IP is the local WAN interface of the EdgeConnect device, and the remote IP is the Cloudflare public IP assigned as the tunnel endpoint.

![Modify Passthrough Tunnel dialog with General values](/magic-wan/static/general-modify-passthrough.png)

![Modify Passthrough Tunnel dialog with IKE values](/magic-wan/static/ike-modify-passthrough.png)

![Modify Passthrough Tunnel dialog with IPsec values](/magic-wan/static/ipsec-modify-passthrough.png)

**Create a Virtual Tunnel Interface (VTI) on the EdgeConnect appliance**

![Values for Edit VTI Interface](/magic-wan/static/vti-interface-ipsec.png)
</div>
</details>

## 4. Create static routes on Cloudflare and EdgeConnect

<details>
<summary>
  GRE tunnel configuration
</summary>
 <div class="special-class" markdown="1">

1. Define static routes on the Cloudflare dashboard for the LAN subnet(s) attached to the EdgeConnect appliance. Use the private IP pair for the EdgeConnect tunnel endpoint. 

    In the example below, the traffic to subnet `10.3.0.0/16` attached to the **east_branch** EdgeConnect appliance has a next hop of `10.40.8.10`.

![Static route information for each branch](/magic-wan/static/static-routes-cf.png)

2. Define static routes on the Orchestrator so Cloudflare can route traffic between sites. 

    In the example below, we create a route for the subnet `10.30.0.0/24` on the **west_branch** to be routed via the established GRE tunnel between the EdgeConnect appliance and Cloudflare.

![Static route information for each branch](/magic-wan/static/static-routes-edgeconnect.png)
</div>
</details>

<details>
<summary>
  IPsec tunnel configuration
</summary>
 <div class="special-class" markdown="1">

![Static route values from Cloudflare dashboard](/magic-wan/static/static-routes-ipsec.png)

**Static routes for central branch on EdgeConnect**

![Static route values from EdgeConnect for central branch](/magic-wan/static/static-routes-central-ipsec.png)

**Static routes for west branch on EdgeConnect**

![Static route values from EdgeConnect for west branch](/magic-wan/static/static-routes-west-ipsec.png)
</div>
</details>

## 5. Validate traffic flow

<details>
<summary>
  GRE tunnel configuration
</summary>
 <div class="special-class" markdown="1">

**Validate Secure Web Gateway**

To validate traffic flow from the local subnet through Cloudflare’s Secure Web Gateway, perform a curl as show in the example below.

![Curl example for validating Secure Web Gateway](/magic-wan/static/validate-swg-curl.png)

You can validate the request went through Gateway with the presence of the `Cf-Team` response header, or by looking at the logs in the dashboard under **Logs** > **Gateway** > **HTTP**.

![Dashboard example for validating Secure Web Gateway](/magic-wan/static/dash-validate-swg.png)

**Validate east-west traffic**

To validate east-west traffic flow, perform a traceroute as shown in the example.

![Traceroute example for verifying east-west traffic](/magic-wan/static/validate-traceroute.png)

The example shows a client in GCP East (`10.3.0.3`), which can ping the private IP of a client in GCP West (`10.30.0.4`). 

The traceroute shows the path going from the client (`10.3.0.3`) <br>
→ to the GCP East lan0 IP on the EdgeConnect (`10.3.0.2`) <br>
→ to the Cloudflare private GRE endpoint IP (`10.4.8.11`) <br>
→ to the GCP West lan0 IP on the West EdgeConnect (`10.30.0.3`) <br>
→ to the GCP West client (`10.30.0.4`). 

This validates the east-west traffic flow through Cloudflare Magic WAN.
</div>
</details>

<details>
<summary>
  IPsec tunnel configuration
</summary>
 <div class="special-class" markdown="1">

**Validate Secure Web Gateway**

To validate traffic flow from the local subnet through Cloudflare’s Secure Web Gateway, perform a cURL as shown in the example below.

![cURL example for validating traffic](/magic-wan/static/static-routes-west-ipsec.png)

You can validate the request was sent through Secure Web Gateway with the presence of the `Cf-Team` response header or by looking at the logs in the dashboard under **Logs** > **Gateway** > **HTTP**.

![Dashboard example for validating Secure Web Gateway](/magic-wan/static/dash-validation-ipsec.png)

**Validate east-west traffic**

To validate east-west traffic flow, perform a traceroute as shown in the example.

![Traceroute example for IPsec validation](/magic-wan/static/traceroute-ipsec.png)

The example shows a client in GCP Central (`10.22.0.9`), which can ping the private IP of a client in GCP West (`10.77.0.10`).

The traceroute shows the path going from the client (`10.22.0.9`) <br>
→ to the GCP Central lan0 IP on the EdgeConnect (`10.22.0.2`) <br>
→ to the Cloudflare private IPsec endpoint IP (`192.168.10.11`) <br>
→ to the GCP West EdgeConnect private IPsec endpoint IP (`192.168.15.10`) <br>
→ to the GCP West client (`10.77.0.10`).

This validates the east-west traffic flow through Cloudflare Magic WAN.
</div>
</details>

## 6. Cloudflare policies

At this point, the GRE or IPsec tunnels should be connected from the EdgeConnect appliances to Cloudflare's global network, and traffic is scoped to route over the tunnels using the EdgeConnect Business Intent Overlays. 

To begin filtering traffic and gathering analytics, refer to the [Magic Firewall documentation](/magic-firewall/) to learn how to create filters for east-west inter-branch traffic and the [Secure Web Gateway documentation](/cloudflare-one/policies/filtering/) to learn how to configure Gateway policies if you decide to send traffic from your local private subnets to the Internet through Cloudflare Gateway.
