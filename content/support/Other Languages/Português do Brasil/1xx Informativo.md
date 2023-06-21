---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/115003013892-1xx-Informativo
title: 1xx Informativo
---

# 1xx Informativo

## 1xx Informativo

**Visão geral**

Os códigos 1xx geralmente são respostas provisórias para o compartilhamento de informações de status da conexão. Não se destina à solicitação final ou ação de resposta. Requisitos do servidor:

-   Respostas todas finalizadas pela primeira linha vazia após a linha de status

-   Não usado para HTTP 1.0. O servidor de origem nunca deve enviar resposta 1xx ao cliente HTTP 1.0

O Cloudflare encaminhará todas essas respostas e nunca gera essa resposta.

-   [100 Continuar](https://support.cloudflare.com/hc/pt-br/articles/115003013892-1xx-Informativo#code_100)
-   [101 Protocolos de comutação](https://support.cloudflare.com/hc/pt-br/articles/115003013892-1xx-Informativo#code_101)
-   [102 Processamento](https://support.cloudflare.com/hc/pt-br/articles/115003013892-1xx-Informativo#code_102)

**100 Continuar ( [RFC7231](https://tools.ietf.org/html/rfc7231) )**

Confirmação da solicitação inicial para enviar um corpo de resposta. O servidor de origem está disposto a aceitar a solicitação (com base nos cabeçalhos da solicitação). Normalmente retorna antes de o cliente enviar o corpo da resposta. Isso previne que os clientes enviem dados desnecessários ou inutilizáveis. Exigido do servidor: Se o cliente enviar o cabeçalho `Expect: 100-continue`, o servidor deve responder imediatamente com qualquer um `100 Continue` e continuar a ler a partir do fluxo de entrada ou enviar outro código de resposta. O Cloudflare usa conexões keep-alive, portanto, essa resposta não deve ser necessária

**101 Protocolos de comutação ( [RFC7231](https://tools.ietf.org/html/rfc7231) )**

O servidor de origem aceita a solicitação do cliente para mudar de protocolo. A solicitação do cliente continha `Upgrade` em um campo de cabeçalho ou houve uma alteração no protocolo do aplicativo sendo usado nesta conexão. Se estiver usando o campo cabeçalho Upgrade, o servidor concordou em atualizar para um protocolo mais alto na lista de prioridades do cliente do que o protocolo atual em uso. O servidor de origem também deve responder com um campo de cabeçalho `Upgrade` para indicar o(s) novo(s) protocolo(s) para o qual a conexão está sendo comutada. Supõe-se que essa opção seja vantajosa para o cliente e o servidor. O caso de uso mais comum é com websockets. Para obter informações sobre os Websockets do Cloudflare, consulte: [Cloudflare agora aceita websockets](https://blog.cloudflare.com/cloudflare-now-supports-websockets/)

**102 Processamento ( [RFC2518](https://tools.ietf.org/html/rfc2518) )**

O servidor recebeu a resposta completa do cliente, mas espera levar mais tempo para processar (por exemplo, > 20 segundos). O servidor deve enviar uma resposta final após a conclusão da solicitação. Usado apenas para HTTP 1.1 e superior.

Se o Cloudflare não receber uma resposta em 100 segundos ou menos após um 102, um erro [522: Connection Timed Out](https://support.cloudflare.com/hc/articles/115003011431#522error) será gerado. 102 respostas podem ser usadas para impedir [Erro 524: A timeout error](https://support.cloudflare.com/hc/articles/115003011431#524error).
