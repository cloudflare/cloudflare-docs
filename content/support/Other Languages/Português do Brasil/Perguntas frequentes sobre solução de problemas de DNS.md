---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/360020296512-Perguntas-frequentes-sobre-solu%C3%A7%C3%A3o-de-problemas-de-DNS
title: Perguntas frequentes sobre solução de problemas de DNS
---

# Perguntas frequentes sobre solução de problemas de DNS

## Perguntas frequentes sobre solução de problemas de DNS

_Este artigo fornece orientações sobre como solucionar preocupações comuns relativas ao DNS da Cloudflare._

### Neste artigo

-   [Por que tenho um subdomínio dc-#########?](https://support.cloudflare.com/hc/pt-br/articles/360020296512-Perguntas-frequentes-sobre-solu%C3%A7%C3%A3o-de-problemas-de-DNS#h_84167303211544035341530)
-   [Por que as consultas de DNS estão retornando resultados incorretos?](https://support.cloudflare.com/hc/pt-br/articles/360020296512-Perguntas-frequentes-sobre-solu%C3%A7%C3%A3o-de-problemas-de-DNS#h_62993872051544035354776)
-   [Nenhum registro A, AAAA ou CNAME foi encontrado?](https://support.cloudflare.com/hc/pt-br/articles/360020296512-Perguntas-frequentes-sobre-solu%C3%A7%C3%A3o-de-problemas-de-DNS#h_75993570981544035362746)
-   [Por que eu recebi um e-mail: Seus nameservers mudaram?](https://support.cloudflare.com/hc/pt-br/articles/360020296512-Perguntas-frequentes-sobre-solu%C3%A7%C3%A3o-de-problemas-de-DNS#h_752983037101544035373001)
-   [Por que não posso adicionar certos TLDs através da API de DNS?](https://support.cloudflare.com/hc/pt-br/articles/360020296512-Perguntas-frequentes-sobre-solu%C3%A7%C3%A3o-de-problemas-de-DNS#h_84167303211544035341531)

___

## Por que tenho um subdomínio dc-#########?

O subdomínio dc-##### é adicionado para superar um conflito criado quando seu _registro MX_  ou SRV determina um domínio configurado para fazer proxy para a Cloudflare.

Portanto, a Cloudflare criará um registro DNS dc-##### que determina o endereço de IP de origem. O registro dc-##### garante que o tráfego para o seu registro MX ou SRV não seja sujeito a proxy (ele determina diretamente para o seu IP de origem), enquanto o proxy da Cloudflare funciona para todo o tráfego restante.

Por exemplo, suponha que, antes de usar a Cloudflare, seus registros DNS para e-mail são os seguintes:

`example.com MX example.com``example.com A 192.0.2.1`

Após usar a Cloudflare e fazer proxy para o _registro A_, a Cloudflare fornecerá respostas de DNS com um IP da Cloudflare (203.0.113.1 no exemplo abaixo):

`example.com MX example.com``example.com A 203.0.113.1`

Como fazer proxy do tráfego de e-mail para a Cloudflare interromperia seus serviços de e-mail, a Cloudflare detecta essa situação e cria um registro dc-#####:

`example.com MX dc-1234abcd.example.com``dc-1234abcd.example.com A 192.0.2.1` `example.com A 203.0.113.1`

Remover o registro dc-###### é possível somente por meio de um desses métodos:

-   Se nenhum e-mail for recebido para o domínio, exclua o _registro MX._
-   Se um e-mail for recebido para o domínio, atualize o _registro MX_ para determinar um _registro A_ separado no caso de um subdomínio de e-mail que não esteja sujeito a proxy pela Cloudflare:

`example.com MX mail.example.com``mail.example.com A 192.0.2.1``example.com A 203.0.113.1`

___

## Por que as consultas de DNS estão retornando resultados incorretos?

As ferramentas de terceiros podem, às vezes, não retornar os resultados corretos de DNS se um cache de DNS recursivo não atualizar. Nessa circunstância, limpe seu cache de DNS público por meio dos seguintes métodos:

-   [Como limpar seu cache de DNS no OpenDNS](http://www.opendns.com/support/cache/)
-   [Como limpar seu cache de DNS no Google](https://developers.google.com/speed/public-dns/cache)
-   [Como limpar seu cache de DNS localmente](https://documentation.cpanel.net/display/CKB/How%2BTo%2BClear%2BYour%2BDNS%2BCache)

___

## Nenhum registro A, AAAA ou CNAME foi encontrado?

_Se nenhum registro A, AAAA ou CNAME for encontrado_, isso significa que o aplicativo de **DNS** da Cloudflare não possui os registros adequados para a resolução de DNS.

[Adicione os registros DNS faltantes](/dns/manage-dns-records/how-to/create-dns-records) ao seu domínio.

___

## Por que eu recebi um e-mail: Seus nameservers mudaram?

Para domínios onde a Cloudflare hospeda o DNS, a Cloudflare verifica continuamente se o domínio utiliza os nameservers da Cloudflare para a resolução DNS. Se os nameservers da Cloudflare não forem utilizados, o status do domínio é atualizado de _Ativo_ para _Movido_ no aplicativo **Overview** da Cloudflare e um e-mail é enviado para o cliente.  Qualquer domínio _Movido_ por mais de 7 dias é excluído, a menos que o domínio se torne novamente _Ativo_.

As etapas para resolver o problema exigem a atualização do DNS no registrador para que passe a utilizar os nameservers da Cloudflare:

1.  Siga as etapas 2 e 3 do nosso [artigo sobre solução de problemas de domínio](https://support.cloudflare.com/hc/en-us/articles/221327488-Why-was-my-domain-deleted-from-Cloudflare-).
2.  Clique **Verificar novamente agora** no aplicativo **Overview** da interface de usuário da Cloudflare.

___

## Por que não posso adicionar certos TLDs através da API de DNS?

A API de DNS não pode ser usada para domínios com .cf, .ga, .gq, .ml, ou .tk TLDs. Use o Painel de controle da Cloudflare para gerenciar tais TLDs. Os clientes do plano Enterprise podem [contatar o suporte da Cloudflare](https://support.cloudflare.com/hc/articles/200172476#h_4b8753c8-f422-4c74-9e8e-07026c4da730) para remover esta limitação.
