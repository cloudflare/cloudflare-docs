---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/360021357131-Delegieren-von-Subdomains-au%C3%9Ferhalb-von-Cloudflare
title: Delegieren von Subdomains außerhalb von Cloudflare 
---

# Delegieren von Subdomains außerhalb von Cloudflare 



## Überblick

Durch die Delegierung von Subdomains können verschiedene Personen, Teams oder Organisationen verschiedene Subdomains einer Website verwalten.

{{<Aside type="note">}}
Eine DNS-Delegierung ist für Cloudflare-Domains in einem
[CNAME-Setup](https://support.cloudflare.com/hc/articles/360020348832)
nicht möglich.
{{</Aside>}}

Betrachten Sie beispielsweise _example.com_ als Cloudflare-Domain mit _www.example.com_, die in der **DNS**\-App von Cloudflare verwaltet wird und _internal.example.com_, die an Nameserver außerhalb von Cloudflare delegiert werden. In diesem Beispiel kann _internal.example.com_ nun von Personen verwaltet werden, die keinen Zugriff auf Cloudflare-Anmeldeinformationen für die Domain _example.com_ haben.

{{<Aside type="warning">}}
Die CDN- und Sicherheitsdienste von Cloudflare werden nicht auf
delegierte Subdomains angewendet.
{{</Aside>}}

___

## Delegierung einer Subdomain

Um eine Subdomain wie _internal.example.com_ zu delegieren, teilen Sie den DNS-Resolvern mit, wo sich die Zonendatei befindet:

1.  Melden Sie sich im Cloudflare-Dashboard an.
2.  Klicken Sie auf das entsprechende Cloudflare-Konto.
3.  Wählen Sie die Domain aus, die die zu delegierende Subdomain enthält.
4.  Klicken Sie auf die **DNS**\-App.
5.  Erstellen Sie _NS-Einträge_ für die Subdomain. Beispiel:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">internal.example.com NS ns1.externalhost.cominternal.example.com NS ns2.externalhost.cominternal.example.com NS ns3.externalhost.com</span></div></span></span></span></code></pre>{{</raw>}}

{{<Aside type="note">}}
*A-Einträge* für die Subdomain werden nur als Glue Records für
Nameserver benötigt, die sich in der Subdomain der aktuell delegierten
Zone befinden.
{{</Aside>}}

6.  (Optional) Wenn auf dem delegierten Nameserver DNSSEC aktiviert ist, fügen Sie den _DS-Eintrag_ in der Cloudflare-App **DNS** hinzu.

___

## Verwandte Ressourcen

-   [Verwaltung von DNS-Einträgen in Cloudflare](https://support.cloudflare.com/hc/articles/360019093151)
-   [Grundlegendes zum CNAME-Setup](https://support.cloudflare.com/hc/articles/360020348832)
-   [Glue Records](https://www.ietf.org/rfc/rfc1912.txt) (RFC 1912 Abschnitt 2.3)
