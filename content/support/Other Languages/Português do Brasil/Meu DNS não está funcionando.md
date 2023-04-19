---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/217912538-Meu-DNS-n%C3%A3o-est%C3%A1-funcionando
title: Meu DNS não está funcionando
---

# Meu DNS não está funcionando

## Meu DNS não está funcionando

_Este artigo descreve os motivos pelos quais o DNS pode não funcionar para um domínio e fornece as etapas para solucionar o problema._

___

## Sintomas

Em navegadores web como o Safari ou o Chrome, existem vários erros de DNS que habitualmente são observados:

-   _Esse site não pode ser acessado_
-   _Essa página não está disponível_
-   _err\_name\_not\_resolved_
-   _Não foi possível localizar o servidor_
-   [_Erro 1001, erro de resolução de DNS_](https://support.cloudflare.com/hc/articles/360029779472#error1001)

___

## Causas e resoluções comuns

Abaixo estão as causas mais comuns de erros de resolução de DNS e as soluções sugeridas.

### Erros de digitação no nome do domínio ou subdomínio

Verifique se os nomes do domínio ou subdomínio foram digitados corretamente no URL solicitado.

### Registros DNS ausentes

Verifique se você tem os registros DNS necessários no aplicativo de **DNS** do seu painel na Cloudflare. Isso inclui ter os seguintes registros:

-   O domínio raiz (por exemplo, _example.com_)
-   Quaisquer subdomínios existentes (por exemplo, _www.example.com, blog.example.com_ etc.)

Saiba mais sobre como configurar [registros DNS](/dns/manage-dns-records/how-to/create-dns-records) A e CNAME.

### O DNSSEC não foi desativado antes de o domínio ter sido adicionado à Cloudflare

As falhas de resolução de DNS vão ocorrer se o [DNSSEC não tiver sido desabilitado](https://support.cloudflare.com/hc/articles/205359838#h_94453043811540417238269) no provedor de domínio antes de você adicionar o domínio à Cloudflare.

### Os nameservers não estão mais apontando para a Cloudflare

Se você gerencia os registros DNS por meio do aplicativo de **DNS** no painel de controle da Cloudflare e seu domínio parar de apontar para os nameservers da Cloudflare, a resolução de DNS será interrompida.  Isso poderá ocorrer se o registrador alternar os nameservers do seu domínio para que passem a apontar para seus próprios nameservers padrão. Para confirmar se é esse o seu problema, [verifique se o seu domínio usa os nameservers da Cloudflare](https://support.cloudflare.com/hc/articles/4426809598605).

### Endereço de IP não resolvido

Raramente, pode ocorrer que o resolvedor de DNS do cliente que está solicitando o URL falhe ao resolver um registro DNS para um endereço de IP válido.  Recarregue a página após alguns minutos para ver se o problema desaparece. Esse problema não tem relação com a Cloudflare, mas utilizar o [resolvedor de DNS da Cloudflare](/1.1.1.1/setup/) pode ajudar. Entre em contato com o seu provedor de hospedagem para obter mais ajuda com o seu resolvedor de DNS atual.
