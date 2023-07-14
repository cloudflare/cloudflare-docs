---
title: Cisco - Area 1 as MX Record
pcx_content_type: tutorial
weight: 3
layout: single
meta:
   title: Deploy and configure Cisco IronPort with Area 1 as MX Record
updated: 2022-09-30
---

# Deploy and configure Cisco IronPort with Area 1 as MX Record

![A schematic showing where Area 1 security is in the life cycle of an email received](/images/email-security/deployment/inline-setup/cisco-area1-mx/cisco-area1-mx.png)

In this tutorial, you will learn how to configure Cisco IronPort with Area 1 as MX record. This tutorial is broken down into several steps.

{{<render file="_mx-deployment-prerequisites.md">}}

## 1. Add a Sender Group for Area 1 Email Protection IPs

To add a new Sender Group:

1. Go to **Mail Policies** > **HAT Overview**.

2. Select **Add Sender Group**.

3. Configure the new Sender Group as follows:
    * **Name**: `Area1`.
    * **Order**: Order above the existing **WHITELIST** sender group.
    * **Comment**: `Area 1 Email Protection egress IP Addresses`.
    * **Policy**: `TRUSTED` (by default, spam detection is disabled for this mail flow policy).
    * **SBRS**: Leave blank.
    * **DNS Lists**: Leave blank.
    * **Connecting Host DNS Verification**: Leave all options unchecked.

4. Select **Submit and Add Senders** and add the IP addresses mentioned in [Egress IPs](/email-security/deployment/inline/reference/egress-ips/).

![Sender group](/images/email-security/deployment/inline-setup/cisco-area1-mx/step1.png)

## 2. Configure Incoming Relays

You need to configure the Incoming Relays section to tell IronPort to ignore upstream hops, since all the connections are now coming from Area 1. This step is needed so the IronPort can retrieve the original IPs to calculate IP reputation. IronPort also uses this information in the Anti-Spam (IPAS) scoring of messages.

1. To enable the Incoming Relays Feature, select **Network** > **Incoming Relays**.
2. Select **Enable** and commit your changes.
3. Now, you will have to add an Incoming Relay. Select **Network** > **Incoming Relays**.
4. Select **Add Relay** and give your relay a name.
5. Enter the IP address of the MTA, MX, or other machine that connects to the email gateway to relay incoming messages. You can use IPv4 or IPv6 addresses.
6. Specify the `Received:` header that will identify the IP address of the original external sender.
7. Commit your changes.

## 3. Update your domain MX records

Instructions to update your MX records will depend on the DNS provider you are using. In your domain DNS zone, you need to replace your current MX records with the Area 1 hosts. This will have to be done for every domain where Area 1 will be the primary MX. For example:

{{<render file="_mx-deployment-values.md">}}
{{<render file="_mx-geographic-locations.md">}}

DNS changes will reach the major DNS servers in about an hour or follow the TTL value as described in the [Prerequisites section](#prerequisites).