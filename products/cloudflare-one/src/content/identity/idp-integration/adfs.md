---
order: 5
---

# SAML | Active Directory® 

Active Directory is a directory service developed by Microsoft for Windows domain networks. It is included in most Windows Server operating systems as a set of processes and services. Active Directory integrates with Cloudflare Access for using Security Assertion Markup Language ([SAML](/glossary#saml)).

## Before you start

To get started, you need:

* An Active Directory Domain Controller where all users have an email attribute
* Generic SAML enabled for your Access Identity Provider (IdP)
* A Microsoft server running with Active Directory Federation Services (ADFS) installed. All screenshots in these instructions are for Server 2012R2. Similar steps will work for newer versions.
* A browser safe certificate for Active Directory Federation Services (ADFS)

Once you fulfill the requirements above, you are ready to begin. Installation and basic configuration of Active Directory Federation Services (ADFS) is outside the scope of this guide. A detailed guide can be found in a [Microsoft KB](https://docs.microsoft.com/en-us/previous-versions/dynamicscrm-2016/deployment-administrators-guide/gg188612(v=crm.8)).

Then to begin the connection between Cloudflare Access and ADFS create a Relying Party Trust in ADFS.

## Create a Relying Party Trust

Run the Add Relying Party Trust wizard to begin SAML AD integration with Cloudflare Access.

To create a Relying Party Trust:

1. In **Windows Server**, launch the **ADFS Management** tool.
2. Select the **Relying Party Trusts** folder.
3. On the **Actions** sidebar, select **Add Relying Party Trust**.

    The **Add Relying Party Trust Wizard** launches.

    ![Add Relying Party Trust Wizard](../../static/documentation/identity/adfs/adfs-1.png)

4. In the left menu, choose **Select Data Source**.

    ![Select Data Source](../../static/documentation/identity/adfs/adfs-2.png)

5. Select the **Enter data about the relying party manually** option.
6. Click **Next**.

    The **Specify Display Name** step displays.

    ![Specify Display Name](../../static/documentation/identity/adfs/adfs-3.png)

7. Enter a **Display name**.

    We suggest you use an easily recognizable name. Include any information regarding this connection in the **Notes** field.

8. Click **Next**.

    The **Choose Profile** step displays.

    ![Choose Profile](../../static/documentation/identity/adfs/adfs-4.png)

9. Select the **AD FS profile** option.
10. Click **Next**.

    The **Configure Certificate** step displays.

    ![Configure Certificate](../../static/documentation/identity/adfs/adfs-5.png)

11. Leave the **Certificate** options at their defaults.
12. Click **Next**.

    The **Configure URL** step displays.

    ![Configure URL](../../static/documentation/identity/adfs/adfs-6.png)

13. Select the **Enable support for the SAML 2.0 WebSSO protocol** option.

14. In the **Relying party SAML 2.0 SSO service URL** field, enter your [team domain](/glossary#team-domain) followed by this callback at the end of the path: `/cdn-cgi/access/callback`. For example:

    ```txt
    https://your-team-name.cloudflareaccess.com/cdn-cgi/access/callback
    ```

15. Click **Next**.

    The **Configure Identifiers** step displays.

    ![Configure Identifiers](../../static/documentation/identity/adfs/adfs-7.png)

16. Paste the callback URL from step 15 in the **Relying party trust identifier** field.
17. Click **Next**.

    In the **Configure Multi-factor Authentication Now?** step, you can configure multi-factor authentication. Our example does not configure multi-factor authentication.

    ![Configure Multi-factor Authentication Now?](../../static/documentation/identity/adfs/adfs-8.png)

18. Click **Next**.

    The **Choose Issuance Authorization Rules** step displays.

    ![Choose Issuance Authorization Rules](../../static/documentation/identity/adfs/adfs-9.png)

19. Select the **Permit all users to access this relying party** option.
20. Click **Next**.

    The **Ready to Add Trust** step displays.

    ![Ready to Add Trust](../../static/documentation/identity/adfs/adfs-10.png)

21. Review your settings.
22. Click **Next**.

Cloudflare now relies on ADFS for user-identity authorization.

The **Edit Claim Rules for CF Login** screen automatically displays.

## Create claim rules

Now create 2 Claim Rules so that ADFS can take information from Cloudflare and return it to create [Zero Trust policies](/policies/zero-trust).

<Aside>

If you closed the Add Relying Trust wizard, use Explorer to find the <strong>Relying Party Trusts</strong> folder, select the newly created RPT file, and click <strong>Edit Claim Rules</strong> the <strong>Action\*/</strong> sidebar.
</Aside>

To create Claim Rules:

1. In the **Edit Claim Rules for CF Login** window, click  **Add Rule…**.

    The **Choose Rule Type** step displays.

    ![Choose Rule Type](../../static/documentation/identity/adfs/adfs-12.png)

2. In the **Claim rule template** field, select **Send LDAP Attributes as Claims** from the drop-down list.
3. Click **Next**.

    The **Edit Rule — Send Email** step displays.

    ![Edit Rule — Send Email](../../static/documentation/identity/adfs/adfs-13.png)

4. Enter a descriptive **Claim rule name**.
5. Select **Active Directory** from the **Attribute store** drop-down list.
6. Select **E-mail-Addresses** from the **LDAP Attribute** and **Outgoing Claim Type** drop-down lists.
7. Click **OK**.

    You return to the **Choose Rule Type** step.

    ![Choose Rule Type](../../static/documentation/identity/adfs/adfs-14.png)

8. Select **Transform an Incoming Claim** from the **Claim rule template** drop-down list to create the second rule.
9. Click **Next**.

    The **Edit - Create Transient Name Identifier** window displays.

    ![Edit - Create Transient Name Identifier](../../static/documentation/identity/adfs/adfs-15.png)

10. Enter a descriptive **Claim rule name**.
11. Select **E-Mail Address** from the **Incoming claim type** drop-down list.
12. Select **Name ID** from the **Outgoing claim type** drop-down list.
13. Select **Transient Identifier** from the **Outgoing name ID format** drop-down list.
14. Ensure that the **Pass through all claim values** option is selected.
15. Click **OK**.

Both Claim Rules are now available to export to your Cloudflare Access account.

## Export the certificate

Now you’ll configure Cloudflare to recognize ADFS by extracting the _token-signing certificate_ from ADFS.

To export the certificate:

1. In AD, select **Service Folder** and choose the **Certificates folder** containing the certificate to export.
2. In the **Certificates** card, right-click on **Token-signing**, and select **View certificate**.

    ![Certificates card](../../static/documentation/identity/adfs/adfs-16.png)

    The **Certificates** window displays.

3. Click the **Details** tab, and select the **Copy to File** option.
4. The **Certificate Export Wizard** displays.

    ![Certificate Export Wizard](../../static/documentation/identity/adfs/adfs-17.png)

5. Click **Next**.

    The **Export File Format** window displays.

    ![Export File Format](../../static/documentation/identity/adfs/adfs-18.png)

6. Select the **Base-64 encoded X.509 (.CER)** option.
7. Click **Next**.
8. Enter a name for the file.
9. Click **Next**.
10. Click **Finish**.

    Note the file path for later.

## Configure ADFS to sign SAML responses

To ensure that ADFS signs the full response when communicating with Cloudflare, open your local **Powershell** and enter the following command:

```bash
Set-ADFSRelyingPartyTrust -TargetName "Name of RPT Display Name" -SamlResponseSignature "MessageAndAssertion"
```

## Configure Cloudflare for Teams

To enable Cloudflare for Teams to accept the claims and assertions sent from ADFS, follow these steps:

1. On the **Teams dashboard**, navigate to **Access > Authentication**.
1. Click *+ Add* under **Login Methods**, and select **SAML**.
1. The **Add a SAML identity provider** card displays.

    ![Cloudflare Access Login Methods](../../static/documentation/identity/adfs/adfs-19-b.png)

1. Enter an IdP **Name**.
1. Under **Single Sign On URL** enter:

    ```txt
    https://hostnameOfADFS/adfs/ls/
    ```

    This is the default location. You can find your federation service identifier in ADFS.

1. In the **IdP Entity ID or Issuer URL** field, enter your [team domain](/glossary#team-domain), and include this callback at the end of the path: `/cdn-cgi/access/callback`. For example:

    ```txt
    https://your-team-name.cloudflareaccess.com/cdn-cgi/access/callback
    ```

1. Under **Signing certificate**, paste the exported certificate.

    There can be no spaces or return characters in the text field.

1. Click **Save**.

To test that your connection is working, navigate to **Authentication > Login methods** and click **Test** next to the login method you want to test.

## Download SP metadata (optional)

Some IdPs allow administrators to upload metadata files from their SP (service provider).

To get your Cloudflare metadata file:

1. Download your unique SAML metadata file at the following URL (replace `your-team-name` in this example with your own [team name](/glossary#team-name)):

    ```txt
    https://your-team-name.cloudflareaccess.com/cdn-cgi/access/saml-metadata
    ```

   In Cloudflare Access, you can find a link to this URL in the **Edit a SAML identity provider** dialog. The link returns a web page with your SAML SP data in XML format.

2. Save the file in XML format.
3. Upload the XML document to your **Active Directory** account.

## Example API Configuration

```json
{
    "config": {
        "issuer_url": "https://your-team-name.cloudflareaccess.com/",
        "sso_target_url": "https://adfs.example.com/adfs/ls/",
        "attributes": ["email"],
        "email_attribute_name": "",
        "sign_request": false,
        "idp_public_cert": "MIIDpDCCAoygAwIBAgIGAV2ka+55MA0GCSqGSIb3DQEBCwUAMIGSMQswCQYDVQQGEwJVUzETMBEG\nA1UEC.....GF/Q2/MHadws97cZg\nuTnQyuOqPuHbnN83d/2l1NSYKCbHt24o"
    },
    "type": "saml",
    "name": "adfs saml example"
}
```