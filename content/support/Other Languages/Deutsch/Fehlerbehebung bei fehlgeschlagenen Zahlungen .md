---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/218344877-Fehlerbehebung-bei-fehlgeschlagenen-Zahlungen
title: Fehlerbehebung bei fehlgeschlagenen Zahlungen 
---

# Fehlerbehebung bei fehlgeschlagenen Zahlungen 



## Übersicht

Unten finden Sie die häufigsten Gründe dafür, warum Transaktionen scheitern, wenn Cloudflare versucht, Ihre Zahlung zu bearbeiten. Wenn Ihre Zahlung neun (9) Tage lang scheitert, wird Ihr Konto automatisch auf einen Free Plan zurückgestuft. 

{{<Aside type="note">}}
Durch die Rückstufung auf den Free Plan wird der Betrieb Ihrer Website
nicht ausgesetzt. Allerdings gehen Ihnen alle Abonnements oder
Add-On-Dienste verloren, die mit Pro-, Business- oder Enterprise-Plänen
verbunden sind.
{{</Aside>}}

Wenn Sie Ihre Zahlungsmethode aktualisiert haben, empfehlen wir, im Cloudflare Dashboard [Ihren Tariftyp und Ihre Add-On-Dienste manuell zu aktualisieren](https://support.cloudflare.com/hc/en-us/articles/360033922371).

___

## Häufige Ursachen fehlgeschlagener Zahlungen

### Ihre Bank hat eine Sperre verhängt

Die Bank bzw. der Kartenaussteller hat eine Sperre oder vergleichbare Maßnahme verhängt, die Cloudflare daran hindert, die gespeicherte Karte zu belasten. In der E-Mail, mit der Sie über die fehlgeschlagene Zahlung informiert werden, ist der genaue Grund für die Ablehnung genannt.

Wenden Sie sich an Ihre Bank und prüfen Sie, ob Cloudflare durch irgendeine Einschränkung an der erfolgreichen Verarbeitung Ihrer Zahlung gehindert wird.

### Ihre Abrechnungsdaten sind nicht aktuell

Die bei Cloudflare gespeicherten Abrechnungsdaten sind nicht korrekt oder unvollständig. Möglicherweise ist auch die gespeicherte Kreditkarte abgelaufen.

{{<Aside type="note">}}
Geschenkkarten und Prepaid-Karten werden möglicherweise nicht als
Zahlungsmethode akzeptiert, weil sie nicht mit einer Rechnungsadresse
verknüpft sind.
{{</Aside>}}

Unter [Aktualisierung Ihrer Cloudflare-Abrechnungsdaten](https://support.cloudflare.com/hc/en-us/articles/200170236-How-do-I-update-my-billing-information-) finden Sie Hinweise zu aktuellen und korrekten Abrechnungsdaten.

### Ihr Zahlungskonto ist nicht ausreichend gedeckt

Cloudflare konnte die Zahlung nicht abbuchen, weil das gespeicherte Konto keine ausreichende Deckung aufwies. Wenden Sie sich an Ihr Finanzinstitut und sorgen Sie für ausreichende Deckung.

### Domain-Käufe bei Cloudflare Registrar

Cloudflare verarbeitet die Zahlungen für Registrar-Domainübertragungen nacheinander. Dadurch könnten Zahlungen bei Nutzern fehlschlagen, die mehrere Domains gleichzeitig kaufen. Wenn Sie beispielsweise fünf (5) Domains an einem Tag registrieren, werden bei Ihnen fünf Zahlungen abgebucht. Möglicherweise wird bei Ihrem Kreditkartenunternehmen dadurch eine Betrugswarnung ausgelöst.

Wenden Sie sich an Ihr Finanzinstitut, um sicherzustellen, dass diese Zahlung verarbeitet wird.

___

## Verwandte Themen

-   [Cloudflare-Abrechnungsrichtlinie](https://support.cloudflare.com/hc/en-us/articles/200170286)
-   [Cloudflare-Rechnungen verstehen](https://support.cloudflare.com/hc/en-us/articles/205610698)
-   [Aktualisierung Ihrer Cloudflare-Abrechnungsdaten](https://support.cloudflare.com/hc/en-us/articles/200170236)
