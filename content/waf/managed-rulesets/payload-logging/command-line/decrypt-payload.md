---
title: Decrypt the payload content
pcx-content-type: how-to
type: overview
weight: 3
layout: list
meta:
  title: Decrypt the payload content in the command line
---

# Decrypt the payload content in the command line

Use the `matched-data-cli` tool to decrypt a payload in the command line.

1.  [Download](https://github.com/cloudflare/matched-data-cli/releases) the `matched-data-cli` tool for your platform from the **Releases** page on GitHub, under **Assets**.

2.  Extract the content of the downloaded `.tar.gz` file to a local folder.

3.  Open a command line window and change to the local folder containing the `matched-data-cli` binary.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-directory CodeBlock--token-unselectable">~ </span><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">cd matched-data-cli</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

4.  Create two files: one with your private key and another one with the encrypted payload:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-directory CodeBlock--token-unselectable">~/matched-data-cli </span><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">printf &quot;&ltPRIVATE_KEY&gt&quot; &gt private_key.txt &amp;&amp; chmod 400 private_key.txt</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-directory CodeBlock--token-unselectable">~/matched-data-cli </span><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">printf &quot;&ltENCRYPTED_PAYLOAD&gt&quot; &gt encrypted_payload.txt</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

    Replace `<PRIVATE_KEY>` with your private key and `<ENCRYPTED_PAYLOAD>` with the encrypted payload.

    Note: The first `printf` command will make your private key visible in your command history.

5.  Run the following command to decrypt the payload:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-directory CodeBlock--token-unselectable">~/matched-data-cli </span><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">./matched-data-cli decrypt -k private_key.txt encrypted_payload.txt</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

## Example

The following example creates two files — one with the private key and another one with the encrypted payload — and runs the `matched-data-cli` tool to decrypt the payload in the `encrypted_payload.txt` file:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-directory CodeBlock--token-unselectable">~ </span><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">cd matched-data-cli</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-directory CodeBlock--token-unselectable">~/matched-data-cli </span><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">printf &quot;uBS5eBttHrqkdY41kbZPdvYnNz8Vj0TvKIUpjB1y/GA=&quot; &gt private_key.txt &amp;&amp; chmod 400 private_key.txt</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-directory CodeBlock--token-unselectable">~/matched-data-cli </span><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">printf &quot;AzTY6FHajXYXuDMUte82wrd+1n5CEHPoydYiyd3FMg5IEQAAAAAAAAA0lOhGXBclw8pWU5jbbYuepSIJN5JohTtZekLliJBlVWk=&quot; &gt encrypted_payload.txt</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-directory CodeBlock--token-unselectable">~/matched-data-cli </span><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">./matched-data-cli decrypt -k private_key.txt encrypted_payload.txt</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">test matched data</span></div></span></span></span></code></pre>{{</raw>}}

{{<Aside type="note" header="Encryption formats">}}

The format of the encrypted payload can change over time. The `matched-data-cli` tool returns an error if it cannot decrypt a new encryption format.

To fix this error, [download](https://github.com/cloudflare/matched-data-cli/releases) a newer version of the tool from GitHub and try again.

{{</Aside>}}
