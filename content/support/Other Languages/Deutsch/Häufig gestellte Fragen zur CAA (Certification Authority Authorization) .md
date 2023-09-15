---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/115000310832-H%C3%A4ufig-gestellte-Fragen-zur-CAA-Certification-Authority-Authorization-
title: Häufig gestellte Fragen zur CAA (Certification Authority Authorization) 
---

# Häufig gestellte Fragen zur CAA (Certification Authority Authorization) 



## Was ist CAA?

Ein CAA-Datensatz (Certificate Authority Authorization) ermöglicht Domainbesitzern, die Ausstellung auf bestimmte CAs (Certificate Authorities) zu beschränken. _CAA-Einträge_ verhindern, dass CAs unter bestimmten Umständen Zertifikate ausstellen.  Weitere Informationen finden Sie in [RFC 6844](https://tools.ietf.org/html/rfc6844).

___

## Wie wertet Cloudflare CAA-Einträge aus?

_CAA-Einträge_ werden von einer Zertifizierungsstelle und nicht von Cloudflare ausgewertet.

{{<Aside type="note">}}
Das Festlegen eines *CAA-Eintrags* zum Angeben einer oder mehrerer
bestimmter CAs hat keine Auswirkung darauf, welche CAs Cloudflare zum
Ausstellen eines universellen oder dedizierten SSL-Zertifikats für Ihre
Domain verwendet.
{{</Aside>}}

___

## Warum muss ich Universal SSL deaktivieren, wenn meine _CAA-Einträge_ die Ausstellung von Universal SSL ausschließen?

Da Universal SSL-Zertifikate von Kunden gemeinsam genutzt werden, verhindern Ihre _CAA-Einträge_ möglicherweise die Ausgabe von Universal SSL eines anderen Kunden. Daher muss Cloudflare Universal SSL für Ihre Domain deaktivieren, um sicherzustellen, dass Ihre _CAA-Einträge_ keinen anderen Kunden betreffen.

{{<Aside type="note">}}
*CAA-Einträge* werden automatisch für die Universal SSL-CA-Anbieter
comodoca.com, digicert.com und letsencrypt.org hinzugefügt, wenn das
Universal SSL von Cloudflare für Ihre Domain aktiviert ist.
{{</Aside>}}

Wenn Sie kein universelles SSL von Cloudflare benötigen, deaktivieren Sie **Universal SSL** in der App **SSL/TLS**.

{{<Aside type="warning">}}
Durch Deaktivieren von Universal SSL bleiben Ihre Cloudflare-fähigen
DNS-Einträge ohne SSL-Unterstützung, es sei denn, Sie haben ein
[benutzerdefiniertes
SSL-Zertifikat](https://support.cloudflare.com/hc/en-us/articles/200170466-How-do-I-upload-a-custom-SSL-certificate-Business-or-Enterprise-only-)
hochgeladen. (Hierfür ist der Plan „Business" oder „Enterprise"
erforderlich).
{{</Aside>}}

___

## Welche Datensätze werden hinzugefügt, um Universal SSL aktiviert zu halten?

Die folgenden DNS-Einträge werden automatisch festgelegt, wenn Sie weiterhin die kostenlosen Universal SSL-Zertifikate von Cloudflare verwenden:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">example.com. IN CAA 0 issue &quot;comodoca.com&quot;example.com. IN CAA 0 issue &quot;digicert.com&quot;example.com. IN CAA 0 issue &quot;letsencrypt.org&quot;example.com. IN CAA 0 issuewild &quot;comodoca.com&quot;example.com. IN CAA 0 issuewild &quot;digicert.com&quot;example.com. IN CAA 0 issuewild &quot;letsencrypt.org&quot;</span></div></span></span></span></code></pre>{{</raw>}}

{{<Aside type="warning">}}
Verwenden Sie nicht die Option *Nur Platzhalter erlauben* für den
Stammdatensatz (der nur *issuewild*-Datensätze zurückgibt) für Domains,
die Cloudflares Universal SSL verwenden.
{{</Aside>}}

Allein verwendet, erlaubt _issuewild_ nur die Ausgabe von Platzhaltern.  Daher kann Cloudflare Ihre Stammdomain nur zum Zertifikat hinzufügen, wenn Sie die Option _Platzhalter und bestimmte Hostnamen zulassen_ in der Dropdown-Liste **Tag** angeben:

![configuring_caa_records_comodoca_annotated.png](/images/support/configuring_caa_records_comodoca_annotated.png)

___

## Was passiert, wenn Universal SSL deaktiviert ist?

Ihr Domain-Name wird sofort aus dem universellen SSL-Zertifikat entfernt und Ihre Benutzer werden SSL-Fehler feststellen, es sei denn, Sie [laden ein benutzerdefiniertes SSL-Zertifikat](https://support.cloudflare.com/hc/en-us/articles/200170466-How-do-I-upload-a-custom-SSL-certificate-Business-or-Enterprise-only-) hoch. (Hierfür ist der Plan „Business“ oder „Enterprise“ erforderlich).

___

## Wie aktiviere ich erneut Universal SSL?

Erstellen Sie ein Support-Ticket beim Cloudflare-Support.

___

## Was sind die Gefahren beim Einstellen von CAA-Rekorden?

Wenn Sie Teil einer großen Organisation sind oder mehrere Parteien mit dem Abrufen von SSL-Zertifikaten beauftragt sind, fügen Sie _CAA-Einträge_ hinzu, die die Ausstellung für alle für Ihre Organisation geltenden CAs ermöglichen.  Andernfalls kann die SSL-Ausgabe für andere Teile Ihrer Organisation versehentlich blockiert werden.
