---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/360000841472-Como-adicionar-v%C3%A1rios-sites-%C3%A0-Cloudflare-via-automa%C3%A7%C3%A3o
title: Como adicionar vários sites à Cloudflare via automação
---

# Como adicionar vários sites à Cloudflare via automação

_Saiba como adicionar vários sites (+10) à Cloudflare de uma só vez usando a API da Cloudflare ou a ferramenta de CLI da Cloudflare, flarectl._

### Neste artigo

-   [Visão geral](https://support.cloudflare.com/hc/pt-br/articles/360000841472-Como-adicionar-v%C3%A1rios-sites-%C3%A0-Cloudflare-via-automa%C3%A7%C3%A3o#01EiMuIl9b6BVA2vUdCy2X)
-   [Pré-requisitos](https://support.cloudflare.com/hc/pt-br/articles/360000841472-Como-adicionar-v%C3%A1rios-sites-%C3%A0-Cloudflare-via-automa%C3%A7%C3%A3o#2C6OkWg2Flbl6ZBJss7FjH)
-   [Adicionar domínios por meio da API](https://support.cloudflare.com/hc/pt-br/articles/360000841472-Como-adicionar-v%C3%A1rios-sites-%C3%A0-Cloudflare-via-automa%C3%A7%C3%A3o#3Mk8dKAR73TTdEKH2WLfzb)
-   [Adicionar domínios por meio do flarectl (ferramenta de CLI da Cloudflare)](https://support.cloudflare.com/hc/pt-br/articles/360000841472-Como-adicionar-v%C3%A1rios-sites-%C3%A0-Cloudflare-via-automa%C3%A7%C3%A3o#194axRKd2V27vV5bs4e8iD)
-   [Problemas comuns](https://support.cloudflare.com/hc/pt-br/articles/360000841472-Como-adicionar-v%C3%A1rios-sites-%C3%A0-Cloudflare-via-automa%C3%A7%C3%A3o#6yR1Cexb7t3HYDcHGVwMjn)

___

## Visão geral

Se você precisar adicionar vários sites (+10) à Cloudflare de uma só vez, poderá fazê-lo por meio da API da Cloudflare. Adicionar vários sites pode ser útil quando você:

-   Tiver vários domínios mapeados de volta para um único domínio canônico — por exemplo, domínios em diferentes países (.com.au, .co.uk etc) que você deseja proteger com a Cloudflare
-   For uma agência ou consultoria de TI e gerenciar vários domínios em nome de seus clientes (observação: nesse caso você deve avaliar o [programa de Parceiros](https://www.cloudflare.com/partners/) da Cloudflare)
-   Estiver transferindo um conjunto existente de sites para a Cloudflare

O uso da API permitirá que você adicione vários sites de forma rápida e eficiente, especialmente se já souber [como alterar seus nameservers](/dns/zone-setups/full-setup/setup) ou [adicionar um registro de DNS](/dns/manage-dns-records/how-to/create-dns-records).

___

## Pré-requisitos

Para adicionar vários sites à Cloudflare via automação, você precisará de:

-   Uma conta existente na Cloudflare ([cadastrar-se](https://www.cloudflare.com/a/signup) / [entrar](https://www.cloudflare.com/a/login)))
-   Conhecimento básico de linhas de comando
-   curl instalado (por padrão no macOS e Linux)
-   Sua [chave de API da Cloudflare à mão](https://support.cloudflare.com/hc/pt-br/articles/200167836-Where-do-I-find-my-Cloudflare-API-key-)
-   Uma lista de domínios que você deseja adicionar, cada um em uma linha separada (nova linha separada) — por exemplo "dominios.txt"

___

## Adicionar domínios por meio da API

A Cloudflare tem uma API com muitos recursos ([documentação](https://api.cloudflare.com/)) que lhe permite automatizar a criação de novos domínios, além de configurar registros de DNS, regras de página e nossas muitas configurações de segurança. Usaremos essa API para automatizar o acréscimo de vários domínios ao mesmo tempo.

Abra o aplicativo do seu terminal (por exemplo, Terminal ou Terminal.app) e configure a chave e o e-mail da sua API:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">export CF_API_EMAIL=voce@exemplo.comexport CF_API_KEY=abc123def456ghi789</span></div></span></span></span></code></pre>{{</raw>}}

Em seguida, escreveremos um loop for simples que leva cada nome de domínio 


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">for domain in $(cat domains.txt); do \  curl -X POST -H &quot;X-Auth-Key: $CF_API_KEY&quot; -H &quot;X-Auth-Email: $CF_API_EMAIL&quot; \  -H &quot;Content-Type: application/json&quot; \  &quot;https://api.cloudflare.com/client/v4/zones&quot; \  --data '{&quot;account&quot;: {&quot;id&quot;: &quot;id_of_that_account&quot;}, &quot;name&quot;:&quot;'$domain'&quot;,&quot;jump_start&quot;:true}'; done</span></div></span></span></span></code></pre>{{</raw>}}

A chave "jump\_start" fará com que a Cloudflare tente automaticamente fazer uma triagem de registros DNS comuns — por exemplo, "www", "mail", "blog" e muitos outros — para que você não precise configurá-los manualmente (você ainda precisará confirmar que encontramos todos).  a _id\_dessa\_conta_ pode ser encontrada no aplicativo **Overview** da Cloudflare, na guia **ID da conta**.

A API retornará uma resposta, incluindo os [nameservers que você precisará alterar](https://support.cloudflare.com/hc/pt-br/articles/206455647-How-do-I-change-my-domain-nameservers-) no seu registrar (onde você registrou seu domínio).


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">{ &quot;result&quot;: { &quot;id&quot;: &quot;abc123def456ghi789&quot;, &quot;name&quot;: &quot;example.com&quot;, &quot;status&quot;: &quot;pending&quot;, &quot;paused&quot;: false, &quot;type&quot;: &quot;full&quot;, &quot;development_mode&quot;: 0, &quot;name_servers&quot;: [ &quot;chad.ns.cloudflare.com&quot;, &quot;lucy.ns.cloudflare.com&quot; ], &quot;name_servers_originais&quot;: [ &quot;ns-cloud-e1.googledomains.com&quot;, &quot;ns-cloud-e2.googledomains.com&quot;, &quot;ns-cloud-e3.googledomains.com&quot;, &quot;ns-cloud-e4.googledomains.com&quot; ], &quot;original_registrar&quot;: null, &quot;original_dnshost&quot;: null, &quot;modified_on&quot;: &quot;2018-02-12T01:42:13.827149Z&quot;, &quot;created_on&quot;: &quot;2018-02-12T01:42:13.827149Z&quot;, &quot;meta&quot;: { &quot;step&quot;: 4, &quot;wildcard_proxiable&quot;: false, &quot;custom_certificate_quota&quot;: 0, &quot;page_rule_quota&quot;: 3, &quot;phishing_detected&quot;: false, &quot;multiple_railguns_allowed&quot;: false }, &quot;owner&quot;: { &quot;id&quot;: &quot;abc123def456ghi789&quot;, &quot;type&quot;: &quot;user&quot;, &quot;email&quot;: &quot;you@example.com&quot; }, &quot;account&quot;: { &quot;id&quot;: &quot;abc123def456ghi789&quot;, &quot;name&quot;: &quot;you@example.com&quot; }, &quot;permissions&quot;: [ &quot;#access:edit&quot;, &quot;#access:read&quot;, &quot;#analytics:read&quot;, &quot;#app:edit&quot;, &quot;#billing:edit&quot;, &quot;#billing:read&quot;, &quot;#cache_purge:edit&quot;, &quot;#dns_records:edit&quot;, &quot;#dns_records:read&quot;, &quot;#lb:edit&quot;, &quot;#lb:read&quot;, &quot;#logs:read&quot;, &quot;#member:edit&quot;, &quot;#member:read&quot;, &quot;#organization:edit&quot;, &quot;#organization:read&quot;, &quot;#ssl:edit&quot;, &quot;#ssl:read&quot;, &quot;#subscription:edit&quot;, &quot;#subscription:read&quot;, &quot;#waf:edit&quot;, &quot;#waf:read&quot;, &quot;#worker:edit&quot;, &quot;#worker:read&quot;, &quot;#zone:edit&quot;, &quot;#zone:read&quot;, &quot;#zone_settings:edit&quot;, &quot;#zone_settings:read&quot; ], &quot;plan&quot;: { &quot;id&quot;: &quot;0feeeeeeeeeeeeeeeeeeeeeeeeeeeeee&quot;, &quot;name&quot;: &quot;Free Website&quot;, &quot;price&quot;: 0, &quot;currency&quot;: &quot;USD&quot;, &quot;frequency&quot;: &quot;&quot;, &quot;is_subscribed&quot;: true, &quot;can_subscribe&quot;: false, &quot;legacy_id&quot;: &quot;free&quot;, &quot;legacy_discount&quot;: false, &quot;externally_managed&quot;: false } }, &quot;success&quot;: true, &quot;errors&quot;: [], &quot;messages&quot;: []}</span></div></span></span></span></code></pre>{{</raw>}}

Observe a chave "name\_servers" na resposta. Esse par único será o mesmo para todos os sites adicionados à sua conta — por exemplo,


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&quot;name_servers&quot;: [</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">   &quot;chad.ns.cloudflare.com&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">   &quot;lucy.ns.cloudflare.com&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain"> ]</span></div></span></span></span></code></pre>{{</raw>}}

Copie seus valores (não os listados acima!) e [atualize os nameservers](https://support.cloudflare.com/hc/pt-br/articles/206455647-How-do-I-change-my-domain-nameservers-) no seu registrar.

___

## Adicionar domínios por meio do flarectl (ferramenta de CLI da Cloudflare)

Você também pode adicionar domínios usando o flarectl, a CLI oficial da Cloudflare. Você pode [baixar um pacote pré-desenvolvido](https://github.com/cloudflare/cloudflare-go/releases) para o seu sistema operacional (Windows, macOS/Darwin, Linux) e criar domínios com ele.

Você precisará primeiro configurar suas credenciais da API:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">export CF_API_EMAIL=voce@exemplo.comexport CF_API_KEY=abc123def456ghi789</span></div></span></span></span></code></pre>{{</raw>}}

... e, em seguida, execute o seguinte comando no flarectl:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">for domain in $(cat domains.txt); do flarectl zone create --zone=$domain --jumpstart=false; done</span></div></span></span></span></code></pre>{{</raw>}}

Depois disso, você poderá obter os nameservers para cada domínio por meio da "flarectl zone list":


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">for domain in $(cat domains.txt); do flarectl zone info --zone=$domain; done</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Procure ajuda ou encontre dicas na [Comunidade da Cloudflare](https://community.cloudflare.com/).

___

## Problemas comuns

Se algum erro foi retornado nesse processo, o domínio pode não ser registrado (ou ser apenas registrado), ser um subdomínio ou ser inválido de alguma outra forma. Os seguintes artigos abrangem os casos mais comuns: 

-   [Por que não consigo adicionar meu domínio à Cloudflare?](https://support.cloudflare.com/hc/pt-br/articles/205359838-I-cannot-add-my-domain-to-Cloudflare-)
-   [Site banido](https://support.cloudflare.com/hc/articles/205359838#h_874829316161540417303369)
