---
pcx_content_type: concept
title: Normalization methods
weight: 4
---

# Normalization methods

Cloudflare Radar does not normally return raw values. Instead, values are returned as percentages or normalized using min-max.

Refer to the `result.meta.normalization` property in the response to check which post-processing method was applied to the raw values, if any.

## Method

| Method | Description |
| ---- | ---- |
| `PERCENTAGE` | Values represent percentages. |
| `PERCENTAGE_CHANGE` | Values represent a [percentage change](https://en.wikipedia.org/wiki/Relative_change_and_difference#Percentage_change) from a baseline period. |
| `MIN_MAX` | Values have been normalized using [min-max](https://en.wikipedia.org/wiki/Feature_scaling#Rescaling_(min-max_normalization)).|
| `MIN0_MAX` | Values have been normalized using min-max, but setting the minimum value to `0`. Equivalent to a proportion of the maximum value in the entire response, scaled between 0 and 1.|
| `RAW_VALUES` | Values are raw and have not been changed. |

If you want to compare values across locations/time ranges/etc., in endpoints that normalize values using min-max, you must do so in the same request. This is done by asking for multiple series. All values will then be normalized using the same minimum and maximum value and can safely be compared against each other. Refer to [Make comparisons](/radar/get-started/making-comparisons/) for more information.
