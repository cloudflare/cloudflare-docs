---
pcx_content_type: faq
title: Workers Analytics Engine FAQs
layout: single
weight: 6
---

# Wokers Analytics Engine FAQ

Below you will find answers to our most commonly asked questions.

## Sampling

### Could I just use many unique index values to get better unique counts?

No, adding a large number of index values does not come without drawbacks. The tradeoff is that reading across many indices is slow.

In practice, due to how ABR works, reading from many indices in one query will result in low-resolution data – possibly unusably low.

On the other hand, if you pick a good index that aligns with how you read the data, your queries will run faster and you will get higher resolution results.

### What if I need to index on multiple values?

It is possible to concatenate multiple values in your index field. So if you want to index on user ID and hostname, you can write, for example `“$userID:$hostname”` into your index field.

Note that, based on your query pattern, it may make sense to write the same dataset with different indices. It is a common misconception that one should avoid "double-writing" data.

Thanks to sampling, the cost of writing data multiple times can be relatively low. However, reading data inefficiently can result in significant expenses or low-quality results due to sampling.

### How do I know if my data is sampled?
You can use the `_sample_interval` field — again, note that this does not tell you if the results are accurate.

You can tell when data is sampled at read time because sample intervals will be powers of 10, for example `20` or `700`. There is no hard and fast rule for when sampling starts at read time, but in practice reading longer periods (or more index values) will result in a higher sample interval.

### Why is data missing?
Sampling is based largely on the choice of index, as well as other factors like the time range queried and number of indices read. If you are reading from a larger index over a longer time period, and have filtered to a relatively small subgroup within that index, it may not be present due to sampling.

If you need to read accurate results for that subgroup, we suggest that you add that field to your index (refer to [What if I need to index on multiple values](/analytics/faq/wae-faqs/#what-if-i-need-to-index-on-multiple-values)).

### Can I trust sampled data? Are my results accurate?
Sampled data is highly reliable, particularly when a carefully selected index is used.

Admittedly, it is difficult at present to prove that the results returned by ABR queries are within a certain error bound. As a rule of thumb, it is good to check the number of rows read by using count() — think of this like the count of pixels in your image. A higher number of rows read will result in more accurate results. (The flipside is that the `_sample_interval` field does not tell you very much about whether your results are accurate). If you are extrapolating from only one or two rows, it is unlikely you have a representative result; if you are extrapolating from thousands of rows, it is very likely that your results are quite accurate.

In the near future, we plan to expose the [margin of error](https://en.wikipedia.org/wiki/Margin_of_error) along with query results so that you can see precisely how accurate your results are.

### How are bursts handled?

Equitable sampling exists both to normalize differences between groups, and also to handle large spikes of traffic to a given index. Equalization happens every few seconds; if you are writing many events very close in time, then it is expected that they will be sampled at write time.  The sample interval for a given index will vary from moment to moment, based on the current rate of data being written.

### How much traffic will trigger sampling?
There is no fixed rule determining when sampling will be triggered.

We have observed that for workloads like our global CDN, which distribute load around our network, each index value needs about 100 data points per second before sampling is noticeable at all.

Depending on your workload and how you use Workers Analytics Engine, sampling may start at a higher or lower threshold than this. For example, if you are writing out many data points from a single worker execution, it is more likely that your data will be sampled.



