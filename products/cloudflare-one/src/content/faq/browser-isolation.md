---
order: 0
---

# Troubleshooting and FAQ

This section addresses the most common issues you may come across when setting up or using Cloudflare for Teams.

<ButtonGroup>
  <Button type="primary" href="/faq/access/">Access</Button>
  <Button type="primary" href="/faq/gateway/">Gateway</Button>
  <Button type="primary" href="/faq/warp/">WARP client</Button>
  <Button type="primary" href="/faq/tunnel/">Argo Tunnel</Button>
  <Button type="primary" href="/faq/browser-isolation/">Browser Isolation</Button>  
  <Button type="primary" href="/faq/self-diagnostics/">Self diagnostics</Button> 
</ButtonGroup>

## Browser Isolation help

### What are the recommended isolation and L7 firewall policies?
See [HTTP policies](/policies/filtering/http-policies#isolate) for the list of example isolation policies.

### How do L7 HTTP policies work with DNS resolver locations?
Gateway with HTTP filtering does not affect DNS locations.

Only traffic routed through WARP will be inspected with L7 policies.

### How do isolation policies and L7 firewall policies work together?
Both Isolation and L7 Firewall rules are evaluated in stages. When a user makes a request which evaluates an Isolation policy, the request will be rerouted to an isolated browser and re-evaluated for L7 firewall rules.

This makes it possible for an isolated browser to remotely render a block page, or have malicious content within the isolated browser blocked by L7 HTTP policies.

### How long does it take for L7 firewall policies to apply?
It usually takes about 60 seconds for a new policy to be deployed for users.

### Existing browser connections
Many websites establish long-lived HTTP2 connections with your browser. If you access a website without traffic filtering enabled or with an active **Do Not Inspect** rule **Block** / **Isolate** actions will not execute until a new filtered connection is established with the `Cloudflare for Teams ECC Certificate Authority` certificate.

You may need to completely close and reopen your browser to establish a new filtered connection.

### Why is API or CLI traffic not isolated?
Isolation policies are applied to requests that include `Accept: text/html*`. This allows Browser Isolation policies to co-exist with API and command line requests.

## In-Browser alerts 

### Why do I see a "No Browsers Available" alert?

If you encounter this error please [file feedback](/connections/connect-browsers/known-limitations#submitting-feedback) via the WARP client and we will investigate.

### Why do I see a "Maximum Sessions Reached"?

This can occur if your device is attempting to establish a connection to more than two remote browser instances.

A browser isolation session is connection from your local browser to a remote browser. Tabs and windows within the same browser share a single remote browser session.

In practise this generally means that you can open both Chrome and Firefox to use browser isolation concurrently, but attempting to open a third browser such as Opera will cause this alert to appear.

To release a browser session please close all tabs/windows in your local browser. The remote browser session will be automatically terminated within 15 minutes.

**Safari** is more susceptible to presenting this errror. [See workaround](/connections/connect-browsers/known-limitations#safari).