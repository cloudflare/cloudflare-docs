---
pcx-content-type: how-to
title: Check that a policy is working
weight: 1
---

# Check that a policy is working

<Aside type='note'>

Before you start, please make sure you are connected to a network that is associated with the location where the policy is applied.

</Aside>

Once you have created a policy to block a domain, you can use either `dig` or `nslookup` on your to see if the policy is working as intended.

If you are using a policy to block `example.com`, you can do the following to see if Gateway is blocking `example.com`:

1.  Open your terminal.

2.  Type `dig example.com` (`nslookup example.com`) if you are using Windows) and press enter.

3.  If the Block page is **disabled** for the policy, then you should see `REFUSED` in the answer section:

![Blocked when block page disabled](/cloudflare-one/static/documentation/faq/blocked-disabled.png)

If the Block page is **enabled** for the policy, then you should see `NOERROR` in the answer section and `162.159.36.12` and `162.159.46.12` as the answers when the domain is successfully blocked.

![Blocked when block page enabled](/cloudflare-one/static/documentation/faq/blocked-enabled.png)

## Test a DNS policy

If you are blocking a security threat or content category, you can test that the policy is working by using the **test domain** associated with each category.

Once you have configured your Gateway policy to block the category, the test domain will show a block page when you attempt to visit the domain in your browser, or will return `REFUSED` when you perform `dig` using the command-line interface.

### Test domains

#### One-word categories

Test domains use the following format for categories with one-word names:

```txt
NAME_OF_CATEGORY.testcategory.com
```

| Category | Test domain |
| -------- | ----------- |
| *Malware* | `malware.testcategory.com` |
| *Phishing* | `phishing.testcategory.com` |
| *Cryptomining* | `cryptomining.testcategory.com` |

#### Multi-word categories

If the category has multiple words in the name (for example, *Parked & For Sale Domains*) then the test domain uses the following format:

*   Remove any spaces between the words
*   Replace `&` with `and`
*   All letters are lowercase

| Category | Test domain |
| -------- | ----------- |
| *Parked & For Sale Domains* | `parkedandforsaledomains.testcategory.com` |
| *Private IP Address* | `privateipaddress.testcategory.com` |
| *Command and Control & Botnet* | `commandandcontrolandbotnet.testcategory.com` |

#### Common test domains

| Category | Test domain |
| -------- | ----------- |
| *Anonymizer* | `anonymizer.testcategory.com` |
| *Command and Control & Botnet* | `commandandcontrolandbotnet.testcategory.com` |
| *Cryptomining* | `cryptomining.testcategory.com` |
| *Malware* | `malware.testcategory.com` |
| *New Domains* | `newdomains.testcategory.com` |
| *Parked & For Sale Domains* | `parkedandforsaledomains.testcategory.com` |
| *Phishing* | `phishing.testcategory.com` |
| *Private IP Address* | `privateipaddress.testcategory.com` |
| *Spam* | `spam.testcategory.com` |
| *Spyware* | `spyware.testcategory.com` |
| *Unreachable* | `unreachable.testcategory.com` |
