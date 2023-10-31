---
_build:
  publishResources: false
  render: never
  list: never
---

Even though it feels pretty instantaneous, there's a lot happening when you type `www.example.com` into your browser.

A website's content does not technically live at a URL like `www.example.com`, but rather at an IP address like `192.0.2.1`. It's similar to how we say that Cloudflare's headquarters is 101 Townsend St., San Francisco, CA 94107, but really that address is just a placeholder for latitude and longitude coordinates (37.780259, -122.390519). URLs and street addresses are much easier for humans to remember.

The process of converting a human-readable URL (`www.example.com`) into a machine-friendly address (`192.0.2.1`) is known as a [DNS lookup](https://www.cloudflare.com/learning/dns/what-is-dns/).
