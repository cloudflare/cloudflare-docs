---
title: Google Workspace - Cloud Email Security (formerly Area 1) as MX Record
pcx_content_type: integration-guide
weight: 2
meta:
   title: Deploy and configure Google Workspace with Cloud Email Security (formerly Area 1) as MX Record
updated: 2022-09-30
---

# Deploy and configure Google Workspace with Cloud Email Security as MX Record

{{<Aside type="warning" header="Area 1 has been renamed">}}

{{<render file="rename-area1-to-ces.md">}}

{{</Aside>}}

![A schematic showing where Cloud Email Security security is in the life cycle of an email received](/images/email-security/deployment/inline-setup/gsuite-area1-mx/gsuite-area1-mx.png)

In this tutorial, you will learn how to configure Google Workspace with Cloud Email Security as MX record. This tutorial is broken down into several steps.

{{<render file="_outbound-email.md">}}

## Requirements

* Provisioned Cloud Email Security account.
* Access to the Google administrator console ([**Google administrator console**](https://admin.google.com) > **Apps** > **Google Workspace** > **Gmail**).
* Access to the domain nameserver hosting the MX records for the domains that will be processed by Cloud Email Security.

{{<render file="deployment/_mx-deployment-prerequisites.md">}}

## 1. Add Cloud Email Security IP addresses to the Inbound gateway configuration

When Cloud Email Security is deployed as the MX record for Google Workspace, the Inbound gateway needs to be configured such that Google Workspace is aware that it is no longer the MX record for the domain. This is a critical step as it will allow Google Workspace to accept messages from Cloud Email Security.

1. Go to the [Google Administrative Console](https://admin.google.com/).

2. Go to **Apps** > **Google Workspace** > **Gmail**.

    ![Access Gmail](/images/email-security/deployment/inline-setup/gsuite-area1-mx/step2-gmail.png)

3. Select **Spam, Phishing, and Malware** and scroll to **Inbound Gateway configuration**.

    ![Access the spam, phishing and malware setting](/images/email-security/deployment/inline-setup/gsuite-area1-mx/step3-spam.png)

4. Enable **Inbound Gateway**, and configure it with the following details:

    ![Enable inbound gateway](/images/email-security/deployment/inline-setup/gsuite-area1-mx/step4-inbound-gateway.png)

    * In **Gateway IPs**, select the **Add** link, and add the IPs mentioned in [Egress IPs](/email-security/deployment/inline/reference/egress-ips/).
    * Select **Automatically detect external IP (recommended)**.
    * Select **Require TLS for connections from the email gateways listed above**.

    <div class="medium-img">

    ![Inbound gateway settings](/images/email-security/deployment/inline-setup/gsuite-area1-mx/step4-inbound-gateway-settings.png)

    </div>

{{<Aside type="note">}}Do not select **Reject all mail not from gateway IPs** until the MX records have fully propagated. [Refer to step 5](#5-secure-your-email-flow) for more details.{{</Aside>}}

5. Select the **Save** button at the bottom of the dialog box to save the configuration once the details have been entered. Once saved, the administrator console will show the Inbound Gateway as **enabled**.

    ![Inbound gateway on](/images/email-security/deployment/inline-setup/gsuite-area1-mx/step5-inbound-on.png)

## 2. Quarantine malicious detections

This optional step is highly recommended to prevent users from being exposed to malicious messages.

When messages are identified as malicious, Cloud Email Security will insert the X-header `X-Area1Security-Disposition` into the message with the corresponding {{<glossary-tooltip term_id="disposition">}}disposition{{</glossary-tooltip>}}. Based on the value of the `X-Area1Security-Disposition`, a content compliance filter can be configured to send malicious detections to an administrative quarantine. This section will outline the steps required to:
* Create an Cloud Email Security Malicious quarantine.
* Create the content compliance filter to send malicious messages to quarantine.

### Create Cloud Email Security Malicious Quarantine

If you would like to send Cloud Email Security malicious detection to a separate quarantine other than the default quarantine, you will need to create a new quarantine.

1. In [Google's administrative console](https://admin.google.com), select the **Manage quarantines** panel.

    ![Select the manage quarantines panel](/images/email-security/deployment/inline-setup/gsuite-area1-mx/step1-manage-quarantines.png)

2. Select **ADD QUARANTINE** to configure the new quarantine. This will bring up a pop-up for the configuration details.

    ![Select the add quarantine button](/images/email-security/deployment/inline-setup/gsuite-area1-mx/step2-add-quarantine.png)

3. In the quarantine configuration pop-up, enter the following:

    * **Name**: `Cloud Email Security Malicious`.
    * **Description**: `Cloud Email Security Malicious`.
    * For the **Inbound denial consequence**, select **Drop Message**.
    * For the **Outbound denial consequence**, select **Drop Message**.

    <div class="medium-img">

    ![Configure the quarantine settings](/images/email-security/deployment/inline-setup/gsuite-area1-mx/step3-configure-quarantine.png)

    </div>

When you are finished entering these details, select **SAVE**.

1. To access the newly create quarantine, select **GO TO ADMIN QUARANTINE** or access the quarantine directly by pointing your browser to [https://email-quarantine.google.com/adminreview](https://email-quarantine.google.com/adminreview).

    ![Access the quarantine created](/images/email-security/deployment/inline-setup/gsuite-area1-mx/step4-access-quarantine.png)

    Once in the Admin quarantine console, you can access the **Cloud Email Security Malicious** quarantine by selecting **Quarantine:ALL** > **Cloud Email Security Malicious** in the filter section. Quarantined messages can be released as needed by an administrator.

    ![Access Cloud Email Security](/images/email-security/deployment/inline-setup/gsuite-area1-mx/step4-area1.png)

### Create a content compliance filter to send malicious messages to quarantine

1. In [Google's administrative console](https://admin.google.com), select **Compliance** to configure the content compliance filter.

    ![Access the compliance configuration](/images/email-security/deployment/inline-setup/gsuite-area1-mx/step1-compliance.png)

2. Go to the **Content compliance** area and select **CONFIGURE** to open the configuration dialog pop-up.

    ![Select the configure button](/images/email-security/deployment/inline-setup/gsuite-area1-mx/step2-configure.png)

3. In the **Content compliance filter** configuration, enter the following:

    * **Name**: `Quarantine Cloud Email Security Malicious`.
    * In **1. Email message to affect**, select **Inbound**.
    * In **2. Add expression that describe the content you want to search for in each message**:
        * Select **Add** to add the condition.
            * In the *Simple content match* dropdown, select **Advanced content match**.
            * In **Location**, select **Full headers**.
            * In **Match type**, select **Contains text**.
            * In **Content**, enter `X-Area1Security-Disposition: MALICIOUS`.
        * Select **SAVE** to save the condition.
    * In **3. If the above expression match, do the following**, select the *Action* dropdown. Then choose **Quarantine message** and the **Cloud Email Security Malicious** quarantine that was created in the previous step.

    <div class="medium-img">

    ![Configure the compliance filter](/images/email-security/deployment/inline-setup/gsuite-area1-mx/step3-compliance-filter.png)

    </div>

    After you enter this information, select **SAVE**.

4. Once saved, the console will update with the newly configured **content compliance filter**.

    ![After configuration, the console shows the content compliance filter](/images/email-security/deployment/inline-setup/gsuite-area1-mx/step4-compliance-filter.png)

    If you would like to quarantine the other dispositions, repeat the above steps and use the following strings for the other dispositions:
    * `X-Area1Security-Disposition: MALICIOUS`
    * `X-Area1Security-Disposition: SUSPICIOUS`
    * `X-Area1Security-Disposition: SPOOF`
    * `X-Area1Security-Disposition: UCE`

    If desired, you can create a separate quarantine for each of the dispositions.

{{<Aside type="note">}}
Google handles Groups (that is, distributions lists) differently from user mail accounts. The compliance filters actions are limited to the **Users** account type. If you heavily use Google Groups (that is, distribution lists), quarantining malicious messages using the Cloud Email Security quarantine is the recommended method to ensure full protection.
{{</Aside>}}

## 3. Add your domain to Cloud Email Security

To avoid email loop errors, add your domain to your Cloud Email Security dashboard.

1. Log in to the [Cloud Email Security dashboard](https://horizon.area1security.com/home).
2. Go to **Settings** (the gear icon).
3. In **Email Configuration** > **Domains**, select **New Domain**.
4. Enter the following settings:
    1. **Domain**: Enter the domain you want Cloud Email Security to protect.
    2. **Configured as**: Select **MX Records**.
    3. **Forwarding to**: Add `google.com`.
    4. **Quarantine policy**: Select **Malicious** and **Spam**.
5. Select **Publish domain**.

## 4. Update your domain MX records

Instructions to update your MX records will depend on the DNS provider you are using. You need to replace the existing Google MX records with the Cloud Email Security hosts. For example:

{{<render file="deployment/_mx-deployment-values.md">}}
{{<render file="deployment/_mx-geographic-locations.md">}}

DNS changes will reach the major DNS servers in about an hour or follow the TTL value as described in the [Prerequisites section](#prerequisites).

## 5. Secure your email flow

After 36 hours, the MX record DNS update will have sufficiently propagated across the Internet. It is now safe to secure your email flow. This will ensure that Google only accepts messages that are first received by Cloud Email Security. This step is highly recommended to prevent threat actors from using cached MX entries to bypass Cloud Email Security by injecting messages directly into Gmail.

1. Access the [Google Administrative Console](https://admin.google.com/), then select **Apps** > **Google Workspace** > **Gmail**.

2. Select **Spam, Phishing, and Malware**.

3. Go to **Inbound Gateway configuration** and select **Configure**.

4. Enable **Reject all mail not from gateway IPs** and select **Save**.

5. Select **Save** once more to commit and activate the configuration change in the Gmail advanced configuration console.

## 6. Send Cloud Email Security spam to user spam folder (optional)

Unlike the configuration in [step 2](#2-quarantine-malicious-detections) where the message can be sent to an administrative quarantine, this optional step can be configured to send messages that are identified as spam by Cloud Email Security to the user’s spam folder.

1. Access [Google's Administrative Console](https://admin.google.com/), then select **Apps** > **Google Workspace** > **Gmail**.

2. Select **Spam, Phishing, and Malware**.

3. Go to **Inbound Gateway configuration** and select **Configure**.

4. In the **Message Tagging** section, select **Message is considered spam if the following header regexp matches**.

5. In the **Regexp** section, enter the string `X-Area1Security-Disposition: UCE`.

6. Select **SAVE** to save the updated configuration.