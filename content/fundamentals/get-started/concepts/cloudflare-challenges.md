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

Unless there are specific compatability issues or other reasons to use other types of challenges, you should use managed challenges for your various firewall rules.

Depending on the characteristics of a request, Cloudflare will choose an appropriate type of challenge, which may include but is not limited to:

- A non-interactive challenge page (similar to the current [JS Challenge](#js-challenge)).
- An invisible proof of work challenge to the browser.
- A custom interactive challenge (such as click a button).
- A CAPTCHA challenge.

#### Available products

Currently, **Managed Challenge** actions are available in the following security products:

- [IP Access Rules](/waf/tools/ip-access-rules/)
- [User Agent Blocking](https://support.cloudflare.com/hc/articles/115001856951)
- [Rate Limiting (previous version)](https://support.cloudflare.com/hc/articles/115001635128)
- [Custom rules](/waf/custom-rules/)
- [Managed Rulesets](/waf/managed-rulesets/)
- [Rate limiting rules](/waf/rate-limiting-rules/)
- [Bot Fight Mode](/bots/get-started/free/): You may also see Firewall Events with an **Action taken** of **Managed Challenge** due to [Cloudflare bot products](https://support.cloudflare.com/hc/articles/360035387431#managed-challenge).
- [Firewall rules](/firewall/)
- [HTTP DDoS Attack Protection](/ddos-protection/managed-rulesets/http/)

{{<Aside type="note">}}

For domains on Free plan, any firewall rules set to **Legacy CAPTCHA** have become intelligent **Managed Challenge**. As a free customer, you cannot opt out of Managed Challenges.

{{</Aside>}}

### JS challenge

With a JS challenge, Cloudflare presents challenge page that requires no interaction from a visitor, but rather JavaScript processing by their browser.

The visitor will have to wait until their browser finishes processing the JavaScript, which should be less than five seconds.

### Legacy CAPTCHA challenge

CAPTCHA challenges require a visitor to interact with a visual image, usually identifying specific letters or characteristics of the image. Cloudflare does not recommend using Legacy CAPTCHAs.

For more details about CAPTCHAs in general, refer to [How CAPTCHAs work](https://www.cloudflare.com/learning/bots/how-captchas-work/).

For more on why Cloudflare does not recommend using CAPTCHAs, refer to our [blog](https://blog.cloudflare.com/end-cloudflare-captcha/).

---

## Browser support

When your application sends a challenge, your visitors either receive a non-interactive challenge page or a CAPTCHA.

### Common issues

Challenges are not supported by Microsoft Internet Explorer. If you are currently using Internet Explorer, try using another major web browser (Chrome, Safari, Firefox).

If you are already using a major web browser, make sure it is using the latest version.

### Supported browsers

If your visitors are using an up-to-date version of a major browser — such as Chrome, Firefox, Safari, Microsoft Edge, Chrome and Safari on mobile — they will receive the challenge correctly.

Challenges are not supported by Microsoft Internet Explorer.

If your visitors encounter issues using a major browser besides Internet Explorer, they should upgrade their browser.

---

## Resolve a CAPTCHA

If a visitor encounters a CAPTCHA, Cloudflare employees cannot remove that Captcha. Only the website owner can configure their Cloudflare settings to stop the CAPTCHA. 

When observing a Cloudflare Captcha page, a visitor could:

- Successfully pass the Captcha to visit the website. Cookies and JavaScript support are required in browser settings to pass the captcha.  
- Request the website owner to allow their IP address. 
- Scan their computer for malicious programs (it may be infected).
- Check their antivirus or firewall service to make sure it is not blocking access to the CAPTCHA image.
