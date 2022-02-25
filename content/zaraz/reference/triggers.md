---
pcx-content-type: reference
title: Triggers and rules
weight: 0
---

# Triggers and rules

Triggers are a set of conditions that determine if and when Cloudflare Zaraz should [send events to third-party tools](/zaraz/get-started/send-events/). In most cases, your objective will be to capture specific site actions that are relevant to your business. A trigger will usually be based on an action the end user has taken on your website, like clicking a button.

These site actions can be passed to Cloudflare Zaraz in a number of ways. You can use the Track method of the Web API or the `dataLayer` to send them to specific events and tools. Refer to [Zaraz Track](/zaraz/web-api/zaraz-track/) and [Data layer compatibility mode](/zaraz/advanced/datalayer-compatibility/) for more information on how to implement these options.

You can also use complex triggers to listen for these site actions, with different types of rules like Click Listeners or Form Submissions.

For most tools, the trigger will be a simple pageview event type, for which Cloudflare Zaraz offers a `pageview` preset configuration. If this is the case for the tool you need, [add and configure the tool to your account](/zaraz/get-started/add-tool/) to get started. For example, with the Facebook Pixel tool you only need to enter your account ID and access token, and Zaraz will configure the page view trigger for you.

A valid trigger has the following structure:

```txt
<RULE_TYPE> <VARIABLE_NAME> <COMPARISON_OPERATOR> <STRING_TO_MATCH>
```

The exact composition of the trigger will change depending on the type of rule you choose. Here is an example for a trigger based on a Match rule:

{{<table-wrap>}}

Rule type | Variable name | Match operation | Match string
\---       | ---           | ---             | ---
*Match rule* | `{{ client.__zarazTrack }}` |  *Contains* | `purchase`

{{</table-wrap>}}

Refer to Rule types below for more information on the types of rules available, and [Zaraz event and system properties](/zaraz/reference/properties-reference/) for more information on the variables you can use to create triggers.

## Rule types

The rule type determines the kind of conditions Zaraz should listen for in your web page. Zaraz supports different rule types which allow you to create complex rules.

<details>
<summary>Match rule</summary>
<div>

Zaraz tracks the variable you input in **Variable name**. For a complete list of supported variables, refer to [Zaraz event and system properties](/zaraz/reference/properties-reference/).

**Trigger example: Click listener**

{{<table-wrap>}}

Rule type | Variable name | Match operation | Match string
\---       | ---           | ---             | ---
*Match rule* | `{{ client.__zarazTrack }}` | *Contains* | `purchase`

{{</table-wrap>}}

</div>
</details>

<details>
<summary>Click listener</summary>
<div>

Tracks clicks in a web page. You can set up click listeners using CSS selectors or XPath expressions. **Wait for events** (in milliseconds) tells Zaraz to prevent the page from changing for the amount of time specified. This allows all requests triggered by the click listener to reach their destination.

**Trigger example for CSS selector:**

{{<table-wrap>}}

Rule type | Type | Selector | Wait for events
\--- | --- | --- | ---
*Click listener* | *CSS* | `#my-button` | `500`

{{</table-wrap>}}

To improve the performance of the web page, you can limit a Click listener to a specific URL, by combining it with a Match rule. For example, to track button clicks on a specific page you can set up the following rules in a trigger:

{{<table-wrap>}}

Rule type | Type | Selector | Wait for events
\--- | --- | --- | ---
*Click listener* | *CSS* | `#myButton` | `500`

{{</table-wrap>}}

{{<table-wrap>}}

Rule type | Variable name | Match operation | Match string
\--- | --- | --- | ---
*Match rule* | `{{ system.page.url.pathname }}` | *Contains* | `/my-page-path`

{{</table-wrap>}}

Refer to [**Create a trigger**](/zaraz/get-started/create-trigger/) to learn how to add more than one condition to a trigger.

***

**Trigger example for XPath:**

{{<table-wrap>}}

Rule type | Type | Selector | Wait for events
\--- | --- | --- | ---
*Click listener* | *XPath* | `/html/body//*[contains(text(), 'Add To Cart')]` | `500`

{{</table-wrap>}}

</div>
</details>

<details>
<summary>Form submission</summary>
<div>

Tracks form submissions using CSS selectors. Click the **Validate** toggle button to only fire the trigger when the form has no validation errors.

**Trigger example:**

{{<table-wrap>}}

Rule type | CSS Selector | Validate
\--- | --- | ---
*Form submission* | `#my-form` | Toggle on or off

{{</table-wrap>}}

To improve the performance of the web page, you can limit a Form submission trigger to a specific URL, by combining it with a Match rule. For example, to track a form on a specific page you can set up the following rules in a trigger:

{{<table-wrap>}}

Rule type | CSS Selector | Validate
\--- | --- | ---
*Form submission* | `#my-form` | Toggle on or off

{{</table-wrap>}}

{{<table-wrap>}}

Rule type | Variable name | Match operation | Match string
\--- | --- | --- | ---
*Match rule* | `{{ system.page.url.pathname }}` | *Contains* | `/my-page-path`

{{</table-wrap>}}

Refer to [**Create a trigger**](/zaraz/get-started/create-trigger/) to learn how to add more than one condition to a trigger.

</div>
</details>

<details>
<summary>Timer</summary>
<div>

Set up an interval of time in milliseconds before activating the trigger in **Interval**. In **Limit** specify the number of times the trigger will fire before stopping. If you do not specify a limit, the timer will run every ten seconds.

**Trigger example:**

{{<table-wrap>}}

Rule type | Interval | Limit
\--- | --- | ---
*Timer* | `50` | `2`

{{</table-wrap>}}

To improve the performance of a web page, you can limit a Timer trigger to a specific URL, by combining it with a Match rule. For example, to set up a timer on a specific page you can set up the following rules in a trigger:

{{<table-wrap>}}

Rule type | Interval | Limit
\--- | --- | ---
*Timer* | `50` | `2` |

{{</table-wrap>}}

{{<table-wrap>}}

Rule type | Variable name | Match operation | Match string
\--- | --- | --- | ---
*Match rule* | `{{ system.page.url.pathname }}` | `Contains` | `/my-page-path`

{{</table-wrap>}}

Refer to [**Create a trigger**](/zaraz/get-started/create-trigger/) to learn how to add more than one condition to a trigger.

</div>
</details>
