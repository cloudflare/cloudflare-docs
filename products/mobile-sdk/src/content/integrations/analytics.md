---
title: Analytics Integrations
---

# Introduction

This document contains information about how to integrate Neumob with 3rd party analytics tool in order to report on the impact Neumob is having on metrics like retention, engagement and conversion.

# Vendor Integration

Within the Neumob SDK, there is an API call available that will return a boolean value; the value identifies whether a user is being served content through our global app acceleration network. This boolean value can be used to populate a property or dimension within your mobile analytics platform. For iOS, use the API call ``accelerated`` and for Android, use ``isAccelerated``.

## Mixpanel

iOS – Objective C.

    [mixpanel registerSuperProperties:@{@”Neumob Accelerated”: @accelerated}];

iOS – Swift.

    Mixpanel.mainInstance().registerSuperProperties([“Neumob Accelerated”: accelerated])

Android.

    JSONObject props = new JSONObject();
    props.put(“Neumob Accelerated”, isAccelerated);
    mixpanel.registerSuperProperties(props);

## Localytics

iOS – Objective C.

    [Localytics setValue:@accelerated forCustomDimension:0];

iOS – Swift.

    Localytics.setValue(accelerated, forCustomDimension: 0)

Android.

    Localytics.setCustomDimension(0, isAccelerated);

For Localytics, change the dimension index from ‘0’ as required.

## Amplitude

iOS – Objective C

    [AMPIdentify *identify = [[[AMPIdentify identify] set:@”Neumob Accelerated” value:@accelerated]];
    [[Amplitude instance] identify:identify];

iOS – Swift

    AMPIdentify *identify = [[[AMPIdentify identify] set:@”Neumob Accelerated” value:@accelerated]];
    [[Amplitude instance] identify:identify];

Android

    Identify identify = new Identify().set(‘Neumob Accelerated’, isAccelerated);
    Amplitude.getInstance().identify(identify);