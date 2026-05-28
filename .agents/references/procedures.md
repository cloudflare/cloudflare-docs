# Writing Procedures — Agent Reference

Rules for writing step-by-step instructions in how-to and tutorial pages.

---

## Structure

Wrap all multi-step procedures in the `Steps` component:

```mdx
import { Steps } from "~/components";

<Steps>
1. Step one
2. Step two
</Steps>
```

Single-step procedures: fold the step into the introductory sentence rather than making a one-item list.

Sub-steps use lowercase letters (a, b, c). Sub-sub-steps use lowercase Roman numerals (i, ii, iii).

---

## Writing rules

**Order**: state location before action, purpose before action.
- "In the **DNS** section, select **Add record**." (location → action)
- "To delete the rule, select **Delete**." (purpose → action)

**First step**: consolidate login and navigation. Do not make "Log in" its own step if the next step is navigating somewhere.
- "Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and go to **DNS** > **Records**."
- Write "log in to" (three words), not "log into".

**Optional steps**: prefix with `(Optional)` as the first word.
- "(Optional) Enter a description for the rule."

**Enter key**: if the user must press **Enter** after a step, include it in that step.

**Multiple procedures for the same task**: use separate headings, pages, or `Tabs` — not separate numbered lists on the same page without clear separation.

**After a procedure**: use "Next steps" for follow-on tasks rather than a "Post-requisites" section.

---

## What to avoid

- **Directional language**: not "click the button on the right" or "see above". Reference UI elements by name. If the location is hard to describe, use a screenshot.
- **"Please"**: do not use it.
- **Keyboard shortcuts**: do not document them in procedures.
- **Repetitive bold**: avoid bolding every single UI element in dense procedures — it loses emphasis.
- **Gerunds in step text**: write "Select **Save**" not "Selecting **Save**".

---

## Screenshots in procedures

Provide a screenshot when the UI element is genuinely hard to locate without one. Place it after the step text, not before. See `.agents/references/style-guide.md` for screenshot guidelines.

---

## Terminology in procedures

| Use | Not |
| --- | --- |
| select | click |
| go to | navigate to |
| turn on / turn off | enable / disable |
| log in to | log into |
| (Optional) | Optional: |
