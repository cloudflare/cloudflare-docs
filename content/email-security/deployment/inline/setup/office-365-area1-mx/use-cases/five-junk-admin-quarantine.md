---
title: 5 - Junk email folder and administrative quarantine
pcx_content_type: integration-guide
weight: 5
meta:
    title: Deliver emails to the junk email folder - Office 365
updated: 2023-01-12
---

# Deliver emails to the junk email folder and administrative quarantine

In this tutorial, you will learn to deliver `SUSPICIOUS` and `BULK` messages to the user's junk email folder, and `MALICIOUS`, `SPAM`, and `SPOOF` messages to the Administrative Quarantine (this requires an administrator to release the emails).

```mermaid
accTitle: Deliver email to the junk email folder and administrative quarantine
accDescr: This graphic shows the flow of suspicious and bulk emails delivered to the user's junk folder, and malicious spam and spoof messages delivered to the administrative quarantine.
graph TB
Incoming[Incoming Email] --> MALICIOUS & SUSPICIOUS & BENIGN
subgraph Cloudflare Area 1 Email Security
subgraph Dispositions
MALICIOUS["MALICIOUS<br>---------------<br>SPAM<br>---------------<br>SPOOF"]
SUSPICIOUS["SUSPICIOUS<br>---------------<br>BULK"]
BENIGN
end
end
MALICIOUS --> |X-Area1Security-Disposition<br>message header|MailFlow2
subgraph Office 365
MailFlow1["Mail flow rule #1<br>(Transport rule)"]
SUSPICIOUS --> |X-Area1Security-Disposition<br>message header|MailFlow1
MailFlow2["Mail flow rule #2<br>(Transport rule)"]
Junk[Junk Email]
subgraph Anti-spam policy
Spam["Spam<br>(SCL = 5, 6)"]
Hcspam["High confidence spam<br>(SCL = 7, 8, 9)<br>------------------------------<br>Phishing<br>------------------------------<br>High confidence phishing"]
end
Defender[Administrative Quarantine]
MailFlow1 --> |"Set SCL to 5<br>(Spam Confidence Level)"|Spam
Inbox
end
Spam ---> |Move messages to Junk Email folder|Junk
Hcspam --> |"Quarantine Policy"|Defender
MailFlow2 --> |"Redirect the message<br>to hosted quarantine"|Defender
Defender -.-> |No User Notification<br>+<br>Admin Release|Inbox
BENIGN --> Spam & Hcspam & Inbox
```

## Configure domains

{{<render file="deployment/_o365-use-case-configure-domain.md" withParameters="Do not check any dispositions.">}}

## Configure anti-spam policies

{{<render file="deployment/_o365-use-cases-antispam.md" withParameters="_AdminOnlyAccessPolicy_;;_AdminOnlyAccessPolicy_;;_AdminOnlyAccessPolicy_;;step7-adminonly-case5.png">}}

## Create transport rules

{{<render file="deployment/_o365-use-case-transport-rules.md" withParameters="`Area 1 Deliver to Junk Email folder`;;`SUSPICIOUS`, `BULK`;;_Modify the message properties_ > _Set the Spam Confidence Level (SCL)_ > _5_;;step4-rules.png;;`Area 1 Admin Managed Host Quarantine`;; `MALICIOUS`, `UCE`, `SPOOF`;;_Redirect the message to_ > _hosted quarantine_;;step10-hosted-quarantine-case5.png">}}
