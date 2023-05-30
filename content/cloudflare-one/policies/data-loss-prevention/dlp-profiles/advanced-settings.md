---
pcx_content_type: reference
title: Profile settings
weight: 4
layout: single
---

# Profile settings

This page lists the advanced settings available when configuring a predefined or custom DLP profile.

## Match count

Match count refers to the number of times that any enabled entry in the profile can be detected before an action is triggered, such as blocking or logging. For example, if you select a match count of 10, the scanned file or HTTP body must contain 11 or more matching strings. Detections do not have to be unique.

## Context analysis

Context analysis restricts DLP detections based on proximity keywords. Additional proximity keywords must be detected within a distance of 1000 bytes (~1000 characters) from the original detection to trigger an action. For example, the string `123-45-6789` will only count as a detection if in proximity to keywords such as `ssn`.

Additionally, you can control context analysis for scans within files. When files are excluded from the context filter, DLP only evaluates uploaded and downloaded files based on regular expression and validation checks. Additional keywords within the file are not required.
