---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/360021111972-Fehlerbehebung-bei-DNSSEC
title: Fehlerbehebung bei DNSSEC 
---

# Fehlerbehebung bei DNSSEC 



## Testen von DNSSEC mit Dig

_Dig_ ist ein Befehlszeilentool zum Abfragen eines Nameservers nach DNS-Einträgen. Beispielsweise kann _dig_ einen DNS-Resolver nach der IP-Adresse von _www.cloudflare.com_ fragen. (Die Option _\+ short_ gibt nur das Ergebnis aus)_:_


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig www.cloudflare.com +short198.41.215.162198.41.214.162</span></div></span></span></span></code></pre>{{</raw>}}

Verwenden Sie _dig_, um DNSSEC-Einträge zu überprüfen.  Im folgenden Beispiel ist


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig www.cloudflare.com +dnssec +short198.41.214.162198.41.215.162A 13 3 300 20180927180434 20180925160434 35273 cloudflare.com. DYYZ/bhHSAIlpvu/HEUsxlzkC9NsswbCQ7dcfcuiNBrbhYV7k3AI8t46 QMnOlfhwT6jqsfN7ePV6Fwpym3B0pg==</span></div></span></span></span></code></pre>{{</raw>}}

den öffentlichen Schlüssel der Stammdomain und nicht den öffentlichen Schlüssel der Subdomain ab: 


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig DNSKEY cloudflare.com +short257 3 13 mdsswUyr3DPW132mOi8V9xESWE8jTo0dxCjjnopKl+GqJxpVXckHAeF+ KkxLbxILfDLUT0rAK9iUzy1L53eKGQ==256 3 13 koPbw9wmYZ7ggcjnQ6ayHyhHaDNMYELKTqT+qRGrZpWSccr/lBcrm10Z 1PuQHB3Azhii+sb0PYFkH1ruxLhe5g==</span></div></span></span></span></code></pre>{{</raw>}}

Die DNS-Antwort enthält zwei Einträge:

-   Der _DNSKEY-Eintrag_ **256** ist der öffentliche Schlüssel mit der Bezeichnung Zone-Signing Key, der zum Überprüfen der DNS-Eintragssignaturen für _A, MX, CNAME, SRV_ usw. verwendet wird.
-   Der

Wenn Sie die Option _\+ short_ mit _dig_ nicht verwenden, wird eine DNS-Antwort DNSSEC-authentifiziert, wenn das Flag **ad** im Antwortheader angezeigt wird:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig www.cloudflare.com[...];; -&gt;&gt;HEADER&lt;&lt;- opcode: QUERY, status: NOERROR, id: 65326;; flags: qr rd ra ad; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 1 [...] ;; QUESTION SECTION: ;www.cloudflare.com.        IN  A [...] ;; ANSWER SECTION: www.cloudflare.com. 15  IN  A   198.41.215.162 www.cloudflare.com. 15  IN  A   198.41.214.162</span></div></span></span></span></code></pre>{{</raw>}}

{{<Aside type="note">}}
Einzelheiten zum Überprüfen der Signaturen mit dem öffentlichen
Schlüssel werden in diesem Artikel nicht behandelt.
{{</Aside>}}

___

## Anzeigen der DNSSEC-Vertrauenskette mit Dig

Die vollständige Überprüfung von Domainsignaturen (zum Beispiel: _cloudflare.com_) umfasst die Überprüfung des Key-Signing Keys in der Top-Level-Domain (zum Beispiel: _.com_).  Eine ähnliche Überprüfung wird

Wenn DNSSEC aktiviert ist, ist ein _DS-Eintrag_ im DNS des Registrars erforderlich. Der _DS-Eintrag_ enthält einen Hash des öffentlichen Key-Signing Keys sowie Metadaten zum Schlüssel.

Verwenden Sie _dig_, um einen _DS-Eintrag_ zu finden:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig +short DS cloudflare.com2371 13 2 32996839A6D808AFE3EB4A795A0E6A7A39A76FC52FF228B22B76F6D6 3826F2B9</span></div></span></span></span></code></pre>{{</raw>}}
