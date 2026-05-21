# Writing style

## Contractions

Do not use contractions in documentation.

**Warning:** any `+` prose line containing: `don't`, `can't`, `won't`, `isn't`, `aren't`, `doesn't`, `didn't`, `hasn't`, `haven't`, `couldn't`, `wouldn't`, `shouldn't`, `it's`, `we're`, `you're`, `they're`, `I'm`, `let's`, `there's`, `that's`, `what's`.

Exception: contractions inside code blocks or backtick spans are fine.

## "please"

Do not use "please" in instructions. It is filler that adds no information.

**Warning:** any `+` prose line that contains "please" in an instruction context (e.g. "Please select", "Please note", "Please ensure").

## Directional language

Do not use directional references. Reference elements by name instead.

**Warning:** any `+` prose line containing: "above", "below", "on the right", "on the left", "as shown above", "as shown below", "see above", "see below", "documented below", "listed above".

## UI interaction terminology

| Use | Not |
| --- | --- |
| select | click |
| go to | navigate to |
| refer to | see |
| turn on / turn off | enable / disable |

**Warning:** any `+` prose line that uses "click" as a UI action (e.g. "click the button", "click on"), "navigate to" (use "go to"), "see the [link]" (use "refer to"), or "enable"/"disable" as a toggle action (use "turn on"/"turn off").

Exception: "click" in a URL, code, or technical context (not a UI instruction) is fine.

## Latin abbreviations

**Warning:** any `+` prose line containing `e.g.`, `i.e.`, or `etc.` Use "for example", "that is", or rewrite to list items explicitly.

Exception: inside code blocks or backtick spans is fine.

## LLM-filler phrases

**Suggestion:** any `+` prose line containing: "It's important to note", "it is important to note", "leverage" (as a verb), "seamless", "dive into", "straightforward", "easy to use", "powerful", "robust", "cutting-edge", "state-of-the-art".

## Voice and tense

Use active voice and present tense. Passive voice obscures the actor.

**Suggestion:** obvious passive constructions where rewriting is easy (e.g. "is used by" → "uses", "can be configured by" → "configure").

Do not flag passive voice when the actor is unknown or unimportant.

## Oxford comma

Use the Oxford comma in lists of three or more items: "Workers, KV, and R2" not "Workers, KV and R2".

**Suggestion:** any `+` prose line with a list of three or more items that is missing the serial comma before "and" or "or".
