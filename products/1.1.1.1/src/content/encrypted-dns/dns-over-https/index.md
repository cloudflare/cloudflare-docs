---
order: 5
pcx-content-type: concept
---

# DNS over HTTPS

If you are building a mobile application, browser, operating system, IoT device or router, you can choose for your users to use the DNS over HTTPS (DoH) endpoint that Cloudflare offers instead of sending DNS queries over plaintext for increased security and privacy of your users.

DoH uses port 443, which is the standard HTTPS traffic port, to wrap the DNS request in an HTTPS request. It uses HTTPS and HTTP/2 to encrypt traffic at the application layer. With DoH, DNS queries and responses are camouflaged within other HTTPS traffic, since it all comes and goes from the same port. This means they cannot easily be blocked without blocking all other HTTPS traffic as well, but it also provides users with greater privacy, as network administrators will have no visibility on the DNS queries hidden within the larger flow of HTTPS traffic.


In this chapter, we go over the ways in which you can configure DNS over HTTPS (DoH).

<Aside>

**Note**: If you are an end-user trying to configure your browser to use DNS over HTTPS, please refer to our documentation regarding how to setup [Windows](/setting-up-1.1.1.1/windows) and [macOS](/setting-up-1.1.1.1/mac).

</Aside>