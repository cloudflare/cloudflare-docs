---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/360046106112-Understanding-the-CSAM-Scanning-Tool
title: Understanding the CSAM Scanning Tool
---

# Understanding the CSAM Scanning Tool



## Overview

The Child Sexual Abuse Material (CSAM) Scanning Tool allows website owners to proactively identify and take action on CSAM located on their website. By enabling this tool, Cloudflare will compare content served for your website through the Cloudflare cache to known lists of CSAM. These lists are provided to Cloudflare by leading child safety advocacy groups such as the National Center for Missing and Exploited Children (NCMEC).

Remember, by enabling the Service, you agree to the [Supplemental Terms](https://www.cloudflare.com/supplemental-terms/) for the CSAM Scanning Tool. You agree to use this tool solely for the purposes of preventing the spread of CSAM.

___

## Why would a URL be blocked?

Because knowingly distributing or viewing CSAM is illegal, the owner of the website has enabled Cloudflare's CSAM scanning tool to proactively identify and block images identified as CSAM located on their website.

___

## Configuring the CSAM scanning tool

To enable the tool, go to the [Cache Configuration](https://dash.cloudflare.com/?to=/:account/:zone/caching/configuration) section of the dashboard. When enabling the tool, you must provide an email address and NCMEC CyberTipline credentials for reporting purposes.

![The Caching tab from the Cloudflare dashboard displaying the CSAM Scanning Tool configuration page.](/support/static/image2.png)

This email address will be used to both notify you in the event Cloudflare detects a positive match, and to provide NCMEC in case they or law enforcement need more information about the content reported to them.

In order to get CyberTipline API credentials, you can email the [espteam@ncmec.org](mailto:espteam@ncmec.org) to get an application started. Go to the [NCMEC website](https://www.missingkids.org/theissues/csam) for more information. Cloudflare will use the credentials you provide in order to create reports to NCMEC when potential CSAM is identified on your zones. 

Once you’ve verified your reporting email and entered your NCMEC credentials, scanning to identify potential CSAM will begin.

___

## What happens when a match is detected?

Three things happen when a potential match is detected with the tool:

1.  A report is filed to NCMEC. This report includes the following:
    -   The email address you provided when setting up the tool so that NCMEC can reach out for further information if required
    -   The url of the matched content
    -   The date and time the content was identified by the tool
2.  An email is sent to you to inform you of the detection and the report. This email will include:
    -   The file path of the content that was matched
    -   The ID of the report that was filed with NCMEC
    -   The date and time the report was filed 

3\. If possible, a firewall block is placed to prevent further serving of the matched content. If a firewall block fails, we will indicate that the content has not been blocked in the email.

___

## What action should I take when a match is detected?

You are responsible for understanding and complying with any legal obligations you have as a website owner when made aware of any potential CSAM. Although legal obligations vary based on the provider and the jurisdiction, website owners often have obligations to report apparent CSAM, to remove content, and to preserve records. Some of those possible obligations are as follows:

-   You may need to preserve and securely store a copy of the content and related data in the case NCMEC or law enforcement reach out for additional details.

You likely have an obligation to securely preserve certain information related to your report for at least 90 days in the case of an investigation. To ensure that access to the content is limited, take care not to store this information anywhere accessible to anyone but those within your organization responsible for legal requests.

-   You should remove the content and notify Cloudflare of the removal.

Once any preservation obligations have been fulfilled, you should remove the content from your website. This is especially important if Cloudflare’s notice to you indicates that our block was unsuccessful.

___

## How do I have a block removed from my website?

To disable a block, either because you have determined that the blocked content is not CSAM (a false positive) or because you have taken down the blocked content, please navigate to the Cloudflare dashboard for your zone and request reviews on the relevant blocks. A request to remove a block must be accompanied by a representation from you confirming that the blocked content is not CSAM or has been removed.  If applicable, we will notify NCMEC when a false positive has been identified on the reported URL.

![Example error message for a domain with blocked content.](/support/static/csam-blocked-content.png)

These actions are available to users with the following roles:

-   Admin
-   Super Admin
-   Trust & Safety

___

## Additional Resources

[CSAM Scanning Tool Supplemental Terms](https://www.cloudflare.com/supplemental-terms/)

[National Center for Missing and Exploited Children (NCMEC)](https://www.missingkids.org/)

[NCMEC CyberTipline](https://www.missingkids.org/gethelpnow/cybertipline)

[INHOPE](https://www.inhope.org/)
