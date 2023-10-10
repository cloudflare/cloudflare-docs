---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/115000310832-Perguntas-frequentes-sobre-Autoriza%C3%A7%C3%A3o-da-Autoridade-de-Certifica%C3%A7%C3%A3o-CAA-
title: Perguntas frequentes sobre Autorização da Autoridade de Certificação (CAA)
---

# Perguntas frequentes sobre Autorização da Autoridade de Certificação (CAA)

## Perguntas frequentes sobre Autorização da Autoridade de Certificação (CAA)

_Este artigo responde a diversas perguntas comuns sobre os registros DNS de CAA._

### Neste artigo

-   [_O que é CAA?_](https://support.cloudflare.com/hc/pt-br/articles/115000310832-Perguntas-frequentes-sobre-Autoriza%C3%A7%C3%A3o-da-Autoridade-de-Certifica%C3%A7%C3%A3o-CAA-#h_83030816011543365917896)
-   _[Como a Cloudflare avalia os registros de CAA?](https://support.cloudflare.com/hc/pt-br/articles/115000310832-Perguntas-frequentes-sobre-Autoriza%C3%A7%C3%A3o-da-Autoridade-de-Certifica%C3%A7%C3%A3o-CAA-#h_66255839481543365927385)_ 
-   [Por que devo desativar o Universal SSL se meus registros de CAA excluírem a emissão do Universal SSL?](https://support.cloudflare.com/hc/pt-br/articles/115000310832-Perguntas-frequentes-sobre-Autoriza%C3%A7%C3%A3o-da-Autoridade-de-Certifica%C3%A7%C3%A3o-CAA-#h_998474763141543365935375)
-   [_Quais registros são adicionados para manter o Universal SSL ativado?_](https://support.cloudflare.com/hc/pt-br/articles/115000310832-Perguntas-frequentes-sobre-Autoriza%C3%A7%C3%A3o-da-Autoridade-de-Certifica%C3%A7%C3%A3o-CAA-#h_645975761191543365946939)
-   [_O que acontece quando o Universal SSL está desativado?_](https://support.cloudflare.com/hc/pt-br/articles/115000310832-Perguntas-frequentes-sobre-Autoriza%C3%A7%C3%A3o-da-Autoridade-de-Certifica%C3%A7%C3%A3o-CAA-#h_217748692231543365960592)
-   [_Como faço para reativar o Universal SSL?_](https://support.cloudflare.com/hc/pt-br/articles/115000310832-Perguntas-frequentes-sobre-Autoriza%C3%A7%C3%A3o-da-Autoridade-de-Certifica%C3%A7%C3%A3o-CAA-#h_322898447261543365970663)
-   _[Quais são os perigos de se configurar registros de CAA?](https://support.cloudflare.com/hc/pt-br/articles/115000310832-Perguntas-frequentes-sobre-Autoriza%C3%A7%C3%A3o-da-Autoridade-de-Certifica%C3%A7%C3%A3o-CAA-#h_681347546281543365982388)_

___

## O que é CAA?

Um registro de Autorização da Autoridade de Certificação (CAA) permite que os proprietários de domínio restrinjam a emissão para as Autoridades de Certificação (CAs) especificadas. Os _registros de CAA_ previnem que as CAs emitam certificados sob determinadas circunstâncias.  Consulte o [RFC 6844](https://tools.ietf.org/html/rfc6844) para obter mais detalhes.

___

## Como a Cloudflare avalia os registros de CAA?

Os _registros de CAA_ são avaliados por uma CA, não pela Cloudflare.

___

## Por que devo desativar o Universal SSL se meus _registros de CAA_ excluírem a emissão do Universal SSL?

Já que os certificados Universal SSL são compartilhados entre clientes, seus _registros de CAA_ podem prevenir a emissão do Universal SSL de outro cliente. Portanto, a Cloudflare precisa desativar o Universal SSL do seu domínio para garantir que seus _registros de CAA_ não afetem outro cliente.

Se você não precisar do Universal SSL da Cloudflare, **desative o Universal SSL** no aplicativo **SSL/TLS**.

___

## Quais registros são adicionados para manter o Universal SSL ativado?

Os registros DNS a seguir são configurados automaticamente se você continuar a usar os certificados Universal SSL gratuitos da Cloudflare:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">exemplo.com. IN CAA 0 issue &quot;comodoca.com&quot;exemplo.com. IN CAA 0 issue &quot;digicert.com&quot;exemplo.com. IN CAA 0 issue &quot;letsencrypt.org&quot;exemplo.com. IN CAA 0 issuewild &quot;comodoca.com&quot;exemplo.com. IN CAA 0 issuewild &quot;digicert.com&quot;exemplo.com. IN CAA 0 issuewild &quot;letsencrypt.org&quot;</span></div></span></span></span></code></pre>{{</raw>}}

Usado isoladamente, o _issuewild_permite somente a emissão de curingas.  Portanto, a Cloudflare não pode adicionar seu domínio raiz ao certificado, a menos que você especifique a opção _Permitir curingas e nomes de host específicos_ na lista suspensa de **Tags**:

![configuring_caa_records_comodoca_annotated.png](/images/support/configuring_caa_records_comodoca_annotated.png)

___

## O que acontece quando o Universal SSL está desativado?

Seu nome de domínio é imediatamente removido do certificado Universal SSL e seus usuários verão erros de SSL, a menos que você [carregue um certificado SSL personalizado](https://support.cloudflare.com/hc/en-us/articles/200170466-How-do-I-upload-a-custom-SSL-certificate-Business-or-Enterprise-only-) (requer os planos Business ou Enterprise).

___

## Como faço para reativar o Universal SSL?

Abra um chamado de suporte junto ao suporte da Cloudflare.

___

## Quais são os perigos de se configurar registros de CAA?

Se você fizer parte de uma grande organização, ou uma organização onde várias pessoas recebem a tarefa de obter certificados SSL, inclua _registros de CAA_ que permitam a emissão para todas as CAs aplicáveis à sua organização.  Deixar de fazê-lo poderá bloquear inadvertidamente a emissão de SSL para outras partes da sua organização.
