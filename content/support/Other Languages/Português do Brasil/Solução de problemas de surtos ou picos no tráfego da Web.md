---
pcx_content_type: troubleshooting
language_tag: portugese
source: https://support.cloudflare.com/hc/pt-br/articles/200172906-Solu%C3%A7%C3%A3o-de-problemas-de-surtos-ou-picos-no-tr%C3%A1fego-da-Web
title: Solução de problemas de surtos ou picos no tráfego da Web
---

# Solução de problemas de surtos ou picos no tráfego da Web

## Visão geral

Existem várias maneiras de proteger e preparar seu domínio para lidar com picos no tráfego. Recomendamos as seguintes estratégias detalhadas abaixo:

-   use regras de página do Cloudflare para personalizar o cache
-   entre em contato com seu provedor de hospedagem para entender os limites do seu plano de hospedagem
-   use os endereços IP do Cloudflare para sua vantagem
-   garantir que os IPs do Cloudflare estejam na lista de permissões

___

## Use as regras da página do Cloudflare para personalizar o cache

Por padrão, o Cloudflare [armazena em cache o conteúdo estático](https://support.cloudflare.com/hc/en-us/articles/200172516-Which-file-extensions-does-CloudFlare-cache-for-static-content-) como imagens, CSS e JavaScript; no entanto, você pode estender o cache do Cloudflare para trabalhar com HTML criando [regras de página](https://support.cloudflare.com/hc/en-us/articles/218411427-Understanding-and-Configuring-Cloudflare-Page-Rules-Page-Rules-Tutorial-) .

### Coloque tudo em cache

1\. Faça login na sua conta Cloudflare.

2\. Escolha o aplicativo **Page Rules** .

3\. Clique em **Criar regra de página**.

4\. Digite o site inteiro ou uma seção do site e defina o _Nível de cache_ como _Tudo em cache_ . Agora, o Cloudflare armazenará em cache totalmente o HTML em nossa rede Edge, em vez de fazer ida e volta ao servidor Web de origem.

5)Nas Page Rules, você também pode  alterar o parâmetro Edge Cache Expire TTL, o que permite determinar por quanto tempo armazenaremos em cache a funcionalidade na nossa borda. As opções TTL variam de 2 (duas) horas a um mês.

![page_rule_spike_or_surge_in_traffic.png](/images/support/page_rule_spike_or_surge_in_traffic.png)

Com a opção Cache Tudo ativada, o Cloudflare servirá todo o site, retirando completamente a carga do servidor, tornando o site o mais rápido possível.

Os clientes Cloudflare no plano de negócios podem usar técnicas avançadas de cache para armazenar em cache conteúdo estático em sites HTML dinâmicos, a fim de reduzir a carga usando a opção _Bypass Cache in Cookie_ do Page Rule.

### Visualizações de página anônimas em cache

Antes de um visitante acrescentar algo ao carrinho de compras, efetuar login ou fazer um comentário, sua presença é considerada uma exibição de página anônima. Ao armazenar em cache esses tipos de visitas de página, você elimina drasticamente grandes quantidades de carga do servidor, mesmo se seu site for dinâmico. Encontre mais informações na publicação introdutória do blog: [Armazenamento em cache de exibições de páginas anônimas](https://blog.cloudflare.com/caching-anonymous-page-views/).

Existem vários tutoriais disponíveis sobre como você pode fazer isso:

-   [Cache de exibições de página anônimas com WordPress ou WooCommerce](https://support.cloudflare.com/hc/en-us/articles/236166048)
-   [Cache de exibições de página anônimas com Magento 1 e Magento 2](https://support.cloudflare.com/hc/en-us/articles/236168808)
-   [Armazenamento em cache de HTML estático.](https://support.cloudflare.com/hc/articles/202775670)

___

## Entre em contato com seu provedor de hospedagem para entender os limites do seu plano de hospedagem

O Cloudflare compensa a maior parte da carga do seu site por meio de cache e filtragem de solicitações, mas ainda há tráfego para o seu host. Conhecer os limites do seu plano pode ajudar a prevenir um gargalo do seu host.

Depois de conhecer os limites do seu plano, você pode usar uma funcionalidade como [Rate Limiting](https://support.cloudflare.com/hc/articles/115001635128) para restringir quantas vezes um usuário pode fazer uma solicitação ao seu site.

___

## Use os endereços IP do Cloudflare para sua vantagem

Coloque em prática medidas de prevenção a ataques ao seu site durante a época de picos; configure o firewall para aceitar apenas o tráfego de endereços IP da Cloudflare durante as festas de fim de ano. Se você aceitar os [IPs da Cloudflare](https://www.cloudflare.com/ips), poderá impedir que invasores tenham acesso ao seu endereço IP original e derrubem seu site.

Outra opção seria usar a [extensão mod\_cloudflare Apache](https://www.cloudflare.com/technical-resources/#mod_cloudflare) e adicionar _DenyAllButCloudFlare_ à sua configuração do Apache.

___

## Verifique se os IPs do Cloudflare estão na lista de permissões

A Cloudflare funciona como um proxy reverso para seu site, por isso todas as conexões são originadas por meio de IPs da Cloudflare. Portanto, restringir nossos IPs pode causar problemas para os visitantes que tentarem acessar seu site. A lista dos nossos IPs pode ser encontrada aqui: [https://www.cloudflare.com/ips  
](https://www.cloudflare.com/ips)

___

## Recursos relacionados

-   [Como funciona e como configurar o Page Rules](https://support.cloudflare.com/hc/en-us/articles/218411427-Understanding-and-Configuring-Cloudflare-Page-Rules-Page-Rules-Tutorial-)
-   [Armazenamento em cache de HTML estático.](https://support.cloudflare.com/hc/articles/202775670)
-   [Rate Limiting da Cloudflare](https://support.cloudflare.com/hc/articles/115001635128)
