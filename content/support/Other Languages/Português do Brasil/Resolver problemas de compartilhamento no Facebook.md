---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/217720788-Resolver-problemas-de-compartilhamento-no-Facebook
title: Resolver problemas de compartilhamento no Facebook
---

# Resolver problemas de compartilhamento no Facebook

## Resolver problemas de compartilhamento no Facebook

Saiba como evitar o bloqueio de IPs do Facebook usando o aplicativo Cloudflare **Firewall**.

___

## Visão geral

Por padrão, a Cloudflare não bloqueia ou desafia requisições do Facebook. No entanto, uma publicação de um site no Facebook retorna um erro de _Atenção necessária_ nas seguintes circunstâncias:

-   o nível de segurança está no modo [I'm Under Attack](https://support.cloudflare.com/hc/search/click?data=BAh7CjoHaWRpBN5a7gs6CXR5cGVJIgxhcnRpY2xlBjoGRVQ6CHVybEkiSC9oYy9lbi11cy9hcnRpY2xlcy8yMDAxNzAyMDYtSG93LWRvLUktZW5hYmxlLUktbS1VbmRlci1BdHRhY2stbW9kZS0GOwdGOg5zZWFyY2hfaWRJIik4YjE5YTBmNS0zNDViLTRkZmEtYmEzYy01NDk4NDlhNmZkNjEGOwdGOglyYW5raQ8%3D--12cd9c846382e475f31a1186344911da7ed54d9c) globalmente ou via [Regra de página](https://support.cloudflare.com/hc/articles/200172336); ou
-   existe um bloqueio ou desafio de firewall definido pelo usuário que inclui um endereço IP do Facebook.

Para resolver problemas de compartilhamento no Facebook:

-   remova a [regra de firewall](https://support.cloudflare.com/hc/articles/360016473712) de IP, ASN ou país correspondente ou a [regra de acesso IP](https://support.cloudflare.com/hc/articles/217074967) que desafia ou bloqueia IPs do Facebook; ou
-   inclua AS32934 e AS63293 na listas de permissões de suas [Regras de acesso IP](https://support.cloudflare.com/hc/articles/217074967), para invalidar desafios, bloqueios e desafios Under Attack.

Se você tiver problemas com o compartilhamento do Facebook, precisará extrair novamente as informações das páginas com a opção **Buscar novas informações de extração** no [Depurador de objetos](https://developers.facebook.com/tools/debug/og/object/) do Facebook.

Se ainda tiver problemas, [entre em contato com o suporte da Cloudflare](https://support.cloudflare.com/hc/articles/200172476#h_4b8753c8-f422-4c74-9e8e-07026c4da730) e tenha em mãos as seguintes informações:

-   os URLs do seu site que não podem ser compartilhados no Facebook;
-   o resultado gerado pela [ferramenta de depuração do Facebook](https://developers.facebook.com/tools/debug/og/object/);
-   confirmação que você reextraiu os URLs
