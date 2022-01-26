---
order: 3
pcx-content-type: how-to
---

# Triggers

Triggers are a set of conditions that determine if and when Cloudflare Zaraz should [send events to third-party tools](/get-started/send-events). In most cases, your objective will be to capture specific site actions that are relevant to your business. A trigger will usually be based on an action the end user has taken on your website, like clicking a button.

These site actions can be passed to Cloudflare Zaraz in a number of ways. You can use the Events API or the `dataLayer` to send them to specific events and tools. Refer to [Events API](/events-api) and [Data layer compatibility mode](/datalayer-compatibility) for more information on how to implement these options.

You can also use complex triggers to listen for these site actions, with different types of rules like Click Listeners or Form Submissions.

For most tools, the trigger will be a simple pageview event type, for which Cloudflare Zaraz offers a `pageview` preset configuration. If this is the case for the tool you need, [add and configure the tool to your account](/get-started/add-tool) to get started. For example, with the Facebook Pixel tool you only need to enter your account ID and access token, and Zaraz will configure the page view trigger for you.

A valid trigger has the following structure:

```txt
<RULE_TYPE> <VARIABLE_NAME> <COMPARISON_OPERATOR> <STRING_TO_MATCH>
```

The exact composition of the trigger will change depending on the type of rule you choose. Here is an example for a trigger based on a Match rule:

<TableWrap>

Rule type | Variable name | Match operation | Match string
---       | ---           | ---             | ---
_Match rule_ | `{{ client.__zarazTrack }}` |  _Contains_ | `purchase`

</TableWrap>

Refer to [Rule types](#rule-types) for more information on the types of rules available, and [Zaraz event and system properties](/properties-reference) for more information on the variables you can use to create triggers. 

## Create a trigger

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and website. 

1. Go to **Zaraz**.

1. In **Triggers**, select **Create trigger**. 

1. In **Trigger Name** enter a descriptive name for your trigger.

1. In **Rule type**, choose from the actions available in the drop-down menu to start building your rule.

1. In **Variable name**, input the variable you want as the trigger. For example, use the `{{ client.__zarazTrack }}` variable if you are [using `zaraz.track()` in your website](/events-api).

1. Use the **Match operation** drop-down list to choose a comparison operator. For an expression to match, the value in **Variable name** and **Match string** must satisfy the comparison operator.

1. In **Match string**, input the string that completes the rule.

1. You can add more than one rule to your trigger. Click **Add rule** and repeat steps 5-8 to add another set of rules and conditions. If you add more than one rule, your trigger will only be valid when all conditions are true.

1. Click **Save**. 

Your trigger is now complete. If you go back to the main page you will see it listed under **Triggers**, as well as which tools use it. You can also **Edit** or **Delete** your trigger.

## Rule types

The rule type determines the kind of conditions Zaraz should listen for in your web page. Zaraz supports different rule types which allow you to create complex rules.

<details>
<summary>Match rule</summary>
<div>

Zaraz tracks the variable you input in **Variable name**. For a complete list of supported variables, refer to [Zaraz event and system properties](/properties-reference).

**Trigger example:**

<TableWrap>

Rule type | Variable name | Match operation | Match string
---       | ---           | ---             | ---
_Match rule_ | `{{ client.__zarazTrack }}` | _Contains_ | `purchase`

</TableWrap>

</div>
</details>

<details>
<summary>Click listener</summary>
<div>

Tracks clicks in a web page. You can set up click listeners using CSS selectors or XPath expressions. **Wait for events** (in milliseconds) tells Zaraz to prevent the page from changing for the amount of time specified. This allows all requests triggered by the click listener to reach their destination.

**Trigger example for CSS selector:**

<TableWrap>

Rule type | Type | Selector | Wait for events
--- | --- | --- | ---
_Click listener_ | _CSS_ | `#my-button` | `500`

</TableWrap>

To improve the performance of the web page, you can limit a Click listener to a specific URL, by combining it with a Match rule. For example, to track button clicks on a specific page you can set up the following rules in a trigger:

<TableWrap>

Rule type | Type | Selector | Wait for events
--- | --- | --- | ---
_Click listener_ | _CSS_ | `#myButton` | `500`

</TableWrap>

<TableWrap>

Rule type | Variable name | Match operation | Match string
--- | --- | --- | ---
_Match rule_ | `{{ system.page.url.pathname }}` | _Contains_ | `/my-page-path`

</TableWrap>

Refer to [**Create a trigger**](#create-a-trigger) to learn how to add more than one condition to a trigger.

---

**Trigger example for XPath:**

<TableWrap>

Rule type | Type | Selector | Wait for events
--- | --- | --- | ---
_Click listener_ | _XPath_ | `/html/body//*[contains(text(), 'Add To Cart')]` | `500`

</TableWrap>

</div>
</details>

<details>
<summary>Form submission</summary>
<div>

Tracks form submissions using CSS selectors. Click the **Validate** toggle button to only fire the trigger when the form has no validation errors.

**Trigger example:**

<TableWrap>

Rule type | CSS Selector | Validate
--- | --- | --- 
_Form submission_ | `#my-form` | Toggle on or off

</TableWrap>

To improve the performance of the web page, you can limit a Form submission trigger to a specific URL, by combining it with a Match rule. For example, to track a form on a specific page you can set up the following rules in a trigger:

<TableWrap>

Rule type | CSS Selector | Validate
--- | --- | ---
_Form submission_ | `#my-form` | Toggle on or off

</TableWrap>

<TableWrap>

Rule type | Variable name | Match operation | Match string
--- | --- | --- | ---
_Match rule_ | `{{ system.page.url.pathname }}` | _Contains_ | `/my-page-path`

</TableWrap>

Refer to [**Create a trigger**](#create-a-trigger) to learn how to add more than one condition to a trigger.

</div>
</details>


<details>
<summary>Timer</summary>
<div>

Set up an interval of time in milliseconds before activating the trigger in **Interval**. In **Limit** specify the number of times the trigger will fire before stopping. If you do not specify a limit, the timer will run every ten seconds.

**Trigger example:**

<TableWrap>

Rule type | Interval | Limit
--- | --- | --- 
_Timer_ | `50` | `2`

</TableWrap>

To improve the performance of the web page, you can limit a Timer trigger to a specific URL, by combining it with a Match rule. For example, to set up a timer on a specific page you can set up the following rules in a trigger:

<TableWrap>

Rule type | Interval | Limit
--- | --- | ---
_Timer_ | `50` | `2` |

</TableWrap>

<TableWrap>

Rule type | Variable name | Match operation | Match string
--- | --- | --- | ---
_Match rule_ | `{{ system.page.url.pathname }}` | `Contains` | `/my-page-path`

</TableWrap>

Refer to [**Create a trigger**](#create-a-trigger) to learn how to add more than one condition to a trigger.

</div>
</details>

## Create a Blocking Trigger

You may need to block one or more events in a tool from firing when a specific condition arises. For these cases, you can set Blocking Triggers.

When you add Blocking Triggers to an event, the event will not fire when the conditions you specify are true. If the tool has more than one event, other events without Blocking Triggers will still work for that specific tool.

To block a tool entirely, you have to configure Blocking Triggers on every event that belongs to that tool. Note that when you use Blocking Triggers, Zaraz will still load on the page.

To create Blocking Triggers, start by [creating the trigger](#create-a-trigger) with the conditions you want to use to block an event. Then:

1. Go to [Zaraz's main dashboard](https://dash.cloudflare.com/?to=/:account/:zone/zaraz).
1. Locate the third-party tool with the event you want to block and click **Edit**.
1. In **Event Name**, click the event you want to block.
1. In **Blocking Triggers**, use the dropdown menu to add a trigger to block the event.
1. Click **Save**.

<Aside type='note'>

Blocking Triggers are useful if you wish to block specific events, or even specific tools from firing, while keeping others active. If you wish to turn off Zaraz entirely on specific pages/domains/subdomains, we recommend using [Page Rules to block Zaraz](/get-started/block-zaraz). 

</Aside>