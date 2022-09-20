---
title: Domain Management
pcx_content_type: get-started
weight: 6
layout: single

---
# Domain Management

When creating a widget, customers must specify a list of domains. The widget can only be used on these domains and will not work on any other domains. Customers can use subdomains to restrict the widgets further.

The domain should not contain a scheme `http://` or `https://`, or a path `/`. 

Specifying a subdomain is optional.

For example, `www.example.com` will allow widgets on the following domains:
* `www.example.com`
* `abc.www.example.com:8080`

but not on the following domains:
* `example.com`
* `dash.example.com`
* `attacker-website.cf`
* `not-example.com`

When the widget is embedded on a domain not listed, it will show an error message.

{{<Aside type="note">}}

Turnstile has an alpha feature that enables widgets to work on every page without needing a list of domains. Contact your account team for more information on this feature.

{{</Aside>}}