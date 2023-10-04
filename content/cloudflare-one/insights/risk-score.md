---
pcx_content_type: concept
title: Risk score
weight: 4
meta:
    title: User risk score
---

# Risk score

{{<Aside type="note">}}
Only available on Enterprise plans.
{{</Aside>}}

Zero Trust risk scoring detects activity and behaviors that could introduce risk to your organization’s systems and data. Risk scores add user and entity behavior analytics (UEBA) to the Zero Trust platform.

## User risk scoring

Cloudflare Zero Trust assigns a risk score of Low, Medium or High based on detections of users’ activities, posture, and settings. A user’s score is equal to the highest-level risk behavior they trigger.

### View a user’s risk score

Users that have had their risk score cleared will not appear in this table unless they trigger another risk behavior.

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Risk score** > **User risk scoring**.
2. In the table, locate the user you want to view the risk score for.
3. Select the three-dot menu, then select **View user risk details**.

### Clear a user’s risk score

If required, you can reset risk levels for specific users. Once reset, users will not appear in the associated risk table until they trigger another risk behavior.

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Risk score** > **User risk scoring**.
2. In the table, locate the user you want to clear the risk score for.
3. Select the three-dot menu, then select **View user risk details**.
4. Select **Reset user risk**.
5. Select **Confirm** to reset the user's risk score.

## Manage risk behaviors

By default, all Cloudflare pre-defined risk behaviors are disabled.

To toggle risk behaviors, go to **Risk score** > **Risk behaviors**.

### Enable risk behaviors

When a specific behavior is enabled, Zero Trust will continuously monitor all users within the organization for any instances of that behavior.

If a user engages in an enabled risk behavior, their risk level is re-evaluated. Their risk score will be updated to the highest value between the current risk level and the risk level of the behavior they triggered.

### Disable risk behaviors

When a risk behavior is turned off, monitoring for future activity will cease, but previously detected risk behaviors will remain in the logs and associated with a user.

### Change risk behavior risk levels

By default, all predefined risk behaviors have an associated risk level of Low, Medium or High. You can change the risk level for a behavior at any time if the default assignment does not suit your environment.

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Risk score** > **Risk behaviors**.
2. Select the Risk behavior you want to modify.
3. In the risk level drop-down menu, choose your desired level (_Low_, _Medium_, or _High_).
4. Select **Save**.

## Predefined risk behaviors

By default, all Cloudflare predefined behaviors are disabled. When a behavior is enabled, Zero Trust will continuously evaluate all users within the organization for the behavior.

| Risk behaviors                        | Requirements                                                                            | Description                                                                                                                |
| ------------------------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Impossible travel                     | [A configured Access application](/cloudflare-one/applications/)                        | User has a successful login from two different locations that they could not have traveled between in that period of time. |
| High number of DLP policies triggered | [A configured DLP profile](/cloudflare-one/policies/data-loss-prevention/dlp-profiles/) | User has created a high number of DLP policy matches within a narrow frame of time.                                        |
