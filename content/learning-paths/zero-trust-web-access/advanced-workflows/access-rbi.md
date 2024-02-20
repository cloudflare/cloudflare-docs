---
title: Isolate Access applications
pcx_content_type: overview
weight: 2
layout: learning-unit
---

Using integrated Browser Isolation to ensure application and data security
Cloudflare’s Browser Isolation can be easily and transparently integrated with any web-delivered private application. This can be flexibly delivered on a per-policy basis, meaning that you can have specific policies (step-up security policies, or policies for 3rd-party users or contractors, or policies based on time of day using external evaluation rules) that require that a user to access a system exclusively through Browser Isolation, while other users matching different policies continue to access the application directly. Customers often want to do this for sensitive applications to ensure that they are protected against data loss. Browser Isolation integrated with your Access applications can support this in a number of ways:
- All Isolated traffic is sent through our Secure Web Gateway inspection engine, which allows you to apply Gateway HTTP policies to restrict specific actions and HTTP request methods
- Using the Secure Web Gateway also means that you can inspect the body of your users requests to match against DLP profiles with as much specificity and control as if the user had deployed an endpoint agent.
- You can also use ‘Isolate’ actions specific to Browser Isolation in Gateway HTTP policies to control users ability to cut and paste, upload and download files, or print while in an isolated session.
Here’s a quick architecture diagram to better understand what is happening between your user and your application. [need technical diagram]
