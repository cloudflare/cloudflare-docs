---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/115003687931-Warnung-bez%C3%BCglich-Anzeigen-Ihrer-Ursprungs-IP-Adresse-%C3%BCber-DNS-Eintr%C3%A4ge
title: Warnung bezüglich Anzeigen Ihrer Ursprungs-IP-Adresse über DNS-Einträge
---

# Warnung bezüglich Anzeigen Ihrer Ursprungs-IP-Adresse über DNS-Einträge



## Überblick

Wenn Ihre DNS-Einträge orangefarben unterlegt sind, beschleunigt und schützt Cloudflare Ihre Site.

Eine _dig_\-Anfrage für Ihre mit einer orangefarbenen Wolke markierte Root-Domain gibt eine Cloudflare-IP-Adresse zurück. Auf diese Weise bleibt die IP-Adresse Ihres Ursprungsservers der Öffentlichkeit verborgen. Beachten Sie, dass die mit einer orangefarbenen Wolke markierten Vorteile nur für HTTP-Datenverkehr gelten.

Unter bestimmten Umständen wird im Bereich **DNS-Einträge** im Cloudflare-Dashboard in der **DNS**\-App eine Warnung angezeigt, wenn mit einer grauen Wolke markierte DNS-Einträge vorliegen, die möglicherweise die IP-Adresse Ihres Ursprungsservers offen legen. Diese Warnung blockiert den für Ihre Website bestimmten Datenverkehr nicht und beeinträchtigt ihn in keiner Weise.

Wenn die IP-Adresse Ihres Servers offen gelegt wird, ist Ihr Server anfälliger für direkte Angriffe. Wenn Datenverkehr mit Proxy zu Cloudflare weitergeleitet wird, können Angreifer die IP-Adresse Ihres Ursprungsservers immer noch ermitteln (es ist aber schwieriger).

Im Folgenden finden Sie zwei Fälle, in denen möglicherweise eine IP-Expositionswarnung von Cloudflare angezeigt wird.

___

## Fall 1 DNS-Einträge, die mit einer orangefarbenen Wolke markiert sein sollten

Wenn Sie die folgende Warnung sehen:

_`Dieser Datensatz zeigt die IP-Adresse Ihres Ursprungsservers an. Um Ihre Ursprungs-IP-Adresse zu verbergen und Ihre Serversicherheit zu erhöhen, klicken Sie auf die graue Wolke, um sie in eine orangefarbene Wolke zu ändern.`_

Cloudflare empfiehlt, den Datensatz mit einer orangefarbenen Wolke zu markieren, damit jede dig-Abfrage für diesen Datensatz eine Cloudflare-IP-Adresse zurückgibt und die IP-Adresse Ihres Ursprungsservers für die Öffentlichkeit verborgen bleibt.

Um die Leistungs- und Sicherheitsvorteile von Cloudflare zu nutzen, empfehlen wir Ihnen, DNS-Einträge, die den HTTP-Verkehr verarbeiten, einschließlich A, AAAA und CNAME, mit einer orangefarbenen Wolke zu markieren.

___

## Fall 2 DNS-Einträge, die mit einer grauen Wolke markiert sein müssen

Wenn einer Ihrer _A_\-, _AAAA_\-, _CNAME_\- oder _MX_\-Eintrag mit grauer Wolke auf denselben Ursprungsserver zeigt, der Ihre Website hostet, gibt Cloudflare eine der folgenden Warnungen aus:

_`Ein A-, AAAA-, CNAME- oder MX-Eintrag verweist auf Ihren Ursprungsserver, der Ihre Ursprungs-IP-Adresse offenlegt.`_

_`Dieser Eintrag zeigt die IP-Adresse Ihres Ursprungsservers an und kann ihn möglicherweise einem Denial-of-Service-Angriff aussetzen.`_

{{<Aside type="note">}}
Cloudflare unterstützt jetzt das Proxying von Wildcard-„\*"-Einträgen
für die DNS-Verwaltung in allen Kundentarifen. Bisher war das nur im
Enterprise Plan möglich.
{{</Aside>}}

Eine _dig_\-Anfrage für diese Datensätze zeigt die IP-Adresse Ihres Ursprungsservers an. Diese Informationen erleichtern es potenziellen Angreifern, direkt auf Ihren Ursprungsserver zuzugreifen.

Es gibt jedoch Zeiten, in denen einige Ihrer DNS-Einträge mit einer grauen Wolke markiert bleiben müssen. Zum Beispiel:

-   Wenn Sie mehrere Dienste (z. B. eine Website und eine E-Mail) auf demselben physischen Server hosten müssen

Um dieses Risiko zu minimieren, empfehlen wir Ihnen Folgendes:

-   Analysieren Sie die Auswirkungen des Hostens mehrerer Dienste auf demselben Ursprungsserver in Fällen, in denen grau unterlegte DNS-Einträge nicht vermieden werden können
-   Markieren Sie alle Datensätze, die dieselbe Ursprungs-IP-Adresse wie Ihre Stammdomain haben und sicher über Cloudflare weitergeleitet werden können, mit einer orangefarbenen Wolke
