---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/230054288-Richtlinie-zum-Kunden-St%C3%B6rfallmanagement
title: Richtlinie zum Kunden-Störfallmanagement 
---

# Richtlinie zum Kunden-Störfallmanagement 



## Ziel

Cloudflare ist überzeugt, dass Offenheit und Transparenz integraler Bestandteil seiner Dienstleistung ist, und entschlossen, sich das Vertrauen seiner Kunden und der gesamten Internet-Community zu verdienen.  Cloudflare betreibt ein globales Netzwerk, das das Leben und Wohlergehen Hunderter Millionen Menschen beeinflusst, und mit dieser Verantwortung gehen wir höchst achtsam um.

In dieser Standard Operating Procedure (Standardbetriebsanweisung, SOP) ist definiert, wie Cloudflare mit allen Störfällen und Problemen umgeht, die seine Produktionsumgebung beeinträchtigen, sowie die Art und Weise, wie Cloudflare die Natur und Auswirkung dieser Vorfälle an Enterprise-Kunden kommuniziert. Dies gilt für planmäßige ebenso wie für ungeplante Fälle und unabhängig von ihrem Schweregrad.  In dieser Anweisung wird eine einheitliche Vorgehensweise spezifiziert, um

-   die Verfügbarkeit der Umgebung zu maximieren,
-   die Beeinträchtigungen für Kunden zu minimieren,
-   die Zeit bis zur Behebung zu reduzieren und
-   Informationen an unsere Kunden und die Internet-Community weiterzugeben.

___

## Geltungsbereich

Diese SOP gilt für Cloudflare-Kunden und kundenorientierte Dienste, soweit sie von Kunden in Anspruch genommen werden. Die SOP gilt für alle Kunden-Produktionsumgebungen bei Cloudflare, einschließlich:

-   die öffentliche Cloudflare-Website ([www.cloudflare.com](http://www.cloudflare.com/))
-   die Cloudflare-APIs (Application Programming Interfaces, Programmierschnittstellen)
-   Ausgehende Schnittstellen von Drittanbietern (z. B. Kreditkartenautorisierung usw.)
-   Netzwerkinfrastruktur für Produktionsdienste im Besitz von Cloudflare oder solche, die von Cloudflare verwaltet wird
-   Software, Hardware und Dienste anderer Lieferanten, die sich auf irgendeinen Bestandteil der Cloudflare-Produktion auswirken

___

## Hintergrund

Cloudflare möchte ein besseres Internet schaffen. Damit Cloudflare Millionen von Internetnutzern bessere Erfahrungen bieten kann, müssen seine internen Vorgänge exzellenten Lieferprozessen und Verfahren folgen.  Aus diesem Grund beruhen die Verfahren bei Cloudflare auf vielen anerkannten, bewährten Branchenmethoden. Einige dieser Methoden orientieren sich genau an bestimmten Mustern der Information Library Infrastructure Technology (ITIL).  Diese SOP orientiert sich an den bewährten Vorgehensweisen der ITIL-Problemmanagementmethodik.

___

## Definitionen

Kategorien für wichtige Störfallbegriffe:  Alle Ereignisse sind Zustände, die Benachrichtigungen auslösen können; manche Benachrichtigungen sind Störfälle, die von Bedeutung sind (und manche nicht); für alle Störfälle muss eine Triage stattfinden (manchmal durch Automation, manchmal durch menschlichen Eingriff); manche Störfälle sind Probleme; manche Störfälle sind „bedeutend“ und führen zur Aktualisierung von Statusseiten; manche bedeutenden Vorfälle haben hohe Priorität (P1) und erfordern deshalb die Erstellung einer Störfallmeldung.

Wichtige Terminologie:

<table><tbody><tr><td><p><strong>Begriff</strong></p></td><td><p><strong>Definition</strong></p></td></tr><tr><td><p><span>Ereignis</span></p></td><td><p><span>Jede identifizierbare, diskrete Sache, die von einer Cloudflare-Produktionsanwendung oder den Cloudflare-Systemen protokolliert werden kann</span></p></td></tr><tr><td><p><span>Benachrichtigung</span></p></td><td><p><span>Ein potenziell interessantes Ereignis, das über eines der Cloudflare-Überwachungssysteme identifiziert und kommuniziert wird</span></p></td></tr><tr><td><p><span>Störfall</span></p></td><td><p><span>Eine Meldung oder Benachrichtigung, die sich mit hoher Wahrscheinlichkeit auf die Cloudflare-Produktionssysteme auswirkt, oder eine Benachrichtigungsbedingung, die nur für kurze Zeit existiert, weil der betroffene Dienst wieder in einen fehlerfreien Zustand versetzt wurde, bevor ein Problemzustand identifiziert wurde</span></p></td></tr><tr><td><p><span>Problem</span></p></td><td><p><span>Ein identifizierter und kategorisierter Störfall, der sich negativ auf den Optimalzustand und/oder die Performance der Cloudflare-Produktionssysteme oder -Anwendungen auswirkt</span></p></td></tr><tr><td><p><span>Störfallmeldung</span></p></td><td><p><span>Eine öffentliche Meldung, die die Natur eines Dienstproblems, Cloudflares Gesamtlösung für das Problem und Bemühungen zur Verminderung oder Eliminierung seiner zukünftigen Auswirkungen beschreibt</span></p></td></tr><tr><td><p><span>Post Mortem Review</span></p></td><td><p><span>Ein Review-Meeting, das als Reaktion auf ein schwerwiegendes bzw. kritisches Problem veranlasst wird. &nbsp;Alle Post-Mortem-Meetings befassen sich mit den Details einer Störfallmeldung, die von einem Cloudflare-Techniker mit den nötigen Kenntnissen oder Erfahrungen für den Umgang mit einem Problem dieser Art erstellt wurde.</span></p></td></tr><tr><td><p><span>SRE</span></p></td><td><p><span>Die Systems Reliability Engineers sind für den First-Level-Support bei allen Störfällen zuständig</span></p></td></tr><tr><td><p><span>CSUP</span></p></td><td><p><span>Die Customer Support Group ist das zuständige Team für die Beantwortung aller Kundenanfragen und sämtliche Kundenkommunikation im Zusammenhang mit einem identifizierten Problem.</span></p></td></tr><tr><td><p><span>JIRA</span></p></td><td><p><span>Das von Cloudflare genutzte Ticketsystem zur Verfolgung von Störfällen, Arbeitsaufträgen und Problemen</span></p></td></tr><tr><td><p><span>Schweregrad / Prioritätsstufe</span></p></td><td><p><span>Einer der Werte „P0, P1, P2 oder P3“, je nach dem Schweregrad des Problems bzw. der Auswirkung auf das Cloudflare-Netzwerk und die Kunden</span></p></td></tr><tr><td><p><span>SLA</span></p></td><td><p><span>Service Level Agreement&nbsp;– interne oder vertragliche Verpflichtung zu einer bestimmten Servicestufe (in der Regel gemessen in Aktionen pro Zeiteinheit)</span></p></td></tr><tr><td><p><span>SLO</span></p></td><td><p><span>Service Level Objective&nbsp;– internes oder vertragliches Ziel einer bestimmten Servicestufe (in der Regel gemessen in Aktionen pro Zeiteinheit)</span></p></td></tr><tr><td><p><span>Incident&nbsp;Commander</span></p></td><td><p><span>Cloudflare-Ressource, die dafür zuständig ist, dass das Problem ordnungsgemäß bearbeitet, Zeitvorgaben eingehalten, Eskalationen durchgeführt, Kunden auf dem Laufenden gehalten und Ressourcen nach Bedarf einbezogen werden</span></p></td></tr><tr><td><p><span>Die Internet-Community</span></p></td><td><p><span>Die wichtigste Gruppe von Stakeholdern für Cloudflare. &nbsp;Cloudflare sichert und optimiert mehr als 4.600.000&nbsp;Websites, und der durchschnittliche Internetnutzer interagiert über 500&nbsp;Mal pro Woche mit Cloudflare-Websites.</span></p></td></tr><tr><td><p><span>Drittanbieter (Third Party)</span></p></td><td><p><span>Lieferant oder Serviceanbieter außerhalb von Cloudflare, der in Partnerschaft mit Cloudflare Systeme oder Dienstleistungen für Kunden bereitstellt</span></p></td></tr><tr><td><p><span>Stakeholder</span></p></td><td><p><span>Person, Gruppe oder Unternehmen, die von einem Störfall entweder als Provider (z.&nbsp;B. Cloudflare-Vertreter, Drittanbieter) oder Verbraucher (Kunde) betroffen ist</span></p></td></tr><tr><td><p><span>RCA</span></p></td><td><p><span>Root Cause Analysis&nbsp;– Gründliche Überprüfung der eigentlichen Ursache eines Problems</span></p></td></tr><tr><td><p><span>Mängelbeseitigung</span></p></td><td><p><span>Alle notwendigen Schritte zur Behebung der Grundursache eines Problems und um sicherzustellen, dass es nicht wieder auftritt</span></p></td></tr><tr><td><p><span>Statusseite</span></p></td><td><p><span>Das wichtigste Werkzeug, über das Cloudflare Informationen über die Bereitstellung seiner Dienste und über alle Störfälle oder Probleme veröffentlicht, die sich auf Cloudflare-Dienste auswirken: </span><a href="https://www.cloudflarestatus.com/"><span>https://www.cloudflarestatus.com</span></a></p><p><span>Die Statusseite wird von einem Drittanbieter (</span><a href="http://statuspage.io/"><span>Statuspage.io</span></a><span>) gehostet, der unabhängig von Cloudflare-Diensten arbeitet.</span></p></td></tr></tbody></table>

___

## Rollen und Zuständigkeiten 

## Beim Umgang mit Störfällen gibt es bei Cloudflare folgende Rollen und Zuständigkeiten: 

<table><tbody><tr><td><p><strong>Rolle</strong></p></td><td><p><strong>Zuständigkeiten</strong></p></td></tr><tr><td><p><span>Cloudflare-Management</span></p></td><td>Überprüfung und Genehmigung von Verfahren.<br>Sicherstellen, dass alle Mitarbeiter für die Verfahren ausgebildet werden.<br>Benachrichtigung von Kunden und Drittanbietern über ihre Rolle innerhalb von Verfahren, soweit erforderlich.<br>Veranlassung und Leitung von Post Mortem Reviews für kritische Störfallmeldungen.</td></tr><tr><td><p><span>Bereitschafts-SRE</span></p></td><td>Ein oder mehrere SREs, die in Schichten Bereitschaftsdienst haben und auf alle kritischen Benachrichtigungen reagieren.<br><span>Identifizieren eines Störfalls und Reaktion darauf, Bewertung und Klassifizierung des Schweregrads eines Störfalls und potenzielle Eskalation eines Störfalls, der eine Beeinträchtigung darstellt, als Problem.</span><br>Maßnahmen entsprechend der Eskalation und Administration der Angelegenheit von Anfang bis Ende.</td></tr><tr><td><p><span>Bereitschafts-Netzwerktechniker</span></p></td><td>Ein oder mehrere Netzwerktechniker, die in Schichten Bereitschaftsdienst haben und auf kritische Benachrichtigungen reagieren.<br>Arbeitet koordiniert mit dem SRE-Team zusammen, das bei allen identifizierten Problemen den primären Störfallmanager stellt.</td></tr><tr><td><p><span>Bereitschafts-CSUP</span></p></td><td>Ein oder mehrere CSUP-Techniker (Kundenbetreuer), die in Schichten arbeiten und alle Kundenanfragen beantworten.<br>Zuständig für sämtliche Kundenkommunikation bei allen identifizierten Problemen.<br>Zuständig für die Kommunikation in Verbindung mit allen planmäßigen Wartungsarbeiten.</td></tr><tr><td><p><span>SRE-Team</span></p></td><td>Das gesamte Systems Reliability Engineering Team, das die Arbeit der Bereitschafts-SREs unterstützt.<br>Übernahme der Rolle eines Störfallmanagers während der Dauer eines identifizierten Problems.<br>Umsetzung geeigneter, von Cloudflare unterstützter Produktionsänderungen zur Behebung von Problemlagen.</td></tr><tr><td><p><span>Cloudflare-Technikteams</span></p><p><span>(DBA, Netzwerk, nginx, Sicherheit usw.)</span></p></td><td>Unterstützen den Störfallmanager während der Problembehebung.<br>Nehmen auf Anfrage an Konferenzschaltungen teil.<br>Sorgen dafür, dass die Dokumentation während der Diagnose erfasst wird und dass die Fehlerbehebung und ordnungsgemäße Eskalation an andere zuständige Gruppen stattfindet.<br>Nehmen an Post Mortem Reviews für manche Störfallmeldungen teil, soweit vom Cloudflare-Management angefordert.</td></tr></tbody></table>

___

## Standard Operating Procedure

In diesem Abschnitt werden die Verfahren für das Störfall- und Problemmanagement im Detail beschrieben.  Diese Prozesse hängen übergeordnet so zusammen:

-   Störfallmanagement:  Der Gesamtprozess zur Überwachung und Reaktion auf Benachrichtigungen, einschließlich: Bewertung der möglichen Auswirkungen und des Schweregrads eines Störfalls, Klassifizierung des Störfalls als Problem, Priorisierung des Problems, oder aber Verwerfen des Störfalls als Ereignis ohne Auswirkungen, wenn kein Problemzustand identifiziert werden kann.

-   Problemmanagement:  Der Prozess der Klärung des Umfangs und der Ausdehnung eines Problems, Zuweisung eines entsprechenden Schweregrads (P0, P1, P2 oder P3), die Maßnahmen zur Behebung des Problems und die Wiederherstellung des optimalen Zustands für Produktionsdienste sowie die Kommunikation des Problems an entsprechende Beteiligte.

-   Lösungsmanagement:  Der Prozess, bei dem die Ursachen und Bedingungen untersucht werden, die zu einem Problemzustand führen, in groben Zügen über die Art und Weise des Problemmanagements und der Problemlösung berichtet wird, und alle weiteren Analysen dazu, wie die Bedingungen und Ursachen des Problems in Zukunft verhindert werden können.

___

Das Hauptziel des Störfallmanagements besteht darin, potenzielle Probleme so schnell wie möglich zu identifizieren und darauf zu reagieren und so die Auswirkungen auf Produktionsdienste so gering wie möglich zu halten und das höchstmögliche Niveau von Servicequalität und Verfügbarkeit zu gewährleisten.  Als bestmögliches Niveau von Servicequalität und Verfügbarkeit gilt es, wenn alle Dienste zu 100 % der Zeit genau wie vorgesehen funktionieren und zu 100 % der Zeit verfügbar und zugänglich sind.

Weil uns klar ist, dass eine Kombination von Faktoren, die wir nicht alle kontrollieren können, die Fehlerfreiheit des Dienstes beeinträchtigen kann, definieren wir Service Level Objectives (SLOs) und Service Level Agreements (SLAs). In diesen wird beschrieben, welche Beeinträchtigungen der Fehlerfreiheit bei den verschiedenen Diensten innerhalb des Cloudflare-Netzwerks akzeptabel sind.   SLAs und SLOs werden in Prozenten von Zeiträumen (monatlich und jährlich) ausgedrückt.

Der Umfang der Informationen, die über einen Störfall mitgeteilt werden, kann variieren. Folgende Informationen müssen jedoch erfasst werden, bevor ein Störfall klassifiziert und priorisiert wird:

-   Einsender-Quelle (Benachrichtigung durch ein Überwachungssystem oder alternative Quelle)
-   Kunde(n) (falls zutreffend)
-   System oder Anwendung (sowie Hostname, falls zutreffend)
-   Zeitpunkt der Benachrichtigung
-   Umfang der Auswirkungen: geschätzte Anzahl betroffener Systeme, Nutzer oder Regionen
-   Art der Auswirkungen: allgemeiner Umfang der Dienstbeeinträchtigung (z. B. Verlust des gesamten Zugriffs, Performanceverschlechterung, Beeinträchtigung abhängiger Anwendungen, beobachtete Auswirkungen auf Kunden)

Alle Störfälle, die als Probleme klassifiziert werden (unabhängig von der Quelle) und die Priorität P0 oder P1 besitzen, werden im Cloudflare-Ticketsystem JIRA protokolliert.  Manche Benachrichtigungen zeigen Zustände an, die sich möglicherweise nicht sofort auf Servicestufen auswirken, und werden je nach Bedarf als Probleme der Priorität P2 oder P3 klassifiziert.

JIRA ist das System, in dem alle Störfallinformationen aufgezeichnet werden, und alle Dokumentationsquellen zu einem Problem (z. B. Benachrichtigungsverlauf, Screenshots, Arbeitsprotokolle, Chatgespräche) werden an das JIRA-Originalticket angehängt, das zu einem Störfall angelegt wird.

### Störfall-Klassifikationen

Nach dem Empfang einer Benachrichtigung führt der SRE sofort eine Triage der Benachrichtigung durch. Dazu verknüpft er sie mit einer Kategorie und einer Priorität.  Beim Anlegen neuer JIRA-Tickets für Probleme hoher Priorität (P0 und P1) achtet der SRE darauf, dass jedes Ticket korrekt klassifiziert ist; er trägt also Kategorie und Priorität ein.

### Priorität

Alle Tickets werden in eine der folgenden 4 Prioritätsstufen eingestuft.  Die dazu genannten Kriterien gelten als allgemeine Leitlinien.   Bei den unten beschriebenen Bedingungen muss ausdrücklich eine bestimmte Priorität definiert werden, der SRE oder das Cloudflare-Management können Problemen jedoch nach ihrem Ermessen bei Bedarf eine höhere Priorität zuordnen.

<table><tbody><tr><td><p><span><strong>Priorität</strong></span></p></td><td><p><span><strong>Beschreibung</strong></span></p></td></tr><tr><td><p><span>P0</span></p></td><td>Vollständiger Verlust des Zugriffs auf die Cloudflare-Anwendung oder API.<br>Verschlechterung des Zugriffs auf die Cloudflare-Anwendung oder API (⪯&nbsp;98&nbsp;%, gemessen weltweit oder von einer der Hauptregionen aus).<br>Vollständiger Verlust des Zugriffs auf oder erhebliche Performanceverschlechterung bei einem Tier-1-Rechenzentrum.<br>Performanceverschlechterung bei einem globalen Tier-1-Transitprovider (⪰&nbsp;20&nbsp;% Paketverlust weltweit oder 30&nbsp;% Paketverlust von einer der Hauptregionen).<br>Zugriffs- oder Performanceverschlechterung bei einem kritischen System</td></tr><tr><td><p><span>P1</span></p></td><td>Zeitweilige oder zunehmende standortweite Performanceverschlechterung.<br>Verlust einer wichtigen Funktion, zum Beispiel Berichterstellung.<br>Verlust des Zugriffs auf die Cloudflare-Anwendung von einer Website der sozialen Medien oder externen Cloudflare-Websites aus (z.&nbsp;B. <a href="http://spacloudflare.com/">spaCloudflare.com</a>, <a href="http://saloncloudflare.com/">salonCloudflare.com</a>&nbsp;usw.).<br>Ausfall einer wichtigen ausgehenden Drittanbieter-Schnittstelle.<br>Betriebsausfall der Website für einen Enterprise-Kunden oder Distributionspartner.<br>Beschädigung oder Verlust von Kundendaten.</td></tr><tr><td><p><span>P2</span></p></td><td>Sporadische oder lokale Performanceprobleme.<br>Systemprobleme, die sich noch nicht beim Client bemerkbar machen (z.&nbsp;B. hohe CPU-Beanspruchung).<br>Ausfall/Verschlechterung bei einem einzelnen Client.</td></tr><tr><td><p><span>P3</span></p></td><td>Operative Probleme, prozedurale Probleme oder Dienstanforderungen, die sich wenig oder gar nicht auf Endbenutzer auswirken und auf Basis der Verfügbarkeit bearbeitet werden können.<br>Dies ist der Standard-Schweregrad, der allen Tickets zugewiesen wird, die noch nicht überprüft bzw. denen noch kein Schweregrad zugeordnet wurde.</td></tr></tbody></table>

###   
Kategorie

Zur korrekten Verfolgung und Kommunikation wird Problemen hoher Priorität (P0 und P1) eine Kategorie zugeordnet. Diese Kategorien (Ticketbeschriftungen) entsprechen den öffentlich bekanntgegebenen Kategorien auf der öffentlichen Cloudflare-Statusseite.

Tickets niedrigerer Priorität (P2 und P3) können mit eigenen Beschriftungen und Benennungen der verschiedenen technischen und nichttechnischen Cloudflare-Teams kategorisiert werden.  Diese verschiedenen Beschriftungen und Kategorien sind in diesem Dokument nicht aufgeführt.

### Sicherheitsstörfälle

Es muss unbedingt beachtet werden, dass Störfälle, die in die Kategorie „Sicherheit“ eingestuft werden, besondere Behandlung und Verfahren erfordern.  Diese Störfälle sollten hier protokolliert werden. Gehen Sie anschließend entsprechend der Verfahren für Sicherheitsstörfälle nach den Festlegungen des Cloudflare Information Security Teams vor.

### Störfälle mit hohem Schweregrad/hoher Priorität

P0- und P1-Störfälle wirken sich offensichtlich stärker auf das Geschäft aus. Deshalb gelten von vornherein einige spezielle Anforderungen, damit sie so zügig wie möglich bearbeitet werden.

### Störfallmanager

Bei allen P0- und P1-Fällen muss sofort der diensthabende Störfallmanager verständigt werden.  Der Einsatzplan für die Störfallmanager wird bekanntgegeben, damit der SRE jederzeit weiß, an wen er sich wenden muss.  Der Störfallmanager ist eine kritische Ressource und verantwortlich für:

-   Validierung des Schweregrads eines Falles
-   Verfolgung des Falles von der Einsendung bis zur Lösung
-   Vertretung der Interessen der Kunden
-   Protokollierung aller Maßnahmen und Zeiten
-   Richtungsweisung der Mitarbeiter auf die schnellstmögliche Lösung hin
-   Sicherstellen, dass Kunden und internes Management zu vorbestimmten Zeitpunkten (oder bei Statusänderungen) über den Status informiert werden
-   Durchführung von Eskalationen zu Kunden, internen Beteiligten oder Drittanbietern, wenn Zeitlimits überschritten oder keine angemessenen Fortschritte gemacht werden
-   Sicherstellen, dass nach der Lösung eine aussagekräftige Erläuterung in das Ticket eingetragen wird
-   Sich beim ursprünglichen Einsender vergewissern, dass dieser zustimmt, den Fall als gelöst zu betrachten, bevor das Ticket geschlossen wird

___

## Kommunikation zu Störfällen

Externe Kommunikation während eines Störfalls ist kritisch für:

-   Benachrichtigung der Stakeholder darüber, dass Cloudflare der Fall bekannt ist und Cloudflare an einer Lösung arbeitet
-   Zusicherung an die Kunden, dass die Angelegenheit geprüft wird und Cloudflare ihre Interessen dabei berücksichtigt
-   Bearbeitung der Fälle ohne unnötige Zeitverzögerung und mit angemessenen Eskalationen
-   Informieren wichtiger interner Stakeholder über wichtige Störfälle

Während eines Störfalles kommen hauptsächlich diese Kommunikationsmittel zum Einsatz:

Die Statusseite wird auf Grundlage einer Vorlage von einem Mitglied des CSUP-Bereitschaftsteams erstellt, sobald ein Störfall identifiziert wurde.

___

## Post Mortem Reviews 

Cloudflare ist der Ansicht, dass ein kritisches Problem nie zweimal auftreten darf.  Um das zu erreichen, wird für alle P0-Probleme eine Störfallmeldung (Incident Report, IR) veröffentlicht. Sie enthält eine Root Cause Analysis (RCA) des Problems und der Gesamtfaktoren, die zu dem Störfall geführt haben. Nach allen IR-Veröffentlichungen folgt ein Post Mortem Meeting, in dem Techniker und Manager den IR, die Schlussfolgerungen aus dem RCA und alle folgenden Mängelbeseitigungsmaßnahmen besprechen und abstimmen. Dadurch soll gewährleistet werden, dass die Problembedingungen nicht wieder eintreten.

### Problemmanagement und Post Mortem

Das Problemmanagement unterscheidet sich vom Störfallmanagement dahingehend, dass es vor allem dazu dient, die tieferliegenden Ursachen eines Störfalls zu ermitteln, zu beheben und zukünftig zu verhindern.

###   
Root Cause Analysis und Mängelbeseitigung

#### **Problemticket**

Ein RCA ist ein Bericht über eine Root Cause Analysis (Fehler-Ursachen-Analyse).  Ein Jira-Problemticket ist das Protokoll und die Verfolgung von Ereignissen, die ein RCA rechtfertigen könnten.  Im Rahmen dieses Prozesses untersuchen die Fachexperten (Subject Matter Experts, SMEs) einen P0- oder P1-Fall und suchen nach der tieferliegenden Ursache des Falles.  Sobald diese festgestellt wurde, müssen die SMEs einen Mängelbeseitigungsplan aufstellen, um die Ursachen zu beheben.  Das Endergebnis ist ein wohldokumentiertes Ticket, mit dem die Mängelbeseitigung bis zum Abschluss verfolgt wird, sowie bei Bedarf eine sauber geschriebene Störfallmeldung, die an ein internes Team und/oder den Kunden gesendet wird.

Die oben genannten Punkte gelten auch dann, wenn ein Drittanbieter oder Lieferant den RCA einreicht.  Wenn wir die RCA-Informationen von einem Dritten bekommen, müssen wir dafür sorgen, dass das Problemticket mit allen relevanten Informationen aktualisiert wird, einschließlich ausstehender Mängelbehebungen, die verfolgt werden müssen.

#### **Störfallmeldung**

Die Störfallmeldung (Incident Report, „IR“) ist die Hauptkommunikationsmethode, mit der ein Kunde über einen Fall informiert wird, und kann den Inhalt des Tickets ganz oder teilweise enthalten.

Der Verfasser der Meldung kann unterschiedlich sein, je nach Schweregrad des Falls und nach dem zuständigen Bereich.  Wenn der Entwurf der Meldung fertiggestellt wurde, muss unbedingt sichergestellt werden, dass die Meldung vom Cloudflare-Management auf Inhalt, Zusagen und professionelle Darstellung überprüft wird.  Sobald die Meldung genehmigt wurde, kann sie für den Kunden veröffentlicht werden.

___

## Problem Review

In den vorangegangenen Abschnitten wurden die Bearbeitung des Störfalls und das Verfahren zur Ermittlung der Ursachen und zur dauerhaften Behebung beschrieben.  Der letzte Teil des Störfall- und Problemmanagementprozesses besteht darin, Kennzahlen und Trends zu ermitteln und die Berichtserstellung abzuschließen, damit gewährleistet ist, dass der Prozess ordnungsgemäß eingehalten wurde, SLAs eingehalten werden und keine unterschwelligen Probleme außer Acht gelassen wurden.

### Berichterstellung

Folgende Ticketkriterien müssen sowohl für offene als auch geschlossene Tickets gemeldet werden:

-   Schweregrad
-   Kategorie/Unterkategorie
-   Zuständige Gruppe
-   Alter/Tage offen

Diese Daten sollten, wenn irgend möglich, grafisch dargestellt werden, um Trends sichtbar zu machen.  Diese Berichte müssen für interne Cloudflare-Manager und Bereichsverantwortliche veröffentlicht werden.

### Analysen und Rechenschaftspflicht

Jeder Bereichsverantwortliche für Tickets ist dafür zuständig, dass seine Tickets innerhalb vorgegebener bzw. angemessener Zeiten geschlossen werden, aber auch dafür, die Berichte zu überprüfen und nach Trends, Problemlagen und Wiederholungsfällen Ausschau zu halten.  Auf der Grundlage dieser Analysen sollten weitere Problemtickets angelegt werden, um alle Mängel zu beheben, die im Rahmen einer P0 oder P1 nicht zutage getreten sind.  So lässt sich kontinuierliche Verbesserung erreichen und auf lange Sicht sollte die Anzahl der Tickets dadurch abnehmen, dass Ursachen umfassender angepackt wurden.

### Review-Meetings zum Störfallmanagement (Post Mortem)

Die Gruppenmanager solten im Rahmen aller Abteilungssitzungen die Berichte zu offenen Tickets und Trends durchgehen, um:

-   erfolgreiche oder bedenkliche Bereiche zu besprechen
-   Chancen für Verbesserungen durch Bereichsverantwortliche zu prüfen
-   gemeinsam Bereiche festzustellen, für die ein neues Problemticket angelegt werden sollte, um die Mängelbeseitigung zu verfolgen
