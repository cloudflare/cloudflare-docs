---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/360020991331-Como-adicionar-%C3%A0-Cloudflare-os-registros-DNS-espec%C3%ADficos-de-cada-fornecedor
title: Como adicionar à Cloudflare os registros DNS específicos de cada fornecedor
---

# Como adicionar à Cloudflare os registros DNS específicos de cada fornecedor

-   [Como delegar subdomínios fora da Cloudflare](https://support.cloudflare.com/hc/pt-br/articles/360021357131-Como-delegar-subdom%C3%ADnios-fora-da-Cloudflare "Como delegar subdomínios fora da Cloudflare")
-   [Como adicionar à Cloudflare os registros DNS específicos de cada fornecedor](https://support.cloudflare.com/hc/pt-br/articles/360020991331-Como-adicionar-%C3%A0-Cloudflare-os-registros-DNS-espec%C3%ADficos-de-cada-fornecedor "Como adicionar à Cloudflare os registros DNS específicos de cada fornecedor")

## Como adicionar à Cloudflare os registros DNS específicos de cada fornecedor

_Este artigo descreve como adicionar registros DNS à Cloudflare para oferecer suporte a vários softwares de terceiros, incluindo Google Cloud, Amazon S3, Microsoft Azure, ClickFunnels, WPEngine e Zoho._

___

## Como adicionar registros DNS para fornecedores

Este artigo requer conhecimento prévio do gerenciamento de registros DNS por meio do painel da Cloudflare.  Para saber mais, consulte o artigo da Cloudflare sobre [como gerenciar registros DNS](https://support.cloudflare.com/hc/en-us/articles/360019093151).

  
**Google**

Adicione os seguintes registros MX:

| **Nome** | **TTL** | **Tipo de Registro** | **Prioridade** | **Destino** |
| --- | --- | --- | --- | --- |
| @ | Auto | MX | 1 | ASPMX.L.GOOGLE.COM |
| @ | Auto | MX | 5 | ALT1.ASPMX.L.GOOGLE.COM |
| @ | Auto | MX | 5 | ALT2.ASPMX.L.GOOGLE.COM |
| @ | Auto | MX | 10 | ALT3.ASPMX.L.GOOGLE.COM |
| @ | Auto | MX | 10 | ALT4.ASPMX.L.GOOGLE.COM |

Depois de adicionados, os registros DNS são semelhante ao que se vê a seguir no aplicativo de **DNS** da Cloudflare:

[Teste a configuração](https://toolbox.googleapps.com/apps/checkmx/check)de e-mail do Google Apps.

Adicione um _registro CNAME_ do Google App Engine ao DNS da Cloudflare.

Por exemplo, se o domínio for _www.exemplo.com_, o _registro CNAME_ será algo como:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">www  CNAME  ghs.googlehosted.com</span></div></span></span></span></code></pre>{{</raw>}}

Para configurar um redirecionamento para um domínio do Google Apps, consulte o [guia do Google para encaminhamento de URLs](https://support.google.com/a/answer/53340?hl=en).

**Amazon**

Os clientes da AWS devem atualizar os nameservers do seu domínio para que apontem para os nameservers da Cloudflare listados no aplicativo **Overview** do painel da Cloudflare:

1.  Faça login na AWS.
2.  Clique em **Minha Conta** no canto superior direito da barra de navegação.
3.  Selecione o **Console de Gerenciamento da AWS** na lista suspensa.
4.  Clique em **Serviços** e selecione **Route 53**.
5.  Atualize os nameservers em dois lugares:
    
    -   Clique em **Hosted zones** e selecione o domínio a ser atualizado com os nameservers da Cloudflare.
    -   Edite os nameservers para que apontem para os nameservers da Cloudflare.
    
      
    -   Clique em **Domínios registrados**.
    -   Selecione o domínio a ser atualizado com os nameservers da Cloudflare.
    -   Clique em **Adicionar ou editar nameservers**.

Consulte a documentação da Amazon sobre como [c](https://docs.aws.amazon.com/quickstarts/latest/s3backup/step-1-create-bucket.html)[riar um bucket do Amazon S3](https://docs.aws.amazon.com/quickstarts/latest/s3backup/step-1-create-bucket.html).

Observe o URL completo do host atribuído ao bucket.

Adicione um _registro CNAME_ para o bucket da AWS no DNS da Cloudflare. Por exemplo, se o URL completo do host do bucket for _files.exemplo.com_, adicione um _registro CNAME_ similar ao seguinte:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">files  CNAME  files.exemplo.com.s3.amazonaws.com</span></div></span></span></span></code></pre>{{</raw>}}

Consulte a documentação da Amazon sobre o [SES e as configurações de verificação](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/easy-dkim.html).

Localize os registros de verificação de _TXT_ e de _CNAME_ fornecidos pela Amazon.

Adicione os registros ao DNS da Cloudflare.  Por exemplo, se o domínio da Cloudflare for _exemplo.com_, os registros DNS seão similares ao seguinte:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">exemplo.com  TXT  &quot;fmxqxT/icOYx4aA/bEUrDPMeax9/s3frblS+niixmqk=&quot;verificationstring._domainkey.exemplo.com  CNAME  verificationstring.dkim.amazonses.com</span></div></span></span></span></code></pre>{{</raw>}}

Consulte o [conteúdo da ajuda do ELB da Amazon](http://docs.amazonwebservices.com/ElasticLoadBalancing/latest/DeveloperGuide/using-domain-names-with-elb.html) para obter orientações sobre a configuração do ELB na Amazon.

1.  Adicione um _registro CNAME_ à Cloudflare para o hostname; por exemplo: _elb_
2.  No aplicativo de **DNS** da Cloudflare, substitua o **nome de domínio** pelo destino do ELB:  
    _  
    <hostname AWS>.<região>._elb.amazonaws.com é o formato adequado do destino do _CNAME_  
    (por exemplo: _my-cool-cachepp-1344276401.eu-west-1._elb.amazonaws.com).
3.  Consulte o suporte da AWS para determinar o _hostname_ ou a _região_ da AWS.

**Microsoft**

**Fornecedores diversos**

Veja os exemplos abaixo para adicionar os registros DNS do Zoho corretos à Cloudflare. Em todos os exemplos, substitua _exemplo.com_ pelo nome de domínio real:

-   Adicione os _registros MX_ do Zoho:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">exemplo.com  MX  mx.zohomail.com (configurar a Prioridade para 10)exemplo.com  MX  mx2.zohomail.com (configurar a Prioridade para 20)</span></div></span></span></span></code></pre>{{</raw>}}

-   (Opcional) Adicionar um _registro SPF_:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">exemplo.com  TXT  v=spf1 mx include:zoho.com ~all</span></div></span></span></span></code></pre>{{</raw>}}

-   (Opcional) Para acessar e-mails por meio de um [URL personalizado do Zoho](https://adminconsole.wiki.zoho.com/domains/CustomURL.html), adicione um _registro CNAME_:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">mail  CNAME  business.zoho.com</span></div></span></span></span></code></pre>{{</raw>}}

-   (Opcional) Para adicionar um [registro de validação de domínio do Zoho](https://www.zoho.com/mail/help/adminconsole/domain-verification.html):


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">zb******** CNAME  business.zoho.com</span></div></span></span></span></code></pre>{{</raw>}}

Geralmente, os registros DNS são similares aos da lista abaixo. Substitua _exemplo.com_ pelo nome de domínio real:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">email  CNAME  sendgrid.netexemplo.com  SPF  v=spf1 a mx include:sendgrid.net ~allexemplo.com  TXT  v=spf1 a mx include:sendgrid.net ~allmtpapi._domainkey.EXEMPLO.com  CNAME  dkim.sendgrid.net.smtpapi._domainkey.e.EXEMPLO.COM  CNAME  dkim.sendgrid.net</span></div></span></span></span></code></pre>{{</raw>}}

-   Consulte a [documentação do WPEngine](http://wpengine.com/support/how-to-configure-your-dns/) sobre configuração de DNS.
-   Determine se você deseja adicionar um _registro A_ ou _CNAME_ ao DNS da Cloudflare:  
    [Como localizar seu endereço IP no WPEngine](http://wpengine.com/support/find-ip/)

  

-   Consulte a documentação da Cloudflare sobre [como gerenciar registros DNS](https://support.cloudflare.com/hc/en-us/articles/360019093151) para obter detalhes sobre como adicionar os registros.

Consulte a documentação do Ning sobre [domínios personalizados e entradas de DNS](http://www.ning.com/help/?p%3D2870).

Se o domínio personalizado do Ning for _www.exemplo.com_, adicione um _CNAME_ e um _registro A_ da seguinte maneira:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">www.exemplo.com  CNAME  exemplo.ning.com.exemplo.ning.com  A  208.82.16.68</span></div></span></span></span></code></pre>{{</raw>}}

Após o Ning verificar o domínio, altere o ícone de nuvem cinza dos registros DNS do Ning para uma nuvem laranja para que o tráfego possa fazer proxy para a Cloudflare.

Consulte a documentação do SmugMug para obter os dados mais recentes sobre os requisitos de registro DNS. Geralmente, adicione os _registros CNAME_ do SmugMug similares ao seguinte:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">photo  CNAME  domains.smugmug.comphotos  CNAME  domains.smugmug.com</span></div></span></span></span></code></pre>{{</raw>}}

Após o SmugMug verificar o domínio, altere o ícone de nuvem cinza dos registros DNS do SmugMug para uma nuvem laranja para que o tráfego possa fazer proxy para a Cloudflare.

Consulte o [artigo do Mandrill sobre registros DNS](http://help.mandrill.com/entries/22030056-How-do-I-add-DNS-records-for-my-sending-domains-) para obter os dados mais recentes sobre os requisitos de registro DNS.

O Mandrill requer o acréscimo de registros _SPF_ e _DKIM_. Obtenha os valores de registro DNS no site do Mandrill.

Adicione os registros _SPF_ e _DKIM_ como _registros TXT_ no aplicativo de DNS da Cloudflare.

Por exemplo, se o domínio do Mandrill for _exemplo.com_ adicione registros DNS similares ao seguinte:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">exemplo.com  TXT  v=spf1 include:spf.mandrillapp.com ?allmandrill._domainkey.exemplo.com  TXT  v=DKIM1\; (valores do Mandrill)</span></div></span></span></span></code></pre>{{</raw>}}

Configure o Cloud Files do Rackspace por meio do _registro CNAME_. Consulte a [documentação do Cloud Files do Rackspace](http://www.rackspace.com/knowledge_center/article/how-can-i-use-cnames-with-a-cloud-files-container)[.](http://www.rackspace.com/knowledge_center/article/how-can-i-use-cnames-with-a-cloud-files-container)

Confirme o destino _CNAME_ correto com o suporte do Rackspace.

Um exemplo de _registro CNAME_ se parece com o seguinte:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">rack  CNAME  e0978.r18.cf2.rackcdn.com</span></div></span></span></span></code></pre>{{</raw>}}

Se _exemplo.com_ for o domínio personalizado, adicionar à Cloudflare registros DNS parecidos com esses abaixo:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">exemplo.com  A  66.6.44.4www.exemplo.com  CNAME  domains.tumblr.com</span></div></span></span></span></code></pre>{{</raw>}}

___

## Recursos relacionados

[Como gerenciar os registros DNS na Cloudflare](https://support.cloudflare.com/hc/en-us/articles/360019093151)

[CNAME Flattening](https://support.cloudflare.com/hc/en-us/articles/200169056-CNAME-Flattening-RFC-compliant-support-for-CNAME-at-the-root)
