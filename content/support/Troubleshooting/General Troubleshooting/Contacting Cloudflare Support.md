---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200172476-Contacting-Cloudflare-Support
title: Contacting Cloudflare Support
---

# Contacting Cloudflare Support

## Guidelines for contacting Cloudflare support

Cloudflare Support _cannot_ perform the following actions:

-   Make configuration or account changes on a customer’s behalf
-   Provide sensitive account info over the phone
-   Troubleshoot or answer questions about domains not associated with the Cloudflare account email address used to contact support

{{<Aside type="warning">}}
**Do not share** any sensitive information, such as passwords, credit
card numbers, private keys, or API keys with Cloudflare.
{{</Aside>}}

Before notifying Cloudflare of an issue with your site, refer to the [Cloudflare Status Page](https://www.cloudflarestatus.com/). If reporting issues with your site, ensure to provide adequate details in the support ticket _(refer to [Getting help with an issue](#getting-help-with-an-issue) for more information)_.

___

## Methods of contacting Cloudflare support

As a Cloudflare customer, you can contact Cloudflare for support via the community portal or by opening a support ticket, live chat, or phone. Support options can vary depending on your plan.

|   | Enterprise  | Business | Pro | Free |
|---|---|---|---|---|
|  [Community](https://community.cloudflare.com/)<br/>Join the community to ask basic troubleshooting questions and to view the latest resources (such as tips for resolving common issues and configuration guidance). | Yes  | Yes  | Recommended  | Recommended  |
| [Support Ticket](#getting-help-with-an-issue)<br/>Use to troubleshoot specific issues or errors. Response times depend on your plan. | Yes | Yes | Yes | No* |
| **Chat**<br/>Use to troubleshoot specific issues or errors. Response times depend on your plan. | Yes | Yes | No | No |
| **Emergency Phone**<br/>Use phone support to reach out during emergencies such as site outages or DDoS attacks. | Yes | No | No | No |


* Customers on Free plans are encouraged to utilize our Cloudflare Community and will only receive standard ticket support for billing, account, and registrar issues.

___

## Verifying your identity

_(For Enterprise Emergency Phone Support)_

For account security, you must verify your identity and account ownership in the Cloudflare dashboard before discussing account settings and sensitive details with Cloudflare Support. There are two verification options:

-   a single-use token that automatically refreshes every thirty (30) seconds, or
-   an [authenticator app token](/support/account-management-billing/account-privacy-and-security/securing-user-access-with-two-factor-authentication-2fa/#configure-totp-mobile-app-authentication-for-two-factor-cloudflare-login) on your mobile device.

### Authenticating your account

1\. Log into your Cloudflare account.

2\. In the upper right corner of the Cloudflare dashboard, click **Support** and select **Contact Support**.

![](/images/support/Screen_Shot_2022-09-28_at_11.33.42.png)

3\. On the right-hand panel there is a section for _Emergency Phone Support Hotline_.

![](/images/support/Screen_Shot_2022-09-28_at_11.41.37.png)

4\. To authenticate using a single-use token, click **Get a single-use token**. A pop-up window will appear with the token code. The code automatically refreshes every 30 seconds.

![](/images/support/Emergency_Phone_Support.png)

5\. To authenticate using an authenticator app, click **Configure authenticator app** and follow the [configuration instructions](/support/account-management-billing/account-privacy-and-security/securing-user-access-with-two-factor-authentication-2fa/#configure-totp-mobile-app-authentication-for-two-factor-cloudflare-login) on the following screen. After configuration, the token code will appear in your mobile authentication application.

6\. Wait until the Cloudflare Support agent asks for the code before sharing the verification token.

___

## Getting help with an issue

To submit a support ticket, follow these steps:

1.  Browse to [https://dash.cloudflare.com/redirect?account=support](https://dash.cloudflare.com/redirect?account=support).
2.  Enter the **email** and **password** for your Cloudflare account. Your email needs to be [verified](/support/account-management-billing/common-account-questions/login-and-account-issues/#cannot-verify-your-email) in order to submit a Support ticket.
3.  Select the appropriate account requiring assistance.
4.  Verify that you are now in the Support Portal
5.  Choose the category and subcategories that best define your issue
6.  Choose the affected domains (if applicable)
7.  Enter a detailed summary of the issue you’re experiencing.
8.  Review the right-hand panel of the Portal for recommended resources and for troubleshooting guides resulting from diagnostics run against your domain.
9.  If the provided resources did not solve your issue, click Add more details to submit a ticket\*\*
10.  Complete the ticket submission fields as completely as possible with the following information. _(**Please note** that missing information will increase the time it takes to resolve your issue and our team may not be able to investigate without enough information. Please review [Gathering information for troubleshooting sites](/support/troubleshooting/general-troubleshooting/gathering-information-for-troubleshooting-sites/) and make sure you include all needed information.)_
    -   A detailed description of the issue with the following information:
        -   Timestamp (UTC)
        -   ZoneName/ZoneID
        -   Problem frequency
        -   Steps to reproduce the issue, with actual results vs expected results
    -   Any necessary information for a technical investigation
        -   A description of the actual results vs expected results
        -   Steps to reproduce the issue, with example URLs 
        -   Exact error messages
        -   HAR files
        -   Screenshots
        -   Relevant logs from the origin web server
        -   Output from [test tools](/support/troubleshooting/general-troubleshooting/gathering-information-for-troubleshooting-sites/) such as MTR, traceroute, dig/nslookup, and cURL
    -   Priority level, impact to service / production
    -   Any collaborators whom you wish to be cc’d on the ticket
11.  Click **Submit Ticket**

\*\* Available to certain plan types only. Refer to chart above for details.

### View open support tickets

1.  Log in to your Cloudflare account.
2.  Select _Help Center_ from **Support** dropdown.
3.  Click **Sign In** if it appears in the top-right corner; otherwise, click on your name or profile picture.
4.  Click **My Activities & Requests**.

___

## Live chat support

You can also use the **live chat** (Business and Enterprise plans, only) to ask specific questions that don’t require a lot of technical investigation:

1.  Browse to [https://dash.cloudflare.com/redirect?account=support](https://dash.cloudflare.com/redirect?account=support).
2.  Enter the email and password for your Cloudflare account. Your email needs to be verified in order to chat live with us.
3.  Select the appropriate account requiring assistance.
4.  Click the **Help** icon in the bottom right corner of the screen
5.  The **Live Chat** screen will appear. Use the search field to check for answers to your questions:
6.  If the results didn't answer your question, press the **Live chat** button and start typing your message to chat with a Technical Support Engineer.

___

## Service Level Agreements and Objectives

### How we prioritize your issue

Cloudflare support responds to every ticket received in the following priority order:

-   Premium Enterprise
-   Standard Enterprise
-   Business
-   Pro
-   Free

Cloudflare Support strives to respond to our customers as quickly as possible. Urgent issues (site down, under attack) are prioritized for the quickest response possible. Please explicitly specify the priority level and impact to your production service when reaching out to Cloudflare support.

Below are definitions of the priority levels Cloudflare assigns to tickets and the associated Service Level Agreement (SLA) or Service Level Objective (SLO). Whenever possible, responses are provided quicker than the noted SLAs.

### Priority definitions

-   P1 - Service is significantly impaired and unavailable in multiple user locations.
    -   _Example_: site outage issues or an ongoing attack.
-   P2 - Repeated inability to use the Service from a single location or localized region.
    -   _Example_: Localized site outage. These issues may be with a single website or even a single server.
-   P3 - Issues that may impact service performance or user experience but do not prevent service usage; account-related queries.
    -   _Example_: slow performance issues, information requests, or usage questions.
-   P4 - General questions related to Cloudflare’s products and services

### Premium SLA

-   P1 - initial response in 1 hour
-   P2 - initial response in 2 hours 
-   P3 - initial response in 24 hours 
-   P4 - initial response in 24 hours

### Enterprise SLA

-   P1 - initial response in 2 hours
-   P2 - initial response in 4 hours
-   P3 - initial response in 48 hours
-   P4 - initial response in 48 hours

### **Business SLO**

-   P1 - initial response in 8 hours
-   P2 - initial response in 12 hours
-   P3 - initial response in 72 hours
-   P4 - initial response in 72 hours

### SLOs for other plans

-   Pro and Free customers - No SLAs are offered, but customers are responded to in the order in which their request is received. For a quicker answer, we highly recommend searching or posting on our [Community forums](https://community.cloudflare.com/).
