---
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/200170196--Reaktion-auf-DDoS-Angriffe
title: Reaktion auf DDoS-Angriffe 
---

# Reaktion auf DDoS-Angriffe 



## Übersicht

Cloudflares Netzwerk bekämpft sehr große [DDoS-Angriffe](https://www.cloudflare.com/ddos) automatisch. Durch Zwischenspeichern Ihrer Inhalte bei Cloudflare schützen Sie außerdem Ihre Website gegen kleine DDoS-Angriffe. Für Ressourcen, die nicht zwischengespeichert werden, sind eventuell zusätzliche manuelle Eingriffe nötig, die in dieser Anleitung aufgeführt sind.

___

## Schritt 1: Aktivierung des **„Under Attack“-Modus**

Zur Aktivierung des **[„Under Attack“-Modus](https://support.cloudflare.com/hc/articles/200170076)**:

1.  Melden Sie sich bei Ihrem Cloudflare-Konto an.
2.  Wählen Sie die Domain, die gerade angegriffen wird.
3.  Schalten Sie den **„Under Attack“-Modus** im Abschnitt **Schnelle Maßnahmen** von Cloudflares **Übersicht**\-App auf _Ein_.
4.  \[Optional\] Stellen Sie das **[Challenge-Zeitfenster](https://support.cloudflare.com/hc/articles/200170136)** in der Registerkarte **Einstellungen** der **Firewall**\-App ein.

___

## Schritt 2: Aktivierung der **Web Application Firewall** (WAF)

Aktivieren Sie die Cloudflare [WAF](https://support.cloudflare.com/hc/en-us/articles/200172016-What-does-the-Web-Application-Firewall-WAF-do-) wie folgt:

1.  Melden Sie sich bei Ihrem Cloudflare-Konto an.
2.  Wählen Sie die Domain, für die zusätzlicher Schutz nötig ist.
3.  Stellen Sie **Web Application Firewall** in der Registerkarte **Verwaltete Regeln** der **Firewall**\-App auf _Ein_.

___

## Schritt 3: Challenge oder Blockierung von Datenverkehr über die **Firewall**\-App

Cloudflares **Firewall**\-App erleichtert das Blockieren von Datenverkehr anhand der folgenden Methoden:

**[IP Access Rules](https://support.cloudflare.com/hc/articles/217074967)** werden empfohlen, um mehrere IP-Adressen, /16- oder /24-IP-Bereiche oder AS-Nummern (ASNs) zu blockieren.   
**[Firewall Rules](https://developers.cloudflare.com/firewall/cf-dashboard/create-edit-delete-rules/)** werden empfohlen, um ein Land, einen gültigen IP-Bereich oder komplexere Angriffsmuster zu blockieren.  
**[Zone Lockdown](https://support.cloudflare.com/hc/en-us/articles/115001595131-How-do-I-Lockdown-URLs-in-Cloudflare-)** wird empfohlen, um nur vertrauenswürdige IP-Adressen oder -Bereiche auf einen Teil Ihrer Website zu lassen.  
**[User Agent Blocking](https://support.cloudflare.com/hc/en-us/articles/115001856951-How-do-I-block-malicious-User-Agents-with-Cloudflare-)** wird empfohlen, um verdächtige [User-Agent-Header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent) für Ihre gesamte Domain zu blockieren.

Überprüfen Sie Ihre Protokolldateien, um zu entscheiden, welches Land oder welche IPs blockiert oder mit einer Challenge konfrontiert werden sollen. Wenden Sie sich an Ihren Hosting-Provider, um Folgendes identifizieren zu können:

-   den Angriffs-Traffic, der Ihren Ursprungswebserver erreicht,
-   die Ressourcen, auf die bei dem Angriff zugegriffen wird, und
-   allgemeine Merkmale des Angriffs (IP-Adressen, User-Agents, Länder oder ASNs usw.)

___

## Schritt 4: Kontaktaufnahme mit dem Cloudflare-Support

Wenn Sie mit den oben aufgeführten Schritten nicht verhindern können, dass Ihr Ursprungswebserver durch einen Angriff überlastet wird, kontaktieren Sie bitte den [Cloudflare-Support](https://support.cloudflare.com/hc/articles/200172476#h_4b8753c8-f422-4c74-9e8e-07026c4da730).

___

## Verwandte Ressourcen

-   [Cloudflares DDoS-Schutz](https://support.cloudflare.com/hc/articles/200172676)
-   [Bewährte Vorgehensweisen: DDoS-Vorbeugemaßnahmen](https://support.cloudflare.com/hc/articles/200170166)
-   [Was bewirkt der „I’m Under Attack“-Modus?](https://support.cloudflare.com/entries/22053133)
-   [Einsatz von Cloudflare-Protokollen zur Untersuchung von DDoS-Datenverkehr (nur Enterprise)](https://support.cloudflare.com/hc/en-us/articles/360020739772-Using-Cloudflare-Logs-ELS-to-Investigate-DDoS-Traffic-Enterprise-Only-)
-   [Meldung eines DDoS-Angriffs bei den Behörden](https://www.icann.org/news/blog/how-to-report-a-ddos-attack)
