---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/115000546328-Solu%C3%A7%C3%A3o-de-problemas-no-Rate-Limiting-da-Cloudflare
title: Solução de problemas no Rate Limiting da Cloudflare
---

# Solução de problemas no Rate Limiting da Cloudflare

## Solução de problemas no Rate Limiting da Cloudflare

_Solucione problemas comuns que evitam correspondências adequadas de solicitação de Rate Limiting, além de causar erros por meio da API da Cloudflare._

___

## Visão geral

Alguns problemas comuns de configuração de **Rate Limiting** evitam correspondências adequadas da solicitação:

-   **Incluir esquemas de protocolo HTTP ou HTTPS em padrões de regras** (como _https://example.com/\*_). Para restringir regras para corresponder apenas ao tráfego HTTP ou HTTPS, use a matriz de esquemas na correspondência de solicitação, por exemplo, _"schemes": \[ "HTTPS" \]_
-   **Esquecer um caractere de barra à direita (/)**. O **Rate Limiting** da Cloudflare trata apenas solicitações para a página inicial (como _example.com_ e _example.com/_) como equivalentes, mas não qualquer outro caminho (como _example.com/path/_ e _example.com/path_)_._ Para corresponder caminhos de solicitação com e sem a barra à direita, use uma correspondência curinga (como _example.com/path\*_) 
-   **Incluir uma sequência de consulta ou âncora** (como _example.com/path?foo=bar_ ou _example.com/path#section_). Uma regra como _example.com/path_ corresponderá solicitações para _example.com/path?foo=bar_.
-   **Substituir uma limitação de taxa por** [**Regras do Access para IP**](https://support.cloudflare.com/hc/articles/217074967)**.**
-   **Incluir um número de porta** (como _exemplo.com:8443/api/_). O produto Rate Limiting não considera os números de porta dentro das regras. Isso afeta as regras. Ao remover o número da porta da URL, a regra da limitação de taxa será acionada como esperado.

Além disso, há alguns erros comuns que evitam a configuração do **Rate Limiting** por meio da API da Cloudflare:  

-   _A decodificação ainda não foi implementada_ – indica que sua solicitação não possui o cabeçalho _Content-Type: application/json_. Adicione o cabeçalho à sua solicitação de API para corrigir o problema.
-   _Ratelimit.api.not\_entitled_ – os clientes Empresariais precisam contatar a Equipe de Conta da Cloudflare antes de adicionar regras.
-   Outros erros são documentados na [documentação da API](https://api.cloudflare.com/#rate-limits-for-a-zone-errors). Se você não tiver certeza sobre um erro específico, [entre em contato com o Suporte da Cloudflare](https://support.cloudflare.com/hc/articles/200172476) e forneça a solicitação de API com falha após a edição da chave da API.

___

## Limitações

A Rate Limiting foi projetada para limitar os picos de tráfego que excedam uma taxa definida pelo usuário. O sistema não foi projetado para permitir que um número exato de solicitações atinja o servidor de origem. Pode haver casos em que um atraso é introduzido entre detectar a solicitação e atualizar o contador interno. Devido a esse atraso (que pode ser de até alguns segundos), solicitações em excesso ainda podem alcançar a origem antes que uma ação seja imposta na borda (como bloqueio ou desafio).

___

## Recursos relacionados

-   [Como configurar o Rate Limiting da Cloudflare](https://support.cloudflare.com/hc/articles/115001635128)
