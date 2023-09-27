---
pcx_content_type: concept
title: Risk scoring
weight: 4
meta:
    title: Zero Trust user risk scoring
---

# Risk scoring

{{<Aside type="note">}}
Only available on Enterprise plans.
{{</Aside>}}

Zero Trust risk scoring detects user activity and behaviors that could introduce risk to your organization’s systems and data. This documentation provides an overview of how the risk scoring process works, especially in conjunction with Cloudflare's Zero Trust suite.

Detect user activity and behaviors that could introduce risk to your organization’s systems and data.  Highlight users in your organization who have triggered risk behaviors. Risk behaviors are activity that can introduce risk your organization.

## Risk levels

Generate a score (Low, Medium, High) for Zero Trust users based on their activities, posture, and settings that have been detected via Cloudflare's Zero Trust suite.

A user’s score is equal to the highest-level risk behavior they trigger.

Behaviors have Low, Medium, High and can be changed.

## User risk scoring

A user's risk score is based on their activities, posture, and settings that have been detected via Cloudflare's Zero Trust suite.

Each user is allocated a score: Low, Medium, or High, with the score being equivalent to the highest-level risk behavior they trigger.

Highlight users in your organization who have triggered risk behaviors. Risk behaviors are activities that can introduce risk to your organization.

View risk behaviors triggered by your users and reset risk levels. Users with reset risk levels will not appear in this table unless they trigger another behavior.

The platform allows you to view the specific risk behaviors triggered by your users.

### View a user's risk score

### Clear a user's risk score

The risk score for a user can be cleared, resetting their status and removing them from the high-risk user table.

## Risk behaviors

By default, all Cloudflare Pre-defined Behaviors will be disabled.

When a behavior is enabled, all users within the organization will be continuously evaluated for committing the behavior

When a user commits an enabled risky behavior, the user's risk level is evaluated and set to the highest risk level between: the risk behavior level and the users current risk level

When a risky behavior is turned off, monitoring for future activity will cease, but previously detected risky behaviors will remain in the logs and associated with a user

Cloudflare will create a list of predefined risky behaviors. These behaviors will be popular security vulnerability indicators, such as impossible travel. The list of targeted behaviors is provided further down. A good way to think about these are like pre-defined DLP profiles.

### Enable risky behaviors

By default, all Cloudflare Pre-defined Behaviors are turned off.

When a specific behavior is enabled, all users within the organization will be continuously monitored for any instances of that behavior.

If a user engages in an enabled risky behavior, their risk level is re-evaluated. Their risk score will be updated to the highest value between the current risk level and the risk level of the behavior they triggered.

### Disable risky behaviors

If a specific risky behavior is turned off, future activity associated with that behavior will no longer be monitored.

However, it's important to note that previously detected risky behaviors will remain in the logs and will still be associated with the user's profile.

### Change risky behaviors risk score

This feature allows you to identify and monitor users in your organization who have engaged in risk behaviors.

Risk behaviors are specific actions or activities that can potentially introduce risk to your organization's data and systems.
3. Viewing and Resetting Risk Levels:
The platform allows you to view the specific risk behaviors triggered by your users.

If required, risk levels can be reset for specific users. Once reset, users will not appear in the associated risk table until they trigger another risky behavior.
