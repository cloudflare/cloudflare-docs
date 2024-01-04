---
title: Bot Fight Mode
pcx_content_type: learning-unit
weight: 5
layout: learning-unit
---

{{<render file="_bot-fight-mode-definition" productFolder="bots">}}

## Considerations

Bot Fight Mode has a few limitations, including that it:

- Protects entire domains without endpoint restrictions.
- Cannot be customized, adjusted, or reconfigured via [WAF custom rules](/learning-paths/get-started-free/security/security-settings/).

If these limitations could cause issues with your application, do not enable this feature.

For more granular control - including the ability to use the `Skip` action for bot mitigation - consider using [Super Bot Fight Mode](/bots/get-started/pro/).

## Setup

{{<render file="_bot-fight-mode-enable" productFolder="bots">}}

{{<Aside type="warning">}}

If these limitations cause issues with your application, [disable](/bots/get-started/free/#disable-bot-fight-mode) Bot Fight Mode.

{{</Aside>}}