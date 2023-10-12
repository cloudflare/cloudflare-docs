---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/236168808-Caching-von-statischem-HTML-mit-Magento-nur-Business-und-Enterprise-
title: Caching von statischem HTML mit Magento (nur Business und Enterprise) 
---

# Caching von statischem HTML mit Magento (nur Business und Enterprise) 

{{<Aside type="note">}}
Alle Cloudflare-Kunden können das Zwischenspeichern von HTML-Dateien
konfigurieren. Jedoch können nur Kunden der Business und Enterprise
Plans das HTML-Caching umgehen, wenn ein Cookie gesendet wird, indem sie
die Einstellung Bypass Cache on Cookie mit Cloudflare  **Page Rules**
vornehmen.
{{</Aside>}}

## Überblick

Business- und Enterprise-Kunden, die Magento verwenden, können anonyme Seitenaufrufe mit unserer Page Rule _Bypass Cache on Cookie_ zwischenspeichern. Diese Einstellung speichert statisches HTML an der Cloudflare-Edge zwischen, ohne es von Anfrage zu Anfrage neu erstellt werden muss.

Bevor Sie sich beim Magento-Administrationsbereich anmelden oder etwas in einen Warenkorb legen, wird der Seitenaufruf anonymisiert und es ist möglich, die Anfragen zwischenzuspeichern, damit Magento den HTML-Code auf Ihrem Ursprungsserver nicht ständig neu generieren muss.

___

## Caching von statischem HTML mit Cloudflare Page Rules

Gehen Sie folgendermaßen vor, um statisches HTML mit Cloudflare **Page Rules** zwischenzuspeichern:

1\. Melden Sie sich bei Ihrem Cloudflare-Konto an.

2\. Klicken Sie auf die **Caching**\-App.

3\. Scrollen Sie nach unten zur Option **Browser-Cache-TTL** und wählen Sie **Vorhandene Header** respektieren aus.

Mit dieser Einstellung können Sie die erforderlichen Page Rules festlegen, um anonymisierte Seitenaufrufe zwischenzuspeichern.

4\. Gehe zu **Rules** > **Page Rules**.

5\. Klicken Sie auf die Schaltfläche **Page Rule erstellen** und geben Sie Ihre Domain ein. Im folgenden Beispiel lautet die Domain www.orangeclouded.com.

-   _Alles zwischenspeichern_ weist Cloudflare an, statisches HTML zwischenzuspeichern.
-   Wenn die Regel _Bypass Cache on Cookie_ den von uns festgelegten Kriterien entspricht, speichert Cloudflare kein HTML zwischen ([statische Bilder und andere Dateien werden jedoch weiterhin zwischengespeichert](https://support.cloudflare.com/hc/en-us/articles/200172516-Which-file-extensions-does-CloudFlare-cache-for-static-content-)). Je nachdem, ob Sie Magento 1 oder Magento 2 verwenden, benötigen Sie eine andere Regel:

`Magento 1    external_no_cache=.*|PHPSESSID=.*|adminhtml=.* Magento 2 admin=.*|PHPSESSID=.*|private_content_version=.*`

-   Schließlich definiert die Einstellung _Edge-Cache-TTL_ die maximale Zeitspanne, für die Cloudflare die zwischengespeicherten Dateien aufbewahren soll, bevor sie vom Ursprung abgerufen werden. Selbst wenn Sie eine lange Edge-Cache-TTL-Zeit festgelegt haben, können Sie den Cache vor Ablauf dieser Zeitspanne noch manuell löschen.

![The Create a Page Rule dialog with settings to instruct Cloudflare to cache static HTML, the Bypass Cache on cookie rule instructing Cloudflare not to cache HTML while static images and other files are still cached, and the Edge Cache TTL set to a month.](/images/support/hc-import-page_rules_caching_static_html_with_magento.png)

6\. Klicken Sie auf **Speichern und bereitstellen**.

{{<Aside type="note">}}
Cloudflares Enterprise-Kunden können Custom Cache Keys verwenden, um
ihre Performance weiter zu verbessern. Wenden Sie sich an den für Sie
zuständigen Customer Success Manager, um weitere Informationen zu
erhalten.
{{</Aside>}}

___

## Fehlerbehebung bei Magento 1.8.x oder 1.9.x.

Wenn Sie **Bypass Cache on Cookie** auf einer Magento 1.8.x- oder 1.9.x-Site einrichten, stellen Sie möglicherweise fest, dass die Funktion „In den Warenkorb“ beim ersten Versuch eines Benutzers, einen Artikel in einen Warenkorb zu legen, nicht funktioniert.

Mit Magento 1.8.x und 1.9.x wurden [Cross Site Request Forgery Checks](https://www.section.io/blog/csrf-and-caching/) (CSRF) für alle Magento-Formulare eingeführt. Da hierfür Cookies verwendet werden, können anonyme Caching-Mechanismen Probleme verursachen. Es gibt drei Möglichkeiten, um dieses Problem zu beheben. Wir haben die Optionen basierend auf ihrer Sicherheitsstufe unten aufgeführt.

1\. Am wenigsten sicher: Die Konfiguration unter _System -> Konfiguration -> System -> CSRF-Schutz -> Geheimen Schlüssel zur Url hinzufügen_ ist standardmäßig auf _Ja_ gesetzt. Wenn Sie diese Einstellung auf _Nein_ setzen, wird der CSRF-Sicherheitsschutz auf Ihrem gesamten Magento-Frontend deaktiviert. Sie sollten diese Option nur dann verwenden, wenn Sie einen separaten Mechanismus für den CSRF-Schutz auf Ihrer Website aktiviert haben Wir empfehlen diesen Ansatz nicht. Bitte beachten Sie, dass es eine ähnlich benannte Konfiguration für das Admin-Panel unter _System -> ADMIN -> System -> CSRF-Schutz -> Geheimen Schlüssel zur Url hinzufügen_ gibt; diese Konfiguration sollte auf „Ja“ bleiben und **nicht verändert** werden. Diese Konfiguration bietet Sicherheit für Ihren Admin-Endpunkt, weshalb besondere Vorsicht geboten ist.

2\. Etwas sicherer: Es gibt ein Magento-Community-Modul, mit dem Benutzer die CSRF-Überprüfungen nur im „In den Warenkorb“-Formular deaktivieren können, wo das Sicherheitsrisiko weniger hoch ist. Das Plugin [Inovarti\_FixAddToCartMage18](https://github.com/deivisonarthur/Inovarti_FixAddToCartMage18/blob/master/README.md) tut dies, indem es die „Add to Cart“-Funktionalität des CSRF-Schutzes auf eine Whitelist setzt. 

3\. Am sichersten: Die beste Alternative ist die Verwendung von AJAX, um den Wert des CSRF-Tokens auf Ihrer Magento-Site dynamisch auszufüllen. Wenn ein Benutzer auf die Schaltfläche klickt, um etwas zu seinem Warenkorb hinzuzufügen, springt JavaScript ein, um das CSRF-Token in den Formularen entsprechend der Sitzung des Benutzers zu aktualisieren. Dadurch kann der größte Teil der Seite aus dem Cache bereitgestellt werden, aber es ist immer noch eine Anfrage an den Ursprung erforderlich, um das Token abzurufen.

Dieser letzte AJAX-Mechanismus ist in einem Plugin namens [Magento Terpentine-Erweiterung](https://github.com/nexcess/magento-turpentine) implementiert. Dieses Plugin wurde ursprünglich für das Caching mit Varnish entwickelt, kann aber auch mit Cloudflare verwendet werden.

Es gibt verschiedene Möglichkeiten, es zu installieren:

-   Laden Sie das Tarball-Paket von der Download-Seite auf GitHub herunter und (beachten Sie, dass dies nicht die Schaltfläche „Als tar.gz herunterladen“ ist) und installieren Sie es über Magento Connect Downloader oder Magentos _mage_ Befehl.
-   Installieren Sie durch  mit der Erweiterungstaste: `http://connect20.magentocommerce.com/community/Nexcessnet_Turpentine`
-   Installieren mit . Verwenden Sie einfach: `modman clone https://github.com/nexcess/magento-turpentine.git`

Nachdem Sie das Plugin installiert haben, navigieren Sie zu _System -> Konfiguration -> TURPENTINE -> Varnish-Optionen_, suchen Sie die Option „Use VCL fix“, setzen Sie sie auf „Disable“ und speichern Sie.

![Use VCL fix option set to Disable.](/images/support/hc-import-use_vcl_fix_magento_cache_static_html.png)

___

## Verwandte Ressourcen

-   [Das Cloudflare-CDN verstehen](https://support.cloudflare.com/hc/en-us/articles/200172516)
