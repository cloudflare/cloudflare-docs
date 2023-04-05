---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/4425107232525-Troubleshooting-Cloudflare-10XXX-errors
title: Troubleshooting Cloudflare 10XXX errors
---

# Troubleshooting Cloudflare 10XXX errors



## Error 10028: The add list items operation contains duplicate items

This error occurs when there are duplicate list items in a single operation to add items to a List (either an IP List or a Bulk Redirect List).

This error can happen when you:

-   Add a repeated IP address to an IP List
-   Add a repeated source URL to a Bulk Redirect List

### **Resolution**

Remove the duplicate item and try again.

___

## Error 10043: Source URL in redirect is too long

This error occurs when the source URL value of a URL redirect is too long. The maximum length of a source URL is 32,768 characters.

### **Resolution**

Use a shorter URL as the source URL.

___

## Error 10044: Target URL in redirect is too long

This error occurs when the target URL value of a URL redirect is too long. The maximum length of a target URL is 32,768 characters.

### **Resolution**

Use a shorter URL as the target URL.

___

## Error 10045: Invalid redirect source URL

This error occurs when you specify a source URL of a URL redirect that is not a valid URL.

### **Resolution**

Specify a valid URL as the source URL.

Refer to [Supported URL components in Bulk Redirects](/rules/url-forwarding/bulk-redirects/reference/url-components/) for details on the supported URL components for redirect source URLs.

___

## Error 10046: Invalid redirect target URL

This error occurs when you specify a target URL of a URL redirect that is not a valid URL.

### **Resolution**

Specify a valid URL as the target URL.

Refer to [Supported URL components in Bulk Redirects](/rules/url-forwarding/bulk-redirects/reference/url-components/) for details on the supported URL components for redirect target URLs.

___

## Error 10047: Invalid redirect status code

This error occurs when you specify a URL redirect status code that is not supported. 

### **Resolution**

Use one of the supported status codes in the URL redirect: `301`, `302`, `307`, or `308`.

___

## Error 10048: Preserve path suffix requires subpath matching enabled

This error occurs when you enable the **Preserve path suffix** option in a redirect without enabling the **Subpath matching** option.

The **Preserve path suffix** option of a URL redirect is only applicable when the **Subpath matching** option is also enabled. 

### **Resolution**

Enable **Subpath matching** for the URL redirect with **Preserve path suffix** enabled.

___

## Error 10049: Invalid scheme in redirect source URL

This error occurs when the source URL of a URL redirect has an invalid scheme.

**Resolution**

Review the source URL and ensure that it uses one of the supported schemes: `http`, `https`, or empty (no scheme information, which means that it applies to both schemes).

Refer to [Supported URL components in Bulk Redirects](/rules/url-forwarding/bulk-redirects/reference/url-components/) for details on the supported URL components for redirect source URLs.

___

## Error 10050: Invalid redirect source URL with user info

This error occurs when the source URL of a URL redirect includes a user info component (for example, `https://user:password@example.com`), which is not supported.

### **Resolution**

Remove the user info component from the redirect source URL.

Refer to [Supported URL components in Bulk Redirects](/rules/url-forwarding/bulk-redirects/reference/url-components/) for details on the supported URL components for redirect source URLs.

___

## Error 10051: Missing authority in redirect source URL

This error occurs when the source URL of a URL redirect does not include an authority component (for example, `http:///path`, without a hostname), which is mandatory.

### **Resolution**

Add an authority component to the redirect source URL (for example, include a hostname).

Refer to [Supported URL components in Bulk Redirects](/rules/url-forwarding/bulk-redirects/reference/url-components/) for details on the required URL components for redirect source URLs.

___

## Error 10052: Invalid redirect source URL with port

This error occurs when the source URL of a URL redirect includes a port (for example, `https://example.com:8081`), which is not supported.

### **Resolution**

Remove the port from the redirect source URL.

Refer to [Supported URL components in Bulk Redirects](/rules/url-forwarding/bulk-redirects/reference/url-components/) for details on the supported URL components for redirect source URLs.

___

## Error 10053: Invalid redirect source URL with query string

This error occurs when the source URL of a URL redirect includes a query string component, which is not supported.

### **Resolution**

Remove the query string from the redirect source URL.

Refer to [Supported URL components in Bulk Redirects](/rules/url-forwarding/bulk-redirects/reference/url-components/) for details on the supported URL components for redirect source URLs.

___

## Error 10054: Invalid redirect source URL with fragment

This error occurs when the source URL of a URL redirect includes a fragment component (for example, `https://example.com/search/#fragment`).

Fragment components are not part of an HTTP request; they are an indication for the browser to scroll to a specific location once the page has loaded.

### **Resolution**

Remove the fragment from the redirect source URL.

Refer to [Supported URL components in Bulk Redirects](/rules/url-forwarding/bulk-redirects/reference/url-components/) for details on the supported URL components for redirect source URLs.

___

## Error 10055: Query string settings incompatible with redirect target URL

This error occurs when you enable the **Preserve query string** option of a URL redirect, but also provide a query string in the redirect target URL. In this case, the URL redirect would have conflicting configuration on how to handle the query string of incoming requests.

### **Resolution**

Perform one of the following:

-   Disable the **Preserve query string** option in the URL redirect
-   Remove the query string component from the redirect target URL

___

## Error 10056: The add list items operation contains different types of list items

This error occurs when there are different types of list items (both IP addresses and URL redirects) in a single operation to add items to a List. The error may occur for an IP List or a Bulk Redirect List.

### **Resolution**

Remove the list items that do not apply to the list type. This means:

-   Removing IP addresses from a request to add items to a Bulk Redirect List
-   Removing URL redirects from a request to add items to an IP List

___

## Error 10058: List items incompatible with list type

This error occurs when you are adding items to a List (either IP List or Bulk Redirect List) and the list items are incompatible with the list type.

### **Resolution**

Make sure you are adding the items to the correct list:

-   IP Lists can only contain IP addresses as list items
-   Bulk Redirect Lists can only contain URL redirects as list items

___

## Error 10059: Maximum number of repeated URL source paths exceeded

This error occurs when you have more than the maximum number of URL redirects with the same source URL path across all Bulk Redirect Lists in your account, regardless of the URL redirect domain.

### **Resolution**

Review the path of your source URLs so that you do not have more than the maximum number of URL redirects sharing the same URL path in your account, regardless of their domain or the list they belong to.

Refer to [URL redirect parameters](/rules/url-forwarding/bulk-redirects/reference/parameters/) for more information on the current limits.

___

## Error 10060: Missing scheme in redirect target URL

This error occurs when the target URL of a URL redirect does not include a scheme, which is mandatory.

### **Resolution**

Review the target URL of the URL redirect and ensure that it contains a scheme (for example, `https`).

Refer to [Supported URL components in Bulk Redirects](/rules/url-forwarding/bulk-redirects/reference/url-components/) for details on the required URL components for redirect target URLs.
