---
pcx_content_type: reference
title: Supported browsers
sidebar:
  order: 4
---

import { Details } from "~/components"

Cloudflare can challenge your visitors in various ways. They can be challenged by [Challenge Pages](/cloudflare-challenges/challenge-types/challenge-pages/), [Turnstile](/turnstile/), or by [JavaScript Detections (JSD) in Bot Management](/cloudflare-challenges/challenge-types/javascript-detections/). This document lays out the supported browsers across all of these challenge methods. When your website or application presents a Challenge, your visitors receive either a Non-interactive or an Interactive Challenge. 

Cloudflare is committed to ensuring our Challenges work with as many browsers as possible, but there are limitations that you should be aware of. 

## Overview

Cloudflare Challenges are designed to be compatible with any desktop and mobile browser. If your visitors are using an up-to-date version of a browser listed below, they will receive and be able to solve Challenges without any issues. The following is a non-exclusive list of browsers supported by Cloudflare Challenges. Browsers not listed on this list are supported on a best-effort basis. 

### Supported browsers

The following browsers are officially supported and tested.

<Details header="Google Chrome (desktop and mobile)">
  - Current version and two previous major versions
  - Chromium-based browsers and Chromium-based browsers that track the current Chrome stable version
  
  :::caution
  Beta, Dev, Canary, Nightly, or other unreleased builds are not officially supported.
  :::
</Details>

<Details header="Mozilla Firefox">
  - Current version and two previous major versions
  - Extended Support Release (ESR) versions are supported
</Details>

<Details header="Safari">
  - Current version and two previous major versions
  - iOS Safari on current iOS version and two previous major versions
</Details>

<Details header="Microsoft Edge">
  - Current version and two previous major versions
  </Details>

<Details header="Samsung Internet Browser">
  - Current version and two previous major versions
</Details>

### Limited browser support

The following browsers and environments have limited support and may experience occasional issues.

- Internet Explorer is no longer supported.
- Browsers or operating systems that are more than five years old or have not received security updates in over two years.
- Custom or heavily modified browser engines, webviews, or embedded browsers.

:::note
If your visitors encounter issues using these browsers, we recommend upgrading to a more current browser for the best experience.
:::

### Unsupported browsers

The following environments are not supported.

- Command-line tools such as `wget`, `curl`, or others that lack JavaScript execution capabilities required for Cloudflare Challenges.
- Headless browsers like headless Chrome, headless Firefox, PhantomJS, or others. Challenges are specifically designed to identify and block headless browser traffic. Automation tools and scripts that use headless browsers are not supported.
- Browser automation frameworks such as Selenium, Puppeteer, Playwright, or others that are considered automated traffic will be blocked by Challenges.

## Common issues

### Browser extensions

Browser extensions can interfere with Challenges in several ways.

- Ad blockers and content blockers may prevent Challenge scripts from loading properly or block communication with Cloudflare's validation servers.
- Privacy-focused extensions like script blockers, fingerprinting protection, or canvas blockers can interfere with the Challenge verification process.
- VPN or proxy extensions might trigger additional security checks or cause IP address inconsistencies.
- Browser automation tools are often detected as potential bots and may cause Challenge failures.

:::note
If Challenges consistently fail, try temporarily disabling extensions and reload the page. 
:::

### Device emulation and developer tools

Challenges are designed to distinguish between real human users and automated traffic. When device emulation is enabled (such as through browser developer tools), it can trigger bot detection mechanisms.

- Mobile device emulation in desktop browsers often uses distinctive characteristics that differ from real mobile devices. 
- Developer tools may modify browser behavior or expose debugging information that changes how Challenges operate.
- Automation frameworks like Selenium, Puppeteer, or Playwright are specifically detected as non-human traffic.

:::note
For developers testing applications, we recommend using real devices rather than emulated environments when possible. 

If you must use emulation, be aware that Challenges may be more difficult to pass, and do not reflect the real experience on mobile devices.
:::

### WebViews and in-app browsers

Challenges may behave differently depending on embedded browser contexts.

- WebViews in mobile applications may have limited functionality compared to full browsers
- In-app browsers often have restricted JavaScript capabilities
- Email client preview windows typically cannot complete Interactive Challenges

## Troubleshooting

If your visitors consistently experience Challenge issues, refer to [Challenge solve issues](/cloudflare-challenges/troubleshooting/challenge-solve-issues/) for additional troubleshooting information.
