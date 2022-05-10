---
pcx-content-type: reference
title: Triggers and rules
---

# Triggers and rules

Triggers define the conditions under which [a tool will start an action](/zaraz/get-started/create-actions/). In most cases, your objective will be to create triggers that match specific website events that are relevant to your business. A trigger can be based on an event that happened on your website, like after clicking a button or loading a specific page.

These website events can be passed to Cloudflare Zaraz in a number of ways. You can use the [Track](/zaraz/web-api/track/) method of the Web API or the [`dataLayer`](/zaraz/advanced/datalayer-compatibility/) call. Alternatively, if you do not want to write code to track events on your website, you can configure triggers to listen to browser-side website events, with different types of rules like Click Listeners or Form Submissions.

## Rule types

The exact composition of the trigger will change depending on the type of rule you choose.

<details>
<summary>Match rule</summary>
<div>

Zaraz matches the variable you input in **Variable name** with the text under **Match string**. For a complete list of supported variables, refer to [Zaraz event and system properties](/zaraz/reference/properties-reference/).

**Trigger example: Match `zaraz.track("purchase")`**

{{<table-wrap>}}

| Rule type    | Variable name               | Match operation | Match string |
| ------------ | --------------------------- | --------------- | ------------ |
| _Match rule_ | `{{ client.__zarazTrack }}` | _Equals_        | `purchase`   |

{{</table-wrap>}}

When matching based on a System property, you will often want to add a second rule that matches `{{ client.__zarazTrack }}` to `Pageview`. Otherwise, your trigger will be valid for every other event happening on this page too. Refer to [**Create a trigger**](/zaraz/get-started/create-trigger/) to learn how to add more than one condition to a trigger.


**Trigger example: All pages under `/blog`**

{{<table-wrap>}}

| Rule type    | Variable name               | Match operation | Match string |
| ------------ | --------------------------- | --------------- | ------------ |
| _Match rule_ | `{{ system.page.url.pathname }}` | _Starts with_      | `/blog`   |
{{</table-wrap>}}

{{<table-wrap>}}

| Rule type    | Variable name               | Match operation | Match string |
| ---------------- | ----- | ------------ | --------------- |
| _Match rule_ | `{{ client.__zarazTrack }}` | _Equals_      | `Pageview`   |

{{</table-wrap>}}

**Trigger example: All logged in users**

{{<table-wrap>}}

| Rule type    | Variable name               | Match operation | Match string |
| ------------ | --------------------------- | --------------- | ------------ |
| _Match rule_ | `{{ system.cookies.isLoggedIn }}` | _Equals_      | `true`   |

{{</table-wrap>}}

{{<table-wrap>}}

| Rule type    | Variable name               | Match operation | Match string |
| ---------------- | ----- | ------------ | --------------- |
| _Match rule_ | `{{ client.__zarazTrack }}` | _Equals_      | `Pageview`   |

{{</table-wrap>}}

Refer to the [Zaraz event and system properties](/zaraz/reference/properties-reference/) for more information on the variables you can use when using Match rule.

</div>
</details>

<details>
<summary>Click listener</summary>
<div>

Tracks clicks in a web page. You can set up click listeners using CSS selectors or XPath expressions. **Wait for actions** (in milliseconds) tells Zaraz to prevent the page from changing for the amount of time specified. This allows all requests triggered by the click listener to reach their destination.

**Trigger example for CSS selector:**

{{<table-wrap>}}

| Rule type        | Type  | Selector     | Wait for actions |
| ---------------- | ----- | ------------ | --------------- |
| _Click listener_ | _CSS_ | `#my-button` | `500`           |

{{</table-wrap>}}

To improve the performance of the web page, you can limit a Click listener to a specific URL, by combining it with a Match rule. For example, to track button clicks on a specific page you can set up the following rules in a trigger:

{{<table-wrap>}}

| Rule type        | Type  | Selector    | Wait for actions |
| ---------------- | ----- | ----------- | --------------- |
| _Click listener_ | _CSS_ | `#myButton` | `500`           |

{{</table-wrap>}}

{{<table-wrap>}}

| Rule type    | Variable name               | Match operation | Match string |
| ---------------- | ----- | ------------ | --------------- |
| _Match rule_ | `{{ system.page.url.pathname }}` | _Equals_      | `/my-page-path`   |

{{</table-wrap>}}

Refer to [**Create a trigger**](/zaraz/get-started/create-trigger/) to learn how to add more than one rule to a trigger.

---

**Trigger example for XPath:**

{{<table-wrap>}}

| Rule type        | Type    | Selector                                         | Wait for actions |
| ---------------- | ------- | ------------------------------------------------ | --------------- |
| _Click listener_ | _XPath_ | `/html/body//*[contains(text(), 'Add To Cart')]` | `500`           |

{{</table-wrap>}}

</div>
</details>

<details>
<summary>Form submission</summary>
<div>

Tracks form submissions using CSS selectors. Click the **Validate** toggle button to only fire the trigger when the form has no validation errors.

**Trigger example:**

{{<table-wrap>}}

| Rule type         | CSS Selector | Validate         |
| ----------------- | ------------ | ---------------- |
| _Form submission_ | `#my-form`   | Toggle on or off |

{{</table-wrap>}}

To improve the performance of the web page, you can limit a Form submission trigger to a specific URL, by combining it with a Match rule. For example, to track a form on a specific page you can set up the following rules in a trigger:

{{<table-wrap>}}

| Rule type         | CSS Selector | Validate         |
| ----------------- | ------------ | ---------------- |
| _Form submission_ | `#my-form`   | Toggle on or off |

{{</table-wrap>}}

{{<table-wrap>}}

| Rule type    | Variable name                    | Match operation | Match string    |
| ------------ | -------------------------------- | --------------- | --------------- |
| _Match rule_ | `{{ system.page.url.pathname }}` | _Equals_      | `/my-page-path` |

{{</table-wrap>}}

Refer to [**Create a trigger**](/zaraz/get-started/create-trigger/) to learn how to add more than one condition to a trigger.

</div>
</details>

<details>
<summary>Timer</summary>
<div>

Set up a timer that will fire the trigger after each **Interval**. Set your interval time in milliseconds. In **Limit** specify the number of times the interval will run, causing the trigger to fire. If you do not specify a limit, the timer will repeat for as long as the page is on display.

**Trigger example:**

{{<table-wrap>}}

| Rule type | Interval | Limit |
| --------- | -------- | ----- |
| _Timer_   | `5000`   | `1`   |

{{</table-wrap>}}

The above Timer will fire once, after five seconds. To improve the performance of a web page, you can limit a Timer trigger to a specific URL, by combining it with a Match rule. For example, to set up a timer on a specific page you can set up the following rules in a trigger:

{{<table-wrap>}}

| Rule type | Interval | Limit |
| --------- | -------- | ----- |
| _Timer_   | `5000`   | `1`   |

{{</table-wrap>}}

{{<table-wrap>}}

| Rule type    | Variable name                    | Match operation | Match string    |
| ------------ | -------------------------------- | --------------- | --------------- |
| _Match rule_ | `{{ system.page.url.pathname }}` | _Equals_      | `/my-page-path` |

{{</table-wrap>}}

Refer to [**Create a trigger**](/zaraz/get-started/create-trigger/) to learn how to add more than one condition to a trigger.

</div>
</details>