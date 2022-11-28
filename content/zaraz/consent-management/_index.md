---
pcx_content_type: reference
title: Consent management
weight: 6
meta:
    title: Zaraz Consent Management platform
layout: single
---

# Zaraz Consent Management platform

Zaraz provides a Consent Management platform (CMP) to help you address and manage required consents under the European [General Data Protection Regulation (GDPR)](https://gdpr-info.eu/) and the [Directive on privacy and electronic communications](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:02002L0058-20091219&from=EN#tocId7). This consent platform lets you easily create a consent modal for your website based on the tools you have configured. With Zaraz CMP, you can make sure Zaraz only loads tools under the umbrella of the specific purposes your users have agreed to. 

The consent modal added to your website is concise and gives your users an easy way to opt-in to any purposes of data processing your tools need.

## Crucial vocabulary

The Zaraz Consent Management platform (CMP) has a **Purposes** section. This is where you will have to create purposes for the third-party tools your website uses. To better understand the terms involved in dealing with personal data, refer to these definitions:

* **Purpose**: The reason you are loading a given tool on your website, such as to track conversions or improve your website’s layout based on behavior tracking. One purpose can be assigned to many tools, but one tool can be assigned only to one purpose.
* **Consent**: An affirmative action that the user makes, required to store and access cookies (or other persistent data, like `LocalStorage`) on the users’ computer/browser.

{{<Aside type="note">}}
All tools use consent as a legal basis. This is due to the fact that they all use cookies that are not strictly necessary for the website’s correct operation. Due to this, all purposes are opt-in.
{{</Aside>}}

## Purposes and tools

When you add a new tool to your website, Zaraz does not assign any purpose to it. This means that this tool will skip consent by default. Remember to check the [Consent Management settings](/zaraz/consent-management/enable-consent-management/) every time you set up a new tool. This helps ensure you avoid a situation where your tool is triggered before the user gives consent.

The user’s consent preferences are stored within a first-party cookie. This cookie is a JSON file that maps the purposes’ ID to a `true`/`false`/missing value:

* `true` value: The user gave consent.
* `false`value: The user refused consent.
* Missing value: The user has not made a choice yet.


{{<Aside type="warning" header="Important">}}
Cloudflare cannot recommend nor assign by default any specific purpose for your tools. It is your responsibility to properly assign tools to purposes if you need to comply with GDPR.
{{</Aside>}}

## Important things to note

* Purposes that have no tools assigned will not show up in the CMP modal.
* If a tool is assigned to a purpose, it will not run unless the user gives consent for the purpose the tool is assigned for.
* Once your website loads for a given user for the first time, all the triggers you have configured for tools that are waiting for consent are cached in the browser. Then, they will be fired when/if the user gives consent, so they are not lost.
* If the user visits your website for the first time, the consent modal will automatically show up. This also happens if the user has previously visited your website, but in the meantime you have enabled CMP.
* On subsequent visits, the modal will not show up. You can make the modal show up by calling the function `zaraz.showConsentModal()` — for example, by binding it to a button.