---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/115000546328-Fehlerbehebung-bei-der-Durchsatzbegrenzung-von-Cloudflare
title: Fehlerbehebung bei der Durchsatzbegrenzung von Cloudflare
---

# Fehlerbehebung bei der Durchsatzbegrenzung von Cloudflare



## Überblick

Einige häufige Konfigurationsprobleme bei der **Durchsatzbegrenzung** verhindern die korrekte Zuordnung von Anfragen:

-   **Aufnahme von HTTP- oder HTTPS-Protokollschemata in Regelmuster** (z. B. _https://example.com/\*_). Um Regeln so einzuschränken, dass sie nur für HTTP- oder HTTPS-Traffic gelten, verwenden Sie das „schemes“-Array im Anfragemuster, z. B. _"schemes": \[ "HTTPS" \]_
-   **Vergessen eines nachgestellten Schrägstrichzeichens (/)**. Die **Durchsatzbegrenzung** von Cloudflare behandelt nur Anfragen für die Homepage (z. B. _example.com_ und _example.com/_) als äquivalent, aber nicht jeden anderen Pfad (z. B. _example.com/path/_ und _example.com/path_)_._ Um Abfragepfade sowohl mit als auch ohne den abschließenden Schrägstrich abzugleichen, verwenden Sie ein Platzhaltermuster (z. B. _example.com/path\*_) 
-   **Einbindung einer Abfragezeichenfolge oder eines Ankers** (z. B. _example.com/path?foo=bar_ oder _example.com/path#section1_). Eine Regel wie _example.com/path_ gilt für Anfragen nach _example.com/path?foo=bar_.
-   **Überschreiben einer Durchsatzbegrenzung mit** [**IP-Access-Regeln**](https://support.cloudflare.com/hc/articles/217074967)**.**
-   **Einbindung einer Port-Nummer** (z. B. _example.com:8443/api/_). Das Produkt zur Durchsatzbegrenzung berücksichtigt keine Portnummern innerhalb von Regeln und dies wirkt sich auf die Regeln aus. Wenn Sie die Portnummer aus der URL entfernen, wird die Durchsatzbegrenzungsregel wie erwartet ausgelöst.

Außerdem gibt es einige häufige Fehler, die die Konfiguration der **Durchsatzbegrenzung** über die Cloudflare-API verhindern:  

-   _Dekodierung ist noch nicht implementiert (Decoding is not yet implemented)_ – Zeigt an, dass Ihrer Anfrage der Header _Content-Type: application/json_ fehlt. Nehmen Sie den Header in Ihre API-Anfrage auf, um das Problem zu beheben.
-   _Ratelimit.api.not\_entitled_ – Enterprise-Kunden müssen sich an ihr Cloudflare-Kontoteam wenden, bevor sie Regeln hinzufügen.
-   Andere Fehler werden in der [API-Dokumentation](https://api.cloudflare.com/#rate-limits-for-a-zone-errors) beschrieben. Wenn Sie sich bei einem bestimmten Fehler unsicher sind, kontaktieren Sie den [Cloudflare-Support](https://support.cloudflare.com/hc/articles/200172476) und geben Sie die fehlgeschlagene API-Anfrage an. Schwärzen Sie darin Ihren API-Schlüssel.

{{<Aside type="note">}}
Der Parameter **origin\_traffic** kann nur beim Enterprise Plan
eingestellt werden. Die Einstellung **origin\_traffic** = *false* für
eine Regel auf einer Free-, Pro- oder Enterprise-Domain wird automatisch
in **origin\_traffic** = *true* umgewandelt.
{{</Aside>}}

___

## Einschränkungen

Die Durchsatzbegrenzung dient zur Begrenzung von Traffic-Spitzen, die eine benutzerdefinierte Durchsatzrate überschreiten. Das System ist nicht so konzipiert, dass eine bestimmte Anzahl von Anfragen an den Ursprungsserver zugelassen werden kann. Zwischen der Erkennung der Anfrage und der Aktualisierung des internen Zählers kann eine Verzögerung auftreten. Aufgrund dieser Verzögerung (die bis zu einigen Sekunden betragen kann) können überschüssige Anfragen noch den Ursprung erreichen, bevor eine Aktion am Edge erzwungen wird (z. B. Blockieren oder Challenge).

___

## Verwandte Ressourcen

-   [Cloudflare-Durchsatzbegrenzung konfigurieren](https://support.cloudflare.com/hc/articles/115001635128)
