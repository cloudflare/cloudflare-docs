---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/236166048-Caching-von-statischem-HTML-mit-WordPress-WooCommerce
title: Caching von statischem HTML mit WordPressWooCommerce 
---

# Caching von statischem HTML mit WordPress/WooCommerce 



## Überblick

{{<Aside type="note">}}
Kunden aller Cloudflare-Tarife können das Caching von HTML-Dateien
konfigurieren. Jedoch können Business- und Enterprise-Kunden das
HTML-Caching umgehen, wenn ein Cookie gesendet wird, indem Sie die
Einstellung *Bypass Cache on Cookie* mit Cloudflare **Page Rules**
vornehmen.** **
{{</Aside>}}

Dadurch kann statisches HTML an unserem Edge zwischengespeichert werden, ohne dass es von Anfrage zu Anfrage neu erstellt werden muss. 

Cloudflare-Kunden mit Enterprise Plan können _Custom Cache Keys_ verwenden, um ihre Performance weiter zu verbessern. Wenden Sie sich an den für Sie zuständigen Customer Success Manager, um weitere Informationen zu erhalten.

___

## Voraussetzungen

Vor dem Start: Stellen Sie sicher, dass Cloudflare die _Cache-Control_\-Header von Ihrem Ursprungswebserver berücksichtigt. Andernfalls stellen Sie möglicherweise fest, dass _Cache-Control_\-Header von Cloudflare mit dem in der Option **Browser-Cache-TTL** festgelegten Wert überschrieben werden. Um die Option _Vorhandene Header respektieren_ einzustellen:

1\. Melden Sie sich bei Ihrem Cloudflare-Konto an.

2\. Klicken Sie auf die **Caching**\-App.

3\. Scrollen Sie nach unten zu **Browser-Cache-TTL** und wählen Sie den Wert _Vorhandene Header respektieren_ aus.

___

## Caching von statischem HTML mit Cloudflare Page Rules

1\. Melden Sie sich bei Ihrem Cloudflare-Konto an.

2\. Klicken Sie als Nächstes auf **Page Rule erstellen**, um statisches HTML-Caching auf unserer Website einzurichten.

3\. Passen Sie die Page Rule an Ihren WordPress-Installationspfad an. Wenn sich Ihre Website unter https://www.example.com befindet, wäre die Regel [https://www.example.com.](https://www.example.com./)

-   In dem Beispiel hier läuft WordPress auf https://junade.com. Daher sollte die Page Rule mit https://junade.com/\* übereinstimmen.

![Screen_Shot_2017-03-09_at_16.54.36.png](/images/support/Screen_Shot_2017-03-09_at_16.54.36.png)

4\. Legen Sie zusätzliche Page Rules fest, um statisches HTML zwischenzuspeichern:

-   _Alles zwischenspeichern_ weist Cloudflare an, statisches HTML zwischenzuspeichern.
-   Wenn die Regel _Bypass Cache on Cookie_ den von ihnen festgelegten Kriterien entspricht, speichert Cloudflare kein HTML zwischen ([statische Bilder und andere Dateien werden jedoch weiterhin zwischengespeichert](https://support.cloudflare.com/hc/en-us/articles/200172516-Which-file-extensions-does-CloudFlare-cache-for-static-content-)). Je nachdem, ob Sie reines WordPress oder WooCommerce verwenden, sollten Sie eine der folgenden Konfigurationen nutzen:

<table><tbody><tr><td>WordPress (native)</td><td>wp-.*|wordpress.*|comment_.*</td></tr><tr><td>WordPress mit WooCommerce &nbsp; &nbsp;</td><td>wp-.*|wordpress.*|comment_.*|woocommerce_.*</td></tr></tbody></table>

-   Schließlich definiert die Einstellung _Edge-Cache-TTL_ die maximale Zeitspanne, für die Cloudflare die zwischengespeicherte Dateien aufbewahren soll, bevor sie vom Ursprungswebserver abgerufen werden. Selbst wenn Sie eine lange Edge-Cache-TTL-Zeit festgelegt haben, können Sie den Cache [noch manuell löschen](https://support.cloudflare.com/hc/en-us/articles/200169246-How-do-I-purge-my-cache-) oder unser WordPress-Plugin verwenden, um die Cache-Bereinigung automatisch zu verwalten.

5\. Klicken Sie zum Abschluss auf **Speichern und bereitstellen**. 

Mithilfe des Features [_Automatic Cache Management_ (Automatische Cache-Verwaltung) des Cloudflare WordPress-Plugins](https://support.cloudflare.com/hc/en-us/articles/115002708027-What-does-Automatic-Cache-Management-in-the-Cloudflare-Plugin-do-) können Sie außerdem den Cache für Ihre Website automatisch löschen, wenn sich Ihre Site ändert (d. h. wenn Sie das Design ändern/anpassen oder einen Beitrag, eine Anlage oder Seite bearbeiten, löschen oder erstellen).
