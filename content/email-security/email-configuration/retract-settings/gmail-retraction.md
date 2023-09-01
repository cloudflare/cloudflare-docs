---
title: Gmail retraction
pcx_content_type: how-to
weight: 1
meta:
    title: Retraction guide for Gmail
---

# Retraction guide for Gmail

![Email workflow for retracting emails with Google Gmail](/images/email-security/email-retraction/gmail/opening_img-gmail-retraction.png)

In this tutorial you will learn how to set up email retraction for Gmail.

## 1. Configure project and service account in Google Cloud Platform

For Area 1 to be able to retract messages from Gmail inboxes, you first need to create a service account in a Google Cloud Platform (GCP) project.

1. Access the [Google Cloud Console](https://console.cloud.google.com). From the Dashboard, select **CREATE PROJECT**.

    ![Select Create project to start your new project](/images/email-security/email-retraction/gmail/step1-createproject.png)

2. Provide the details for the new project, and select **CREATE** to start your new project.

    ![Fill in the details from your organizations](/images/email-security/email-retraction/gmail/step2-create.png)

3. Once the new project has been created, the GCP console will automatically redirect you to the Project console. If not, you can use the **Project selector** to change to the project you created.

    ![If you need, use Project selector to choose the project you created in the previous step](/images/email-security/email-retraction/gmail/step3-project.png)

4. In the **Getting Started** card, select **Explore and enable APIs** to access the APIs and services configuration console.

    ![Find the Getting started card, and select Explore and enable APIs](/images/email-security/email-retraction/gmail/step4-explore-apis.png)

5. Select **ENABLE APIS AND SERVICES** to open the API Library.

    ![Enable APIs and services](/images/email-security/email-retraction/gmail/step5-enable-apis.png)

6. You will need to enable the Admin SDK API and the Gmail API. On the API Library, locate the **Google Workspace** section. Then, select **View All** to access all the available APIs for Google Workspace.

    ![Find the View all link to access the Admin SDK API and Gmail API](/images/email-security/email-retraction/gmail/step6-api-library.png)

7. Select **Admin SDK API**.

    ![Select the SDK API](/images/email-security/email-retraction/gmail/step7-sdk-api.png)

8. Select **Enable** to activate the Admin SDK API.

    ![Select Enable to enable the SDK API](/images/email-security/email-retraction/gmail/step8-enable-sdk.png)

9. Return to the Google Workspace API library, and select the **Gmail API**.

    ![Select the Gmail API](/images/email-security/email-retraction/gmail/step9-gmail-api.png)

10. Select **ENABLE** to activate the Gmail API.

    ![Select Enable to enable the Gmail API](/images/email-security/email-retraction/gmail/step10-enable-gmail.png)

11. You will now create a service account to use the API. From the **Gmail API console**, select **Credentials**.

    ![Select Credentials to create a service account](/images/email-security/email-retraction/gmail/step11-gmail-credentials.png)

12. Select **CREATE CREDENTIALS** > **Service account**.

    ![Select Create credentials followed by Service account](/images/email-security/email-retraction/gmail/step12-credentials.png)

13. In **Service account details** provide the following information:
    - **Service account name**: `Message Retraction Service Account`
    - **Service account ID**: This value is automatically generated.
    - **Service account description**: A description for this service. For example, `Area 1 Message Retraction`

    Select **CREATE AND CONTINUE** when you are done.
 
    ![Provide the details to create the service account](/images/email-security/email-retraction/gmail/step13-service-account-details.png)

14. In **Grant this service account access to project**, select the **Select a role** drop-down menu. Then, select **Project** on the left column, and **Owner** on the right column.

    ![Find the project owner options, in the Grant this service account access to project section](/images/email-security/email-retraction/gmail/step14-project-owner.png)

15. Once the role is assigned, select **DONE** to complete the setup.

    ![Select the Done button to complete the setup](/images/email-security/email-retraction/gmail/step15-complete-setup.png)

16. Once the role assignment has been saved, you will return to the API credential configuration console. In **Service Accounts**, select the newly-created service account to configure the domain-wide delegation.

    ![Select your newly-created service account to continue](/images/email-security/email-retraction/gmail/step16-service-accounts.png)

17. In **Details**, take note of the **Unique ID**. Then, select **SHOW ADVANCED SETTINGS**.

    ![Take note of the Unique ID code, and then select Show advanced settings](/images/email-security/email-retraction/gmail/step17-detail.png)

{{<Aside type="note" header="Note">}}Write down the **Unique ID** value. This information will be required in the next step, for the configuration of domain-wide delegation in the Google Workspace configuration.{{</Aside>}}

18. Select **VIEW GOOGLE WORKSPACE ADMIN CONSOLE** to configure the domain-wide delegation. This will open a new window to the Google admin console.

    ![Select View Google Workspace Admin Console to configure the domain-wide delegation](/images/email-security/email-retraction/gmail/step18-google-console.png)

19. Go to **Security** > **Access and data control** > **API controls**.

    ![Go to Security, Access and data controls, and select API controls](/images/email-security/email-retraction/gmail/step19-api-controls.png)

20. Find the **Domain wide delegation** section, and select **MANAGE DOMAIN WIDE DELEGATION**.

    ![Select Manage domain wide delegation](/images/email-security/email-retraction/gmail/step20-domain-wide-delegation.png)

21. Select **Add new** to add a new client ID.

    ![Select Add new](/images/email-security/email-retraction/gmail/step21-add-new.png)

22. In **Add a new client ID**, enter the following information:
    - **Client ID**: Enter your client ID. This is the Unique ID value you saved in step 17.
    - **OAuth scopes**: Enter the following information (the input field accepts comma separated values):

    ```txt
    https://www.googleapis.com/auth/admin.directory.user.readonly, https://www.googleapis.com/auth/admin.directory.group.readonly, https://www.googleapis.com/auth/admin.directory.user.alias.readonly, https://www.googleapis.com/auth/gmail.labels, https://mail.google.com/ 
    ```

    Select **AUTHORIZE** when you are finished.

    ![Enter the required information](/images/email-security/email-retraction/gmail/step22-clientid-oauth.png)

23. Return to the Google Cloud Platform (GCP) console, and select **IAM & Admin** > **Service Accounts** to return to the service account screen.

    ![Select Service accounts](/images/email-security/email-retraction/gmail/step23-service-accounts.png)

24. You need to create an API key in the Service account configuration panel. Select the three dots button to open the menu. Then, select **Manage keys**:

    ![Select the three dots menu, and then select Manage Keys](/images/email-security/email-retraction/gmail/step24-manage-keys.png)

25. In the Keys configuration panel, select **ADD KEY** > **Create new key**.

    ![Select Add Key and then Create new key](/images/email-security/email-retraction/gmail/step25-create-key.png)

26. In **Key type** select **JSON** as the format to create the private key. Then, select **CREATE**.

    ![Select JSON as the key type](/images/email-security/email-retraction/gmail/step26-json-key.png)

{{<Aside type="warning" header="Important">}}Save this key in a secure location as it allows access to your cloud resources. You will need to share it with Area 1 as part of the configuration process in the next step.{{</Aside>}}

## 2. Share the service account JSON key with Area 1

You have to upload the private key generated in the previous step to Area 1. This is needed to execute retractions on your Gmail inboxes.

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/), and select **Settings** (the gear icon).

2. Go to **Email Configuration** > **RETRACT SETTINGS** > **Authorize Gmail**.

    ![Go to Authorize Gmail in your Area 1 dashboard](/images/email-security/email-retraction/gmail/step2-authorize-gmail.png)

3. Select **New Authorization** and configure the following settings:
    - Select **AUTHORIZATION DATA (JWT)**, and find and upload your JSON private key.
    - Under **Domains**, specify which domain this private key belongs to.
    - Select **Save** to save the configuration.

    ![Select New authorization and configure its settings](/images/email-security/email-retraction/gmail/step3-private-key.png)

## 3. Configure auto-retraction actions in Area 1

{{<Aside type="warning" header="Important">}}If you choose the hard delete retraction for Gmail, email messages will be permanently deleted. These messages cannot be recovered, even by admins.{{</Aside>}}

{{<render file="_auto-retraction.md" withParameters="Google Gmail messages cannot be recovered, even by the admin.">}}

## 4. Adjust the hop count in Area 1

Since Area 1 is not configured as the MX record for your domains, you will need to adjust Area 1’s position (hop count) relative to Area 1’s position in the email processing order. 

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/), and select **Settings** (the gear icon).

2. Go to **Email Configuration** > **DOMAINS & ROUTING**.

3. Select the three-dots menu on the domain you want to verify the position, and then select **Edit**.

    ![Go to Domain to verify Area 1's hop position](/images/email-security/email-retraction/gmail/step3-hop-position.png)

4. For standalone Gmail only deployments, the value should be set to `2`. If it is not, adjust the **Hops** count to `2`, and select **Update Domain**.

    ![Go to Domain to verify Area 1's hop position](/images/email-security/email-retraction/gmail/step4-hops-count.png)

{{<Aside type="note">}}If you have an existing secure email gateway (SEG) deployed as the MX record, you will need to adjust the hop count accordingly.{{</Aside>}}

## 5. Configure BCC rule in Google Workspaces

You must send copies of inbound email messages to Area 1 for inspection, so that Area 1 can automatically retract messages. Messages can be sent to Area 1 using a BCC compliance rule. Refer to the steps below to learn how to set this up. Automatic retraction is not available when Area 1 is deployed as MX.

{{<render file="_gmail-bcc-setup.md">}}

### Geographic locations

{{<render file="_bcc-table-geographic-locations.md">}}

## 6. Manual message retraction

{{<render file="_manual-retraction.md">}}