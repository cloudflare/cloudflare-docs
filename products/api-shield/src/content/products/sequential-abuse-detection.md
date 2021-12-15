---
order: 3
pcx-content-type: concept
type: overview
---

import Availability from "../_partials/_availability.md"
import BlogBlurb from "../_partials/_blog-post.md"

# Sequential Abuse Detection

<Availability/>

Sequential Abuse Detection uncovers endpoint abuse by looking for irregular traffic across multiple endpoints.

## Process

Requests tend to come to endpoints in predictable patterns. For example, a login process might consist of the following:
1. A request is sent to `/login/*/enter`.
1. It is redirected to `/login/*/verify`.
1. It is finally redirected to `/login-successful`.

When requests go straight to `/login-successful`, they are not following the typical pattern and might be malicious. Sequential Abuse Detection identifies these common patterns in your API traffic and flags traffic that does not match these patterns.

<BlogBlurb/>