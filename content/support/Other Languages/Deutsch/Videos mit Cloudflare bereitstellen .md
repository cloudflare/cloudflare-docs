---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/360057976851-Videos-mit-Cloudflare-bereitstellen
title: Videos mit Cloudflare bereitstellen 
---

# Videos mit Cloudflare bereitstellen 



## Verwendung der Cloudflare-Dienste

Cloudflare wurde 2010 in der Überzeugung gegründet, dass jeder eine sichere, schnelle und zuverlässige Webpräsenz bekommen sollte. Wir fanden nicht, dass Sie im Fall von Cyberangriffen mehr bezahlen sollten. Also boten wir kostenlose Dienste und feste Preise für Websites an. Das funktioniert, weil die meisten Websites nicht viel Bandbreite verbrauchen und wir unsere Dienste kostengünstig für alle bereitstellen können. Das Streaming von Videoinhalten mit unserer Bandbreite verboten wir jedoch von Anfang an. Sie konnten zwar ein Video von einem anderen Anbieter einbetten, aber mit unseren Diensten keine Video-Bits über unser Netzwerk bereitstellen. Der Grund dafür ist, dass jede Sekunde eines typischen Videos so viel Bandbreite benötigt wie das Laden einer kompletten Webseite.

Mit der Zeit wurde uns klar, dass einige unserer Kunden Videos über unser Netzwerk streamen wollten. Um ihnen entgegenzukommen, haben wir unser Produkt [Stream](https://www.cloudflare.com/products/cloudflare-stream/) entwickelt. Stream bietet großartige Performance zu einem erschwinglichen Tarif, der je nach der Belastung des Netzwerks berechnet wird.

Die meisten Nutzer respektieren diese Einschränkungen. Sie verstehen, dass wir nur dank dieser Einschränkungen hohe Servicequalität für alle Cloudflare-Kunden gewährleisten können. Doch gibt es leider auch einige Nutzer, die versuchen, mit einer manipulierten Konfiguration Videos über unseren Dienst zu streamen. Das ist ein Verstoß gegen unsere Nutzungsbedingungen. Wir möchten sicherstellen, dass unser Dienst für alle Nutzer einwandfrei funktioniert, auch für die von uns betriebenen öffentlichen Initiativen, darunter das [Project Galileo](https://www.cloudflare.com/galileo/), [The Athenian Project](https://www.cloudflare.com/athenian/) und das [Projekt „Fair Shot“](https://www.cloudflare.com/fair-shot/). Wenn eine Handvoll Leute unsere Dienste missbrauchen, können wir diese Initiativen nicht richtig durchführen.

Im Folgenden finden Sie – je nachdem, warum Sie auf diese Seite gelangt sind – einige Empfehlungen zur Nutzung der Cloudflare-Dienste.

___

## Ich bin Website-Betreiber und meine Inhalte wurden aufgrund von Verstößen gegen die Nutzungsbedingungen umgeleitet

Wenn Sie einen Free-, Pro- oder Business-Tarif abonnieren und Videos oder eine unverhältnismäßige Menge an Nicht-HTML-Inhalten bereitstellen (wie Software-Binärdateien oder große Mengen an Bildern), was gegen [Abschnitt 2.8 der Self-Service-Abonnementvereinbarung](https://www.cloudflare.com/terms/) verstößt, kann Cloudflare von Ihren Inhalten zu Ersatzvideos und Ersatzbildern weiterleiten. Wenn dies geschieht, erhalten Sie eine E-Mail-Benachrichtigung mit Informationen über die Zone, die gegen die Nutzungsbedingungen verstößt. Bitte versuchen Sie nicht, die Umleitung zu umgehen; dies könnte dazu führen, dass Sie Cloudflare in Zukunft überhaupt nicht mehr nutzen können.

## Wie Web-Administratoren die Umleitungen entfernen können 

-   **Umgeleitete Inhalte über eine Subdomain mit grauer Wolke bereitstellen**
    -   Abschnitt 2.8 der Self-Service-Nutzungsbedingungen von Cloudflare verbietet es Nutzern, eine unverhältnismäßig große Menge an Nicht-HTML-Inhalten bereitzustellen (wie z. B. Bilder und Videos) – es sei denn, Sie abonnieren einen kostenpflichtigen Tarif, der diese Dienste beinhaltet. Die in Abschnitt 2.8 der Nutzungsbedingungen festgelegten Beschränkungen gelten nicht für Inhalte, die von Sub-Domains mit grauer Wolke (ohne Proxy) bereitgestellt werden. 

-   **Umgeleitete Inhalte über einen kostenpflichtigen Dienst bereitstellen, wie nachfolgend beschrieben**

## Videos über kostenpflichtige Cloudflare-Produkte bereitstellen

Cloudflare erlaubt die Bereitstellung von Videoinhalten mit bestimmten kostenpflichtigen Diensten. Wenn Sie Videoinhalte bereitstellen, empfehlen wir Ihnen die folgenden zwei Optionen. 

### Option 1: Cloudflare Stream 

[Stream](https://www.cloudflare.com/products/cloudflare-stream/) ist eine Video-on-Demand-Plattform für die Entwicklung von Videoanwendungen. Stream kodiert, speichert und liefert optimierte Videos, die für verschiedene Geräte und Netzwerkverbindungen formatiert sind. 

Wenn Sie Stream nutzen möchten, gehen Sie von Ihrem Dashboard aus auf **Stream** oder [registrieren Sie sich](https://dash.cloudflare.com/sign-up/stream). Ihre Stream-Videos sind mit keiner Domain in Ihrem Cloudflare-Konto verbunden. Sie benötigen zur Verwendung von Stream also keine Domain auf Cloudflare.

### Option 2: Stream Delivery (nur für den Enterprise Plan)

[Stream Delivery](https://www.cloudflare.com/products/stream-delivery/) bietet Caching und Bereitstellung von Videoinhalten über Cloudflare-Rechenzentren auf der ganzen Welt. Dieses CDN-Feature ist nur im Cloudflare Enterprise Plan verfügbar. Wenn Sie mehr über diese Option erfahren möchten, [kontaktieren Sie gerne den Vertrieb](https://www.cloudflare.com/products/stream-delivery/#).

___

## Ich bin Website-Besucher und anstatt der erwarteten Inhalte sehe ich eine Meldung, die auf die Cloudflare-Nutzungsbedingungen verweist

Dieses Szenario kann auftreten, wenn der Betreiber der Website gegen [Abschnitt 2.8 der Self-Service-Abonnementvereinbarung (Nutzungsbedingungen)](https://www.cloudflare.com/terms/) verstößt. Das bedeutet, dass er kein entsprechendes kostenpflichtiges Produkt erworben hat, über das er die von Ihnen angefragten Inhalte bereitstellen kann.

Wir haben den Betreiber der Website über den Verstoß informiert und ihm Möglichkeiten gezeigt, wie er die Cloudflare-Dienste angemessen nutzen kann, um die von Ihnen angefragten Inhalte bereitzustellen. Leider können wir diese Einschränkungen erst aufheben, wenn der Website-Betreiber Maßnahmen zur Abhilfe ergreift (z. B. Produkte kauft, die autorisiert sind, Videoinhalte mit dem Cloudflare-Netzwerk bereitzustellen).

Was Sie in der Zwischenzeit tun können:

1.  Bitten Sie den Website-Betreiber, die Regeln zu respektieren, die es uns überhaupt erst ermöglichen, kostengünstige Dienste anzubieten.
2.  Informieren Sie sich darüber, was Cloudflare für ein besseres Internet tut, beispielsweise durch das [Project Galileo](https://www.cloudflare.com/galileo/), [The Athenian Project](https://www.cloudflare.com/athenian/) und das [Projekt „Fair Shot“](https://www.cloudflare.com/fair-shot/).

Installieren Sie [1.1.1.1](https://1.1.1.1/) für ein sicheres Internet-Erlebnis, bei dem Ihre Daten geschützt bleiben.

___

## Ich bin Website-Betreiber und mache mir Sorgen, dass ich die Nutzungsbedingungen verletze

Wenn Sie die Tarife Free, Pro bzw. Business abonniert haben und Videos oder eine unverhältnismäßig große Menge an Nicht-HTML-Inhalten bereitstellen, verstoßen Sie möglicherweise gegen [Abschnitt 2.8 der Self-Service-Abonnementvereinbarung (Nutzungsbedingungen)](https://www.cloudflare.com/terms/). Wenn Sie Videos oder eine große Menge an Nicht-HTML-Inhalten bereitstellen möchten, empfehlen wir die Verwendung einer der oben beschriebenen kostenpflichtigen Optionen. 

## So bekommen Sie mehr Informationen zu den von Ihnen bereitgestellten Inhalten

Mit den folgenden Tools erhalten Sie weitere Informationen darüber, welche Inhalte Ihre Zone bereitstellt (z. B. den Inhaltstyp): 

-   Nutzer der Cache Analytics: Öffnen Sie in Ihrem Dashboard die **Registerkarte Caching**, filtern Sie nach Inhaltstyp und identifizieren Sie die Art des Traffics, den Sie übertragen. 
-   Nutzer ohne Cache Analytics: Öffnen Sie in Ihrem Dashboard die **Registerkarte Analytics** und wählen Sie den Abschnitt **Performance**. Dort erhalten Sie Informationen über die von Ihnen bereitgestellten Inhalte.

![Cache Analytics Identifizieren Sie die Art des übertragenen Traffics](/images/support/traffic-types.png)

## Sie haben noch Fragen? Kontaktieren Sie den Support

Wenn Sie weitere Fragen zur Umleitung haben (z. B. wenn Sie glauben, dass Ihre Inhalte fälschlicherweise umgeleitet wurden und Sie dies belegen können), reichen Sie ein [Support-Ticket](https://dash.cloudflare.com/redirect?account=support) mit den folgenden Informationen ein: 

-   Name Ihrer Domain
-   Beschreibung des Problems
-   Beschreibung der Inhalte, die Sie über das Netzwerk von Cloudflare bereitstellen
