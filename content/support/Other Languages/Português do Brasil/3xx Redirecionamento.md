---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/115003011091-3xx-Redirecionamento
title: 3xx Redirecionamento
---

# 3xx Redirecionamento

**Visão geral**

Os códigos 3xx são uma classe de respostas que sugerem que o User-Agent tome outra providência para obter o recurso solicitado na íntegra.

O local do redirecionamento deve ser definido de uma das seguintes maneiras:

1.  O campo do cabeçalho `Location` na resposta, útil para redirecionamento automático;
2.  O payload da resposta com um hiperlink (opcional) para o local da correção.

-   [300 Multiple](https://support.cloudflare.com/hc/pt-br/articles/115003011091-3xx-Redirecionamento#code_300)
-   [301 Moved Permanently](https://support.cloudflare.com/hc/pt-br/articles/115003011091-3xx-Redirecionamento#code_301)
-   [302 Found](https://support.cloudflare.com/hc/pt-br/articles/115003011091-3xx-Redirecionamento#code_302)
-   [303 See Other](https://support.cloudflare.com/hc/pt-br/articles/115003011091-3xx-Redirecionamento#code_303)
-   [304 Not Modified](https://support.cloudflare.com/hc/pt-br/articles/115003011091-3xx-Redirecionamento#code_304)
-   [305 Use Proxy](https://support.cloudflare.com/hc/pt-br/articles/115003011091-3xx-Redirecionamento#code_305)
-   [306 Switch Proxy](https://support.cloudflare.com/hc/pt-br/articles/115003011091-3xx-Redirecionamento#code_306)
-   [307 Temporary Redirect](https://support.cloudflare.com/hc/pt-br/articles/115003011091-3xx-Redirecionamento#code_307)
-   [308 Permanent Redirect](https://support.cloudflare.com/hc/pt-br/articles/115003011091-3xx-Redirecionamento#code_308)

**300 Multiple Choices** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Várias opções com relação ao recurso que o cliente pode seguir. Por exemplo, ele pode ser usado para apresentar diferentes opções de formatos de vídeo, listar arquivos com diferentes [extensões](https://en.wikipedia.org/wiki/File_extensions) ou [desambiguar o significado da palavra](https://en.wikipedia.org/wiki/Word_sense_disambiguation).

**301 Moved Permanently** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

O URL permanente é redirecionado para os recursos solicitados. O recurso de destino recebeu um novo URI permanente e futuras referências a esse recurso devem usar um dos URIs anexados.

O Cloudflare pode gerar essas respostas, evitando assim a necessidade de enviar uma solicitação para a resposta do servidor de origem com o uso do Page Rules. Leia mais sobre como o Cloudflare pode gerar redirecionamentos em [Redirecionamento de URLs pelo Page Rules](https://blog.cloudflare.com/introducing-pagerules-url-forwarding/)

**302 Found (também conhecido como Temporary Redirect)**  **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Semelhante a um 301 redirect, mas destina-se apenas a fins temporários. O User-Agent pode seguir automaticamente o cabeçalho `Location`, mas não substituirá o URI atual por ele como acontece com um erro 301.

O Cloudflare pode gerar essas respostas, evitando assim a necessidade de enviar uma solicitação para a resposta do servidor de origem com o uso do Page Rules. Leia mais sobre como o Cloudflare pode gerar redirecionamentos em [Redirecionamento de URLs pelo Page Rules](https://blog.cloudflare.com/introducing-pagerules-url-forwarding/)

**303 See Other (desde HTTP/1.1)** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

O User-Agent seguirá esse redirecionamento com uma solicitação GET. Obs._: a diferença em relação ao 301 é que o recurso no redirecionamento não é necessariamente equivalente ao que foi solicitado_

-   Para ser usado em resposta a uma solicitação `POST/DELETE`a fim de indicar que o servidor de origem recebeu os dados com sucesso e para permitir o devido armazenamento em cache.
-   A resposta 303 original não pode ser armazenada em cache, mas a resposta à segunda solicitação (`GET`) pode, porque está sob um URI diferente.

**304 Not Modified  (**[**RFC 7232**](https://tools.ietf.org/html/rfc7232)**)**

Informa ao cliente que o recurso solicitado está disponível e é válido no cache. O servidor de origem não modificou o recurso referente à solicitação. O cliente pode receber o payload do recurso especificado sem se conectar novamente ao servidor de origem, redirecionando assim a solicitação para usar o recurso armazenado. Os requisitos para um cache que recebe uma resposta 304 são definidos na [Seção 4.3.4 da \[RFC7234\]](https://tools.ietf.org/html/rfc7234#section-4.3.4).

Antes desta resposta, o cliente enviou uma solicitação GET ou HEAD condicional que especifica qual recurso está armazenado no momento. O servidor dá um "OK" para o cliente usar esse recurso na versão mais recente a fim de reduzir o volume de transmissão de dados entre o cliente e o servidor.

-   Não pode ter um corpo de mensagem.

-   Deve conter alguns dos cabeçalhos que teriam sido definidos antes da resposta refletida no 200: `Cache-Control, Content-Location, Date, ETag, Expires`, ou `Vary`.

Quando o Cloudflare recebe uma solicitação desatualizada, que precisa ser revalidada na origem, ele envia uma resposta 304 para confirmar que a versão em nosso cache corresponde à versão na origem. A resposta incluirá o cabeçalho `CF-Cache-Status: REVALIDATED` e o Cloudflare confirmará a versão usando o cabeçalho `If-Modified-Since`. Para obter mais informações, consulte: [Cabeçalhos ETag](https://support.cloudflare.com/hc/en-us/articles/218505467)

**305 Use Proxy (descontinuado)**  **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

A solicitação deve ser atendida pelo URI do proxy especificado no cabeçalho Location e não pela origem. Este código de status foi descontinuado devido a riscos de segurança.

**306 Switch Proxy (descontinuado)** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Aviso de que as solicitações a seguir devem vir deve ser direcionada ao proxy especificado.

**307 Redirecionamento temporário** **(** [**RFC7231**](https://tools.ietf.org/html/rfc7231) **)**

Um redirecionamento semelhante a uma resposta 302, exceto que o método de solicitação (ex.: GET, POST) não será diferente do que foi usado na solicitação original se seguir o redirecionamento automaticamente.

-   O User-Agent pode seguir automaticamente o cabeçalho `Location`, mas não substituirá o URI original.

**308 Permanent Redirect (**[**RFC 7538**](https://tools.ietf.org/html/rfc7538#section-3)**)**

Redirecionamento permanente semelhante a uma resposta 301, exceto que o método de solicitação (ex.: GET, POST) não será diferente do que foi usado na solicitação original se seguir o redirecionamento automaticamente.

-   O User-Agent seguirá o cabeçalho `Location` automaticamente.
-   O User-Agent substituirá o URI original pelo atualizado no Location ou payload.
