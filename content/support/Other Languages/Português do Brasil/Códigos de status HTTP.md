---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/115003014432-C%C3%B3digos-de-status-HTTP
title: Códigos de status HTTP
---

# Códigos de status HTTP

## Códigos de status HTTP

## Visão geral

Os códigos de status abaixo detalham como o Cloudflare interpreta o protocolo de rastreamento de padrões da Internet para códigos de resposta HTTP. Consulte a edição atual das “Normas Oficiais para Protocolo da Internet” (STD 1) para ficar por dentro questões de padronização desse protocolo.

Todo código de status HTTP que, por padrão, puder ser armazenado em cache, também poderá ser armazenado em cache pelo Cloudflare, a não quer a definição do método ou os controles de armazenamento em cache explícitos indiquem algo diferente. O Cloudflare armazena em cache as respostas HTTP da mesma forma que qualquer solicitação é armazenada em cache. Ele leva em consideração as regras da página, TTL de borda e os cabeçalhos de origem na hora de decidir se deve armazenar em cache.

___

## Termos referentes aos códigos de status HTTP

Os termos usados ao descrever os códigos de status HTTP do Cloudflare são os seguintes:

### servidor

Qualquer entidade que recebe uma solicitação e envia uma resposta — servidores de origem ou intermediários.

### Servidor de origem

O servidor de destino final. Na verdade, esse servidor hospeda o conteúdo do site.

### Servidor proxy

Os servidores que ficam entre o servidor de origem e o cliente. O Cloudflare é um servidor proxy, por exemplo.

### Cliente

Quem faz o pedido. Normalmente, um usuário final acessa o site em um navegador, mas também pode ser um cliente de API ou qualquer pessoa que solicite recursos do site.

### Back-end

As conexões não feitas para ou a partir do cliente, mas entre os servidores proxy e/ou servidor de origem

### User-Agent

A máquina usada para enviar a solicitação. Pode ser um navegador ou outro programa que faz solicitações (por exemplo, solicitações de API repousantes)

### Payload

Os dados de resposta ou solicitação que excluem os cabeçalhos. Também chamado de corpo de resposta/solicitação.

___

-   [1xx Informativo](https://support.cloudflare.com/hc/en-us/articles/115003013892/)
-   [2xx Sucesso](https://support.cloudflare.com/hc/en-us/articles/115003014192)
-   [3xx Redirecionamento](https://support.cloudflare.com/hc/en-us/articles/115003011091/)
-   [4xx Erro no cliente](https://support.cloudflare.com/hc/en-us/articles/115003014512/)
-   [5xx Erro no servidor](https://support.cloudflare.com/hc/en-us/articles/115003011431/)

___

## Recursos relacionados

-   [Como posso informar à Cloudflare o que eu quero armazenar em cache?](https://support.cloudflare.com/hc/en-us/articles/202775670-How-Do-I-Tell-CloudFlare-What-to-Cache-)
-   [O que é edge TTL?](https://support.cloudflare.com/hc/articles/218411427#summary-of-page-rules-settings)
