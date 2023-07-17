---
pcx_content_type: concept
title: 3rd-party integration guide

---

# 3rd-party integration guide

<table>
  <tr>
    <th style="width:20%">Purpose</th>
    <th>The purpose of a third-party integration guide is to explain how to use a third-party product with Cloudflare.</th>
  </tr>
  <tr>
    <td>Tone</td>
    <td>instructional, straightforward</td>
  </tr>
  <tr>
    <td>content_type</td>
    <td>integration-guide</td>
  </tr>
  <tr>
    <td>Required components</td>
    <td>Title <br/>Context <br/>Prerequisites <br/>Steps <br/>Links</td>
  </tr>
  <tr>
    <td>Optional components</td>
    <td>Notes/warnings <br/> Examples <br/> Screenshots <br/> Tables <br/> Step validation</td>
  </tr>
</table>

Though we do want to help our customers and integrations between different products can definitely be a pain point, there is a large risk/maintenance cost associated with specific types of 3rd-party resources.

## Structure

### Required components

+ [**Title**](/style-guide/content-strategy/documentation-content-strategy/component-attributes/titles/): Short verb phrase in second-person imperative that includes the third-party name. Do not use gerund phrases.
  + If a third-party integration guide is with a specific Cloudflare technology partner, add a Markdown component that indicates `<partner>` after the title.
+ [**Context**](/style-guide/content-strategy/documentation-content-strategy/component-attributes/context/): An introductory paragraph on the following steps and what they will accomplish.
  + Provide context to the reader that is not in the section heading.
  + End with a colon or a period. Use a colon if it immediately precedes the steps. Use a period if there is more material (such as a note) between the context and the procedure.
  + Do not provide context for steps with a partial sentence that is completed by the numbered steps.
  + Mention any unique considerations between the third-party and Cloudflare.
+ [**Prerequisites**](/style-guide/content-strategy/documentation-content-strategy/component-attributes/prerequisites/): Tasks or conditions that must be completed before a user can complete a series of steps.
  + For third-party integration guides, include information about what you need to interact with the third party for the following steps.
+ [**Steps**](/style-guide/content-strategy/documentation-content-strategy/component-attributes/steps-tasks-procedures/): Numbered steps that complete a task.
  + Proceed with caution: creating step-by-step instructions of 3rd-party environments
    + Discouraged generally, but acceptable in certain situations. General preference is to link back to an article that someone else maintains.
    + Easily become out-of-date, especially if we can not access the 3rd-party product
  + Link out for basic concepts (Regex, JavaScript, web server maintenance).
+ [**Links**](/style-guide/content-strategy/documentation-content-strategy/component-attributes/links/): May be a bulleted list that references the third-party product or in-text links to the third-party process documentation.
  + Link to reputable sources within reason.

### Optional components

+ [Notes/warnings](/style-guide/content-strategy/documentation-content-strategy/component-attributes/notes-tips-warnings/)
+ [Examples](/style-guide/content-strategy/documentation-content-strategy/component-attributes/examples/)
+ Screenshots
  + Screenshots of the third-party product are highly discouraged. It is all the problems of video/screenshot maintenance, but with a much greater risk that something changes and we are not aware of it.
  + May become an even bigger problem if we can not access the 3rd-party product.

## Templates

Single procedure 3rd-party integration guide
```
---
weight: xx
pcx_content_type: integration-guide
---
 
# Second-person imperative verb phrase with 3rd-party name included
 
Context for procedure
 
Prerequisites
 
1. Step one
2. Step two
3. Step three
4. ...
```

3rd-party integration guide with multiple procedures that must be completed in order
```
---
weight: xx
pcx_content_type: integration-guide
---
 
# Second-person imperative verb phrase with 3rd-party name included
 
Context for procedure
 
Prerequisites
  
## 1. Second-person imperative verb phrase  
 
1. Step one
2. Step two
3. Step three
4. ...    
 
 
## 2. Second-person imperative verb phrase  
 
1. Step one
2. Step two
3. Step three
4. ...      
 
## 3. Second-person imperative verb phrase  
 
1. Step one
2. Step two
3. Step three
4. ...
```

## Examples

+ 3rd-party integration in the Cloudflare dashboard:
  + [Enable Logpush to Sumo Logic](https://developers.cloudflare.com/logs/get-started/enable-destinations/sumo-logic/)
  + [Device Posture - Carbon Black](https://developers.cloudflare.com/cloudflare-one/identity/devices/warp-client-checks/carbon-black/)
+ Linking to external docs:
  + [GitHub SMS notifications using Twilio](https://developers.cloudflare.com/workers/tutorials/github-sms-notifications-using-twilio/#sending-a-text-with-twilio)
+ (Discouraged but acceptable scenario) How to with instructions in 3rd-party environment and within Cloudflare dash:
  + [IDP integration - Microsoft Azure AD](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/azuread/)
  + [Managed deployment - Partners - Jamf](https://developers.cloudflare.com/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/partners/jamf/)

### Additional information

External integration guides are more costly to maintain because we do not control external UI and we do not typically have visibility into changes the same way we do for internal products.

We publish post-sales content. It might be referred to during pre-sales, but we publish use-phase content.

We publish with the expectation of maintenance. If you want to publish something without the expectation of maintenance, write a blog.

### Products where we frequently see 3rd-party information

+ [Workers](https://developers.cloudflare.com/workers/tutorials/)
+ [Zero Trust](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/)
+ [Analytics](https://developers.cloudflare.com/fundamentals/data-products/analytics-integrations/)
