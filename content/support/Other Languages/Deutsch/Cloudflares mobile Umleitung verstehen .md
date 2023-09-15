---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/200168336-Cloudflares-mobile-Umleitung-verstehen
title: Cloudflares mobile Umleitung verstehen 
---

# Cloudflares mobile Umleitung verstehen 



## Überblick

Mit mobiler Umleitung können Sie Besucher von Mobilgeräten automatisch auf eine für Mobilgeräte optimierte Website oder Subdomain-Homepage umleiten. Die Umleitung erfolgt am Rand des Cloudflare-Netzwerks, was die Nutzererfahrung verbessert, da ein Roundtrip zu Ihrem Server entfällt.

Sie müssen den Performance-Dienst von Cloudflare aktiviert haben ([orangefarbene Wolke](https://support.cloudflare.com/hc/articles/200169626) in den **DNS**\-Einstellungen), damit die Umleitung aktiv ist.

{{<Aside type="note">}}
Der mobile Umleitungsdienst ist für Domains, die ursprünglich über
Hosting-Partner angemeldet wurden, nicht verfügbar.  Möchten Sie
benachrichtigt werden, wenn es soweit ist?  [Lassen Sie es uns
wissen](https://support.cloudflare.com/requests/new).
{{</Aside>}}

___

## Mobile Umleitung aktivieren 

1\. Melden Sie sich bei Ihrem Cloudflare-Konto an.

2\. Klicken Sie auf das entsprechende Cloudflare-Konto für die Domain, für die Sie die mobile Umleitung aktivieren möchten.

3\. Klicken Sie auf die **Speed**\-App.

4\. Klicken Sie auf die Registerkarte **Optimierung**.

5\. Scrollen Sie nach unten zum Abschnitt **Mobil** der Registerkarte **Optimierung**.

6\. Wählen Sie aus der Dropdown-Liste die Subdomain aus, die Sie umleiten möchten.

7\. Wählen Sie **Pfad beibehalten** oder **Pfad entfernen** aus_._

{{<Aside type="note">}}
**Pfad beibehalten** leitet alle mobilen Anfragen zu derselben, aber auf
Ihrer für Mobilgeräte optimierten Website gehosteten Ressource um.
**Pfad entfernen** leitet alle mobilen Anfragen auf Ihre für Mobilgeräte
optimierte Website-Homepage um.
{{</Aside>}}

8\. Schalten Sie den Schalter auf **Ein**.

![Mobile Redirect card with a sample URL, Keep path option, and the feature toggled to ](/images/support/hc-import-speed_mobileredirect_enabled.png)

___

## Kompatible Mobilgeräte

Browser von folgenden Mobilgeräten werden auf die für Mobilgeräte optimierte Subdomain umgeleitet:

-   iPhone
-   Android
-   iPod
-   Blackberry
-   Palm
-   Mobilgeräte
-   Windows CE
-   Opera mini
-   AvantGo
-   Docomo

{{<Aside type="note">}}
Die User Agents von iPad und Android-Tablet passen nicht und lösen
deshalb die mobile Umleitungsfunktion nicht aus.
{{</Aside>}}

___

## Gesamtansicht der Website zulassen

Damit Ihre Endbenutzer die vollständige Website auf dem Mobilgerät angezeigt bekommen, müssen Sie auf Ihrem Ursprungsserver den Wert des folgenden Cookies _nur für die Root-Domain_ auf 0 (Null) setzen:

`__cf_mob_redir = 0; domain=.example.com`

Ersetzen Sie in diesem Beispiel .example.com durch Ihre Root-Domain.

Um die mobile Umleitung zu erneuern, löschen Sie das Cookie oder setzen Sie es so, dass es nach der von Ihnen gewählten Dauer abläuft.

___

## Relevante Themen

-   [Subdomains identifizieren, die mit dem Cloudflare-Proxy kompatibel sind](https://support.cloudflare.com/hc/articles/200169626)
