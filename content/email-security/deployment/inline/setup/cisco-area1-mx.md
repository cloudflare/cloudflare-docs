---
title: Cisco MX Record
pcx_content_type: tutorial
weight: 3
layout: single
meta:
   title: Deploy and configure Cisco IronPort with Area 1 as MX Record
---

# Deploy and configure Cisco IronPort with Area 1 as MX Record

In this tutorial you will learn how to configure Cisco IronPort with Area 1 as MX record. This tutorial is broken down into several steps:

1. Add a new Sender Group to include Area 1’s egress IPs.
2. Configure Incoming Relays.
3. Update domain MX records.

![A schematic showing where Area 1 security is in the lifeline of an email received](/email-security/static/cisco-area1-mx-flow.png)

## 1. Add a Sender Group for Area 1 Email Protection IPs

To add a new Sender Group:

1. Go to **Mail Policies** > **HAT Overview**.

2. Select **Add Sender Group**.

3. Configure the new Sender Group as follows:
    * **Name**: `Area1`.
    * **Order**: Order above the existing WHITELIST Sender Group.
    * **Comment**: `Area 1 Email Protection egress IP Addresses`.
    * **Policy**: `TRUSTED` (by default, spam detection is disabled for this mail flow policy).
    * **SBRS**: Leave blank.
    * **DNS Lists**: Leave blank.
    * **Connecting Host DNS Verification**: Leave all options unchecked.

4. Select **Submit and Add Senders >>** and add IP addresses mentioned in [Egress IPs](/email-security/deployment/inline/reference/egress-ips/).


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

Instructions to update your MX records will depend on the DNS provider you are using. In your domain DNS zone, you need to replace your current MX records with the Area 1 hosts. This will have to be done for every domain where Area 1 will be the primary MX.

Update your domain MX records using Area 1:

MX Priority | Host
--- | ---
10 | mailstream-east.mxrecord.io
10 | mailstream-west.mxrecord.io
50 | mailstream-central.mxrecord.mx

When configuring the Area 1 MX records, it is important to configure both hosts with the same MX priority, this will allow mail flows to load balance between the hosts.

For European customers, update your MX records to:

MX Priority | Host
--- |---
10 | mailstream-eu1.mxrecord.io
20 | mailstream-east.mxrecord.io
20 | mailstream-west.mxrecord.io
50 | mailstream-central.mxrecord.mx

The European region will be the primary MX, with a fail-over to the US regions. If you wish to exclusively use the European region, update with only the European host.

Once the MX records updates complete, the DNS updates may take up to 36 hours to fully propagate around the Internet. Some of the faster DNS providers will start to update records within minutes. The DNS update will typically reach the major DNS servers in about an hour.