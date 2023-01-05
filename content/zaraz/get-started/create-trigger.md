---
pcx_content_type: how-to
title: Create a trigger
weight: 2
---

# Create a trigger

Triggers define the conditions under which a tool will start an action. Since a tool must have actions in order to work, and actions must have triggers, it is important to set up your website's triggers correctly. A trigger can be made out of one or more Rules. Zaraz supports [multiple types of Trigger Rules](/zaraz/reference/triggers/).

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and domain.
2. Go to **Zaraz** > **Tools Configuration** > **Triggers**.
3. Select **Create trigger**.
4. In **Trigger Name** enter a descriptive name for your trigger.
5. In **Rule type**, choose from the actions available in the drop-down menu to start building your rule. Refer to [Triggers and rules](/zaraz/reference/triggers/) for more information on what each rule type means.
6. In **Variable name**, input the variable you want as the trigger. For example, use _Track Name_ if you are using [`zaraz.track()`](/zaraz/web-api/track/) in your website. If you want to use a variable you have previously [created in Variables](/zaraz/get-started/create-variables/), select the `+` sign in the drop-down menu, scroll to **Variables**, and choose your variable.
7. Use the **Match operation** drop-down list to choose a comparison operator. For an expression to match, the value in **Variable name** and **Match string** must satisfy the comparison operator.
8. In **Match string**, input the string that completes the rule.
9. You can add more than one rule to your trigger. Select **Add rule** and repeat steps 5-8 to add another set of rules and conditions. If you add more than one rule, your trigger will only be valid when all conditions are true.
10. Select **Save**.

Your trigger is now complete. If you go back to the main page you will see it listed under **Triggers**, as well as which tools use it. You can also [**Edit** or **Delete** your trigger](/zaraz/get-started/edit-triggers/).