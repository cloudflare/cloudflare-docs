---
title: GSuite - Area 1 as MX Record
pcx_content_type: tutorial
weight: 2
layout: single
meta:
   title: Deploy and configure Gmail with Area 1 as MX Record
---

# Deploy and configure Gmail with Area 1 as MX Record

![A schematic showing where Area 1 security is in the life cycle of an email received](/email-security/static/gsuite-area1-mx.png)

In this tutorial, you will learn how to configure Gmail with Area 1 as MX record. This tutorial is broken down into several steps.

## Requirements

* Provisioned Area 1 Account.
* Access to the Gmail administrator console ([**Gmail administrator console**](https://admin.google.com) > **Apps** > **Google Workspace** > **Gmail**).
* Access to the domain nameserver hosting the MX records for the domains that will be processed by Area 1.

## 1. Add Area 1 IP addresses to the Inbound gateway configuration

When Area 1 is deployed as MX records upstream of Gmail, the Inbound gateways need to be configured such that Gmail is aware that they are no longer the MX record for the domain. This is a critical step as it will allow Gmail to accept messages from Area 1.

1. Go to the [Gmail Administrative Console](https://admin.google.com/).

2. Navigate to **Apps** > **Google Workspace** > **Gmail**.

3. Select **Spam, Phishing, and Malware** and scroll to **Inbound Gateway configuration**.

4. Enable **Inbound Gateway**, and configure it with the following details: 

    * In **Gateway IPs**, select the **Add** link, and add the IPs mentioned in [Egress IPs](/email-security/deployment/inline/reference/egress-ips/).
    * Select **Automatically detect external IP (recommended)**.
    * Select **Require TLS for connections from the email gateways listed above**.

{{<Aside type="note">}}Do not select **Reject all mail not from gateway IPs** until the MX records have fully propagated. [Refer to step 4](#4-secure-your-email-flow) for more details.{{</Aside>}}

5. Select the **Save** button at the bottom of the dialog box to save the configuration once the details have been entered. Once saved, the administrator console will show the Inbound Gateway as **enabled**.

## 2. Quarantine malicious detections

This optional step is highly recommended to prevent users from being exposed to malicious messages.

When messages are identified as malicious, Area 1 will insert the X-header `X-Area1Security-Disposition` into the message with the corresponding disposition. Based on the value of the `X-Area1Security-Disposition`, a content compliance filter can be configured to send malicious detections to an administrative quarantine. This section will outline the steps required to:
* Create an Area 1 Malicious quarantine.
* Create the content compliance filter to send malicious messages to quarantine.

### Create Area 1 Malicious Quarantine

If you would like to send Area 1 malicious detection to a separate quarantine other than the default quarantine, you will need to create a new quarantine.

1. In the [Gmail administrative console](https://admin.google.com), select the **Manage quarantines** panel.

2. Select **ADD QUARANTINE** to configure the new quarantine. This will bring up a pop-up for the configuration details.

3. In the quarantine configuration pop-up, enter the following:

    * **Name**: `Area 1 Malicious`.
    * **Description**: `Area 1 Malicious`.
    * For the **Inbound denial consequence**, select **Drop Message**.
    * For the **Outbound denial consequence**, select **Drop Message**.

When you are finished entering these details, select **SAVE**.

4. To access the newly create quarantine, select **GO TO ADMIN QUARANTINE** or access the quarantine directly by pointing your browser to [https://email-quarantine.google.com/adminreview](https://email-quarantine.google.com/adminreview).

    Once in the Admin quarantine console, you can access the **Area 1 Malicious** quarantine by selecting the corresponding quarantine on the left navigation section. Quarantined messages can be released as needed by an administrator.

### Create a content compliance filter to send malicious messages to quarantine

1. In the [Gmail administrative console](https://admin.google.com), select **Compliance** to configure the content compliance filter.

2. Navigate to the **Content compliance** area and select **CONFIGURE** to open the configuration dialog pop-up.

3. In the **Content compliance filter** configuration, enter the following:

    * **Name**: `Quarantine Area 1 Malicious`.
    * In the **Email message to affect** section, select **Inbound**.
    * In the **Add expression that describe the content you want to search for in each message section**, configure the following:
        * Select **Add** to add the condition.
            * In the *Match* dropdown, select **Advanced content match**.
            * In **Location**, select **Full headers**.
            * In **Match type**, select **Contains text**.
            * In **Content**, enter `X-Area1Security-Disposition: MALICIOUS`.
        * Select **SAVE** to save the condition.
    * In the **If the above expression match, do the following** section, select the *Action* dropdown. Then choose **Quarantine message** and the **Area 1 Malicious** quarantine that was created in the previous step.

    After you enter this information, select **SAVE**.

4. Once saved, the console will update with the newly configured **content compliance filter**.

    If you would like to quarantine the other dispositions, repeat the above steps and use the following strings for the other dispositions:
    * `X-Area1Security-Disposition: MALICIOUS`
    * `X-Area1Security-Disposition: SUSPICIOUS`
    * `X-Area1Security-Disposition: SPOOF`
    * `X-Area1Security-Disposition: UCE`

    If desired, you can create a separate quarantine for each of the dispositions.

{{<Aside type="note">}}
Google handles Groups (that is, distributions lists) differently from user mail accounts. The compliance filters actions are limited to the **Users** account type. If you heavily use Google Groups (that is, distribution lists), quarantining malicious messages using the Area 1 quarantine is the recommended method to ensure full protection.
{{</Aside>}}

## 3. Update your domain MX records

Instructions to update your MX records will depend on the DNS provider you are using. You need to replace the existing Google MX records with the Area 1 hosts.

These are the typical default MX records when using Gmail:

MX Priority | Host
----------- | ---
`1`           | `aspmx.l.google.com`
`5`           | `alt1.aspmx.l.google.com`
`5`           | `alt2.aspmx.l.google.com`
`10`          | `alt3.aspmx.l.google.com`
`10`          | `alt4.aspmx.l.google.com`

To update your MX records with Area 1, use the following:

MX Priority | Host
----------- | ---
`10`          | `mailstream-east.mxrecord.io`
`10`          | `mailstream-west.mxrecord.io`
`50`          | `mailstream-central.mxrecord.mx`

When configuring the Area 1 MX records, it is important to configure both hosts with the same MX priority. This will allow mail flows to load balance between the hosts.

European customers should update  MX records with Area 1 European hosts:

MX Priority | Host
--- | --
`10` | `mailstream-eu1.mxrecord.io`
`20` | `mailstream-east.mxrecord.io`
`20` | `mailstream-west.mxrecord.io`
`50` | `mailstream-central.mxrecord.mx`

The European region will be the primary MX, with a fail-over to the US regions. If you wish to exclusively use the European region, update with only the European host.

Once the MX records updates complete, the DNS updates may take up to 36 hours to fully propagate around the Internet. Some of the faster DNS providers will start to update records within minutes. The DNS update will typically reach the major DNS servers in about an hour.

## 4. Secure your email flow

After 36 hours, the MX record DNS update will have sufficiently propagated across the Internet. It is now safe to secure your email flow. This will ensure that Gmail only accepts messages that are first received by Area 1. This step is highly recommended to prevent threat actors from using cached MX entries to bypass Area 1 by injecting messages directly into Gmail.

1. Access the [Gmail Administrative Console](https://admin.google.com/), then select **Apps** > **Google Workspace** > **Gmail**.

2. Select **Spam, Phishing, and Malware**.

3. Navigate to **Inbound Gateway configuration** and select **Configure**.

4. Enable **Reject all mail not from gateway IPs** and select **Save**.

5. Select **Save** once more to commit and activate the configuration change in the Gmail advanced configuration console.

## 5. Send Area 1 spam to user spam folder (optional)

Unlike the configuration in [step 2](#2-quarantine-malicious-detections) where the message can be sent to an administrative quarantine, this optional step can be configured to send messages that are identified as spam by Area 1 to the user’s spam folder. 

1. Access the [Gmail Administrative Console](https://admin.google.com/), then select **Apps** > **Google Workspace** > **Gmail**.

2. Select **Spam, Phishing, and Malware**.

3. Navigate to **Inbound Gateway configuration** and select **Configure**.

4. In the **Message Tagging** section, select **Message is considered spam if the following header regexp matches**.

5. In the **Regexp** section, enter the string `X-Area1Security-Disposition: UCE`.

6. Select **SAVE** to save the updated configuration.