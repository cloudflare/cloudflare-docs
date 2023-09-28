---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/360057976851-Diffuser-des-vid%C3%A9os-avec-Cloudflare
title: Diffuser des vidéos avec Cloudflare
---

# Diffuser des vidéos avec Cloudflare

### Dans cet article

-   [Utilisation des services de Cloudflare](https://support.cloudflare.com/hc/fr-fr/articles/360057976851-Diffuser-des-vid%C3%A9os-avec-Cloudflare#h_5mvWTaW0VyVyibnzFh5EK3)
-   [J'administre un site web et mon contenu a été redirigé au motif d'une violation des conditions d'utilisation](https://support.cloudflare.com/hc/fr-fr/articles/360057976851-Diffuser-des-vid%C3%A9os-avec-Cloudflare#h_17ENJA5McX8FiFmwFhbacY)
-   [Le site web auquel j'essaie d'accéder affiche un message rappelant les conditions de service de Cloudflare au lieu du contenu que je souhaite consulter](https://support.cloudflare.com/hc/fr-fr/articles/360057976851-Diffuser-des-vid%C3%A9os-avec-Cloudflare#h_ktzs0UjPIhrLq0EKVFhR3)
-   [J'administre un site web et je me soucie du respect des conditions d'utilisation.](https://support.cloudflare.com/hc/fr-fr/articles/360057976851-Diffuser-des-vid%C3%A9os-avec-Cloudflare#h_6B1A8c4GYUXZXtvk5nB6DI)

___

## Utilisation des services de Cloudflare

Cloudflare a vu le jour en 2010 parce que nous étions convaincus que toute entité Internet méritait de bénéficier de connexions sécurisées, rapides et fiables. Nous estimions qu'il était injuste de devoir payer des frais supplémentaires en cas de cyberattaque. Nous avons donc proposé des services gratuits et à coût fixe pour les sites web. Nous avons connu le succès parce que la plupart des sites web ne consomment pas beaucoup de bande passante, ce qui nous a permis de proposer nos services à un prix abordable pour tout le monde. Dès le début, nous avons bloqué la diffusion de vidéos en streaming sur notre bande passante. Vous pouviez intégrer une vidéo provenant d'un autre fournisseur, mais nous limitions la possibilité d'utiliser nos services pour transmettre des éléments vidéo à vos visiteurs à partir de notre réseau. En effet, chaque seconde d'une vidéo standard nécessite autant de bande passante que le chargement d'une page web complète.

Au fil du temps, nous avons constaté que certains de nos clients souhaitaient diffuser des vidéos en streaming via notre réseau Nous avons donc développé [Stream](https://www.cloudflare.com/products/cloudflare-stream/) pour répondre à leurs attentes. Stream offre d'excellentes performances à un prix abordable, calculé en fonction de la charge que vous imposez à notre réseau.

Malheureusement, si la plupart des utilisateurs respectent ces limitations et comprennent qu'elles visent à garantir une qualité de service élevée pour tous les clients de Cloudflare, certains d'entre eux essaient de configurer notre service de manière abusive pour diffuser des vidéos en streaming en violant nos conditions d'utilisation. Nous voulons que tout le chacun bénéficie d'un service optimal, notamment dans le cadre des initiatives publiques que nous menons comme le projet [Galileo](https://www.cloudflare.com/galileo/), le projet [Athenian](https://www.cloudflare.com/athenian/), et le projet [Fair Shot](https://www.cloudflare.com/fair-shot/). Il suffit que quelques personnes abusent de nos services pour que nous ne soyons plus en mesure de mener à bien ces initiatives.

Voici quelques recommandations d'utilisation concernant les services de Cloudflare, selon ce qui a pu vous amener sur cette page.

___

## J'administre un site web et mon contenu a été redirigé au motif d'une violation des conditions d'utilisation

Si vous êtes un client Free, Pro ou Business et que vous diffusez des vidéos ou une quantité excessive de contenus non-HTML (tels que des fichiers binaires ou de grands volumes d'images) en violation de la [clause 2.8 du Contrat d'abonnement en libre-service](https://www.cloudflare.com/terms/), Cloudflare peut rediriger votre contenu vers des vidéos et des images de substitution. Dans ce cas, vous recevrez un e-mail vous expliquant en quoi la zone en question viole nos CGS. N'essayez pas de contourner la redirection : cela pourrait restreindre votre utilisation de Cloudflare à l'avenir.

## Possibilités pour les administrateurs web de supprimer les redirections 

-   **Diffusez le contenu redirigé à partir d'un sous-domaine en nuage gris.**
    -   La clause 2.8 des conditions générales de libre-service (CGS) de Cloudflare interdit aux utilisateurs de diffuser une quantité excessive de contenus non html, par exemple des images et des vidéos, sans avoir souscrit une offre payante incluant ces services. Les restrictions énoncées à la clause 2.8 des CGS ne s'appliquent pas aux contenus distribués à partir de sous-domaines en nuage gris (non proxy). 

-   **Diffusez les contenus redirigés à partir d'un service payant, comme indiqué ci-dessous.**

## Diffuser des vidéos avec Cloudflare en utilisant des produits payants

Cloudflare permet de diffuser des contenus vidéo via des services payants spécifiques. Si vous souhaitez diffuser des contenus vidéo, deux solutions s'offrent à vous. 

### Solution 1 : Cloudflare Stream 

[Stream](https://www.cloudflare.com/products/cloudflare-stream/) est une plateforme de vidéo à la demande permettant de créer des applications vidéo. Stream encode, stocke et diffuse des vidéos optimisées, dans des formats adaptés à différents appareils et à différents types de connexions réseau. 

Pour débuter avec Stream, ouvrez **Stream** depuis votre tableau de bord ou [inscrivez-vous](https://dash.cloudflare.com/sign-up/stream). Vos vidéos Stream ne sont pas liées à un domaine dans votre compte Cloudflare, et vous n'avez pas besoin d'avoir un domaine sur Cloudflare pour utiliser le service.

### Solution 2 : Stream Delivery (réservé aux clients Enterprise)

[Stream Delivery](https://www.cloudflare.com/products/stream-delivery/) propose la mise en cache et la diffusion de contenus vidéo par l'intermédiaire des datacenters de Cloudflare répartis dans le monde entier. Cette fonctionnalité CDN est uniquement disponible avec l'offre Cloudflare Enterprise. Veuillez [contacter le service des ventes](https://www.cloudflare.com/products/stream-delivery/#) si cette solution vous intéresse.

___

## Le site web auquel j'essaie d'accéder affiche un message rappelant les conditions de service de Cloudflare au lieu du contenu que je souhaite consulter

Ce type de situation peut se produire si l'administrateur du site web contrevient à [la clause 2.8 du contrat d'abonnement libre-service (CGS)](https://www.cloudflare.com/terms/) et n'a pas souscrit le service payant nécessaire pour diffuser le contenu auquel vous essayez d'accéder.

Nous avons informé l'administrateur du site web de son non-respect des conditions et lui avons expliqué comment utiliser les services de Cloudflare de la bonne manière pour vous fournir le contenu auquel vous souhaitez accéder. Malheureusement, tant que l'administrateur du site web ne prend pas de mesures correctives (par exemple en achetant les produits permettant de diffuser des contenus vidéo via le réseau de Cloudflare), nous ne pouvons pas lever ces restrictions.

Voici ce que vous pouvez faire en attendant :

1.  Demandez à l'administrateur du site web de respecter les règles qui nous permettent de fournir des services à faible coût.
2.  Renseignez-vous sur les initiatives entreprises par Cloudflare pour contribuer à rendre Internet meilleur, telles que le projet [Galileo](https://www.cloudflare.com/galileo/), le projet [Athenian](https://www.cloudflare.com/athenian/), et le projet [Fair Shot](https://www.cloudflare.com/fair-shot/).

Installez [1.1.1.1](https://1.1.1.1/) pour bénéficier d'un Internet plus privé et plus sûr.

___

## J'administre un site web et je me soucie du respect des conditions d'utilisation.

Les clients Free, Pro et Business qui diffusent des vidéos ou un volume excessif de contenus non-HTML risquent de se mettre en situation de violation de [la clause 2.8 du contrat d'abonnement libre-service (CGS)](https://www.cloudflare.com/terms/). Pour diffuser des vidéos ou une grande quantité de contenus non-HTML, nous vous invitons à opter pour l'une des solutions payantes décrites ci-dessus. 

## Informez-vous à propos du contenu que vous proposez

Si vous avez besoin de plus d'informations sur les contenus diffusés par votre zone (ex. en ce qui concerne le type de contenus), vous pouvez utiliser les outils suivants : 

-   Utilisateurs de Cache Analytics : Ouvrez **l'onglet de mise en cache** du tableau de bord pour filtrer les contenus par type et identifier le type de trafic transmis. 
-   Utilisateurs sans Cache Analytics : Ouvrez **l'onglet Analyse** du tableau de bord et cliquez sur la rubrique **Performances** pour obtenir des informations sur le contenu que vous diffusez.

![Cache Analytics - Identifier le type de trafic transmis](/images/support/traffic-types.png)

## D’autres questions ? Contacter le support

Si vous avez d'autres questions au sujet de la redirection (par exemple, si vous pensez que votre contenu a été redirigé par erreur et que vous pouvez le prouver), ouvrez un [ticket de support](https://dash.cloudflare.com/redirect?account=support) en y incluant les informations suivantes : 

-   Nom de votre domaine
-   Description du problème
-   Description du contenu que vous diffusez via le réseau de Cloudflare.
