---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/214820528-Validieren-eines-Let-s-Encrypt-Zertifikats-auf-einer-Website-die-bereits-auf-Cloudflare-aktiv-ist
title: Validieren eines Let's Encrypt-Zertifikats auf einer Website, die bereits auf Cloudflare aktiv ist 
---

# Validieren eines Let's Encrypt-Zertifikats auf einer Website, die bereits auf Cloudflare aktiv ist 



## Überblick

Diese Anleitung beschreibt weitere Einzelheiten über die Verwendung der Webroot-Methode zur Verifizierung im offiziellen Let's-Encrypt-Client, wie in der folgenden Dokumentation beschrieben: [https://letsencrypt.readthedocs.org/en/latest/using.html#webroot](https://letsencrypt.readthedocs.org/en/latest/using.html#webroot)

Hinweis: Als Standardmethode für die ACME-Authentifizierung setzt der Let's-Encrypt-Client die DVSNI-Methode ein. Bei einer Cloudflare-aktivierten Domain würde dies fehlschlagen, da SSL (TLS) an unserem Edge endet und der ACME-Server niemals das Zertifikat zu sehen bekommt, das der Client am Ursprung vorlegt. Andere ACME-Validierungsmethoden (wie DNS oder HTTP) werden ordnungsgemäß funktionieren, wenn Cloudflare aktiviert ist.

___

## HTTP-Validierung

Wenn Sie Let’s Encrypt zum ersten Mal für eine Website konfigurieren, die bereits für Cloudflare aktiviert ist, reicht die Webroot-Methode völlig aus, um Ihr Zertifikat und Ihren privaten Schlüssel erfolgreich zu verifizieren und abzurufen. 

1.  Laden Sie den Let’s-Encrypt-Client herunter und wechseln Sie in das Download-Verzeichnis:


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">git clone https://github.com/letsencrypt/letsencrypt</span></div></span></span></span></code></pre>{{</raw>}}


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">cd letsencrypt/</span></div></span></span></span></code></pre>{{</raw>}}
    
2.  Führen Sie das Skript für die automatische Installation aus:  


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">./letsencrypt-auto</span></div></span></span></span></code></pre>{{</raw>}}
    
3.  Mithilfe des `letsencrypt`\-Clients mit dem Befehl `certonly` und dem Flag `--webroot` ist es Ihnen möglich, das Zertifikat/Schlüssel-Paar mittels HTTP-Verifizierung zu verifizieren und abzurufen. Ein entsprechender Befehl könnte zum Beispiel so aussehen:  


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">/root/.local/share/letsencrypt/bin/letsencrypt certonly --webroot --webroot-path /usr/share/nginx/html/ --renew-by-default --email email@host.tld --text --agree-tos -d example.tld -d www.example.tld</span></div></span></span></span></code></pre>{{</raw>}}
    
      
    Wobei  
    
    **\--webroot-path**
    
    das Verzeichnis auf Ihrem Server angibt, in dem sich Ihre Website befindet (in diesem Beispiel wäre das „nginx“)
    
    **\--renew-by-default**
    
    standardmäßig „Verlängerung“ auswählt, wenn Domains eine übergeordnete Menge eines zuvor erhaltenen Zertifikats sind
    
    **\--email**
    
    die E-Mail-Adresse ist, die für die Registrierung verwendet wird und als Kontaktadresse für Wiederherstellungszwecke dient.
    
    **\--text**
    
    die Textausgabe anzeigt
    
    **\--agree-tos**
    
    anzeigt, dass man mit dem Abonnentenvertrag von Let’s Encrypt’s einverstanden ist
    
    **\-d**
    
    die Hostnamen angibt, die dem SAN hinzugefügt werden sollen.
    
4.  Nach erfolgreicher Durchführung dieser Verifizierungsmethode wird eine Textausgabe angezeigt, die in etwa so aussieht:  


    {{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Herzlichen Glückwunsch! Your certificate and chain have been saved at /etc/letsencrypt/live/example.tld/fullchain.pem. (Ihr Zertifikat und die Zertifikatkette wurden unter /etc/letsencrypt/live/example.tld/fullchain.pem gespeichert.)    Your cert will expire on 2016-03-03. (Ihr Zertifikat ist bis zum 03.03.2016 gültig.) Um eine neue Version des Zertifikats zu erhalten,    führen Sie in Zukunft einfach Let's Encrypt erneut aus.</span></div></span></span></span></code></pre>{{</raw>}}
    
5.  Hinweis: Zertifikat und Schlüssel werden beide unter `/etc/letsencrypt/live/example.tld/` gespeichert. Nachdem Sie beides erhalten haben, müssen Sie Ihren virtuellen Host für die Verwendung dieses Schlüssel/Zertifikat-Paares konfigurieren.

Vergessen Sie nicht, die Page Rules für die Domain im Cloudflare Dashboard zu überprüfen. Vergewissern Sie sich, dass keine dieser Page Rules dazu führen würde, dass eine Anforderung für die Validierungs-URL umgeleitet werden würde oder nur über HTTPS zugreifbar wäre.

___

## Verlängerung

Kurz bevor das Zertifikat abläuft, können Sie es mit dem `letsencrypt renew`\-[Befehl](https://letsencrypt.readthedocs.org/en/latest/using.html#renewal) verlängern, ohne dazu Änderungen an der Cloudflare-Konfiguration vornehmen zu müssen. Das sollte unter den folgenden Voraussetzungen funktionieren:

-   In der .conf-Datei, die der letsencrypt-Client für die Verlängerung verwendet, ist `authenticator = webroot` angegeben.
-   Die Validierungs-URL ist über HTTP zugreifbar.
-   Auf diese URL sind keine Umleitungen angewendet. 

Alternativ dazu können Sie die oben aufgeführten Schritte auch wiederholen, um sich einfach ein neues Zertifikat ausstellen zu lassen.

{{<Aside type="note">}}
Zum gegenwärtigen Zeitpunkt wird die DNS-Validierungsmethode vom
offiziellen Client noch nicht unterstützt. Es gibt jedoch Tools von
Drittanbietern, die diese Methode einsetzen.
{{</Aside>}}