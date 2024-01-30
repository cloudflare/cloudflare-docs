---
title: 3 - Junk email and administrative quarantine
pcx_content_type: integration-guide
weight: 3
meta:
    title: Junk email and administrative quarantine - Office 365
updated: 2023-01-12
---

# Deliver emails to the junk email folder and administrative quarantine

In this tutorial, you will learn how to deliver `SUSPICIOUS` and `BULK` messages to the users’s junk email folder, and `MALICIOUS`, `SPAM`, and `SPOOF` messages to the administrative quarantine (this requires an administrator to release the emails).

```mermaid
graph LR
Incoming[Incoming<br>Email] --> MALICIOUS & SUSPICIOUS & BENIGN
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
Junk[Junk<br>Email<br>Folder]
subgraph Anti-spam<br>policy
Spam["Spam<br>(SCL = 5, 6)"]
Hcspam["High<br>confidence<br>spam<br>(SCL = 7, 8, 9)<br>---------------<br>Phishing<br>---------------<br>High<br>confidence<br>phishing"]
end
MailFlow1 --> |"Set SCL to 5<br>(Spam Confidence Level)"|Spam
MailFlow2 --> |"Set SCL to 9<br>(Spam Confidence Level)"|Hcspam
Defender[Administrative<br>Quarantine]
Inbox
end
Spam ---> |Move messages to Junk Email folder|Junk
Hcspam --> |"Quarantine<br>Policy"|Defender
Defender -.-> |User Notification<br>+<br>Admin Release|Inbox
BENIGN --> Spam & Hcspam & Inbox
```

## Configure domains

{{<render file="deployment/_o365-use-case-configure-domain.md" withParameters="Do not check any dispositions.">}}

## Create quarantine policies

{{<render file="deployment/_o365-use-case-1-3-create-quarantine-policy.md">}}

## Configure quarantine notifications

{{<render file="deployment/_o365-use-case-configure-quarantine-notifications.md">}}

## Configure anti-spam policies

{{<render file="deployment/_o365-use-cases-antispam.md" withParameters="_UserNotifyAdminRelease_;;_UserNotifyAdminRelease_;;_UserNotifyAdminRelease_;;step7-spam.png">}}

## Create transport rules

{{<render file="deployment/_o365-use-case-transport-rules.md" withParameters="`Area 1 Deliver to Junk Email folder`;;`SUSPICIOUS`, `BULK`;;_Modify the message properties_ > _Set the Spam Confidence Level (SCL)_ > _5_;;step4-rules.png;;`Area 1 User Quarantine Message`;;`MALICIOUS`, `UCE`, `SPOOF`;;_Modify the message properties_ > _Set the Spam Confidence Level (SCL)_ > _9_;;step10-user-quarantine.png">}}
