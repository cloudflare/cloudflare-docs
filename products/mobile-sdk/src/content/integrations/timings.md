---
title: Timing Integrations
---

# Introduction

If you are using an analytics tool, it’s very easy to see track the performance improvements Neumob makes. We recommend you track a few key requests commonly made to validate for yourself the Neumob difference! Here’s an example of how:

## Mixpanel

iOS – Objective C

    Mixpanel *mixpanel = [Mixpanel sharedInstance];
    [mixpanel timeEvent:@“Request Latency to X"];

    // stop the timer when the request has finished
    [mixpanel track:@"Request Latency to X"];

iOS – Swift

    Mixpanel.mainInstance().time(event: "Request Latency to X”)

    // stop the timer when the request has finished
    Mixpanel.mainInstance().track(event: "Request Latency to X")

Android

    MixpanelAPI mixpanel = MixpanelAPI.getInstance(context, MIXPANEL_TOKEN);

    // start the timer for the event “Request Latency to X"
    mixpanel.timeEvent(“Request Latency to X");

    // stop the timer when the request has finished
    mixpanel.track("“Request Latency to X");
