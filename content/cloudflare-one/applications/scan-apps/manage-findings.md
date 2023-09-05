---
pcx_content_type: how-to
title: Manage findings
layout: single
weight: 1
meta:
  title: Manage security findings
---

# Manage security findings

Findings are security issues detected within SaaS applications that involve users, data at rest, and other configuration settings. With Cloudflare CASB, you can review a comprehensive list of findings in Zero Trust and immediately start taking action on the issues found.

## Prerequisites

- You have [added](/cloudflare-one/applications/scan-apps/#add-an-integration) a CASB integration.
- Your scan has surfaced at least one security finding.

## View findings

1. Open [Zero Trust](https://one.dash.cloudflare.com) and go to **CASB** > **Findings**.

   You will see the findings detected across all integrations.

2. To view details for an individual finding, select **View**.

   The individual findings page shows all detected instances of the finding within a specific integration. You can expand an individual row to view details for a particular instance.

3. To resolve the finding, expand the **Remediation Guide** and follow the step-by-step instructions in the UI.

Other actions you can take include [creating an HTTP block policy](#resolve-finding-with-a-gateway-policy), updating the finding's [severity level](#severity-levels), or [hiding irrelevant findings](#hide-findings) from view.

## Severity levels

Cloudflare CASB labels each finding with one of the following severity levels:

- **Critical**: Suggests the finding is something your team should act on today.
- **High**: Suggests the finding is something your team should act on this week.
- **Medium**: Suggests the finding should be reviewed sometime this month.
- **Low**: Suggests the finding is informational or part of a scheduled review process.

### Change the severity level

You can change the severity level for a finding at any time, in case the default assignment does not suit your environment:

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **CASB** > **Findings**.
2. Locate the finding you want to modify and select **View**.
3. In the severity level drop-down menu, choose your desired setting (_Critical_, _High_, _Medium_, or _Low_).

The new severity level will only apply to the finding within this specific integration. If you added multiple integrations of the same SaaS application, the other integrations will not be impacted by this change.

## Resolve finding with a Gateway policy

Using the security findings from CASB allows for fine-grained Gateway policies which prevent future unwanted behavior while still allowing usage that aligns to your company's security policy. This means going from viewing a CASB finding, like the use of an unapproved SaaS application, to preventing or controlling access in minutes.

{{<Aside type="note" header="Before you begin">}}
Ensure that you have [enabled HTTP filtering](/cloudflare-one/policies/gateway/initial-setup/http/) for your organization.
{{</Aside>}}

To create a Gateway policy directly from a CASB finding:

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **CASB** > **Findings**.
2. Locate the finding you want to modify and select **View**.
3. Find the instance you want to block and select its three-dot menu.
4. Select **Block with Gateway HTTP policy**. A new browser tab will open with a pre-filled HTTP policy.
   {{<Aside type="note">}}
   Not all CASB findings will have the **Block with Gateway HTTP policy** option. Unsupported findings can only be resolved from your SaaS application dashboard or through your domain provider.
   {{</Aside>}}
5. (Optional) [Customize the HTTP policy](/cloudflare-one/policies/gateway/http-policies/). For example, if the policy blocks an unsanctioned third-party app, you can apply the policy to some or all users, or only block uploads or downloads.
6. Select **Save**.

Your HTTP policy will now prevent future instances of the security finding.

## Hide findings

After reviewing your findings, you may decide that certain findings are not applicable to your organization. Cloudflare CASB allows you to remove findings or individual instances of findings from your list of active issues. CASB will continue to scan for these issues, but any detections will appear in a separate tab.

### Hide a finding

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **CASB** > **Findings**.
2. In the **Active** tab, select the checkboxes for the findings you want to hide.
3. Select **Ignore**.

The findings will be moved from **Active** to **Ignored**. CASB will continue to scan for these findings and report detections in the **Ignored** tab. You can move ignored findings back to the **Active** tab at any time.

### Hide an instance of a finding

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **CASB** > **Findings**.
2. In the **Active** tab, locate the finding you want to modify and select **View**.
3. Under **Instances**, select the **Active** tab and locate the instance you want to hide.
4. Select the three-dot menu, then select **Hide**.

The instance will be moved from **Active** to **Hidden**. If the finding occurs again for the same user, CASB will report the new instance in the **Hidden** tab. You can move hidden instances back to the **Active** tab at any time.
