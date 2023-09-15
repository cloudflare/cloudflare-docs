---
pcx_content_type: troubleshooting
language_tag: chinese
source: https://support.cloudflare.com/hc/zh-cn/articles/360021023712-%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5-%E9%80%9A%E8%BF%87-Cloudflare-%E9%A1%B5%E9%9D%A2%E8%A7%84%E5%88%99%E4%BD%BF%E7%94%A8%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BC%93%E5%AD%98%E5%8A%A0%E9%80%9F%E6%82%A8%E7%9A%84%E7%BD%91%E7%AB%99
title: 最佳实践：通过 Cloudflare 页面规则使用自定义缓存加速您的网站
---

# 最佳实践：通过 Cloudflare 页面规则使用自定义缓存加速您的网站

## 最佳实践：通过 Cloudflare 页面规则使用自定义缓存加速您的网站

_通过 Cloudflare页面规则优化您的缓存配置来提高站点性能。_

### 本文内容

-   [概述](https://support.cloudflare.com/hc/zh-cn/articles/360021023712-%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5-%E9%80%9A%E8%BF%87-Cloudflare-%E9%A1%B5%E9%9D%A2%E8%A7%84%E5%88%99%E4%BD%BF%E7%94%A8%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BC%93%E5%AD%98%E5%8A%A0%E9%80%9F%E6%82%A8%E7%9A%84%E7%BD%91%E7%AB%99#h_76YwdfM8FXPyFW3f93YWB3)
-   [开始前须知](https://support.cloudflare.com/hc/zh-cn/articles/360021023712-%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5-%E9%80%9A%E8%BF%87-Cloudflare-%E9%A1%B5%E9%9D%A2%E8%A7%84%E5%88%99%E4%BD%BF%E7%94%A8%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BC%93%E5%AD%98%E5%8A%A0%E9%80%9F%E6%82%A8%E7%9A%84%E7%BD%91%E7%AB%99#h_6gie2If8qahIHHIu32HZXs)
-   [最佳实践 1 - 缓存静态，匿名HTML（所有域名）](https://support.cloudflare.com/hc/zh-cn/articles/360021023712-%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5-%E9%80%9A%E8%BF%87-Cloudflare-%E9%A1%B5%E9%9D%A2%E8%A7%84%E5%88%99%E4%BD%BF%E7%94%A8%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BC%93%E5%AD%98%E5%8A%A0%E9%80%9F%E6%82%A8%E7%9A%84%E7%BD%91%E7%AB%99#h_7JfAZiS5qMLcTkUpKvebHJ)
-   [最佳实践 2 - 选择性缓存HTML（仅限Biz和企业计划的域名）](https://support.cloudflare.com/hc/zh-cn/articles/360021023712-%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5-%E9%80%9A%E8%BF%87-Cloudflare-%E9%A1%B5%E9%9D%A2%E8%A7%84%E5%88%99%E4%BD%BF%E7%94%A8%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BC%93%E5%AD%98%E5%8A%A0%E9%80%9F%E6%82%A8%E7%9A%84%E7%BD%91%E7%AB%99#h_ed961373-0972-441f-866d-89da71c5218e)

___

## 概述

边缘缓存是 Cloudflare CDN 的一项基本功能。 因此，我们的边缘网络会自动缓存世界各地的大量内容。 当访问者请求缓存资源时，它会从离他们最近的数据中心提供服务，因此内容加载速度更快。

不仅如此，您还可以借助 Cloudflare **页面规则**中提供的多种缓存设置进一步提高网站的性能。除了 Cloudflare 默认提供的自动缓存之外，这些额外的最佳实践可帮助您实现更高的性能。

___

## 开始前须知

Cloudflare 不会自动缓存 HTML 资源。这可以防止我们无意中缓存通常包含动态元素的页面。例如，某些 HTML 页面上的内容可能会根据特定访问者的特征（例如身份验证、个性化和购物车信息）而更改。

但是，您可以通过特定的 Cloudflare 页面规则设置来配置 HTML 缓存。 HTML 缓存灵活性的程度根据您的域名计划而有所不同，如下面的最佳实践部分所述。

在**页面规则**应用中配置缓存设置时，您实际上是在操作**缓存**应用的某些选项。不同之处在于，通过**页面规则**，在匹配自定义页面规则中定义的特定模式后，您可以在 URL 级别（而不是整个站点）进行应用缓存设置。 这样，您就可以更精确的控制到要缓存的特定资源。

有关 Cloudflare 缓存工具和选项的背景信息，请参阅：

-   [Cloudflare 为哪些文件扩展名进行静态缓存？](https://support.cloudflare.com/hc/zh-cn/articles/200172516-%E4%BA%86%E8%A7%A3-Cloudflare-%E7%9A%84-CDN)
-   [开始Cloudflare缓存](https://support.cloudflare.com/hc/en-us/articles/360021806811-Getting-Started-with-Cloudflare-Caching)
-   [了解并配置Cloudflare页面规则](https://support.cloudflare.com/hc/zh-cn/articles/218411427-%E4%BA%86%E8%A7%A3%E5%92%8C%E9%85%8D%E7%BD%AE-Cloudflare-Page-Rules-%E9%A1%B5%E9%9D%A2%E8%A7%84%E5%88%99%E6%95%99%E7%A8%8B-)
-   [Cloudflare缓存级别有哪些？](https://support.cloudflare.com/hc/zh-cn/articles/200168256-Cloudflare-%E7%9A%84%E7%BC%93%E5%AD%98%E7%BA%A7%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88-)
-   [我如何知道Cloudflare是否缓存我的站点或是一个特定资源？](https://support.cloudflare.com/hc/zh-cn/articles/200172516-%E4%BA%86%E8%A7%A3-Cloudflare-%E7%9A%84-CDN)

___

## 最佳实践 1 - 缓存静态，匿名HTML（所有域名）

所有域名计划都可以使用**页面规则**应用中的缓存一切的设置。

但是，无论是否存在动态内容，此选项都会缓存所有 HTML。如果您使用这种方法来缓存包含动态内容的页面，那么访问者很可能会看到不适用于他们的信息。

添加缓存一切页面规则：

1.  在应用程序中，转到**规则** > **页面规则**。
2.  点击_创建页面规则_或现有页面规则旁边的扳手图标。
3.  填写适当的 URL 模式。
4.  点击_添加设置_，然后选择_缓存级别设置_名称。
5.  选择_缓存一切_设置。
6.  保存并部署规则。

总之，此建议仅适用于静态和匿名的 HTML 页面。要了解更多信息，请参阅 [如何在 Cloudflare 中使用缓存一切设置？](https://support.cloudflare.com/hc/en-us/articles/202775670-Customizing-Cloudflare-s-cache)

___

## 最佳实践 2 - 选择性缓存HTML（仅限Biz和企业计划的域名）

拥有Business和 企业域名的客户有额外的页面规则设置，可以根据页面是否包含动态信息来有选择地缓存 HTML 内容。

我们提供了以下关于实施此建议的具体说明的文章链接。然而，我们也可以将过程总结如下：

1\. 为所需的 URL 模式创建一个新的页面规则。

2\. 添加以下三个设置：

-   _缓存一切_ - 缓存所有静态和匿名内容
-   _绕过 Cookie 上的缓存_（仅适用于Business和企业计划）- 如果请求具有匹配的 cookie，则绕过缓存所有内容
-   _边缘缓存 TTL_ - 指定 Cloudflare 应在我们的边缘网络中保留缓存资源多长时间，然后再向源站请求资源

3\. 保存并部署您的新规则。

作为边缘缓存 TTL 的替代方案（上面第 2 项中的第三个要点），如果您认为源服务器中设置的缓存控制标头是合适的，则可以使用_源服务器缓存控制_设置。了解更多关于[源服务器缓存控制](https://support.cloudflare.com/hc/zh-cn/articles/115003206852-%E6%BA%90%E7%AB%99-Origin-Cache-Control)。

要了解有关所描述技术的更多信息，请参阅：

-   [缓存匿名页面视图](https://blog.cloudflare.com/caching-anonymous-page-views/)
-   [使用 WordPress/WooCommerce 缓存静态 HTML](https://support.cloudflare.com/hc/zh-cn/articles/236166048-%E4%BD%BF%E7%94%A8-WordPress-WooCommerce-%E7%BC%93%E5%AD%98%E9%9D%99%E6%80%81-HTML)
-   [使用 Magento 缓存静态 HTML（仅限Biz和企业计划）](https://support.cloudflare.com/hc/en-us/articles/236168808)
-   [如何缓存静态HTML？](https://support.cloudflare.com/hc/en-us/articles/202775670)

请注意，Cloudflare **缓存应用**允许您清除缓存，以便将新请求发送到源站以重新获取。要了解更多信息，请参阅 [如何清除缓存？](https://support.cloudflare.com/hc/zh-cn/articles/200169246-%E4%BB%8E-Cloudflare-%E6%B8%85%E9%99%A4%E7%BC%93%E5%AD%98%E7%9A%84%E8%B5%84%E6%BA%90)
