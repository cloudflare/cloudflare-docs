---
title: On-ramp
pcx-content-type: tutorial
order: 2
---

# On-ramp

You can use a variety of on-ramp options with Magic WAN, including [Anycast GRE tunnels](https://developers.cloudflare.com/magic-transit/about/tunnels-and-encapsulation), [Cloudflare Network Interconnect](https://developers.cloudflare.com/network-interconnect/), [Cloudflare Tunnel](https://developers.cloudflare.com/load-balancing/additional-options/cloudflare-tunnel), [WARP](https://developers.cloudflare.com/warp-client/), or one of [Cloudflare's Network On-ramp partners](https://blog.cloudflare.com/network-onramp-partnerships).

## Set up a GRE on-ramp using Gateway

Before you can begin using GRE as on-ramp, you must have already completed onboarding with Magic WAN.

### 1. Enable Gateway 

Contact your account manager to enable Teams Gateway on your account.

### 2. Set up your client

First, reserve an IP for the GRE tunnel and then create a VM instance. The example below uses the Google Cloud Platform, but you should set up a GRE tunnel from the device on your side.

**Reserve an IP for the GRE tunnel**

`gcloud compute addresses create $ADDRESS_NAME  --region=$REGION`

**Create a new GCP VM instance**

`gcloud compute instances create $VM_NAME --address=$ADDRESS_NAME --tags=gre-inbound --zone=$ZONE`

### 3. Set up the GRE tunnel and static route to Cloudflare

**Add a new GRE tunnel to your account config**

```
- name: mt-gw-gcp
  remote: $IP_ADDRESS
  local: <your cf_gre_ip>
  addrs:
  - 10.0.0.1/31
  check_health: false
  ```

 **Add a new static route** 

 Note the RFC1918 address used for the prefix. This address is assigned to the GCP instance so that the Gateway response can come down this tunnel. In the example below, replace `1234` with your account ID.

```
cloudflared access curl "https://conduit-api.cfdata.org/accounts/1234/routes" --data '{"routes": [{"prefix":"10.0.0.100/32","nexthop":"10.0.0.0","priority":100}]}'
```

### 4. Set up a GRE tunnel in GCP

```
gcloud beta compute ssh "$VM_NAME"  --project "magic-transit"
# Get the private ip address of the instance
ip addr show  dev ens4 | grep "inet 10"# Create the gre tunnelip tunnel add cf-gw-upgrade mode gre remote <cf_gre_ip> local  <private ip of instance> ttl 255
ip link set cf-gw-gcp
# Add an address pair to the tunnel
ip addr add 10.0.0.0/31 dev cf-gw-gcp
```

### 5. Route web requests over the GRE tunnel
 
With the GRE tunnel set up on both sides, now you need to route web requests from the GCP node over the tunnel to Cloudflare. In the example below, we also included a rule that says any traffic from a private IP should go over this GRE tunnel.

```
# bind an ip address to source requests from
ip addr add 10.0.0.100/32 dev lo
ip link set dev lo up
 
# Add a table and a rule to route requests from 10.0.0.100 over the GRE tunnel
echo "100 onramp" >> /etc/iproute2/rt_tables
ip route add default via 10.0.0.1 table onramp
ip rule add from 10.0.0.100/32 table onramp
```

### 6. Generate requests

`curl --interface 10.0.0.100 -sk https://cloudflare.com/cdn-cgi/trace`

Now when you navigate to the [Teams Dashboard](https://dash.teams.cloudflare.com/) under **Logs** > **Gateway** > **HTTP**, your connection should be listed.