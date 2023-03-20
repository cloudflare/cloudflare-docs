---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/217720788-Behebung-von-Problemen-beim-Teilen-von-Inhalten-mit-Facebook
title: Behebung von Problemen beim Teilen von Inhalten mit Facebook 
---

# Behebung von Problemen beim Teilen von Inhalten mit Facebook 



## Übersicht

Standardmäßig werden Anfragen von Facebook von Cloudflare nicht blockiert oder mit einer Challenge konfrontiert. Beim Posten eines Website-Beitrags auf Facebook wird jedoch unter den folgenden Umständen der Fehler „_Attention Required_“ ausgegeben:

-   Die Sicherheitsstufe ist auf [I‘m Under Attack](https://support.cloudflare.com/hc/search/click?data=BAh7CjoHaWRpBN5a7gs6CXR5cGVJIgxhcnRpY2xlBjoGRVQ6CHVybEkiSC9oYy9lbi11cy9hcnRpY2xlcy8yMDAxNzAyMDYtSG93LWRvLUktZW5hYmxlLUktbS1VbmRlci1BdHRhY2stbW9kZS0GOwdGOg5zZWFyY2hfaWRJIik4YjE5YTBmNS0zNDViLTRkZmEtYmEzYy01NDk4NDlhNmZkNjEGOwdGOglyYW5raQ8%3D--12cd9c846382e475f31a1186344911da7ed54d9c) eingestellt – entweder global oder über eine [Page Rule](https://support.cloudflare.com/hc/articles/200172336), oder
-   es existiert eine benutzerdefinierte Firewall-Challenge oder Blockierung, die eine Facebook-IP-Adresse enthält.

{{<Aside type="note">}}
[Eine Facebook-IP-Adresse kann durch eine Länder-Challenge blockiert
werden.  Facebook ist dafür bekannt, sowohl von den USA als auch von
Irland aus Crawling-Prozesse durchzuführen.]{style="line-height: 1.5;"}
{{</Aside>}}

Zur Behebung von Problemen beim Teilen von Inhalten mit Facebook:

-   Entfernen Sie die entsprechende IP, ASN, oder länderspezifische [Firewall Rule](https://support.cloudflare.com/hc/articles/360016473712) oder [IP Access Rule](https://support.cloudflare.com/hc/articles/217074967), durch die Facebook-IPs abgefragt oder blockiert werden, oder
-   setzen Sie AS32934 und AS63293 in Ihren [IP Access Rules](https://support.cloudflare.com/hc/articles/217074967) auf eine Whitelist, um Challenges, Blockierungen und Under-Attack-Challenges außer Kraft zu setzen.

Wenn Sie Probleme beim Teilen von Inhalten mit Facebook hatten, müssen Sie Seiten über die Option **Neue Scrape-Informationen abrufen** auf Facebooks [Objekt-Debugger](https://developers.facebook.com/tools/debug/og/object/) neu scrapen.

{{<Aside type="note">}}
Facebook nimmt erneutes Scrapen von Inhalten alle 30 Tage vor, soweit
keine anderweitigen Anweisungen vorliegen. Wenn Sie eine große Anzahl
von Ressourcen aktualisieren müssen, [bietet Facebook eine API
an](https://developers.facebook.com/docs/sharing/opengraph/using-objects),
die Ihnen dabei helfen kann.
{{</Aside>}}

Wenn Sie immer noch Probleme haben, wenden Sie sich bitte mit den folgenden Angaben [an den Cloudflare-Support](https://support.cloudflare.com/hc/articles/200172476#h_4b8753c8-f422-4c74-9e8e-07026c4da730):

-   die URLs Ihrer Website, die keine Inhalte mit Facebook teilen kann
-   das Ergebnis von [Facebooks Debug-Tool](https://developers.facebook.com/tools/debug/og/object/)
-   eine Bestätigung, dass sie ein erneutes Scrapen der URLs vorgenommen haben
