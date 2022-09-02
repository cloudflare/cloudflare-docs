---
title: Office 365 MX Record
pcx_content_type: how-to
weight: 1
layout: single
meta:
   title: Deploy and configure Microsoft Office 365 with Area 1 as MX Record
---

# Deploy and configure Microsoft Office 365 with Area 1 as MX Record

In this tutorial you will learn how to configure Microsoft Office 365 with Area 1 as MX record. This tutorial is broken down into several steps:

* 1: Add Area 1 IP addresses to Allow List.
* 2: Execute Office 365 `Enable-OrganizationCustomization` (if required).
* 3: Enhanced Filtering Configuration.
* 4: Configure Area 1 Quarantine Policies.
* 5: Update your domain MX Records.

![A schematic showing where Area 1 security is in the lifeline of an email sent](/email-security/static/office365-mx-record-flow.png)

## 1. Add Area 1 IP addresses to Allow List

1. Go to the [Microsoft Security admin center](https://protection.office.com/homepage) > **Threat management** section, and select [**Policy settings**](https://protection.office.com/threatpolicy).

2. Select the [Anti-spam option](https://protection.office.com/antispam).

3. Select **Connection filter policy (Default)** to edit the policy, then select **Edit connection filter policy**.

4. In **Always allow messages from the following IP addresses or address range**, add the IP addresses and CIDR blocks mentioned in [Egress IPs](/email-security/deployment/inline/reference/egress-ips/).

5. Select **Save**.

{{<Aside type="note">}}
Depending on your Office 365 configuration, you may receive a warning indicating that you need to run the **Enable-OrganizationCustomization** cmdlet before you create or modify objects in your Exchange Online organization.  Follow the next step to enable this cmdlet.
{{</Aside>}}

## 2: Execute Enable-OrganizationCustomization (if required)

The following steps are only required if you have not previously customized your Office 365 instance. If you received the message to run this cmdlet in the previous step, you will need to execute it in order to proceed with the configuration.

1. Run PowerShell as administrator, and execute the following command. Reply `Yes` when prompted:

```txt
> Install-Module ExchangeOnlineManagement
```

{{<Aside type="note">}}This module is a Microsoft module.{{</Aside>}}

2. Run the following commands to execute the policy change and connect to the Office 365 instance:

```txt
> set-executionpolicy remotesigned
```

Confirm that you want to execute the policy change, and then run the following command:

```txt
> Import-Module ExchangeOnlineManagement
```

Finally, run the following to authenticate against your Office 365 instance:

```txt
> Connect-ExchangeOnline
```

3. The **Connect-ExchangeOnline** cmdlet will prompt you to login. Log in using an Office 365 administrator account. Once authenticated, you will be returned to the PowerShell prompt.

4. You can verify that the OrganizationCustomization is enabled by running the command:

```txt
> Get-OrganizationConfig | FL isDehydrated
```

If the result is `false`, OrganizationCustomization is already enabled and no further actions are required. If it is true, you need to enable it:

```txt
Enable-OrganizationCustomization
```

## 3. Enhanced Filtering configuration

Configuring the Enhanced Filtering function will allow Office 365 to properly identify the original connecting IP before the message was received by Area 1. This helps with SPF analysis. You will first need to create an inbound connector. 

1. From the **Microsoft Exchange admin center**, select **mail flow** > **connectors**.

2. Select the `+` icon to configure a new connector. In the **Select your mail flow scenario panel** dialog box that opens, select:
    2.1. _Partner organization_ in the **From** drop-down.
    2.2. _Office 365_ in the **To** drop-down.

