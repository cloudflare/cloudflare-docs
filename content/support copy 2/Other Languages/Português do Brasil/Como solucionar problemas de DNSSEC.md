---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/360021111972-Como-solucionar-problemas-de-DNSSEC
title: Como solucionar problemas de DNSSEC
---

# Como solucionar problemas de DNSSEC

_O DNSSEC protege o DNS.  Este artigo discute como detectar problemas de DNSSEC que afetam a resolução de DNS._ 

### Neste artigo

-   [Como testar o DNSSEC com o Dig](https://support.cloudflare.com/hc/pt-br/articles/360021111972-Como-solucionar-problemas-de-DNSSEC#TroubleshootingDNSSEC-DNSSECinPracticewithDig)
-   [Como visualizar a cadeia de confiança do DNSSEC com o Dig](https://support.cloudflare.com/hc/pt-br/articles/360021111972-Como-solucionar-problemas-de-DNSSEC#TroubleshootingDNSSEC-ViewingtheDNSSECChainofTrustwithDig)
-   [Como solucionar problemas de validação do DNSSEC com o Dig](https://support.cloudflare.com/hc/pt-br/articles/360021111972-Como-solucionar-problemas-de-DNSSEC#TroubleshootingDNSSEC-TroubleshootingDNSSECValidationwithDig)
-   [Como solucionar problemas de validação do DNSSEC usando o DNSViz](https://support.cloudflare.com/hc/pt-br/articles/360021111972-Como-solucionar-problemas-de-DNSSEC#TroubleshootingDNSSEC-TroubleshootingDNSSECValidationusingDNSViz)
-   [Próximas etapas](https://support.cloudflare.com/hc/pt-br/articles/360021111972-Como-solucionar-problemas-de-DNSSEC#TroubleshootingDNSSEC-What'sNext?)
-   [Recursos relacionados](https://support.cloudflare.com/hc/pt-br/articles/360021111972-Como-solucionar-problemas-de-DNSSEC#h_388049682151546042422637)

___

## Como testar o DNSSEC com o Dig

O _Dig_ é uma ferramenta de comando para consultar registros DNS em um nameserver. Por exemplo, o _dig_ pode perguntar a um resolvedor de DNS o endereço IP do domínio _www.cloudflare.com_ (a opção _+short_ produz somente o resultado _):_


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig www.cloudflare.com +short198.41.215.162198.41.214.162</span></div></span></span></span></code></pre>{{</raw>}}

Use o _dig_ para verificar os registros DNSSEC.  No exemplo abaixo,


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig www.cloudflare.com +dnssec +short198.41.214.162198.41.215.162A 13 3 300 20180927180434 20180925160434 35273 cloudflare.com. DYYZ/bhHSAIlpvu/HEUsxlzkC9NsswbCQ7dcfcuiNBrbhYV7k3AI8t46 QMnOlfhwT6jqsfN7ePV6Fwpym3B0pg==</span></div></span></span></span></code></pre>{{</raw>}}

consulta da chave pública do domínio raiz, não da chave pública do subdomínio, ficaria da seguinte forma: 


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig DNSKEY cloudflare.com +short257 3 13 mdsswUyr3DPW132mOi8V9xESWE8jTo0dxCjjnopKl+GqJxpVXckHAeF+ KkxLbxILfDLUT0rAK9iUzy1L53eKGQ==256 3 13 koPbw9wmYZ7ggcjnQ6ayHyhHaDNMYELKTqT+qRGrZpWSccr/lBcrm10Z 1PuQHB3Azhii+sb0PYFkH1ruxLhe5g==</span></div></span></span></span></code></pre>{{</raw>}}

A resposta de DNS inclui dois registros:

-   O _registro DNSKEY_**256** é a chave pública chamada Zone-signing-key, usada para verificar as assinaturas do registro DNS para registros _A, MX, CNAME, SRV_ etc.
-   O

Quando a opção _+short_ não estiver sendo usada com o _dig_, uma resposta de DNS será autenticada com o DNSSEC se o sinalizador do **anúncio** aparecer no cabeçalho da resposta:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig www.cloudflare.com[...];; -&gt;&gt;HEADER&lt;&lt;- opcode: QUERY, status: NOERROR, id: 65326;; flags: qr rd ra ad; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 1 [...] ;; QUESTION SECTION: ;www.cloudflare.com.        IN  A [...] ;; ANSWER SECTION: www.cloudflare.com. 15  IN  A   198.41.215.162 www.cloudflare.com. 15  IN  A   198.41.214.162</span></div></span></span></span></code></pre>{{</raw>}}

___

## Como visualizar a cadeia de confiança do DNSSEC com o Dig

A verificação completa das assinaturas de domínio (por exemplo: _cloudflare.com_) envolve a verificação da Key-Signing Key no domínio de nível superior (por exemplo: _.com_).  Uma verificação semelhante é

Quando o DNSSEC está habilitado, é necessário um _registro DS_ no DNS do registrar. O _registro DS_ contém uma hash da Key-Signing Key pública, além dos metadados da chave.

Use o _dig_ para encontrar um _registro DS_:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig +short DS cloudflare.com2371 13 2 32996839A6D808AFE3EB4A795A0E6A7A39A76FC52FF228B22B76F6D6 3826F2B9</span></div></span></span></span></code></pre>{{</raw>}}

_dig_ confirma se uma resposta foi


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig DS cloudflare.com +trace[...]cloudflare.com.     86400   IN  DS  2371 13 2 32996839A6D808AFE3EB4A795A0E6A7A39A76FC52FF228B22B76F6D6 3826F2B9[...]com.            172800  IN  NS  e.gtld-servers.net.[...];; Received 1213 bytes from 2001:502:1ca1::30#53(e.gtld-servers.net) in 37 ms</span></div></span></span></span></code></pre>{{</raw>}}

Uma alternativa mais fácil à execução manual de todas as etapas acima é o uso da [ferramenta on-line DNSViz](http://dnsviz.net/). Veja mais detalhes sobre [como solucionar problemas de validação de DNSSEC usando o DNSViz](https://support.cloudflare.com/hc/pt-br/articles/360021111972-Como-solucionar-problemas-de-DNSSEC#TroubleshootingDNSSEC-TroubleshootingDNSSECValidationusingDNSViz) ou um exemplo de [resultados de DNSSEC do cloudflare.com por meio do DNSViz](http://dnsviz.net/d/cloudflare.com/dnssec/).

___

## Como solucionar problemas de validação do DNSSEC com o Dig

Os problemas ocorrem se os provedores de DNS autoritativos forem alterados sem atualizar ou remover os registros DNSSEC antigos no registrar:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig A brokendnssec.net @1.0.0.1;; flags: qr rd ra; QUERY: 1, ANSWER: 0, AUTHORITY: 0, ADDITIONAL: 0;; -&gt;&gt;HEADER&lt;&lt;- opcode: QUERY, status: SERVFAIL, id: 10663</span></div></span></span></span></code></pre>{{</raw>}}


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig A brokendnssec.net @1.0.0.1 +dnssec +cd +short104.20.49.61104.20.48.61</span></div></span></span></span></code></pre>{{</raw>}}

No exemplo acima, o DNSSEC estará configurado incorretamente se uma resposta de DNS adequada for recebida quando a opção _+cd_ estiver sendo usada, mas as consultas usando DNSSEC retornarem uma resposta _SERVFAIL__._ Esse problema geralmente ocorre quando nameservers autoritativos são alterados, mas os _registros DS_ não são atualizados.  O problema também pode ocorrer se um invasor tentar forjar uma resposta a uma consulta. 

___

## Como solucionar problemas de validação do DNSSEC usando o DNSViz

1.  Navegue para [http://dnsviz.net/](http://dnsviz.net/)
2.  Digite um nome de domínio no campo de texto que aparecer.
3.  Se o DNSViz nunca analisou o site antes, clique no botão **Analisar** que aparecer.
4.  Se o site tiver sido analisado pelo DNSViz antes,

![Screen_Shot_2018-09-18_at_10.31.54_AM.png](/images/support/Screen_Shot_2018-09-18_at_10.31.54_AM.png)

![Screen_Shot_2018-10-16_at_2.png](/images/support/Screen_Shot_2018-10-16_at_2.png)

![Screen_Shot_2018-09-18_at_10.25.49_AM.png](/images/support/Screen_Shot_2018-09-18_at_10.25.49_AM.png)

___

## Próximas etapas 

Se for descoberto um problema com a implantação do DNSSEC, entre em contato com o registrar e confirme se o _registro DS_ corresponde ao que o provedor de DNS autoritativo especificou. Se a Cloudflare for o provedor de DNS autoritativo, siga as instruções para [configurar o DNSSEC com a Cloudflare](https://support.cloudflare.com/hc/articles/360006660072).

___

## Recursos relacionados

-   [Como funciona o DNSSEC](https://www.cloudflare.com/dns/dnssec/how-dnssec-works/) 
-   [Segurança de DNS](https://www.cloudflare.com/learning/dns/dns-security/)
-   [Como configurar o DNSSEC com a Cloudflare](https://support.cloudflare.com/hc/articles/360006660072)
