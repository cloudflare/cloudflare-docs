---
pcx_content_type: reference
title: Triggers and rules
---

# Triggers and rules

Triggers define the conditions under which [a tool will start an action](/zaraz/get-started/create-actions/). In most cases, your objective will be to create triggers that match specific website events that are relevant to your business. A trigger can be based on an event that happened on your website, like after selecting a button or loading a specific page.

These website events can be passed to Cloudflare Zaraz in a number of ways. You can use the [Track](/zaraz/web-api/track/) method of the Web API or the [`dataLayer`](/zaraz/advanced/datalayer-compatibility/) call. Alternatively, if you do not want to write code to track events on your website, you can configure triggers to listen to browser-side website events, with different types of rules like click listeners or form submissions.

## Rule types

The exact composition of the trigger will change depending on the type of rule you choose.

### Match rule

Zaraz matches the variable you input in **Variable name** with the text under **Match string**. For a complete list of supported variables, refer to [Properties reference](/zaraz/reference/properties-reference/).

**Trigger example: Match `zaraz.track("purchase")`**

{{<table-wrap>}}

| Rule type    | Variable name | Match operation | Match string |
| ------------ | ------------- | --------------- | ------------ |
| _Match rule_ | _Track Name_  | _Equals_        | `purchase`   |

{{</table-wrap>}}

If you create a trigger with match rules using variables from Page Properties, Cookies, Device Properties, or Miscellaneous categories, you will often want to add a second rule that matches `Pageview`. Otherwise, your trigger will be valid for every other event happening on this page too. Refer to [Create a trigger](/zaraz/get-started/create-trigger/) to learn how to add more than one condition to a trigger.

**Trigger example: All pages under `/blog`**

{{<table-wrap>}}

| Rule type    | Variable name  | Match operation | Match string |
| ------------ | -------------- | --------------- | ------------ |
| _Match rule_ | _URL pathname_ | _Starts with_   | `/blog`      |

{{</table-wrap>}}

{{<table-wrap>}}

| Rule type    | Variable name | Match operation | Match string |
| ------------ | ------------- | --------------- | ------------ |
| _Match rule_ | _Track Name_  | _Equals_        | `Pageview`   |

{{</table-wrap>}}

**Trigger example: All logged in users**

{{<table-wrap>}}

| Rule type    | Variable name                | Match operation | Match string |
| ------------ | ---------------------------- | --------------- | ------------ |
| _Match rule_ | _Cookie: name:_ `isLoggedIn` | _Equals_        | `true`       |

{{</table-wrap>}}

{{<table-wrap>}}

| Rule type    | Variable name | Match operation | Match string |
| ------------ | ------------- | --------------- | ------------ |
| _Match rule_ | _Track Name_  | _Equals_        | `Pageview`   |

{{</table-wrap>}}

Refer to [Properties reference](/zaraz/reference/properties-reference/) for more information on the variables you can use when using Match rule.

### Click listener

Tracks clicks in a web page. You can set up click listeners using CSS selectors or XPath expressions. **Wait for actions** (in milliseconds) tells Zaraz to prevent the page from changing for the amount of time specified. This allows all requests triggered by the click listener to reach their destination.

{{<Aside type="note">}}
When using CSS type rules in triggers, you have to include the CSS selector — for example, the ID (`#`) or the class (`.`) symbols. Otherwise, the click listener will not work.
{{</Aside>}}

**Trigger example for CSS selector:**

{{<table-wrap>}}

| Rule type        | Type  | Selector     | Wait for actions |
| ---------------- | ----- | ------------ | --------------- |
| _Click listener_ | _CSS_ | `#my-button` | `500`           |

{{</table-wrap>}}

To improve the performance of the web page, you can limit a click listener to a specific URL, by combining it with a Match rule. For example, to track button clicks on a specific page you can set up the following rules in a trigger:

{{<table-wrap>}}

| Rule type        | Type  | Selector    | Wait for actions |
| ---------------- | ----- | ----------- | --------------- |
| _Click listener_ | _CSS_ | `#myButton` | `500`           |

{{</table-wrap>}}

{{<table-wrap>}}

| Rule type    | Variable name  | Match operation | Match string    |
| -------------| -------------- | --------------- | --------------- |
| _Match rule_ | _URL pathname_ | _Equals_        | `/my-page-path` |

{{</table-wrap>}}

If you need to track a link of an element using CSS selectors - for example, on a clickable button - you have to create a listener for the `href` attribute of the `<a>` tag:

{{<table-wrap>}}

| Rule type        | Type  | Selector                         | Wait for actions |
| ---------------- | ----- | -------------------------------- | ---------------- |
| _Click listener_ | _CSS_ | `a[href$='/#my-css-selector']`   | `500`            |

{{</table-wrap>}}

Refer to [**Create a trigger**](/zaraz/get-started/create-trigger/) to learn how to add more than one rule to a trigger.

---

**Trigger example for XPath:**

{{<table-wrap>}}

| Rule type        | Type    | Selector                                         | Wait for actions |
| ---------------- | ------- | ------------------------------------------------ | ---------------- |
| _Click listener_ | _XPath_ | `/html/body//*[contains(text(), 'Add To Cart')]` | `500`            |

{{</table-wrap>}}

### Element Visibility

Triggers an action when a CSS selector becomes visible in the screen.

{{<table-wrap>}}

| Rule type            | CSS Selector |
| -------------------- | ------------ |
| _Element Visibility_ | `#my-id` |

{{</table-wrap>}}

### Scroll depth

Triggers an action when the users scrolls a predetermined amount of pixels. This can be a fixed amount of pixels or a percentage of the screen.

**Example with pixels**

{{<table-wrap>}}

| Rule type            | CSS Selector |
| -------------------- | ------------ |
| _Scroll Depth_ | `100px` |

{{</table-wrap>}}

---

**Example with a percentage of the screen**

{{<table-wrap>}}

| Rule type            | CSS Selector |
| -------------------- | ------------ |
| _Scroll Depth_ | `45%` |

{{</table-wrap>}}

### Form submission

Tracks form submissions using CSS selectors. Select the **Validate** toggle button to only fire the trigger when the form has no validation errors.

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

| Rule type    | Variable name  | Match operation | Match string    |
| ------------ | -------------- | --------------- | --------------- |
| _Match rule_ | _URL pathname_ | _Equals_        | `/my-page-path` |

{{</table-wrap>}}

Refer to [**Create a trigger**](/zaraz/get-started/create-trigger/) to learn how to add more than one condition to a trigger.

### Timer

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

| Rule type    | Variable name  | Match operation | Match string    |
| ------------ | -------------- | --------------- | --------------- |
| _Match rule_ | _URL pathname_ | _Equals_        | `/my-page-path` |

{{</table-wrap>}}

Refer to [**Create a trigger**](/zaraz/get-started/create-trigger/) to learn how to add more than one condition to a trigger.
