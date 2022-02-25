---
pcx-content-type: reference
title: Best practices
weight: 0
---

# Best practices

Follow these best practices to avoid potential issues and improve the visitor experience.

## Total active users

When specifying the **Total active users** in your [configuration settings](/waiting-room/reference/configuration-settings/), set the value to `75%` of your origin's traffic capacity.

## Page path

When setting the waiting room **Path** in your [configuration settings](/waiting-room/reference/configuration-settings/), pay attention to potential subpaths. Waiting rooms are enabled on all subpaths, meaning you might be sending more traffic to your waiting room than anticipated.

Additionally, if you have multiple waiting rooms, the waiting room with the most specific subpath takes precedence.

## Update during active queueing

### Waiting room template

If you want to provide your users with updated information or expectations when they are queueing, Cloudflare recommends that you update your [waiting room template](/waiting-room/additional-options/customize-waiting-room/). All changes will be visible to your users in close to real time.

### Configuration settings

When users are actively queueing, only make changes to your [configuration settings](/waiting-room/reference/configuration-settings/) when necessary. These changes may impact the estimated wait time shown to end users, which might lead to user confusion.

### Queueing method

{{<render file="_change-queueing-method.md">}}
