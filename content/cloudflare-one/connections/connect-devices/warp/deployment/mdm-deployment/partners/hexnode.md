---
pcx-content-type: how-to
title: Hexnode
weight: 2
---

# Hexnode

## Windows

{{<Aside type="note" header="Requirements">}}

*   A 64-bit machine with Windows 10 or Windows 8
*   184 MB hard disk space and 3 MB memory
*   Wi-Fi or LAN connection

{{</Aside>}}

To set up Cloudflare for Teams on Windows using Hexnode:

1. Create a script file with `.bat`, `.cmd`, and `.ps1` file formats to download, install and configure the Cloudflare WARP client Windows application on the device. Listed below is a sample script with all the configurable parameters:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-python" language="python"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-operator">&lt</span><span class="CodeBlock--token-comment"># Choose file name for downloading application #&gt</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$filename </span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-plain"> filename</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">msi'</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-operator">&lt</span><span class="CodeBlock--token-comment"># Download URL of the installer. #&gt</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$url </span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">'https://www.cloudflarewarp.com/Cloudflare_WARP_Release-x64.msi'</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Write</span><span class="CodeBlock--token-operator">-</span><span class="CodeBlock--token-plain">Host </span><span class="CodeBlock--token-string">'Downloading App from'</span><span class="CodeBlock--token-plain"> $url</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Invoke</span><span class="CodeBlock--token-operator">-</span><span class="CodeBlock--token-plain">WebRequest </span><span class="CodeBlock--token-operator">-</span><span class="CodeBlock--token-plain">Uri $url </span><span class="CodeBlock--token-operator">-</span><span class="CodeBlock--token-plain">OutFile $filename</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-operator">&lt</span><span class="CodeBlock--token-comment"># Run the installer and wait for the installation to finish #&gt</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$arguments </span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;ORGANIZATION=&quot;</span><span class="CodeBlock--token-plain">exampleorg</span><span class="CodeBlock--token-string">&quot; SERVICE_MODE=&quot;</span><span class="CodeBlock--token-plain">warp</span><span class="CodeBlock--token-string">&quot; GATEWAY_UNIQUE_ID=&quot;</span><span class="CodeBlock--token-plain">fmxk762nrj</span><span class="CodeBlock--token-string">&quot; SUPPORT_URL=&quot;</span><span class="CodeBlock--token-plain">http</span><span class="CodeBlock--token-punctuation">:</span><span class="CodeBlock--token-operator">//</span><span class="CodeBlock--token-plain">support</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">example</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">com</span><span class="CodeBlock--token-string">&quot;&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$installProcess </span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-plain">Start</span><span class="CodeBlock--token-operator">-</span><span class="CodeBlock--token-plain">Process $filename </span><span class="CodeBlock--token-operator">-</span><span class="CodeBlock--token-plain">ArgumentList $arguments </span><span class="CodeBlock--token-operator">-</span><span class="CodeBlock--token-plain">PassThru </span><span class="CodeBlock--token-operator">-</span><span class="CodeBlock--token-plain">Wait</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-operator">&lt</span><span class="CodeBlock--token-comment"># Check if installation was successful #&gt</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-keyword">if</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-plain">$installProcess</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">ExitCode </span><span class="CodeBlock--token-operator">-</span><span class="CodeBlock--token-plain">ne </span><span class="CodeBlock--token-number">0</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    Write</span><span class="CodeBlock--token-operator">-</span><span class="CodeBlock--token-plain">Host </span><span class="CodeBlock--token-string">&quot;Installation failed!&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    exit $installProcess</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-plain">ExitCode</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-keyword">else</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    Write</span><span class="CodeBlock--token-operator">-</span><span class="CodeBlock--token-plain">Host </span><span class="CodeBlock--token-string">&quot;Installation completed successfully!&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

1. Push the script file to the devices using Hexnode.

1. On your Hexnode console, go to **Manage** > **Devices**.

1. Click on your device name. This will take you to the **Device Summary**.

1. Click **Actions** > **Execute Custom Script**.

1. Choose the script file source as *Upload file*, then upload the script file.

1. Click **Execute**.

## macOS

{{<Aside type="note" header="Requirements">}}

*   macOS Catalina, High Sierra or Big Sur with a 64-bit CPU
*   Minimum hard disk space 75 MB and memory 35 MB.
*   Wi-Fi or LAN connection

To set up Cloudflare for Teams on macOS using Hexnode:

{{</Aside>}}

1. Get the Cloudflare WARP client with identifier “com.apple.ManagedClient.preferences”.

1. Upload the `cloudflare_WARP.pkg` file in Hexnode.

1. On your Hexnode console, head on to **Apps**.

1. Click on **+Add Apps** > **Enterprise App**.

1. Select *macOS* as the app platform.

1. Add an app name, category and description.

1. Upload the PKG file and click **Add**.

1. Set up an XML file with the supported app configurations for the app.
    Here’s a sample XML file with the accepted parameters.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-xml" language="xml"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-prolog">&lt?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-doctype CodeBlock--token-punctuation">&lt!</span><span class="CodeBlock--token-doctype CodeBlock--token-doctype-tag">DOCTYPE</span><span class="CodeBlock--token-doctype"> </span><span class="CodeBlock--token-doctype CodeBlock--token-name">plist</span><span class="CodeBlock--token-doctype"> </span><span class="CodeBlock--token-doctype CodeBlock--token-name">PUBLIC</span><span class="CodeBlock--token-doctype"> </span><span class="CodeBlock--token-doctype CodeBlock--token-string">&quot;-//Apple//DTD PLIST 1.0//EN&quot;</span><span class="CodeBlock--token-doctype"> </span><span class="CodeBlock--token-doctype CodeBlock--token-string">&quot;http://www.apple.com/DTDs/PropertyList-1.0.dtd&quot;</span><span class="CodeBlock--token-doctype CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt</span><span class="CodeBlock--token-tag CodeBlock--token-tag">plist</span><span class="CodeBlock--token-tag"> </span><span class="CodeBlock--token-tag CodeBlock--token-attr-name">version</span><span class="CodeBlock--token-tag CodeBlock--token-attr-value CodeBlock--token-punctuation CodeBlock--token-attr-equals">=</span><span class="CodeBlock--token-tag CodeBlock--token-attr-value CodeBlock--token-punctuation">&quot;</span><span class="CodeBlock--token-tag CodeBlock--token-attr-value">1.0</span><span class="CodeBlock--token-tag CodeBlock--token-attr-value CodeBlock--token-punctuation">&quot;</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt</span><span class="CodeBlock--token-tag CodeBlock--token-tag">dict</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain"> </span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt</span><span class="CodeBlock--token-tag CodeBlock--token-tag">key</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain">organization</span><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt/</span><span class="CodeBlock--token-tag CodeBlock--token-tag">key</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain"> </span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt</span><span class="CodeBlock--token-tag CodeBlock--token-tag">string</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain">organizationname</span><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt/</span><span class="CodeBlock--token-tag CodeBlock--token-tag">string</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain"> </span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt</span><span class="CodeBlock--token-tag CodeBlock--token-tag">key</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain">auto_connect</span><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt/</span><span class="CodeBlock--token-tag CodeBlock--token-tag">key</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain"> </span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt</span><span class="CodeBlock--token-tag CodeBlock--token-tag">integer</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain">1</span><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt/</span><span class="CodeBlock--token-tag CodeBlock--token-tag">integer</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain"> </span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt</span><span class="CodeBlock--token-tag CodeBlock--token-tag">key</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain">switch_locked</span><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt/</span><span class="CodeBlock--token-tag CodeBlock--token-tag">key</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain"> </span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt</span><span class="CodeBlock--token-tag CodeBlock--token-tag">false</span><span class="CodeBlock--token-tag"> </span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">/&gt</span><span class="CodeBlock--token-plain"> </span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt</span><span class="CodeBlock--token-tag CodeBlock--token-tag">key</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain">service_mode</span><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt/</span><span class="CodeBlock--token-tag CodeBlock--token-tag">key</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain"> </span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt</span><span class="CodeBlock--token-tag CodeBlock--token-tag">string</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain">warp</span><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt/</span><span class="CodeBlock--token-tag CodeBlock--token-tag">string</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain"> </span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt</span><span class="CodeBlock--token-tag CodeBlock--token-tag">key</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain">support_url</span><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt/</span><span class="CodeBlock--token-tag CodeBlock--token-tag">key</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt</span><span class="CodeBlock--token-tag CodeBlock--token-tag">string</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain">https://support.example.com</span><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt/</span><span class="CodeBlock--token-tag CodeBlock--token-tag">string</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt/</span><span class="CodeBlock--token-tag CodeBlock--token-tag">dict</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt/</span><span class="CodeBlock--token-tag CodeBlock--token-tag">plist</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

1. Push the app and configurations to the devices.

1. On your Hexnode console, go to **Policies**.

1. Create a new policy and provide a policy name.

1. Go to **macOS** > **App Management** > **Mandatory Apps** and start setting up the policy.

1. Click on **+Add** and select the previously uploaded WARP client app.

1. Now go to **App Configurations** and click on **+Add new configuration**.

1. Select the *WARP client* app and upload the XML file.

1. Now go to **Policy Targets** and associate the policy with the target entities.

This will push the app along with the configurations to the selected devices.

## iOS

{{<Aside type="note" header="Requirements">}}

*   Devices running iOS v11+

{{</Aside>}}

To set up Cloudflare for Teams on iOS using Hexnode:

1. Add the [Cloudflare WARP iOS client](https://apps.apple.com/us/app/id1423538627) to the Hexnode app inventory.

1. On your Hexnode console, navigate to **Apps**.

1. Click on **+Add Apps** > **Store App**.

1. Select *iOS* as the app platform.

1. Search for the app **1.1.1.1: Faster Internet** and click on **Add** close to the app.

1. Set up an XML file with the supported app configurations for the app. Refer this sample XML code to identify the supported arguments:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-xml" language="xml"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt</span><span class="CodeBlock--token-tag CodeBlock--token-tag">dict</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain"> </span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt</span><span class="CodeBlock--token-tag CodeBlock--token-tag">key</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain">organization</span><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt/</span><span class="CodeBlock--token-tag CodeBlock--token-tag">key</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain"> </span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt</span><span class="CodeBlock--token-tag CodeBlock--token-tag">string</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain">yourorganization</span><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt/</span><span class="CodeBlock--token-tag CodeBlock--token-tag">string</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain"> </span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt</span><span class="CodeBlock--token-tag CodeBlock--token-tag">key</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain">auto_connect</span><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt/</span><span class="CodeBlock--token-tag CodeBlock--token-tag">key</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain"> </span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt</span><span class="CodeBlock--token-tag CodeBlock--token-tag">integer</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain">1</span><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt/</span><span class="CodeBlock--token-tag CodeBlock--token-tag">integer</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain"> </span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt</span><span class="CodeBlock--token-tag CodeBlock--token-tag">key</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain">switch_locked</span><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt/</span><span class="CodeBlock--token-tag CodeBlock--token-tag">key</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain"> </span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt</span><span class="CodeBlock--token-tag CodeBlock--token-tag">false</span><span class="CodeBlock--token-tag"> </span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">/&gt</span><span class="CodeBlock--token-plain"> </span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt</span><span class="CodeBlock--token-tag CodeBlock--token-tag">key</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain">service_mode</span><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt/</span><span class="CodeBlock--token-tag CodeBlock--token-tag">key</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain"> </span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt</span><span class="CodeBlock--token-tag CodeBlock--token-tag">string</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain">warp</span><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt/</span><span class="CodeBlock--token-tag CodeBlock--token-tag">string</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain"> </span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"></span><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt</span><span class="CodeBlock--token-tag CodeBlock--token-tag">key</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain">support_url</span><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt/</span><span class="CodeBlock--token-tag CodeBlock--token-tag">key</span><span class="CodeBlock--token-tag">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-tag CodeBlock--token-attr-name">&ltstring</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain">https://support.example.com</span><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt/</span><span class="CodeBlock--token-tag CodeBlock--token-tag">string</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-tag CodeBlock--token-tag CodeBlock--token-punctuation">&lt/</span><span class="CodeBlock--token-tag CodeBlock--token-tag">dict</span><span class="CodeBlock--token-tag CodeBlock--token-punctuation">&gt</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

1. Upload the app configurations in Hexnode.
    1. On your Hexnode console, go to the **Apps** tab.
    1. Find the 1.1.1.1 app and click on its name.
    1. Click on the settings icon and choose **App Configuration**.
    1. Upload the XML file in the corresponding field.
    1. Next, click **Save**.

1. Push the app to the target devices using Hexnode.
    1. On your Hexnode console, go to **Policies** and create a new policy.
    1. Provide a name for the policy and go to **iOS**.
    1. Select **Mandatory Apps** from the left menu and click on **Configure**.
    1. Click on **+Add** > **Add app**, check the required app and click **Done**.
    1. Now go to **Policy Targets** and associate the policy with the required target entities.

## Android

{{<Aside type="note" header="Requirements">}}

*   Devices enrolled in the Android Enterprise program.

{{</Aside>}}

To set up Cloudflare for Teams on Android using Hexnode:

1. Approve the app [1.1.1.1: Faster & Safer Internet](https://play.google.com/work/apps/details?id=com.cloudflare.onedotonedotonedotone) as a Managed Google Play app.
    1. On your Hexnode console, navigate to the Apps tab.
    1. Click on **+Add Apps** > **Managed Google Apps**.
    1. Search and find the app **1.1.1.1: Faster & Safer Internet**.
    1. Approve the app as a Managed Google app.
1. Set up custom configurations for the app with App Configurations.
    1. On your Hexnode console, go to **Policies** and create a new policy.
    1. Go to **Android** > **App Configurations** > **+Add new configuration**.
    1. Search and find the app and set up the customizations.
    1. Associate the policy with the required target devices before saving from **Policy Targets**.

The app automatically gets installed on the devices once the policy with the app configuration reaches the device.
