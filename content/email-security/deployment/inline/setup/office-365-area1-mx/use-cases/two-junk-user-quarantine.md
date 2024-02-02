---
title: 2 - Junk email and user managed quarantine
pcx_content_type: integration-guide
weight: 2
meta:
    title: Junk email and user managed quarantine - Office 365
updated: 2023-01-12
---

# Deliver emails to the junk email folder and user managed quarantine

In this tutorial, you will learn how to deliver `SUSPICIOUS` and `BULK` messages to the user's junk folder, and `SPAM` and `SPOOF` messages to the user managed quarantine.

```mermaid
graph TB
accTitle: Deliver email to the junk email folder and user managed quarantine
accDescr: This graphic shows the flow of suspicious and bulk emails delivered to the user's junk folder, and spam and spoof messages delivered to the user managed quarantine.
Incoming[Incoming Email] --> MALICIOUS & SPAM & SUSPICIOUS & BENIGN
subgraph Cloudflare Area 1 Email Security
subgraph Dispositions
MALICIOUS
SUSPICIOUS["SUSPICIOUS<br>---------------<br>BULK"]
SPAM["SPAM<br>---------------<br>SPOOF"]
BENIGN
end
Admin[Admin Quarantine]
MALICIOUS --> |Quarantine Policy|Admin
end
subgraph Office 365
MailFlow1["Mail flow rule #1<br>(Transport rule)"]
SUSPICIOUS --> |X-Area1Security-Disposition<br>message header|MailFlow1
MailFlow2["Mail flow rule #2<br>(Transport rule)"]
SPAM --> |X-Area1Security-Disposition<br>message header|MailFlow2
subgraph Anti-spam policy
Spam["Spam<br>(SCL = 5, 6)"]
Hcspam["High confidence spam<br>(SCL = 7, 8, 9)"]
Phishing["Phishing<br>------------------------------<br>High confidence phishing"]
end
MailFlow1 --> |"Set SCL to 5<br>(Spam Confidence Level)"|Spam
MailFlow2 --> |"Set SCL to 9<br>(Spam Confidence Level)"|Hcspam
Defender[Administrative Quarantine]
User[User-managed Quarantine]
Junk[Junk Email]
Inbox
end
Spam ---> |Move messages to Junk Email folder|Junk
Hcspam --> |"Quarantine Policy #1"|User
User -.-> |User Notification<br>+<br>User Release|Inbox
Phishing --> |"Quarantine Policy #2"|Defender
Defender -.-> |User Notification<br>+<br>Admin Release|Inbox
BENIGN ----> Spam & Hcspam & Phishing & Inbox
```

## Configure domains

{{<render file="deployment/_o365-use-case-configure-domain.md" withParameters="Only `MALICIOUS` should be checked.">}}

## Create quarantine policies

{{<render file="deployment/_o365-use-case-2-4-create-quarantine-policy.md">}}

## Configure quarantine notifications

{{<render file="deployment/_o365-use-case-configure-quarantine-notifications.md">}}

## Configure anti-spam policies

{{<render file="deployment/_o365-use-cases-antispam.md" withParameters="_UserNotifyUserRelease_;;_UserNotifyAdminRelease_;;_UserNotifyAdminRelease_;;case2-step7-spam.png">}}

## Create transport rules

{{<render file="deployment/_o365-use-case-transport-rules.md" withParameters="`Area 1 Deliver to Junk Email folder`;;`SUSPICIOUS`, `BULK`;;_Modify the message properties_ > _Set the Spam Confidence Level (SCL)_ > _5_;;step4-rules.png;;`Area 1 User Quarantine Message`;;`UCE`, `SPOOF`;;_Modify the message properties_ > _Set the Spam Confidence Level (SCL)_ > _9_;;step10-user-quarantine.png">}}
