---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/115002911927-Caching-von-HTML-mit-Drupal
title: Caching von HTML mit Drupal 
---

# Caching von HTML mit Drupal 

{{<Aside type="note">}}
Kunden mit allen Cloudflare-Tarifen können HTML-Dateien mit Cloudflare
**Page Rules** zwischenspeichern. Jedoch können nur Kunden der Business
und Enterprise Plans das HTML-Caching umgehen, wenn ein Cookie gesendet
wird, indem Sie die Einstellung *Bypass Cache on Cookie* mit
Cloudflare **Page Rules** vornehmen.
{{</Aside>}}

## Browser-Cache-TTL aktivieren

Um Browser-Cache-Kollisionen zu vermeiden, müssen Sie zuerst Bypass Cache on Cookie im Cloudflare-Dashboard aktivieren. Führen Sie hierfür folgende Schritte durch:

1\. Melden Sie sich bei Ihrem Cloudflare-Konto an.

2\. Klicken Sie auf die **Caching**\-App.

3\. Scrollen Sie nach unten zu **Browser-Cache-TTL** und wählen Sie **Vorhandene Header respektieren** aus.

Jetzt können Sie die Einstellung von _Bypass Cache on Cookie_ mithilfe von Cloudflare **Page Rules** konfigurieren. 

___

## Bypass Cache on Cookie konfigurieren

Wenn die Page Rule _Bypass Cache on Cookie_ den von uns festgelegten Kriterien entspricht, speichert Cloudflare statische Bilder und andere Dateien zwischen, ohne HTML zwischenzuspeichern. Um _Bypass Cache on Cookie_ mit **Page Rules** zu konfigurieren: 

1\. Melden Sie sich bei Ihrem Cloudflare-Konto an.

2\. Klicken Sie auf die **Page Rules**\-App.

Klicken Sie auf die Schaltfläche **Page Rule erstellen** und geben Sie Ihre Domain ein. Im folgenden Beispiel lautet die Domain www.orangeclouded.com. 

4\. Konfigurieren Sie die Einstellungen für Page Rules wie folgt:

-   Verwenden Sie den _\*_ Platzhalteroperator im Drupal-Installationspfad, um die gesamte Domain abzugleichen.
-   Stellen Sie dann den Cache-Level auf „Alles zwischenspeichern“ ein.
-   Stellen Sie als nächstes die Regel _Bypass Cache on Cookie_ für die Drupal-Variablen ein. Diese Regel setzt die Regel _Alles zwischenspeichern_ außer Kraft, wenn ein Benutzer bei Drupal angemeldet ist.
-   Legen Sie abschließend die _Edge-Cache-TTL_\-Einstellung fest, um zu bestimmen, wie lange ein Cloudflare Cache-Server zwischengespeicherte Dateien speichern soll.

Wenn Sie auf Ihrer Drupal-Website zusätzliche Cookies verwenden, müssen Sie sicherstellen, dass diese in der Regex-Anweisung enthalten sind: : _SESS.\*|phpsessid=.\*_

![page_rules_caching_static_HTML_with_drupal.png](/images/support/page_rules_caching_static_HTML_with_drupal.png)

Wenn Cloudflare jetzt zwischengespeicherte Dateien bereitstellt, wird ein _CF-Cache-Status: HIT_\-Header an den Browser zurückgesendet.

___

## Verwandte Ressourcen

-   [Das Cloudflare-CDN verstehen](https://support.cloudflare.com/hc/articles/200172516)
