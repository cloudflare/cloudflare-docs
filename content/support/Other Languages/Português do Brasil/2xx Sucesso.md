---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/115003014192-2xx-Sucesso
title: 2xx Sucesso
---

# 2xx Sucesso

**Visão geral**

Os códigos 2xx indicam respostas corretas. Geralmente, significa que a ação solicitada pelo cliente foi recebida, entendida e aceita com sucesso.

-   [200 OK](https://support.cloudflare.com/hc/pt-br/articles/115003014192-2xx-Sucesso#code_200)
-   [201 Created](https://support.cloudflare.com/hc/pt-br/articles/115003014192-2xx-Sucesso#code_201)
-   [202 Accepted](https://support.cloudflare.com/hc/pt-br/articles/115003014192-2xx-Sucesso#code_202)
-   [203 Non-Authoritative](https://support.cloudflare.com/hc/pt-br/articles/115003014192-2xx-Sucesso#code_203)
-   [204 No Content](https://support.cloudflare.com/hc/pt-br/articles/115003014192-2xx-Sucesso#code_204)
-   [205 Reset Content](https://support.cloudflare.com/hc/pt-br/articles/115003014192-2xx-Sucesso#code_205)
-   [206 Partial Content](https://support.cloudflare.com/hc/pt-br/articles/115003014192-2xx-Sucesso#code_206)

**200 OK** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

A resposta que todo mundo gosta: a solicitação concluída com sucesso.

O payload de resposta dependerá do método de solicitação utilizado. O corpo de resposta esperado para o método de solicitação correspondente seria:

-   GET –  cabeçalhos e dados correspondentes ao recurso solicitado;
-   HEAD – apenas os cabeçalhos correspondentes ao recurso solicitado sem os dados reais;
-   POST – o status ou os resultados provenientes da ação.

O bom  _seria_que uma resposta 200 sempre tivesse um payload, mas ele não é obrigatório; portanto, um servidor de origem pode gerar uma 200 com um tamanho zero. Nesse caso, para estar de acordo com as normas da RFC, uma 204 deveria ser gerada (exceto CONNECT)

Por padrão, servidores proxy e navegadores podem armazenar em cache. Se os [controles de cache](https://support.cloudflare.com/hc/en-us/articles/202775670) da Cloudflare não especificarem, os   [recursos estáticos](https://support.cloudflare.com/hc/en-us/articles/200172516) farão, por padrão, o armazenamento em cache por 2 horas no nosso perímetro.  

**201 Created** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

A solicitação estava correta e a criação de um ou mais recursos está em andamento. Espera-se que o local do novo recurso esteja presente no campo de cabeçalho Localização ou no URI de solicitação. Normalmente, o payload descreve e apresenta links para o recurso recém-gerado.

-   Ver [RFC 7231, Seção 7.2](https://tools.ietf.org/html/rfc7231#section-7.2) para entender o conceito e objetivo dos campos de cabeçalho do validado como ETag e Última modificação, em uma resposta 201.

**202 Aceito** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

A solicitação foi aceita e está sendo processada pelo servidor de origem. Dependendo das especificações do servidor, o cliente pode ou não atuar sobre a solicitação durante o processamento.

**203 Informação não autorizada** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

Substituto opcional do código de status 200 para explicar que a solicitação estava correta, mas não veio diretamente do servidor de origem. A resposta do servidor de origem original foi modificada por um proxy ou servidor intermediário. Por exemplo, a 203 poderia ser usada para informar o cliente que esse recurso foi armazenado em cache em um proxy, para que uma solicitação futura semelhante atinja ou não esse servidor de cache com esse recurso idêntico. Outro exemplo é quando se elimina um cabeçalho que se aplica apenas ao servidor de origem local.

-   Por padrão, a resposta é armazenada em cache; no entanto, o Cloudflare não fará o armazenamento em cache.
-   A Cloudflare jamais gerará, mas poderá, se for o caso, redirecionar de outros servidores proxy. A Cloudflare respeita as respostas de origem com estas exceções: [Como a Cloudflare lida com os cabeçalhos de solicitação HTTP](https://support.cloudflare.com/hc/en-us/articles/200170986)

**204 Nenhum conteúdo ([RFC7231](https://tools.ietf.org/html/rfc7231))**

As ações solicitadas foram concluídas com sucesso no servidor de origem. O caso de uso comum está nos editores de documentos. A ação "save" é enviada ao servidor de origem, embora o cliente não precise receber de volta nenhum payload. Pode ser que uma pessoa queira comunicar ao usuário que a ação "save" foi bem-sucedida.

-   O retorno de uma resposta 204 jamais deve envolver um payload.
-   Por padrão, a resposta é armazenada em cache; no entanto, o Cloudflare não fará o armazenamento em cache.

**205 Redefinir conteúdo** **(**[**RFC7231**](https://tools.ietf.org/html/rfc7231)**)**

O servidor de origem sugere que o cliente redefina a exibição para seu estado original antes da solicitação. Comumente usado em formulários ou outros registros de entrada em que um payload é enviado na solicitação, o servidor de origem funcionou corretamente e agora avisa o navegador de que envios adicionais são permitidos.

-   Uma resposta 205 jamais deve retornar um payload. Content-Lengthde 0 ou respostas fragmentadas acompanhadas apenas de uma resposta fechada ou de zero byte permitida.

**206 Conteúdo parcial (**[**RFC 7233**](https://tools.ietf.org/html/rfc7233)**)**

A solicitação de parte de um recurso estava correta e consta no payload. Deve-se indicar o intervalo da solicitação de uma das seguintes maneiras:

1.  Uma única solicitação parcial com cabeçalhos HTTP que inclui o intervalo de conteúdo seguido pelo tamanho. (Se presente no cabeçalho da resposta, deve ser exatamente o mesmo que os octetos do payload). Por exemplo, `Content Range: bytes 21010-47021/47022`
2.  Vários trechos com `Content-Type: multipart/byteranges` no cabeçalho HTTP e incluem os campos Range-Content para cada parte individualmente, mas _não_ na resposta do **cabeçalho HTTP**. Também é necessário um limite, conforme especificado na [RFC 7233, Seção 4.1](https://tools.ietf.org/html/rfc7233%23section-4.1). Por exemplo:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"> HTTP/1.1 206 Partial Content Date: Wed, 15 Nov 1995 06:25:24 GMT Last-Modified: Wed, 15 Nov 1995 04:58:08 GMT Content-Length: 1741 Content-Type: multipart/byteranges; boundary=THIS_STRING_SEPARATES --THIS_STRING_SEPARATES Content-Type: application/pdf Content-Range: bytes 500-999/8000 ...the first range... --THIS_STRING_SEPARATES Content-Type: application/pdf Content-Range: bytes 7000-7999/8000 ...the second range --THIS_STRING_SEPARATES--</span></div></span></span></span></code></pre>{{</raw>}}

As respostas 206 são úteis para clientes que processam arquivos maiores e precisam de downloads fragmentados ou interrompidos com múltiplos fluxos simultâneos para melhorar a latência.
