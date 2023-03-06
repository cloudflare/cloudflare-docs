---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/115003014512-4xx-Erro-no-cliente
title: 4xx Erro no cliente
---

# 4xx Erro no cliente

**Visão geral**

Os códigos 4xx geralmente são respostas de erro, especificando um problema no lado do cliente. Possivelmente um problema de rede.  

-   Pode ser usado como resposta a qualquer método de solicitação

-   O servidor de origem deve incluir uma explicação e a explicação que deve ser exibida pelo User-Agent, com a exceção de uma `solicitação` de HEAD

A Cloudflare transmitirá esses erros diretamente do seu servidor de origem

-   [400 Bad Request](https://support.cloudflare.com/hc/pt-br/articles/115003014512-4xx-Erro-no-cliente#code_400)  
-   [401 Unauthorized](https://support.cloudflare.com/hc/pt-br/articles/115003014512-4xx-Erro-no-cliente#code_401)
-   [402 Payment Required](https://support.cloudflare.com/hc/pt-br/articles/115003014512-4xx-Erro-no-cliente#code_402)
-   [403 Forbidden](https://support.cloudflare.com/hc/pt-br/articles/115003014512-4xx-Erro-no-cliente#code_403)
-   [404 Not Found](https://support.cloudflare.com/hc/pt-br/articles/115003014512-4xx-Erro-no-cliente#code_404)
-   [405 Method Not Allowed](https://support.cloudflare.com/hc/pt-br/articles/115003014512-4xx-Erro-no-cliente#code_405)
-   [406 Not Acceptable](https://support.cloudflare.com/hc/pt-br/articles/115003014512-4xx-Erro-no-cliente#code_406)
-   [407 Authentication Required](https://support.cloudflare.com/hc/pt-br/articles/115003014512-4xx-Erro-no-cliente#code_407)  
-   [408 Request Timeout](https://support.cloudflare.com/hc/pt-br/articles/115003014512-4xx-Erro-no-cliente#code_408)  
-   [409 Conflict](https://support.cloudflare.com/hc/pt-br/articles/115003014512-4xx-Erro-no-cliente#code_409)
-   [410 Gone](https://support.cloudflare.com/hc/pt-br/articles/115003014512-4xx-Erro-no-cliente#code_410)
-   [411 Length Required](https://support.cloudflare.com/hc/pt-br/articles/115003014512-4xx-Erro-no-cliente#code_411)
-   [412 Precondition Failed](https://support.cloudflare.com/hc/pt-br/articles/115003014512-4xx-Erro-no-cliente#code_412)  
-   [413 Payload Too Large](https://support.cloudflare.com/hc/pt-br/articles/115003014512-4xx-Erro-no-cliente#code_413)
-   [414 URI Too Long](https://support.cloudflare.com/hc/pt-br/articles/115003014512-4xx-Erro-no-cliente#code_414)
-   [415 Unsupported Media Type](https://support.cloudflare.com/hc/pt-br/articles/115003014512-4xx-Erro-no-cliente#code_415)
-   [417 Expectation Failed](https://support.cloudflare.com/hc/pt-br/articles/115003014512-4xx-Erro-no-cliente#code_417)
-   [429 Too Many Requests](https://support.cloudflare.com/hc/pt-br/articles/115003014512-4xx-Erro-no-cliente#code_429)
-   [451 Unavailable For Legal](https://support.cloudflare.com/hc/pt-br/articles/115003014512-4xx-Erro-no-cliente#code_451)
-   [499 Client Close Request](https://support.cloudflare.com/hc/pt-br/articles/115003014512-4xx-Erro-no-cliente#code_499)

**400 Bad Request**  **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

O servidor não pode ou não processará a solicitação devido a algo que é percebido como um erro do cliente (por exemplo, sintaxe de solicitação malformada, enquadramento inválido da mensagem de solicitação ou roteamento enganoso da solicitação).

**401 Unauthorized (**[**RFC 7235**](https://tools.ietf.org/html/rfc7235)**)**

A solicitação não foi enviada com as credenciais de autenticação adequadas

-   O servidor deve enviar com pelo menos um desafio na forma de um campo de um cabeçalho `WWW-Authenticate` de acordo com a [Seção 4.1](https://tools.ietf.org/html/rfc7235#section-4.1)
-   O cliente pode enviar uma segunda solicitação com as mesmas credenciais e se o desafio for idêntico ao anterior, uma entidade será fornecida pelo servidor para ajudar o cliente a descobrir quais credenciais são necessárias.

**402 Payment Required** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Ainda não implementado pelos padrões de RFC, mas reservado para uso futuro

**403 Forbidden** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Se você estiver vendo um erro 403 sem a marca da Cloudflare, isso sempre significa que foi retornado diretamente pelo servidor de origem, não pela Cloudflare, e geralmente está relacionado às regras de permissão no seu servidor.

As principais razões para esse erro são:  
1\. Regras de permissão que você definiu ou um erro nas regras .htaccess que você configurou  
2\. Regras de Mod\_security.  
3\. Regras de negação de IP

Já que a Cloudflare não pode acessar seu servidor diretamente, entre em contato com o seu provedor de hospedagem para obter ajuda na solução de erros 403 e na correção das regras. Você deve se certificar de que os [IPs da Cloudflare](https://www.cloudflare.com/ips) não estejam sendo bloqueados. 

A Cloudflare irá veicular respostas 403 se a solicitação violar uma regra de WAF padrão ativada para todos os domínios Cloudflare com nuvens laranja ou uma regra WAF ativada para a zona específica. Leia mais em[O que faz o Web Application Firewall?](https://support.cloudflare.com/hc/en-us/articles/200172016) A Cloudflare também irá veicular uma resposta 403 Forbidden para conexões SSL com sub/domínios que não são cobertos por nenhum certificado da Cloudflare ou certificado SSL carregado.

Se você estiver vendo uma resposta 403 que contém a marca da Cloudflare no corpo da resposta, esse é o código de resposta HTTP retornado junto com vários de nossos recursos de segurança:

-   Desafio do Web Application Firewall e bloqueio de páginas
-   Desafios no nível de proteção básica
-   A maioria dos códigos de erro 1xxx da Cloudflare
-   O Browser Integrity Check (verificação de integridade do navegador)
-   Se você estiver tentando acessar um segundo nível de subdomínios (por exemplo: `*.*.Exemplo.com`) por meio da Cloudflare usando um certificado emitido pela Cloudflare, um erro HTTP 403 será visto no navegador, pois esses nomes de host não estão presentes no certificado.

Se tiver dúvidas, entre em contato com o Suporte da Cloudflare e inclua uma captura de tela da mensagem exibida ou copie todo o texto da página em um chamado de suporte.

**404 Not Found** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

O servidor de origem não conseguiu ou não quis localizar o recurso solicitado. Isso geralmente significa que o servidor de hospedagem não conseguiu localizar o recurso. Para veicular uma versão mais permanente desse erro, deve ser usado um código de erro 410.

Esses erros geralmente ocorrem quando alguém digita um URL errado no seu site, quando há um link quebrado de uma outra página, quando uma página que existia anteriormente foi transferida ou removida ou quando um mecanismo de busca indexa o seu site. Para um site típico, esses erros são responsáveis por c. 3% do total de visualizações de página, mas geralmente não são rastreados pelas plataformas de análise tradicionais como o Google Analytics.

Os proprietários de sites geralmente implementam uma página personalizada para ser veiculada quando esse erro é gerado. Por exemplo, [Como implementar páginas 404 personalizadas no Apache](https://www.digitalocean.com/community/tutorials/how-to-create-a-custom-404-page-in-apache).

A Cloudflare não gera erros 404 para sites de clientes, apenas fazemos proxy da solicitação vinda do servidor de origem. Ao visualizar um erro 404 para o seu site alimentado pela Cloudflare, você deve entrar em contato com o seu provedor de hospedagem para obter ajuda.

**405 Method Not Allowed** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

O servidor de origem está ciente do recurso solicitado, mas o método de solicitação utilizado não é compatível.

-   O servidor de origem também precisa enviar um cabeçalho `Allow` com uma lista de destinos compatíveis para esse recurso.

Um exemplo disso seria um POST em um recurso imutável que, portanto, aceita apenas GET.

**406 Not Acceptable** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

O recurso não está disponível no servidor de origem que adere aos cabeçalhos de negociação configurados anteriormente (por exemplo, por meio dos cabeçalhos `Accept-Charset` e `Accept-Language)`

Esse código de status pode ser substituído, simplesmente, pela veiculação do método menos preferencial do User-Agent, ao invés de gerar esse erro.

**407 Authentication Required  (**[**RFC 7235**](https://tools.ietf.org/html/rfc7235)**)**

O cliente não enviou a autenticação necessária com a solicitação.

**408 Request Timeout**  **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

O servidor de origem não recebeu a solicitação completa naquilo que considera um tempo razoável.

-   Implica em dizer que o servidor não deseja esperar e continuar com a conexão.

-   Não é muito usado porque os servidores geralmente optam por usar a opção de "fechar" a de conexão.

**409 Conflict** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

A solicitação não foi concluída devido a um conflito com o estado atual do recurso. Isso geralmente ocorre em uma solicitação PUT sempre que vários clientes estão tentando editar o mesmo recurso.

-   O servidor _deve_ gerar uma carga útil que inclua informações suficientes para que o cliente reconheça a origem do conflito.
-   Os clientes podem e devem tentar a solicitação novamente

A Cloudflare irá gerar e veicular uma resposta 409 para um [Error 1001: DNS Resolution Error](https://support.cloudflare.com/hc/articles/360029779472#error1001).

**410 Gone** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

O recurso solicitado está permanentemente ausente no servidor de origem.

-   O servidor está sugerindo que os links de referência para o recurso devem ser removidos.
-   O servidor não está qualificado para usar esse código de status em uma resposta 404 nem é obrigado a ter essa resposta por um período de tempo específico.

**411 Length Required** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

O cliente não definiu o `Content-Length` (comprimento do conteúdo) para o corpo da solicitação nos cabeçalhos e isso é necessário para obter o recurso.

-   O cliente pode reenviar a solicitação após adicionar o campo no cabeçalho.

**412 Precondition Failed  (**[**RFC 7232**](https://tools.ietf.org/html/rfc7232)**)**

O servidor nega a solicitação porque o recurso não conseguiu atender às condições especificadas pelo cliente.

Por exemplo, o controle da versão: um cliente está modificando um recurso existente e, para isso, configura o cabeçalho `If-Unmodified-Since` (Se não tiver sido modificado desde) para corresponder à data em que o cliente baixou o recurso e deu início às edições. Se o recurso foi editado (provavelmente por outro cliente) após essa data e antes do carregamento das edições, essa resposta será gerada, já que a data da última edição será posterior à data configurada em `If-Unmodified-Since` pelo cliente.

A Cloudflare irá veicular essa resposta. Para mais informações, consulte: [Cabeçalhos ETag](https://support.cloudflare.com/hc/en-us/articles/218505467)

**413 Payload Too Large**  **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Recusa do servidor em processar a solicitação porque a carga útil enviada pelo cliente é maior do que o servidor estava disposto a aceitar. O servidor tem a opção de fechar a conexão.

-   Se essa recusa estiver configurada para acontecer apenas temporariamente, o servidor deverá enviar um cabeçalho `Retry-After` (Tentar após) para especificar quando o cliente deverá tentar a solicitação novamente.

**414 URI Too Long** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Recusa do servidor alegando que o URI era muito longo para ser processado. Por exemplo, se um cliente estiver tentando uma solicitação GET com um URI de comprimento fora do comum após um POST, isso pode ser visto como um risco à segurança e um 414 será gerado.

A Cloudflare irá gerar essa resposta para um URI com mais de 32 KB

**415 Unsupported Media Type** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Recusa do servidor em processar o formato da carga útil atual. Uma maneira de identificar e corrigir esse problema seria examinar os cabeçalhos `Content-Type` (Tipo de conteúdo) ou `Content-Encoding` (Codificação do conteúdo) enviados na solicitação do cliente.

**417 Expectation Failed** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

O servidor não conseguiu cumprir os requisitos especificados no cabeçalho `Expect` da solicitação do cliente.

**429 Too Many Requests (**[**RFC6585**](https://tools.ietf.org/html/rfc6585)**)**

O cliente enviou um excesso de solicitações no período especificado, de acordo com o servidor. Geralmente conhecido como "rate-limiting" ("limitador de taxa"). O servidor pode responder com informações que permitam ao solicitante tentar novamente após um período específico.

A Cloudflare irá gerar e enviar esse código de status quando uma solicitação estiver [com limite de taxa](https://www.cloudflare.com/rate-limiting/). Se os visitantes do seu site estiverem recebendo esses códigos de erro, você conseguirá ver isso no [Rate Limiting Analytics](https://support.cloudflare.com/hc/articles/115001635128#7Cy9dajZBWM5pm9aIP5mMD) .

**451 Unavailable For Legal Reason (**[**RFC7725**](https://tools.ietf.org/html/rfc7725)**)**

O servidor não consegue entregar o recurso devido a ações judiciais.

De modo geral, os mecanismos de busca (por exemplo, Google) e ISPs (por exemplo, ATT) é que são afetados por esse código de resposta, não o servidor de origem.

-   A resposta deve incluir uma explicação no corpo da mensagem com detalhes da ação judicial.

**499 Client Close Request**

Código de resposta específico do Nginx para indicar quando a conexão foi fechada pelo cliente enquanto o servidor ainda está processando sua solicitação, tornando o servidor incapaz de retornar um código de status.

-   Isso será mostrado no [Enterprise Log Share](https://support.cloudflare.com/hc/en-us/articles/216672448-Enterprise-Log-Share-REST-API) e na análise de código de status para clientes do plano Enterprise.
