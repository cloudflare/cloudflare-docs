---
pcx_content_type: how-to
title: Public Buckets
---

# Getting started with Public Buckets on R2

## Overview
Public Bucket is a new feature that allows users to expose R2 buckets to unauthenticated requests. By default, buckets are never publicly accessible and will always require explicit user permission to enable. 

## Enabling public access for the Bucket
Here’s how you can enable public access for your buckets:
1. Navigate to the R2 product screen using the sidebar

![Choose R2 from the side menu](/r2/static/public-buckets-r2.png)

2. From the R2 overview screen, select the bucket for which you want to enable public access by clicking on the name. 

![Select your bucket](/r2/static/public-buckets-bucket.png)

3. Next, navigate to the Settings tab of the bucket

![Select settings](/r2/static/public-buckets-settings.png)

4. Under settings, you will see a new section called Bucket Access

![Select bucket access](/r2/static/public-buckets-not-allowed.png)

5. To enable public access, click on the Allow Access button.

![Allow access](/r2/static/public-buckets-allow-access.png)

6. In the confirmation dialog, type in ‘allow’ to confirm and click the Allow button. 
7. That’s it! You can now access the bucket and its objects using the Public Bucket URL.

![Show Public Bucket URL](/r2/static/public-buckets-allowed.png)

8. You can also see which buckets have public access from the overview page.

Note: Public Bucket URLs are not covered by Access, Cache and bot management features.


## Disabling public access for the Bucket

Here’s how you can disable public access for your buckets:

1. From the R2 overview screen, select the bucket for which you want to turn off public access by clicking on the name.

![Choose R2 from the side menu](/r2/static/public-buckets-r2.png)

2. Navigate to the Settings tab of the bucket

![Select settings](/r2/static/public-buckets-settings.png)

3. Scroll down to the Public Access section

![Public Access](/r2/static/public-buckets-allowed.png)

3. Next, click on the ‘Disallow Access’ button to disallow public access.

![Disallow access](/r2/static/public-buckets-disallow-access.png)

4. In the confirmation dialog type ‘disallow’ to confirm and click the Disallow button. 
5. That’s it! Your Bucket and its objects can no longer be accessed using the Public Bucket URL. 

## Connecting the Bucket to a domain

Domain access allows websites to serve content from the associated Bucket. They also benefit from features such as Access, Cache and bot management. 

Here’s how you can connect a domain:
1. Select the bucket to connect from the R2 overview screen
2. Navigate to the Settings tab of the bucket
3. Scroll down to the Domain Access section

![Domain Access](/r2/static/public-buckets-domain-access.png)

4. Click on Connect Domain to begin the process of connecting the domain.

![Connect Domain](/r2/static/public-buckets-connect-domain.png)

5. Enter the domain name you want to connect to and click the Continue button. (Note: Currently, we only support active domains under your account on Cloudflare. Also, you cannot enter domains or subdomains already reserved by other Cloudflare products.)

![Add Domain](/r2/static/public-buckets-add-domain.png)

6. You’ll now see a preview of the new record that will be added to the DNS table. If everything looks good, click Connect Domain. 
7. That’s it! The domain is now connected. It takes a few minutes for the status to change from Initializing to Active. You may need to refresh to see the status update. If you notice the status hasn’t changed for a long time, use the Retry connection action (in the overflow menu).

![Active and Allowed](/r2/static/public-buckets-active-allowed.png)

8. To view the added DNS record, click on the overflow button with the ellipsis for the connected domain and click on Manage DNS. 

![Manage Cloudflare DNS](/r2/static/public-buckets-manage-cloudflare-dns.png)


## Disable domain access

Here’s how you can disable a domain:

1. From the R2 overview screen, select the bucket for which you want to disable access
2. Navigate to the Settings tab of the bucket
3. Scroll down to the Domain Access section
4. Select the domain to disable by navigating to the appropriate overflow button with ellipsis and click Disable domain. 

![Disable Domain](/r2/static/public-buckets-disable-domain.png)

5. The badge under Access to Bucket will update to ‘Not allowed’.

![Not Allowed](/r2/static/public-buckets-not-allowed-2.png)

## Remove domain

Here’s how you can remove a domain:

1. Select the bucket from the R2 overview screen for which you want to remove the domain
2. Navigate to the Settings tab of the bucket
3. Scroll down to the Domain Access section
4. Select the domain to disable by navigating to the appropriate overflow button with ellipsis and click Remove domain. 

![Remove Domain](/r2/static/public-buckets-remove-domain.png)

5. Click the ‘Remove domain’ button in the confirmation window. Note the CNAME record pointing to the record will also be removed as part of this step. You can always add the domain back.
6. That’s it. The domain is no longer connected and will no longer appear in the connected domains list. 