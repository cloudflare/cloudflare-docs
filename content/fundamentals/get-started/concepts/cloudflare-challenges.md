---
pcx_content_type: concept
title: Cloudflare challenges
weight: 4
---

# Cloudflare challenges

When a website is protected by Cloudflare, there are several occasions when it will challenge visitor traffic:

- The visitor's IP address has shown suspicious behavior online (as tracked by [Project Honeypot](http://www.projecthoneypot.org/search_ip.php)).
- The website owner has blocked the country associated with the visitor's IP address.
- The visitor's actions have activated a [firewall rule](/firewall/) enabled by the website owner.

If the visitor passes the challenge, their request is allowed. If they fail, the request will be blocked.

---

## Available challenges

### Managed challenge (recommended)

Managed challenges are where Cloudflare dynamically chooses the appropriate type of challenge based on the characteristics of a request. This helps avoid [CAPTCHAs](https://www.cloudflare.com/learning/bots/how-captchas-work/), which also reduces the lifetimes of human time spent solving CAPTCHAs across the Internet.

Unless there are specific compatibility issues or other reasons to use other types of challenges, you should use managed challenges for your various firewall rules.

Depending on the characteristics of a request, Cloudflare will choose an appropriate type of challenge, which may include but is not limited to:

- A non-interactive challenge page (similar to the current [JS Challenge](#js-challenge)).
- A custom interactive challenge (such as click a button).
- Private Access Tokens (using recent Apple operating systems).

#### Available products

Currently, **Managed Challenge** actions are available in the following security products:

- [IP Access Rules](/waf/tools/ip-access-rules/)
- [User Agent Blocking](/waf/tools/user-agent-blocking/)
- [Rate Limiting (previous version)](/waf/reference/legacy/old-rate-limiting/)
- [Custom rules](/waf/custom-rules/)
- [WAF Managed Rules](/waf/managed-rules/)
- [Rate limiting rules](/waf/rate-limiting-rules/)
- [Bot Fight Mode](/bots/get-started/free/): You may also see Security Events with an **Action taken** of **Managed Challenge** due to [Cloudflare bot products](/bots/troubleshooting/#why-am-i-seeing-a-managed-challenge-action-for-firewall-rules).
- [Firewall rules](/firewall/)
- [HTTP DDoS Attack Protection](/ddos-protection/managed-rulesets/http/)

### JS challenge

With a JS challenge, Cloudflare presents challenge page that requires no interaction from a visitor, but rather JavaScript processing by their browser.

The visitor will have to wait until their browser finishes processing the JavaScript, which should be less than five seconds.

### Interactive Challenge

Interactive challenges require a visitor to interact with the challenge page, presenting the visitor with an interactive challenge to solve. Cloudflare does not recommend using Interactive Challenges.

For more on why Cloudflare does not recommend using Interactive Challenge, in favor of Managed Challenge, refer to our [blog](https://blog.cloudflare.com/end-cloudflare-captcha/).

---

## Browser support

When your application sends a challenge, your visitors either receive a non-interactive or an interactive challenge page.

### Supported browsers

If your visitors are using an up-to-date version of a major browser — such as Chrome, Firefox, Safari, Microsoft Edge, Chrome and Safari on mobile — they will receive the challenge correctly.

Challenges are not supported by Microsoft Internet Explorer.

If your visitors encounter issues using a major browser besides Internet Explorer, they should upgrade their browser.

### Mobile browsers

Challenges are not supported for desktop mode on mobile browsers or mobile mode on desktop browsers.

---

## Resolve a challenge

If a visitor encounters a challenge, Cloudflare employees cannot remove that challenge. Only the website owner can configure their Cloudflare settings to stop the challenge being presented.

When observing a Cloudflare Challenge page, a visitor could:

- Successfully pass the challenge to visit the website. Cookies and JavaScript support are required in browser settings to pass the challenge.
- Request the website owner to allow their IP address.
- Scan their computer for malicious programs (it may be infected).
- Check their antivirus or firewall service to make sure it is not blocking access to the challenge resources (for example, images).

---

## Detecting a challenge page response

When a request encounters a Cloudflare challenge page instead of the originally anticipated response, the challenge page response (regardless of the challenge page type) will have the `cf-mitigated` header present and set to `challenge`. This header can be leveraged to detect if a response was challenged when making fetch/XHR requests. This header provides a simple and reliable way to identify whether a response is a challenge or not, enabling a web application to take appropriate action based on the result. For example, a front-end application encountering a response from the backend may check the presence of this header value to handle cases where challenge pages encountered unexpectedly.

{{<Aside type="note">}}

Regardless of the requested resource-type, the content-type of a challenge will be `text/html`.

{{</Aside>}}

For the `cf-mitigated` header, `challenge` is the only valid value. The header is set for all challenge page types.

To illustrate, here is a code snippet that demonstrates how to use the `cf-mitigated` header to detect whether a response was challenged:

```js
fetch('/my-api-endpoint')
  .then(response => {
    if (response.headers.get('cf-mitigated') === 'challenge') {
      // Handle challenged response
    } else {
      // Process response as usual
    }
  });
```

For additional help, refer to [our FAQ for Challenges](/firewall/known-issues-and-faq#challenges).

## Multi-language support

Cloudflare Challenge Platform can detect multiple languages and display the localized challenge experience, which is determined by `navigator.language` value. The [Navigator.language read-only property](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language) returns a string representing the preferred language of the user, usually the language of the browser UI. The supported languages are currently English, Arabic, Chinese (Simplified), Chinese (Traditional), Dutch, French, German, Indonesian, Italian, Japanese, Korean, Persian/Farsi, Polish, Portuguese, Russian, Spanish, Turkish.

## Common issues

### Deprecated browser support

Challenges are not supported by Microsoft Internet Explorer. If you are currently using Internet Explorer, try using another modern web browser (Chrome, Safari, Firefox). If you are already using a modern web browser, make sure it is using the latest version.

### Referer header

When a request is sent with a referer header, the user will receive a challenge page as a response. Upon solving the challenge page, the request with the referer is sent to the origin, and the response to the request is served to the user. The JavaScript on the response page may read the value of `document.referer`, but it will be inaccurate. This affects tools such as Google Analytics, which reads the referer from JavaScript.

You can add tracking scripts to challenge pages to capture the correct referer header on the initial request. 

### Cross-origin resource sharing (CORS) preflight requests

Cross-origin resource sharing (CORS) preflight requests, or `OPTIONS`, excludes user credentials that include cookies. As a result, the `cf_clearance` cookie will not be sent with the request, causing it to fail to bypass a challenge page (non-interactive, managed, or interactive challenge).