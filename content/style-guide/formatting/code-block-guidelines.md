---
pcx_content_type: concept
title: Code block guidelines
---

# Code block guidelines (language, command prompts)

You can create code blocks by:

+ Using triple-acute characters as a "fence" around the code block. (Recommended)
+ Indenting lines by four spaces or one tab.

To define the syntax highlighting language used for the code block, enter a language name after the first fence. Refer to the [List of languages used in Cloudflare developer documentation](#list-of-languages-used-in-cloudflare-developer-documentation) for a list of supported languages.

Use the `txt` language when there is no appropriate syntax highlighting (for example, a fragment of an Apache configuration file).

## JSON example

````
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
```
````

The rendered output looks like this:

```json
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
```

## Displaying terminal commands

Use the `sh` language for **one-line commands** executed in the Linux/macOS terminal (each command must be in a single line).

Each line containing a command that the user should enter *must* start with a `$` sign. The reader will be able to select these prefixed lines with commands, but no other lines in the code block (which should be command output).

{{<Aside type="note">}} The **Copy to clipboard** button (top-right corner of the code block) will copy the entire content, not just what the reader can select.{{</Aside>}}

Use the `bash` language for other **Linux/macOS/generic commands**:

+ Commands that span multiple lines (usually each line ends with a `\`) and may include one or more lines of JSON content.
+ Commands for other platforms (Windows console, Windows PowerShell) or for specific shells (for example, a command specifically for the zsh shell, where the prompt is usually #).

## Terminal prompts

### For "sh" blocks

Use "**`$`** "(dollar sign, space) or "**FOLDER_NAME $** " (folder name, space, dollar sign, space).

Examples:

+ **`$`** command-to-run
+ **~/my-folder `$`** command-to-run (where `~` means the home folder of the current user).

### For "bash" blocks

Blocks containing **Linux/macOS/generic** commands:

+ Use the same prefixes as for `sh`, even if they are not mandatory — "**`$`** " (dollar sign, space) or "**FOLDER_NAME `$`** " (folder name, space, dollar sign, space).

Blocks containing **Windows console** commands:

+ Use "**FOLDER_NAME>**" (folder name, bigger than symbol, no space after).

  Alternatively, do not include any prompt and start the line with the command the user must enter (knowing that it will be harder to understand what must be entered and what is example output).

  Examples:

  + <b>C:\\></b>command-to-run.exe
  + <b>C:\\Program Files></b>command-to-run.exe
  + <b>C:\\Users\\JohnDoe></b>command-to-run.exe

Blocks containing **PowerShell** commands:

+ Use "**PS FOLDER_NAME>** " (the `>` is part of the prompt, and there is a space after it).

  Examples:

  + **PS C:\\Users\\JohnDoe>** command-to-run.exe
  + **PS C:\\>** command-to-run.exe

Blocks containing **zsh** commands:

+ Use "**#** " (hash sign, space) or "**FOLDER_NAME #** " (folder name, space, hash sign, space). Very similar to `sh` blocks but with a hash sign instead of a dollar sign.

  Examples:

  + **#** command
  + **~/my-folder #** command (where `~` means the home folder of the current user).

---

## For JSON code blocks

Use the `json` language for **JSON code blocks** or **JSON fragments.**

Multi-line curl commands with a JSON body should use `bash` syntax highlighting, as stated in [Displaying terminal commands](#displaying-terminal-commands).

{{<Aside type="note">}}JSON fragments may appear with a red background in GitHub because they are not valid JSON. Make it clear in the documentation that it is a fragment and not an entire piece of valid JSON content.
{{</Aside>}}

## List of languages used in Cloudflare developer documentation

+ `bash` (alias: `curl`)
+ `c`
+ `diff`
+ `go`
+ `graphql`
+ `hcl` (alias: `tf`)
+ `html`
+ `ini`
+ `java`
+ `js` (alias: `javascript`)
+ `json`
+ `kotlin`
+ `php`
+ `python` (alias: `py`)
+ `ruby` (alias: `rb`)
+ `rust` (alias: `rs`)
+ `sh` (alias: `shell`)
+ `sql`
+ `swift`
+ `toml`
+ `ts` (alias: `typescript`)
+ `txt` (aliases: `text`, `plaintext`)
+ `xml`
+ `yaml` (alias: `yml`)

Different capitalizations of these languages are also supported (but not recommended). For example, `JavaScript` will use the `javascript` language, and `HTML` will use the `html` language.
