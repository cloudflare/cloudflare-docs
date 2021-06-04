---
title: HSTS
order: 3
pcx-content-type: interim
---

# Understanding HTTP Strict Transport Security (HSTS)

HSTS protects HTTPS web servers from downgrade attacks. These attacks redirect web browsers from an HTTPS web server to an attacker-controlled server, allowing bad actors to compromise user data and cookies.

HSTS adds an HTTP header that direct [compliant web browsers](/ssl-tls/browser-compatibility) to:
- Transform HTTP links to HTTPS links
- Prevent users from bypassing SSL browser warnings 

<Aside type="note">

For more background information on HSTS, see the <a href="https://blog.cloudflare.com/enforce-web-policy-with-hypertext-strict-transport-security-hsts/">introductory blog post</a>.

</Aside>