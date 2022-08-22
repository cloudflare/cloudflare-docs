---
pcx_content_type: how-to
title: Manage findings
layout: single
weight: 1
meta:
    title: Manage security findings
---

# Manage security findings

Findings are security issues detected within SaaS applications that involve users, data at rest, and other configuration settings. With Cloudflare CASB, you can review a comprehensive list of findings on the Zero Trust dashboard and immediately start taking action on the issues found.

## Prerequisites

- You have [added](/cloudflare-one/applications/scan-apps/#add-an-integration) a CASB integration.
- Your scan has surfaced at least one security finding.

## View findings

1. Open the [Zero Trust dashboard](https://dash.teams.cloudflare.com/) and go to **CASB** > **Findings**. You will see the findings detected across all integrations.

2. To view details for an individual finding, select **View**. The individual findings page shows all detected instances of the finding for that particular integration.

Next, take steps to either [fix the issue](#resolve-findings), update its [severity level](#severity-levels), or [hide irrelevant findings](#hide-findings).

## Severity levels

Cloudflare CASB labels each finding with one of the following severity levels:

* **Critical** suggests the finding is something your team should act on today.
* **High** suggests the finding is something your team should act on this week.
* **Medium** suggests the finding should be reviewed sometime this month.
* **Low** suggests the finding is informational or part of a scheduled review process.

### Change a severity level

You can change the severity level for a finding at any time, in case the default assignment does not suit your environment.

1. Customer navigates into a Security Finding
2. Customer selects/clicks the Finding Severity
3. Customer is presented with the Severity options to which it can be changed (Low, Medium, High, Critical)
4. Customer selects the new desired Severity

The Finding Severity is now what the customer has selected and updates to reflect as such now and going forward. The new severity applies to all instances of a finding within the integration.

A Severity is mapped to a Finding per Integration so changing it only applies to that specific Integration's Finding. If a user goes to Integration A (Github) → Finding 1 → and changes the Severity from High to Low, Integration B (Github) → Finding 1 → Severity is not impacted in any way.

## Resolve findings

Whether it be detecting an unknown application being used for Shadow IT or wanting to limit functionality, access, or behaviors to an unapproved application, remediation is front of mind.

### Create a Gateway Block policy

Using the security findings from CASB allows for fine grained Gateway policies which prevent future unwanted behavior while still allowing usage that aligns to company security policy. This means going from viewing a CASB security issue, like the use of an unapproved SaaS application, to preventing or controlling access in minutes.

For example, take the CASB Google Workspace security finding around third-party apps which detects sign-ins or other permission sharing from a user's account. In just a few clicks, you can create a Gateway policy to block some or all of the activity, like uploads or downloads, to the detected SaaS application. This policy can be applied to some or all users, based on what access has been granted to the user’s account. 

By surfacing the exact behavior with CASB, you can take swift and targeted action to better protect your organization with Gateway.

Not all CASB Findings will allow a customer to create a Gateway policy from the ZT dash.

It doesn't make sense for all Security Findings to have the option to block with Gateway due to the nature of the Finding, so the scope will be limited to those where blocking on the wire makes the most sense for users. This tends to land in the Shadow IT and Data security camps, which include File Sharing and Third-party apps. For example, the Google Workspace Findings around user behavior (inactive, suspended, 2FA disabled, etc) are not things solved by blocking packets.

## Hide findings

Another example is security Findings that are not applicable to a business and should be removed/hidden/reduced altogether.

For example, in the Google Workspace Installed 3rd Party App with X Access we may alert the user to an application or service that is sanctioned, say Slack for example. Rather than list out the dozens or thousands of users using Slack, the admin would want to archive this Finding as that behavior is expected. This is similar to how we do the Shadow IT report where we can denote sanctioned app usage detected.

An important note: technically and visually, Ignoring should function the exact same as the Archiving. The only difference is at what level this is applied, that is you Ignore a Finding and Archive an Instance of a Finding. You cannot Archive an Instance of an Ignored Finding. It must be made Active again in order to then Archive it's instances.

### Hide a finding

1. Customer navigates into a Security Finding
2. Select the checkboxes for the findings you want to ignore and then select **Ignore**.

The finding will be moved from the Active tab to the Ignored tab. Findings that are Ignored still continue to crawl assets and report any instances of the Findings in the hidden tab. You can move it back to the Active tab at any time.

### Hide an instance of a finding

1. Customer navigates into a Security Finding
2. Customer expands an instance of a Security Finding
3. Customer selects to archive an instance of the Finding

The Finding instance is hidden from display and moved into the Archived tab. All future instances for that user will also be hidden. You can move it back to the Active tab at any time.