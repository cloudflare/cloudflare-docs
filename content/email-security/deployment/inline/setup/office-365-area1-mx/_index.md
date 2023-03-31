---
title: Office 365 - Area 1 as MX Record
pcx_content_type: tutorial
weight: 1
layout: single
meta:
   title: Deploy and configure Microsoft Office 365 with Area 1 as the MX Record
---

# Deploy and configure Microsoft Office 365 with Area 1 as the MX Record

![A schematic showing where Area 1 security is in the life cycle of an email received](/email-security/static/deployment/inline-setup/o365-area1-mx/office365-mx.png)

In this tutorial, you will learn how to configure Microsoft Office 365 with Area 1 as its MX record. This tutorial is broken down into several steps. If at any steps during this tutorial you receive a message saying that you need to run the `Enable-OrganizationCustomization` cmdlet, [refer to section 6](#6-execute-enable-organizationcustomization-if-required).

For the purposes of this guide, Office 365 and Microsoft 365 are equivalent.

{{<render file="_outbound-email.md">}}

{{<render file="_mx-deployment-prerequisites.md">}}

## 1. Add Area 1 IP addresses to Allow List

1. Go to the [Microsoft Security admin center](https://security.microsoft.com/homepage).

2. Go to **Email & collaboration** > **Policies & Rules** > **Threat policies**.

3. Select the [Anti-spam option](https://security.microsoft.com/antispam).
    
    <div class="large-img">
    
    ![Select the anti-spam option](/email-security/static/deployment/inline-setup/o365-area1-mx/step3-anti-spam.png)

    </div>

4. Select **Connection filter policy (Default)** > **Edit connection filter policy**.

    <div class="large-img">

    ![Select edit connection filter policy](/email-security/static/deployment/inline-setup/o365-area1-mx/step4-edit-filter-policy.png)

    </div>

5. In **Always allow messages from the following IP addresses or address range** add the IP addresses and CIDR blocks mentioned in [Egress IPs](/email-security/deployment/inline/reference/egress-ips/).

    <div class="large-img">

    ![Enter the egress IP addresses](/email-security/static/deployment/inline-setup/o365-area1-mx/step5-egress-ips.png)

    </div>
6. Select **Save**.

7. Microsoft recommends disabling SPF Hard fail when an email solution is placed in front of it. Return to the [Anti-spam option](https://security.microsoft.com/antispam).

8. Select **Anti-spam inbound policy (Default)**.

9. At the end of the **Bulk email threshold & spam properties** section, select **Edit spam threshold and properties**.

    <div class="large-img">

    ![Select the spam threshold and properties button](/email-security/static/deployment/inline-setup/o365-area1-mx/step9-spam-threshold.png)

    </div>

10. Scroll to **Mark as spam** > **SPF record: hard fail**, and ensure it is set to **Off**.

    <div class="large-img">

    ![Make sure SPF record: hard fail is set to off](/email-security/static/deployment/inline-setup/o365-area1-mx/step10-spf-record-hard-fail.png)

    </div>

11. Select **Save**.

## 2. Enhanced Filtering configuration

This option will allow Office 365 to properly identify the original connecting IP before the message was received by Area 1. This helps with SPF analysis. This has two steps: 

* Creating an inbound connector.
* Enabling the enhanced filtering configuration of the connector.

### Create an inbound connector

1. Go to the new [**Exchange admin center**](https://admin.exchange.microsoft.com/#/homepage).

2. Select **Mail flow** > **Connectors**.

    <div class="large-img">

    ![Select Connectors from Mail flow](/email-security/static/deployment/inline-setup/o365-area1-mx/step2-mailflow-conectors.png)

    </div>

3. Select **Add a connector**.

4. In **Connection from**, select **Partner organization**.

5. Select **Next**.

6. Set the following options:
    - **Name** - `Area 1 Inbound Connector`
    - **Description** - `Inbound connector for Enhanced Filtering`

    <div class="large-img">

    ![Enter a name and descriptions for your connector](/email-security/static/deployment/inline-setup/o365-area1-mx/step6-connector-options.png)

    </div>

7. Select **Next**.

8. In **Authenticating sent email**, select **By verifying that the IP address of the sending server matches one of the following IP addresses, which belongs to your partner organization.**

9. Enter all of the egress IPs in the [Egress IPs](/email-security/deployment/inline/reference/egress-ips/) page.

    <div class="large-img">

    ![Enter all of Area 1's Egress IPs](/email-security/static/deployment/inline-setup/o365-area1-mx/step9-egress-ips.png)

    </div>

10. Select **Next**.

11. In **Security restrictions**, accept the default **Reject email messages if they aren't sent over TLS** setting.

12. Select **Next**.

13. Review your settings and select **Create connector**.

### Enable enhanced filtering

Now that the inbound connector has been configured, you will need to enable the enhanced filtering configuration of the connector in the [Security admin console](https://security.microsoft.com/homepage).

1. Go to [Security Admin console](https://security.microsoft.com/homepage) > **Email & collaboration** > **Policy & Rules**.

2. Go to **Threat policies** > **Rules**, and select **Enhanced filtering**.

    <div class="large-img">

    ![Go to Enhanced filtering](/email-security/static/deployment/inline-setup/o365-area1-mx/step2-enhanced-filtering.png)

    </div>

2. Select the `Area 1 Inbound Connector` that you configured previously to edit its configuration parameters. 

3. Select **Automatically detect and skip the last IP address** and **Apply to entire organization**.

    ![Select Automatically detect and skip the last IP address, and Apply to entire organization](/email-security/static/deployment/inline-setup/o365-area1-mx/step3-selectors.png)

4. Select **Save**.

## 3. Configure Area 1 quarantine policies

### Select the disposition you want to quarantine

Quarantining messages is a per domain configuration. To modify which domains will have their messages quarantined, access the domain configuration: 

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).

2. Go to **Settings** (the gear icon) > **Domains**.

3. Locate the domain you want to edit.

4. Select the **...** > **Edit**.

5. Select the additional dispositions you want to quarantine.

    <div class="large-img">

    ![Manage domain quarantines](/email-security/static/deployment/inline-setup/o365-area1-mx/step4-area1-dispositions.png)

    </div>

{{<Aside type="note">}}When Area 1 is deployed as the MX record and protecting Office 365, `Malicious` and `Spam` detections will automatically be quarantined. This behavior cannot be modified.{{</Aside>}}

### Manage the Admin Quarantine

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).

2. Go to **Email** > **Admin Quarantine**.

3. Locate the message you want to manage, and select the `...` icon next to it. This will let you preview, download, or release the quarantined message.

    <div class="large-img">

    ![Manage admin quarantines](/email-security/static/deployment/inline-setup/o365-area1-mx/step4-manage-admin-quarantine.png)

    </div>

## 4. Message handling

There may be scenarios where use of the Office 365 (O365) email quarantine or a combination with Area 1 is preferred. The following are the best practices for using the O365 quarantine [by disposition](/email-security/reference/dispositions-and-attributes/):

| Disposition <div style="width: 100px"> | Action |
-------------- | -----------------------
| `MALICIOUS`  | Should always be quarantined. If the user requires notification, they should require administrator approval to release messages. Users should never have the ability to self remediate `MALICIOUS` emails without approval from an administrator. Emails should be body and subject tagged. |
| `SUSPICIOUS` | Should not be quarantined. Emails should be body and subject tagged, and delivered to the user’s inbox or junk mail folder. Advantage customers should use [`URL defang`](/email-security/email-configuration/email-policies/link-actions/) with this disposition, while all Enterprise customers should always enable [Email Link Isolation](/email-security/email-configuration/email-policies/link-actions/#email-link-isolation). |
| `SPAM`       | Should always be quarantined. If the user requires notification, they may or may not require administrator approval to release emails. Emails should be subject tagged. |
| `BULK`       | Should not be quarantined. Emails should be subject tagged and delivered to the inbox or junk mail folder. |
| `SPOOF`      | If `SPOOF` detections are clean and well managed [in the Allow List](/email-security/email-configuration/lists/), emails should always be quarantined. If the `SPOOF` detections are not clean, they should have the same treatment as `SPAM` dispositions if you have [Enhanced Detections](/email-security/email-configuration/enhanced-detections/) configured. If not, `SPOOF` detections should be treated as `BULK`. Emails should be body and subject tagged. |

Office 365 (O365) has various options, as well as limitations, as to how quarantine email messages. Refer to [Office 365 use cases](/email-security/deployment/inline/setup/office-365-area1-mx/use-cases/) for more information.

The Area 1 dashboard has an [Admin quarantine](/email-security/email-configuration/admin-quarantine/), and you can also use the Office 365 quarantine for when a user quarantine is needed. While there are many quarantine options, the following are the primary use cases the Office 365 example tutorials will cover:

- **Use case 1**: Deliver emails to Office 365 junk email folder and Admin Quarantine in Area 1 (Recommended)
- **Use case 2**: Deliver emails to junk email folder and user managed quarantine (this use case requires that `MALICIOUS` emails be quarantined within the Area 1 dashboard)
- **Use case 3**: Deliver emails to junk email and administrative quarantine
- **Use case 4**: Deliver emails to the user managed quarantine and administrative quarantine
- **Use case 5**: Deliver emails to the user junk email folder and administrative quarantine

## 5. Update your domain MX records

Instructions to update your MX records will depend on the DNS provider you are using. You will need to update and replace your existing MX record with the Area 1 hosts:

{{<render file="_mx-deployment-values.md">}}

DNS changes will reach the major DNS servers in about an hour or follow the TTL value as described in the [Prerequisites section](#prerequisites).

### Secure Office 365 from MX records bypass (recommended)

One method of DNS attacks is to search for old MX records and send phishing emails directly to the mail server. To secure the email flow, you will want to enforce an email flow where inbound messages are accepted by Office 365 only when they originate from Area 1. This can be done by adding a connector to only allow email from Area 1 with TLS encryption. This step is optional but recommended.

{{<Aside type="warning" header="Important">}}
This step should not be performed until 24 hours after all domains (excluding your `<on_microsoft.com>` domain) in your Office 365 organization have been onboarded to Area 1, and Area 1 is their MX record. If a domain has not been onboarded or DNS is still propagating, you will impact production email flow for that domain.
{{</Aside>}}

#### Configure domains

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/). 

2. Go to **Settings** (the gear icon).

3. In **Email Configuration** > **Domains**, make sure each domain you are onboarding has been added.

4. Set the following options for each domain:
    - **Domain**: `<YOUR_DOMAIN>`
    - **Configured as**: `MX Records`
    - **Forwarding to**: This should match the expected MX record for each domain in the [Domains section](https://admin.microsoft.com/#/Domains/) of Office 365
    - **IP Restrictions**: Leave empty
    - **Outbound TLS**: `Forward all messages over TLS`
    - **Quarantine Policy**: Varies by deployment.

#### Create Connector

1. Go to the new [Exchange admin center](https://admin.exchange.microsoft.com/#/homepage).
2. Go to **Mail flow** > **Connectors**.
3. Select **Add a connector**.
4. Select **Connection from** > **Partner organization**.
5. Select **Next**.
6. Set the following options:
    - **Name** - `Secure O365 Inbound`
    - **Description** - `Only accept inbound email from Area 1`
7. Select **Next**.
8. Make sure **By Verifying that the sender domain matches one of the following domains** is selected.
9. Enter `*` in the text field, and select **+**.

    <div class="large-img">

    ![Enter an asterisk in the text box, and select the plus button](/email-security/static/deployment/inline-setup/o365-area1-mx/step9-create-conector.png)

    </div>

10. Select **Next**.
11. Make sure **Reject email messages if they aren't sent over TLS** is selected.
12. Still in the same screen, select **Reject email messages if they aren’t sent from within this IP address range**, and enter all the egress IPs in the [Egress IPs page](/email-security/deployment/inline/reference/egress-ips/).

    <div class="large-img">

    ![Enter all the egress IPs for Office 365](/email-security/static/deployment/inline-setup/o365-area1-mx/step12-egress-ips.png)

    </div>

13. Select **Next**.
14. Review your settings and select **Create connector**.

## 6: Execute `Enable-OrganizationCustomization` (if required)

The following steps are only required if you have not previously customized your Office 365 instance. If you received the message to run this cmdlet in any of the previous steps, you will need to execute it in order to proceed with the configuration. This change may take as long as 24 hours to take effect.

1. Run PowerShell as administrator, and execute the following command. Reply `Yes` when prompted:

```txt
PS C:\Windows\system32> Install-Module ExchangeOnlineManagement
```

![Run the install-module command in PowerShell](/email-security/static/deployment/inline-setup/o365-area1-mx/step1-install-module.png)

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

    ![Run the commands to execute the policy change](/email-security/static/deployment/inline-setup/o365-area1-mx/step2-set-executionpolicy.png)

3. The `Connect-ExchangeOnline` cmdlet will prompt you to login. Log in using an Office 365 administrator account. Once authenticated, you will be returned to the PowerShell prompt.

    ![Log in with an Office 365 admin account](/email-security/static/deployment/inline-setup/o365-area1-mx/step3-connect-exchange.png)

4. You can verify that the `OrganizationCustomization` is enabled by running the command:

```txt
PS C:\Windows\system32> Get-OrganizationConfig | FL isDehydrated
```

![Run the get-organizationconfig command](/email-security/static/deployment/inline-setup/o365-area1-mx/step4-get-organizationconfig.png)

If the result is `false`, `OrganizationCustomization` is already enabled and no further actions are required. If it is true, you need to enable it:

```txt
PS C:\> Enable-OrganizationCustomization
```

![If the previous result is true, enable the organization customization mode](/email-security/static/deployment/inline-setup/o365-area1-mx/step4-enable-organizationcustomization.png)
