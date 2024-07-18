---
pcx_content_type: concept
title: Reference
weight: 5
---

# Reference

Refer to this page for details about how Cloudflare orchestrates VPN connectivity to your cloud networks.

## Cloud on-ramps

### AWS

![Diagram showing how Cloudflare creates on-ramps to AWS](/images/magic-cloud-networking/reference/aws.png)

When using Magic Cloud Networking {{<inline-pill style="beta">}} to automatically create on-ramps to your AWS account, you should be aware of the following configuration changes Cloudflare will make on your behalf:
- Cloudflare will create a new customer-managed prefix list named **Magic WAN and Cloudflare Edge** populated with your [Magic WAN Address Space](/magic-cloud-networking/cloud-on-ramps/#magic-wan-address-space) prefixes and the IPv4 address ranges for Cloudflare's global network servers (the latter prefixes are necessary if you use any Cloudflare L7 processing features). You must create rules in your Network Security Groups (NSGs) allowing traffic to/from this prefix list in order to have connectivity with Magic WAN. (The prefix list will contain around 15 to 25 entries, which each count against the rules-per-security-group quota for NSGs in your AWS account.)
- Cloudflare will create a Virtual Private Gateway and attach it to your Virtual Private Cloud (VPC). If an existing Virtual Private Gateway is already attached to the VPC, on-ramp creation will fail.
- Cloudflare will enable route propagation from the Virtual Private Gateway into all route tables in your VPC. This will result in a route for each prefix in your [Magic WAN Address Space](/magic-cloud-networking/cloud-on-ramps/#magic-wan-address-space) targeting the gateway.
- Cloudflare will add a route in Magic WAN for each IPv4 CIDR block in your VPC.

### Azure

![Diagram showing how Cloudflare creates on-ramps to AWS](/images/magic-cloud-networking/reference/azure.png)

When using Magic Cloud Networking to automatically create on-ramps to your Azure account, you should be aware of the following configuration changes Cloudflare will make on your behalf:

- Cloudflare will create a Virtual Network Gateway in your Virtual Network (VNet). Virtual Network Gateways in Azure require a subnet named `GatewaySubnet`. Cloudflare will create a `GatewaySubnet` if one does not already exist in your VNet. If there is not enough unused address space left in your VNet to create a `GatewaySubnet`, or if a `GatewaySubnet` exists but does not have enough address space left for a Virtual Network Gateway, on-ramp creation will fail.
- Cloudflare will enable gateway route propagation on all route tables in your VNet. This will result in a route for each prefix in your [Magic WAN Address Space](/magic-cloud-networking/cloud-on-ramps/#magic-wan-address-space) pointing to the gateway. If your VNet has other Virtual Network Gateways, their routes will also propagate to your route tables. If you delete the on-ramp, route propagation will not be disabled.
- By default, Network Security Groups in Azure contain Allow rules for outbound/inbound traffic to/from the `VirtualNetwork` service tag, which includes Virtual Network Gateway address space (and therefore your Magic WAN Address Space). If you do not want all resources in your VNet to be accessible from Magic WAN, add the appropriate Deny rules to your Network Security Groups (NSGs).
- Cloudflare will add a route in Magic WAN for each IPv4 address range in your VNet.

## Supported resources

Magic Cloud Networking discovers the following resource types.

### AWS
- AWS Customer Gateway
- AWS EC2 Managed Prefix List
- AWS Egress Only Internet Gateway
- AWS Internet Gateway
- AWS Route Table
- AWS Security Group
- AWS Subnet
- AWS VPC
- AWS VPC IPv4 CIDR Block Association
- AWS VPC Security Group Egress Rule
- AWS VPC Security Group Ingress Rule
- AWS VPN Connection
- AWS VPN Connection Route
- AWS VPN Gateway

### Azure
- Azure Local Network Gateway
- Azure Public IP
- Azure Route
- Azure Route Table
- Azure Subnet
- Azure Subnet Route Table Association
- Azure Virtual Network
- Azure Virtual Network Gateway
- Azure Virtual Network Gateway Connection

### GCP
- Google Compute Address
- Google Compute Forwarding Rule
- Google Compute Global Address
- Google Compute HA VPN Gateway
- Google Compute Interconnect Attachment
- Google Compute Network
- Google Compute Network Firewall Policy
- Google Compute Network Firewall Policy Rule
- Google Compute Route
- Google Compute Router
- Google Compute Subnetwork
- Google Compute VPN Gateway
- Google Compute VPN Tunnel
