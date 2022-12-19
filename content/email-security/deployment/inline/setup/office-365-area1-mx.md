---
title: Office 365 - Area 1 as MX Record
pcx_content_type: tutorial
weight: 1
layout: single
meta:
   title: Deploy and configure Microsoft Office 365 with Area 1 as MX Record
---

# Deploy and configure Microsoft Office 365 with Area 1 as MX Record

![A schematic showing where Area 1 security is in the life cycle of an email received](/email-security/static/inline-setup/o365-area1-mx/office365-mx.png)

In this tutorial, you will learn how to configure Microsoft Office 365 with Area 1 as MX record. This tutorial is broken down into several steps.

## 1. Add Area 1 IP addresses to Allow List

1. Go to the [Microsoft Security admin center](https://security.microsoft.com/homepage).

2. In the **Threat management** section, select [**Policy settings**](https://security.microsoft.com/threatpolicy).

    ![Select threat management](/email-security/static/inline-setup/o365-area1-mx/step2-threat-management.png)

3. Select the [Anti-spam option](https://security.microsoft.com/antispam).

    ![Select the anti-spam option](/email-security/static/inline-setup/o365-area1-mx/step3-anti-spam.png)

4. Select **Connection filter policy (Default)** to edit the policy, and then select **Edit connection filter policy**.

    ![Select edit connection filter policy](/email-security/static/inline-setup/o365-area1-mx/step4-edit-filter-policy.png)

5. In **Always allow messages from the following IP addresses or address range** add the IP addresses and CIDR blocks mentioned in [Egress IPs](/email-security/deployment/inline/reference/egress-ips/).

    ![Enter the egress IP addresses](/email-security/static/inline-setup/o365-area1-mx/step5-egress-ips.png)

6. Select **Save**.

{{<Aside type="note">}}
Depending on your Office 365 configuration, you may receive a warning indicating that you need to run the `Enable-OrganizationCustomization` cmdlet before you create or modify objects in your Exchange Online organization.  Follow the next step to enable this cmdlet.
{{</Aside>}}

## 2: Execute `Enable-OrganizationCustomization` (if required)

The following steps are only required if you have not previously customized your Office 365 instance. If you received the message to run this cmdlet in the previous step, you will need to execute it in order to proceed with the configuration.

1. Run PowerShell as administrator, and execute the following command. Reply `Yes` when prompted:

```txt
PS C:\Windows\system32> Install-Module ExchangeOnlineManagement
```

![Run the install-module command in PowerShell](/email-security/static/inline-setup/o365-area1-mx/step1-install-module.png)

{{<Aside type="note">}}This module is a Microsoft module.{{</Aside>}}

2. Run the following commands to execute the policy change and connect to the Office 365 instance:

    ```txt
    PS C:\Windows\system32> set-executionpolicy remotesigned
    ```

    Confirm that you want to execute the policy change, and then run the following command:

    ```txt
    PS C:\Windows\system32> Import-Module ExchangeOnlineManagement
    ```

    Finally, run the following to authenticate against your Office 365 instance:

    ```txt
    PS C:\Windows\system32> Connect-ExchangeOnline
    ```

    ![Run the commands to execute the policy change](/email-security/static/inline-setup/o365-area1-mx/step2-set-executionpolicy.png)

3. The `Connect-ExchangeOnline` cmdlet will prompt you to login. Log in using an Office 365 administrator account. Once authenticated, you will be returned to the PowerShell prompt.

    ![Log in with an Office 365 admin account](/email-security/static/inline-setup/o365-area1-mx/step3-connect-exchange.png)

4. You can verify that the `OrganizationCustomization` is enabled by running the command:

```txt
PS C:\Windows\system32> Get-OrganizationConfig | FL isDehydrated
```

![Run the get-organizationconfig command](/email-security/static/inline-setup/o365-area1-mx/step4-get-organizationconfig.png)

If the result is `false`, `OrganizationCustomization` is already enabled and no further actions are required. If it is true, you need to enable it:

```txt
PS C:\> Enable-OrganizationCustomization
```

![If the previous result is true, enable the organization customization mode](/email-security/static/inline-setup/o365-area1-mx/step4-enable-organizationcustomization.png)

## 3. Enhanced Filtering configuration

This option will allow Office 365 to properly identify the original connecting IP before the message was received by Area 1. This helps with SPF analysis. This has two steps: 

* Creating an inbound connector.
* Enabling the enhanced filtering configuration of the connector.

### Create an inbound connector

1. From the **Microsoft Exchange admin center**, select **mail flow** > **connectors**.

    ![Select connectors from mail flow](/email-security/static/inline-setup/o365-area1-mx/step1-connectors.png)

2. Select the `+` icon to configure a new connector. In the **Select your mail flow scenario panel** dialog box that opens:

    1. In the *From* dropdown: select **Partner organization**.
    2. In the *To* dropdown: select **Office 365**.
    3. Select **Next** to continue the configuration.

    <div class="large-img">

    ![Configure your mail flow](/email-security/static/inline-setup/o365-area1-mx/step2-mail-flow.png)

    </div>

3. Provide a **Name** and a **Description** for the new connector. Leave the **Turn it on** checkbox enabled. Select **Next**.

    <div class="large-img">

    ![Provide name and description for the new connector](/email-security/static/inline-setup/o365-area1-mx/step3-description.png)

    </div>

4. Select **Use the sender’s IP address** in the **How do you want to identify the partner organization?** configuration panel. Select **Next**.

    <div class="large-img">

    ![Select the sender's IP address](/email-security/static/inline-setup/o365-area1-mx/step4-senders-ip.png)

    </div>

5. In **What sender IP addresses do you want to use to identify your partner?** add the IP addresses and CIDR blocks found in [Egress IPs](/email-security/deployment/inline/reference/egress-ips/). Select **Next**.

    <div class="large-img">

    ![Enter Area 1's egress IP addresses](/email-security/static/inline-setup/o365-area1-mx/step5-office-egress-ips.png)

    </div>

6. Keep the **Reject email messages if they aren't sent over TLS** checkbox enabled. Select **Next**.

    <div class="large-img">

    ![Keep the Reject email messages if they aren't sent over TLS checkbox enabled](/email-security/static/inline-setup/o365-area1-mx/step6-tls.png)

    </div>

7. Review the connector configuration and select **Save**.

    <div class="large-img">

    ![Review settings](/email-security/static/inline-setup/o365-area1-mx/step7-review.png)

    </div>

### Enable enhanced filtering

Now that the inbound connector has been configured, you will need to enable the enhanced filtering configuration of the connector. Exit the Exchange Admin console, return to the main [Office 365 Administration Console](https://admin.microsoft.com) and select the [Security admin console](https://security.microsoft.com/homepage).

![The security admin console](/email-security/static/inline-setup/o365-area1-mx/security-admin.png)

1. Go to [Security Admin console](https://security.microsoft.com/homepage) > **Threat Management** > **Policy**, and select **Enhanced filtering**.

    ![Go to Enhanced filtering](/email-security/static/inline-setup/o365-area1-mx/step1-enhanced-filtering.png)

2. In **Enhanced Filtering for Connectors**, you will find the connector that was previously configured. Double click the connector to edit its configuration parameters. 

3. Select **Automatically detect and skip the last IP address** and **Apply to entire organization**.

    ![Select Automatically detect and skip the last IP address, and Apply to entire organization](/email-security/static/inline-setup/o365-area1-mx/step3-selectors.png)

4. Select **Save**.

## 4. Configure Area 1 Quarantine Policies

### Select the disposition that you want to quarantine

Quarantining messages is a per domain configuration. To modify which domains will have their message quarantines, access the domain configuration: 

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).

2. Go to **Settings** (the gear icon) > **Domains**.

3. Locate the domain you want to edit.

4. Select the `...` icon > **Edit**.

5. Select the additional dispositions you want to quarantine.

    <div class="large-img">

    ![Manage domain quarantines](/email-security/static/inline-setup/o365-area1-mx/step4-area1-dispositions.png)

    </div>

{{<Aside type="note">}}When Area 1 is deployed as the MX record and protecting Office 365, Malicious and Spam detections will automatically be quarantined. This behavior cannot be modified.{{</Aside>}}

### Manage the Admin Quarantine

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).

2. Go to **Email** > **Admin Quarantine**.

3. Locate the message you want to manage, and select the `...` icon next to it. Thill will let you preview, download, or release the quarantined message.

    <div class="large-img">

    ![Manage admin quarantines](/email-security/static/inline-setup/o365-area1-mx/step4-manage-admin-quarantine.png)

    </div>

### Optional - Quarantine messages using Microsoft Hosted Quarantine

As previously noted, malicious and spam detections are automatically quarantined in Area 1’s quarantine (this behavior cannot be modified). However, for the suspicious and spoof dispositions, you may prefer to apply a different behavior, where these messages can be quarantined into the Microsoft Hosted Quarantine or sent to the user’s junk folder.

For this alternate behavior, you will need to configure a transport rule in Office 365:

1. Go to the **Exchange administrator** console > **mail flow** > **rules**.

    ![Select rules from the Exchange admin console](/email-security/static/inline-setup/o365-area1-mx/step1-rules.png)

2. Select the **+** button > **Create a new rule**.

    ![Create rule](/email-security/static/inline-setup/o365-area1-mx/step2-create-rule.png)

3. In the new dialog box, select **More options** to open the advanced version of the rule creator. Set the following conditions and actions:

* **Name**: `Quarantine Area 1 Suspicious Messages`
* Configure the first condition, select **A message header** > **Includes any of these words:**
    * Enter text: `X-Area1Security-Disposition`
    * Enter words: `SUSPICIOUS`

{{<Aside type="note">}}If you also want to quarantine the spoof detections, add the string `SPOOF` to the list of words.{{</Aside>}}

4. Select the **add** condition button to add a second condition.

5. In the new condition, select **The sender** > **IP address is in any of these ranges or exactly matches** and enter the egress IPs in the [Egress IPs page](/email-security/deployment/inline/reference/egress-ips/).

6. In the **Do the following** section, select **Redirect the message to**  > **hosted quarantine.**.

    ![Redirect messages to hosted quarantine](/email-security/static/inline-setup/o365-area1-mx/step6-hosted.png)

{{<Aside type="note">}}
If you prefer to send the message to the Junk folder, in the **Do the following** section, select **Modify the message properties**  > **set the spam confidence level (SCL)**. Then, select the SCL value that will send the message to the junk folder. This behavior is dependent on the configured spam filter policies (spam and bulk actions).
{{</Aside>}}

7. Select **Save** to save the new rule.

## 5. Update your domain MX records

Instructions to update your MX records will depend on the DNS provider you are using. You will need to update and replace your existing MX record with the Area 1 hosts:

MX Priority | Host
--- | ---
`10` | `mailstream-east.mxrecord.io`
`10` | `mailstream-west.mxrecord.io`
`20` | `mailstream-central.mxrecord.mx`

When configuring the Area 1 MX records, it is important to configure both hosts with the same MX priority. This will allow mail flows to load balance between the hosts.

Once the MX records have been updated, the DNS updates may take up to 36 hours to fully propagate around the Internet. Some of the faster DNS providers will start to update records within minutes. DNS changes will reach the major DNS servers in about an hour.