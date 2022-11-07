---
pcx_content_type: concept
title: Normalization methods
weight: 2
---

# Normalization methods

Cloudflare Radar does not normally return raw values, values are instead returned as percentages or normalized using min max.

Look at the `result.meta.normalization` property in the response to check which post-processing method was applied to the raw values, if any.


## Method

| Method | Description |
| ---- | ---- |
| **PERCENTAGE** | Values represent percentages. |
| **PERCENTAGE_CHANGE** | Values represent a [percentage change](https://en.wikipedia.org/wiki/Relative_change_and_difference#Percentage_change) from a base line period. |
| **MIN_MAX** | Values have been normalised using [MinMax](https://en.wikipedia.org/wiki/Feature_scaling#Rescaling_(min-max_normalization))|
| **MIN0_MAX** | Values have been normalised using MinMax, but setting the min to 0. Equivalent to a proportion of the maximum value in the entire response, scaled between 0 and 1.|
| **RAW_VALUES** | Values are raw and have not been changed. |


If we want to compare values, across locations/time ranges/etc, in endpoints that normalize values using `MinMax`, we must do so in the __same__ request, by asking for multiple series. All values will then be normalised using the same minimum and maximum value and can safely be compared against each other (see [Making comparisons](/radar/get-started/making-comparisons)).

