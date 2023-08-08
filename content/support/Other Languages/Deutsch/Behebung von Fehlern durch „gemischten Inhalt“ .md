---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/200170476-Behebung-von-Fehlern-durch-gemischten-Inhalt-
title: Behebung von Fehlern durch „gemischten Inhalt“ 
---

# Behebung von Fehlern durch „gemischten Inhalt“ 



## Überblick

Zu Cloudflare hinzugefügte Domains erhalten SSL-Zertifikate und können Datenverkehr über HTTPS bereitstellen. Nach dem Start von Cloudflare bemerken einige Kunden jedoch fehlende Inhalte oder Probleme beim Rendern von Seiten, wenn sie zum ersten Mal HTTPS-Datenverkehr bereitstellen.

In der Regel liegt das Problem an einer Anfrage von HTTP-Ressourcen von einer Webseite, die über HTTPS bereitgestellt wird.  Beispielsweise geben Sie _https://example.com_ in einen Browser ein und die Seite enthält einen Bildverweis über HTTP im HTML-Code zu

`<img src="http://example.com/resource.jpg">`

Wenn Ihre Website alle Ressourcen sicher über HTTPS lädt, sehen Besucher normalerweise ein Schlosssymbol (normalerweise ein grünes Schloss) in der Adressleiste ihres Browsers:

![green-lock-icon.png](/images/support/green-lock-icon.png)

Dies deutet darauf hin, dass Ihre Website über ein funktionsfähiges SSL-Zertifikat verfügt und alle von der Website geladenen Ressourcen über HTTPS geladen werden. Das grüne Schloss gibt den Benutzern die Sicherheit, dass ihre Verbindung sicher ist. Eine der [Ursachen für gemischten Inhalt](https://support.cloudflare.com/hc/de/articles/200170476-Behebung-von-Fehlern-durch-gemischten-Inhalt-#h_a6c5a05b-baba-4f88-a75c-d61f206366ed) ist, dass anstelle des grünen Schlosssymbols verschiedene Symbole angezeigt werden.

{{<Aside type="tip">}}
Weitere Ursachen für Probleme beim Rendern von Inhalten sind [[Rocket
Loader]{style="font-weight: 400;"}](https://support.cloudflare.com/hc/en-us/articles/200168056-What-does-Rocket-Loader-do-)[
und
]{style="font-weight: 400;"}[[Auto-Minify]{style="font-weight: 400;"}](https://blog.cloudflare.com/an-all-new-and-improved-autominify/)[. 
Deaktivieren Sie testhalber beide Funktionen, wenn Sie keine Fehler mit
gemischtem Inhalt feststellen.]{style="font-weight: 400;"}
{{</Aside>}}

___

## Ursachen für das Auftreten von gemischtem Inhalt

Die meisten modernen Browser blockieren HTTP-Anfragen auf sicheren HTTPS-Seiten. Zu blockierten Inhalten können Bilder, JavaScript, CSS oder andere Inhalte gehören, die sich auf die Darstellung oder das Verhalten der Website auswirken.

Nachstehend finden Sie Hinweise darauf, dass Ihr Webbrowser gemischte Inhalte für die angeforderte Website feststellt:

Bei Warnungen zu gemischten Inhalten lädt der Webbrowser die Ressourcen, aber Benutzer sehen nicht das grüne Schlosssymbol in der URL. Warnmeldungen werden in den Debug-Tools des Browsers angezeigt:

![mixed-content-warning.png](/images/support/mixed-content-warning.png)

Bei Fehlern durch gemischte Inhalte verweigert der Browser das Laden der Ressourcen über eine unsichere Verbindung:

![mixed-content-error.png](/images/support/mixed-content-error.png)

Informationen zur Verwendung der Debug-Tools des Browsers zum Auffinden dieser Probleme finden Sie in der Dokumentation zu [Chrome](https://developers.google.com/web/fundamentals/security/prevent-mixed-content/fixing-mixed-content) und [Firefox](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content). Alternativ können Sie Ihre Seitenquelle anzeigen und bestimmte Verweise auf _http://_ für Pfade zu anderen Ressourcen suchen.

___

## Lösung

Es gibt zwei Methoden, um Fehler mit gemischtem Inhalt zu beheben.

1\. Laden Sie alle Ressourcen über Ihre HTML-Quelle, ohne die HTTP- oder HTTPS-Protokolle anzugeben. Beispiel:

     _//domain.com/path/to.file_

     anstatt von

     _http://domain.com/path/to.file_

2\. Suchen Sie je nach Content Management System nach Plug-ins, die HTTP-Ressourcen automatisch in HTTPS umschreiben. In der**SSL/TLS**\-App bietet Cloudflare einen solchen Service über [Automatic HTTPS Rewrites](https://support.cloudflare.com/hc/articles/227227647) an.

{{<Aside type="note">}}
Cloudflare empfiehlt Wordpress-Benutzern, das [Cloudflare
WordPress-Plugin](https://wordpress.org/plugins/cloudflare/) zu
installieren und die Option *Automatic HTTPS Rewrites* im Plugin zu
aktivieren. Alternativ empfiehlt Cloudflare den [SSL Insecure Content
Fixer](https://en-gb.wordpress.org/plugins/ssl-insecure-content-fixer/)
oder das [Really Simple
SSL](https://en-gb.wordpress.org/plugins/really-simple-ssl/)-Plugin, um
das HTTP automatisch durch HTTPS zu ersetzen.
{{</Aside>}}

___

## Verwandte Ressourcen

-   [Fehlerbehebung von Fehlern durch gemischte Inhalte in Chrome](https://developers.google.com/web/fundamentals/security/prevent-mixed-content/fixing-mixed-content)
-   [Fehlerbehebung von Fehlern durch gemischte Inhalte in Firefox](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content)
