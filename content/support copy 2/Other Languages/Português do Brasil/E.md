---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/200168876-E-mails-que-n%C3%A3o-podem-ser-entregues-quando-a-Cloudflare-est%C3%A1-sendo-usada
title: E-mails que não podem ser entregues quando a Cloudflare está sendo usada
---

# E-mails que não podem ser entregues quando a Cloudflare está sendo usada

## E-mails que não podem ser entregues quando a Cloudflare está sendo usada

_A configuração padrão da Cloudflare só permite o proxy de tráfego de HTTP e interromperá o tráfego de e-mails._

___

## Dicas de solução de problemas

Se você estiver seguindo as [melhores práticas de registros MX na Cloudflare](https://support.cloudflare.com/hc/pt-br/articles/200168876-E-mails-que-n%C3%A3o-podem-ser-entregues-quando-a-Cloudflare-est%C3%A1-sendo-usada#h.sf43uhyy1ztk) e ainda tiver problemas para enviar ou receber e-mails, siga essas etapas de solução de problemas:

### Os registros DNS estão faltando?

Entre em contato com o administrador de e-mails para confirmar se os registros DNS do domínio estão corretos. Consulte nosso guia sobre [como gerenciar registros DNS na Cloudflare](https://support.cloudflare.com/hc/en-us/articles/360019093151) se precisar de ajuda para adicionar ou editar registros DNS.

###   
Não faça proxy de registros DNS relacionados a e-mails para a Cloudflare.

Se você tiver um _registro MX_ de "mail.domain.com", o _registro A_ para "mail.domain.com" deve ter um ícone de "nuvem cinza" ao lado do _registro A_ do DNS, conforme demonstrado no nosso guia de suporte sobre [como gerenciar registros DNS na Cloudflare.](https://support.cloudflare.com/hc/en-us/articles/360019093151)

### Entre em contato com o seu provedor de e-mails para obter ajuda.

Se seu e-mail não funcionar logo após a edição dos registros DNS, entre em contato com o seu administrador de e-mails ou provedor de e-mails para obter mais ajuda para solucionar o problema e para que os dados referentes ao problema possam ser fornecidos ao suporte da Cloudflare.

___

## Melhores práticas de registros MX na Cloudflare

Siga essas orientações para garantir a entrega bem-sucedida do seu tráfego de e-mail:

-   Coloque uma “nuvem cinza” nos seus registros DNS relacionados a e-mails para que o tráfego de e-mails não faça proxy por meio da Cloudflare.
-   Use endereços IP separados para o tráfego de e-mails e o tráfego de HTTP/HTTPS. A Cloudflare recomenda o uso de IPs não contíguos de diferentes faixas de IP.
-   Como o tráfego de e-mails, por padrão, não pode fazer proxy por meio da Cloudflare, você vai expor o endereço IP do seu servidor web de origem. As informações sobre o seu endereço IP de origem permitirão que os invasores ignorem as recursos de segurança da Cloudflare e ataquem diretamente o seu servidor web.
-   Não configure os _registros MX_ para um domínio raiz que faça proxy por meio da Cloudflare.
-   Muitas empresas de hospedagem especificam o nome do domínio raiz no conteúdo do _registro MX_. Quando estiver usando o DNS da Cloudflare, especifique um subdomínio tal como "mail.exemplo.com" no conteúdo _do registro MX_ e crie um _registro A_ separado na Cloudflare para que o "mail.exemplo.com" aponte para o endereço IP do servidor de e-mails.
