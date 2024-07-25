---
pcx_content_type: concept
title: Code block guidelines
---

# Code block guidelines (language, command prompts)

You can create code blocks by:

- Using triple-acute characters as a "fence" around the code block. (Recommended)
- Indenting lines by four spaces or one tab.

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

- Use the `sh` language for **one-line commands** executed in the Linux/macOS terminal (each command must be in a single line).

    Each line containing a command that the user should enter *must* start with a `$` sign. The reader will be able to select these prefixed lines with commands, but no other lines in the code block (which should be command output).

    {{<Aside type="note">}} The **Copy to clipboard** button (top-right corner of the code block) will copy the entire content, not just what the reader can select.{{</Aside>}}

- Use the `bash` language for other **Linux/macOS/generic commands**. For example:
    - Commands that span multiple lines (usually each line ends with a `\`) and may include one or more lines of JSON content.
    - Commands for specific shells (for example, a command specifically for the zsh shell, where the prompt is usually `%`).

- Use the `powershell` language for Windows PowerShell commands.

- Use the `txt` language for Windows console commands.

## Terminal prompts

### For "sh" blocks

Use "**`$`** "(dollar sign, space) or "**FOLDER_NAME $** " (folder name, space, dollar sign, space).

Examples:

- **`$`** command-to-run
- **~/my-folder `$`** command-to-run (where `~` means the home folder of the current user).

### For "bash" blocks

Blocks containing **Linux/macOS/generic** commands:
- If a code block contains only one (multi-line) command, do not include a `$` prefix so that the user can run the command immediately after copying and pasting without having to remove the prefix.
- If a code block includes several commands or it includes output, consider including a prefix before each command to help differentiate between commands and their output. Use the same prefixes as described for `sh` blocks.
- For zsh-specific instructions you can use a `%` command prefix instead of `$`.

### For "powershell" blocks

Use "**PS FOLDER_NAME>** " (the `>` is part of the prompt, and there is a space after it).

Examples:

- **PS C:\\>** command-to-run.exe
- **PS C:\\Users\\JohnDoe>** command-to-run.exe

### For Windows console ("txt") blocks

Use "**FOLDER_NAME>**" (folder name, bigger than symbol, no space after).

Alternatively, do not include any prompt and start the line with the command the user must enter (knowing that it will be harder to understand what must be entered and what is example output).

Examples:

- <b>C:\\></b>command-to-run.exe
- <b>C:\\Program Files></b>command-to-run.exe
- <b>C:\\Users\\JohnDoe></b>command-to-run.exe

---

## For JSON code blocks

Use the `json` language for **JSON code blocks** or **JSON fragments.**

Multi-line curl commands with a JSON body should use `bash` syntax highlighting, as stated in [Displaying terminal commands](#displaying-terminal-commands).

{{<Aside type="note">}}JSON fragments may appear with a red background in GitHub because they are not valid JSON. Make it clear in the documentation that it is a fragment and not an entire piece of valid JSON content.
{{</Aside>}}

## List of languages used in Cloudflare developer documentation

- `bash` (alias: `curl`)
- `c`
- `diff`
- `go`
- `graphql`
- `hcl` (alias: `tf`)
- `html`
- `ini`
- `java`
- `js` (alias: `javascript`)
- `json`
- `kotlin`
- `php`
- `powershell`
- `python` (alias: `py`)
- `ruby` (alias: `rb`)
- `rust` (alias: `rs`)
- `sh` (alias: `shell`)
- `sql`
- `swift`
- `toml`
- `ts` (alias: `typescript`)
- `txt` (aliases: `text`, `plaintext`)
- `xml`
- `yaml` (alias: `yml`)

Different capitalizations of these languages are also supported (but not recommended). For example, `JavaScript` will use the `javascript` language, and `HTML` will use the `html` language.
