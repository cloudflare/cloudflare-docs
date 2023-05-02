---
_build:
  publishResources: false
  render: never
  list: never
---

You can set up auto-retraction to automatically move messages matching certain dispositions to specific folders within a user's mailbox.

To set up automatic retraction:

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. On **Email Configuration**, go to **Retract Settings** > **Auto-Retract**.
4. Select **Edit**. 
5. For each disposition, choose which folder the message should be sent to:

    - **No Action**: Do not move the message.
    - **Junk Email**: Sends the message to the junk or spam email folder.
    - **Trash**: Sends the message to the trash or deleted items email folder.
    - **Soft Delete — user recoverable** (Microsoft only): Sends the message to the user's **Deleted Items** folder. Messages can be recovered by the user.
    - **Hard Delete — admin recoverable** (Microsoft and Google): Completely deletes messages from a user's inbox. For Office 365, the message will be deleted and cannot be recovered without using the [admin eDiscovery feature](https://docs.microsoft.com/en-us/microsoft-365/compliance/ediscovery?view=o365-worldwide&viewFallbackFrom=o365-worl). For Google Gmail messages cannot be recovered, even by the admin.

    {{<Aside type="warning" header="Important">}}If you choose the hard delete retraction for Gmail, email messages will be permanently deleted. These messages cannot be recovered, even by admins.{{</Aside>}}

6. Select **Update Auto-retract Settings**.

### Post delivery retractions for new threats

Sometimes, new information arises regarding new threats or phishing campains. This means that your users might have email messages that were scanned by Area 1 but not retracted because, at the time of scan, they had not been identified as a threat. However, Area 1 offers you tools to continue monitoring inboxes for any new threats that Area 1 finds at a later stage. Email messages that fit these new threats will be retracted.

You have two options you can enable: 

- **Post Delivery Response**:  Area 1 will continue re-evaluating emails already delivered to your users’s inboxes in search for phishing sites or campaigns not previously known to our systems. If any email messages fitting these new criteria are found, Area 1 retracts them.
- **Phish Submission Response**: Area 1 will retract emails already delivered that are reported by your users as phishing, and are found to be malicious.