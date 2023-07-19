---
pcx_content_type: troubleshooting
language_tag: german
source: https://support.cloudflare.com/hc/de/articles/206652947-Host-Header-mithilfe-von-Page-Rules-neu-schreiben
title: Host-Header mithilfe von Page Rules neu schreiben 
---

# Host-Header mithilfe von Page Rules neu schreiben 

## Host-Header mithilfe von Page Rules neu schreiben

Kunden können Host-Header mithilfe der Cloudflare **Page Rules**\-App neu schreiben. Dieses Feature ist derzeit für Domains im Enterprise Plan verfügbar.

Ein häufiger Anwendungsfall für diese Funktionalität ist, wenn Ihre Inhalte in einem Amazon S3-Bucket gehostet werden. Amazon hat sein System so konzipiert, dass nur Host-Header akzeptiert werden, die denselben Namen wie der Bucket haben, in dem Ihre Inhalte gehostet werden. Deshalb muss eine Anfrage an „Host: your-domain.com“ in „Host: your-bucket.s3.amazonaws.com“ umgeschrieben werden, andernfalls wird die Anfrage abgelehnt.

{{<Aside type="note">}}
In einigen Fällen können Sie Ihren Amazon S3-Bucket so anpassen, dass er
Host-Header akzeptiert, die nicht den Bucket-Namen haben.
{{</Aside>}}

Um sicherzustellen, dass der Header neu geschrieben wird, gehen Sie zu Page Rules und geben Sie die entsprechende URL an. Klicken Sie anschließend auf **Einstellung hinzufügen** und wählen Sie **Host Header Override**. Geben Sie dort den Wert ein, mit dem überschrieben werden soll.

Jetzt wird bei jeder Anfrage, die mit der von Ihnen angegebenen URL übereinstimmt, der Host-Header mit dem von Ihnen in das Textfeld **Host Header Override** eingetragenen Header überschrieben. Siehe das folgende Beispiel:

![Page Rules Host-Header-Überschreibung](/images/support/cf-page-rules-host-header-override.png)
