---
pcx_content_type: troubleshooting
language_tag: french
source: https://support.cloudflare.com/hc/fr-fr/articles/230054288-Politique-de-gestion-des-incidents-clients
title: Politique de gestion des incidents clients
---

# Politique de gestion des incidents clients

_Comprenez comment Cloudflare gère les incidents impactant son environnement de production et les moyens utilisé par Cloudflare pour communiquer la nature et l’impact de ces incidents aux clients Enterprise._

### Dans cet article

-   [Objectif](https://support.cloudflare.com/hc/fr-fr/articles/230054288-Politique-de-gestion-des-incidents-clients#Purpose)
-   [Champ d’application](https://support.cloudflare.com/hc/fr-fr/articles/230054288-Politique-de-gestion-des-incidents-clients#Scope)
-   [Contexte](https://support.cloudflare.com/hc/fr-fr/articles/230054288-Politique-de-gestion-des-incidents-clients#Background)
-   [Définitions](https://support.cloudflare.com/hc/fr-fr/articles/230054288-Politique-de-gestion-des-incidents-clients#Definitions)
-   [Rôles et Responsabilités](https://support.cloudflare.com/hc/fr-fr/articles/230054288-Politique-de-gestion-des-incidents-clients#Roles%20and%20Responsibilities)
-   [Procédure d’exploitation standard](https://support.cloudflare.com/hc/fr-fr/articles/230054288-Politique-de-gestion-des-incidents-clients#Standard%20Operating%20Procedure)
-   [Gestion d’incident](https://support.cloudflare.com/hc/fr-fr/articles/230054288-Politique-de-gestion-des-incidents-clients#Incident%20Management)
-   [Communications d’incident](https://support.cloudflare.com/hc/fr-fr/articles/230054288-Politique-de-gestion-des-incidents-clients#Incident%20Communications)
-   [Analyse post mortem](https://support.cloudflare.com/hc/fr-fr/articles/230054288-Politique-de-gestion-des-incidents-clients#Post%20Mortem%20Reviews)
-   [Analyse des problèmes](https://support.cloudflare.com/hc/fr-fr/articles/230054288-Politique-de-gestion-des-incidents-clients#h_8ebe2421-a9c5-4e98-af34-b109346ecda7)

___

## Objectif

Chez Cloudflare, nous pensons que l’ouverture et la transparence sont inhérentes à la fourniture de notre service et nous consacrons nos efforts à établir un lien de confiance entre nos clients et la communauté internet en général.  Cloudflare exploite un réseau mondial qui impacte la vie et la prospérité de centaines de millions de personnes. Par conséquent, nous sommes très attentifs à cette responsabilité.

Cette procédure d’exploitation standard (SOP) définit comment Cloudflare traite tous les incidents et les problèmes qui impactent son environnement de production et les moyens par lesquels Cloudflare communique la nature et l’impact de ces incidents aux clients Enterprise, qu’ils soient planifiés ou non, quelle que soit leur gravité.  Cette procédure spécifie comment ces efforts sont suivis de manière uniforme afin de

-   maximiser le temps d’activité de l’environnement,
-   minimiser l’impact pour le client,
-   réduire le temps de réparation, et
-   partager les informations avec nos clients et la communauté internet.

___

## Domaine d’application

Cette SOP s’applique aux clients et services clients Cloudflare, tels qu’ils sont utilisés par les clients. La SOP s’applique à tous les environnements de production client chez Cloudflare y compris :

-   Le site web public de Cloudflare[www.cloudflare.com](http://www.cloudflare.com/))
-   Les API (Interfaces de programmation d’applications) de Cloudflare
-   Les interfaces sortantes de tiers (par exemple, les autorisations de carte de crédit, etc.)
-   L’infrastructure réseau détenue ou gérée par Cloudflare ou ses services de production
-   Les logiciels de fournisseurs, le matériel et les services en lien avec toute partie de la production de Cloudflare

___

## Contexte

Cloudflare veut construire un internet meilleur. Afin d’offrir une expérience améliorée à des millions d’utilisateurs internet, les opérations internes de Cloudflare doivent suivre des procédés et des procédures de fourniture de service irréprochables.  Les procédures de Cloudflare respectent par conséquent les bonnes pratiques des normes du secteur, dont certaines suivent spécifiquement les modèles de l’Information Library Infrastructure Technology (ITIL)  Cette SOP se conforme aux bonnes pratiques de la méthodologie de gestion des problèmes de l’ITIL.

___

## Définitions

Catégories des termes d’incidents-clés :  Tous les évènements constituent des conditions pouvant générer des alertes. Certaines alertes sont des incidents qu’il convient de noter (et d’autres non). Tous les incidents doivent être triés (parfois de manière automatisée, parfois par le biais de l’analyse humaine). Certains incidents sont des problèmes, certains sous-ensemble de problèmes sont « majeurs » et provoquent des mises à jour de la page de statut. Certains incidents majeurs ont un niveau de priorité élevé (P1) qui nécessite la rédaction d’un Rapport d’incident.

Terminologie-clé :

<table><tbody><tr><td><p><strong>Terme</strong></p></td><td><p><strong>Définition</strong></p></td></tr><tr><td><p><span>Événement</span></p></td><td><p><span>Toute chose évidente et discrète pouvant survenir dans l’une des applications ou l’un des systèmes de production de Cloudflare</span></p></td></tr><tr><td><p><span>Alerte</span></p></td><td><p><span>Un événement d’intérêt potentiel qui est identifié et communiqué par le biais de l’un des systèmes de surveillance de Cloudflare</span></p></td></tr><tr><td><p><span>Incident</span></p></td><td><p><span>Un rapport ou une alerte qui a une probabilité élevée d’affecter les systèmes de production de Cloudflare ou une condition d’alerte qui n’existe que pendant une courte période parce que le service affecté est remis en état avant que la condition du problème ne soit identifié</span></p></td></tr><tr><td><p><span>Problème</span></p></td><td><p><span>Un incident identifié et catégorisé qui a un impact négatif sur l’intégrité optimale et/ou la performance des systèmes ou des applications de Cloudflare</span></p></td></tr><tr><td><p><span>Rapport d’incident</span></p></td><td><p><span>Un rapport public décrivant la nature d’un Problème de service, la réponse globale de Cloudflare au problème et les mesures prises pour réduire ou éliminer l’impact ultérieur</span></p></td></tr><tr><td><p><span>Évaluation post-mortem</span></p></td><td><p><span>Une réunion d’évaluation organisée à la suite d’un problème grave et/ou critique. &nbsp;Toutes les réunions post-mortem se concentrent sur les détails d’un Rapport d’incident rédigé par un ingénieur Cloudflare disposant des compétences et l’expérience appropriés pour traiter la nature du problème.</span></p></td></tr><tr><td><p><span>SRE</span></p></td><td><p><span>Les SRE (Ingénieurs de fiabilité des systèmes) constituent le groupe qui prend en charge le support de premier niveau de tous les incidents</span></p></td></tr><tr><td><p><span>CSUP</span></p></td><td><p><span>Le groupe Support-client est une équipe chargée de répondre à toutes les demandes envoyées par les clients et prenant en charge toutes les communications pendant toute la durée du problème identifié.</span></p></td></tr><tr><td><p><span>JIRA</span></p></td><td><p><span>Système de tickets de Cloudflare utilisé pour le suivi des incidents, des bons de commandes et des problèmes</span></p></td></tr><tr><td><p><span>Niveau de priorité ou de gravité</span></p></td><td><p><span>Valeur de «&nbsp;P0, P1, P2 ou P3&nbsp;» en fonction de la gravité du problème touchant le réseau Cloudflare et ses clients</span></p></td></tr><tr><td><p><span>SLA</span></p></td><td><p><span>Accord de niveau de service&nbsp;: obligation interne ou contractuelle pour un niveau de service spécifique (habituellement mesuré en actions par unité de temps)</span></p></td></tr><tr><td><p><span>SLO</span></p></td><td><p><span>Objectif de niveau de service&nbsp;: obligation interne ou contractuelle pour un objectif de service spécifique (habituellement mesuré en actions par unité de temps)</span></p></td></tr><tr><td><p><span>Chef d’intervention</span></p></td><td><p><span>Responsable de ressources Cloudflare chargé de s’assurer qu’un problème est géré correctement, que les délais sont respectés, que les escalades sont correctement effectuées et que les moyens adéquats sont mis en place</span></p></td></tr><tr><td><p><span>La communauté internet</span></p></td><td><p><span>Le principal groupe d’acteurs de Cloudflare. &nbsp;Cloudflare assure la sécurité et optimise plus de 4&nbsp;600&nbsp;000 sites internet. La moitié des utilisateurs d’internet interagissent avec des sites web Cloudflare plus de 500 fois par semaine.</span></p></td></tr><tr><td><p><span>Tiers</span></p></td><td><p><span>Désigne les fournisseurs et les fournisseurs de service autres que Cloudflare, qui sont partenaires avec Cloudflare dans la fourniture de systèmes ou de services au client</span></p></td></tr><tr><td><p><span>Partie concernée</span></p></td><td><p><span>Personne, groupe ou société qui est touché par un incident, soit en tant que fournisseur (par exemple, le personnel de Cloudflare, les tiers) soit en tant que client</span></p></td></tr><tr><td><p><span>RCA</span></p></td><td><p><span>RCA (Analyse de causes profonde) : examen complet de la cause sous-jacente d’un problème</span></p></td></tr><tr><td><p><span>Réhabilitation</span></p></td><td><p><span>Désigne toutes les mesures nécessaires prises pour résoudre la cause profonde d’un problème et pour s’assurer qu’il ne se reproduira pas</span></p></td></tr><tr><td><p><span>Page de statut</span></p></td><td><p><span>Le premier outil que Cloudflare utilise pour partager publiquement des informations concernant sa fourniture de service et tout incident ou problème impactant les services de Cloudflare&nbsp;:</span><a href="https://www.cloudflarestatus.com/"> <span>https://www.cloudflarestatus.com</span></a></p><p><span>La page de statut est hébergée par un tiers </span><a href="http://statuspage.io/"><span>Statuspage.io</span></a><span>) qui ne dépend pas des services de Cloudflare pour son exploitation.</span></p></td></tr></tbody></table>

___

## Rôles et Responsabilités 

## Les rôles et les responsabilités qui suivent sont associés à la gestion des incidents au sein de Cloudflare : 

<table><tbody><tr><td><p><strong>Rôle</strong></p></td><td><p><strong>Responsabilités</strong></p></td></tr><tr><td><p><span>Gestion Cloudflare</span></p></td><td>Procédures d’évaluation et d’approbation.<br>Assurez-vous que les membres du personnel sont formés aux procédures.<br>Avisez les clients et les tiers, le cas échéant, de leur rôle dans les procédures.<br>Entamez et supervisez des évaluations post mortem pour les rapports d’incidents critiques.</td></tr><tr><td><p><span>SRE d’astreinte</span></p></td><td>Un ou plusieurs SRE assignés à des équipes d’astreinte pour répondre à toutes les alertes critiques.<br><span>Ils identifient et répondent à un incident, évaluent et classifient la gravité de l’incident et procèdent éventuellement à l’escalade de l’incident impactant en problème.</span><br>Ils agissent pour l’escalade et l’administration du problème du début à la fin.</td></tr><tr><td><p><span>Ingénieurs réseau d’astreinte</span></p></td><td>Un ou plusieurs ingénieurs réseau assignés à des équipes d’astreinte pour répondre à toutes les alertes critiques.<br>Il agissent en coordination avec l’équipe SRE, qui représente le principal gestionnaire d’incident pendant la durée de tout problème identifié.</td></tr><tr><td><p><span>CSUP d’astreinte</span></p></td><td>Un ou plusieurs ingénieurs CSUP qu sont assignés à des équipes pour répondre à toutes les demandes des clients.<br>Ils sont responsables de toutes les communications avec les clients pendant toute la durée des problèmes identifiés.<br>Ils sont responsables de communiquer toute la maintenance planifiée.</td></tr><tr><td><p><span>Équipe SRE</span></p></td><td>L’équipe technique de fiabilité des systèmes (SRE) qui soutient les efforts des SRE d’astreinte.<br>Assume le rôle de gestionnaire d’incident pendant toute la durée d’un problème identifié.<br>Cette équipe met en œuvre les changements de production appropriés pris en charge par Cloudflare, afin de résoudre les problèmes.</td></tr><tr><td><p><span>Équipes techniques de Cloudflare</span></p><p><span>(DBA, Network, nginx, Security, etc.)</span></p></td><td>Aident le Gestionnaire d’incident pendant la résolution du problème.<br>Relient au besoin les appels en pont.<br>S’assurent que la documentation est saisie lors du diagnostic et de la correction des problèmes et qu’une escalade correcte est effectuée auprès d’autres groupes responsables.<br>Participent aux évaluations post mortem de certains rapports d’incidents, à la demande de la direction de Cloudflare.</td></tr></tbody></table>

___

## Procédure d’exploitation standard

Cette section détaille les procédures pour la gestion des incidents et des problèmes.  À un niveau élevé, ces procédures se définissent de la manière suivante :

-   Gestion d’Incidents :  Désigne la procédure générale pour l’observation et la réponse aux alertes, y compris l’évaluation de l’impact et de la gravité d’un incident, la classification de l’incident en problème, l’attribution d’une priorité au problème ou le rejet de l’incident comme évènement non impactant si la condition d’un problème ne peut pas être identifiée.

-   Gestion de problème :  Désigne la procédure d’identification de la portée et de l’étendue du problème, l’attribution d’un niveau de gravité approprié (P0, P1, P2, P3), les actions pour résoudre le problème et revenir à état optimal pour les services de production optimal, et la communication du problème au parties appropriées.

-   Gestion de la résolution :  Le processus qui consister à enquête sur les causes et les conditions qui ont provoqué un problème, à rendre compte de la manière générale dont un problème a été géré et résolu, et à effectuer toute analyse postérieure visant à empêcher la reproduction des conditions et des causes d’un problème à l’avenir.  

___

## Gestion d’incident

Le but principal de la Gestion d’incident est d’identifier et de réagir à des problèmes potentiels le plus rapidement possible pour minimiser l’impact sur les services de production et offrir les meilleurs niveaux possibles de qualité et de disponibilité des services.  Les meilleurs niveaux possibles de qualité et de disponibilité des services signifieraient que tous les services fonctionnent exactement comme prévu 100 % du temps et soient disponibles et accessibles 100 % du temps.

Parce que nous acceptons qu'un ensemble de forces sous notre contrôle et de forces en dehors de notre contrôle finiront par avoir un impact sur l’intégrité du service, nous définissons des Objectifs de niveau de service (SLO) et des Accords de niveau de service (SLA) pour décrire quelles dégradations de l’intégrité du service sont acceptables pour les divers services du réseau Cloudflare.   Les SLA et SLO sont exprimés en pourcentage de période (en mois et en année).

Le niveau d’information donné concernant un incident peut varier mais les informations suivantes doivent être recueillies avant qu’un incident ne soit classifié et priorisé :

-   Source de l’auteur (alerte de surveillance ou autre source)
-   Client(s) (le cas échéant)
-   Système ou application (et nom d’hôte, le cas échéant)
-   Moment de l’alerte
-   Portée de l’impact : estimation du nombre de systèmes, utilisateurs ou régions impactés
-   Type d’impact : portée générale de la détérioration du service (par exemple, perte de tous les accès, performance dégradée, applications dépendantes impactées, impact observé sur les clients)

Tous les Incidents qui sont classifiés comme problème qui ont une priorité P0 ou P1, indépendamment de la source, seront consignés dans le système de tickets de Cloudflare, JIRA.  Certaines alertes indiqueront des conditions qui n’impacteront peut-être pas immédiatement les niveaux de service et seront classées si besoin comme problèmes avec une priorité P2 ou P3.   

Le système JIRA est un système d’enregistrement de toutes les informations relatives aux incidents, et toutes les autres sources de documentation concernant un problème (par exemple, historique d’alertes, copies d’écran, journaux de travail, conversations de chat) sont joints au ticket JIRA original créé en réponse à l’incident.

### Classifications des incidents

Après avoir acquitté une alerte, le SRE triera immédiatement l’alerte en la plaçant dans une catégorie et en lui attribuant un niveau de priorité.  En créant de nouveaux tickets JIRA pour des problèmes de priorité élevée (P0 et P1), le SRE s’assurera que chaque ticket est classifié correctement en incluant sa Catégorie et son Niveau de priorité.

### Niveau de priorité :

Tous les tickets seront classifiés selon les 4 niveaux de priorité suivants.  Les critères énumérés sont des lignes directrices générales.   Les conditions décrites ci-dessous doivent explicitement décrire un niveau de priorité. Cependant, à la discrétion du SRE ou de la direction de Cloudflare, les problèmes peuvent être assignés selon les besoins à un niveau de priorité plus élevé.

<table><tbody><tr><td><p><span><strong>Niveau de priorité</strong></span></p></td><td><p><span><strong>Description</strong></span></p></td></tr><tr><td><p><span>P0</span></p></td><td>Perte totale d’accès à l’application ou à l’API Cloudflare.<br>Accès dégradé à l’application ou à l’API Cloudflare (⪯&nbsp;98&nbsp;% mesuré à l’échelle mondiale ou depuis toute région importante).<br>Perte totale d’accès à un datacenter de niveau 1 (Tier 1) ou dégradation majeure de sa performance.<br>Performance détériorée d’un fournisseur de transit mondial de niveau 1 (⪰ 20&nbsp;% de perte de paquets au niveau mondial ou 30&nbsp;% dans une région importante).<br>Accès dégradé à un système critique ou performance dégradé de ce système</td></tr><tr><td><p><span>P1</span></p></td><td>Dégradation intermittente ou dégradée de la performance au niveau du site.<br>Perte de fonction importante, comme la fonction de création de rapports.<br>Perte d’accès à l’application Cloudflare depuis un réseau social ou des sites web externes Cloudflare (par exemple, <a href="http://spacloudflare.com/">spaCloudflare.com</a>, <a href="http://saloncloudflare.com/">salonCloudflare.com</a>,&nbsp;etc.).<br>Panne vers une l’interface tierce sortante importante.<br>Mauvais fonction du site pour les clients Enterprise ou un partenaire de distribution.<br>Corruption ou perte de données clients.</td></tr><tr><td><p><span>P2</span></p></td><td>Problème de performance sporadique ou localisé.<br>Problèmes de système n’impactant pas encore les clients de manière perceptible (par exemple, CPU élevé).<br>Panne ou détérioration pour un client unique.</td></tr><tr><td><p><span>P3</span></p></td><td>Problèmes de fonctionnement, problèmes de procédure ou demandes de service n’ayant pas ou peu d’effet sur les utilisateurs finaux et qui peuvent être traités en fonction des disponibilités.<br>La gravité par défaut attribuée à tous les tickets qui n’ont pas encore été examinés ou auxquels un niveau de gravité n’a pas encore été attribué.</td></tr></tbody></table>

###   
Catégorie

Aux fins d’un suivi et de communications corrects, les problèmes de priorité élevé (P0 et P1) seront attribués à des catégories. Ces catégories (étiquettes de ticket) correspondent aux catégories communiquées publiquement qui sont énumérées sur la Page de statut publique de Cloudflare.   

Les tickets de niveau de priorité bas (P2 et P3) peuvent être classifiés en utilisant des étiquettes et une nomenclature spécifiques aux différentes équipes techniques et non techniques de Cloudflare.  Ces différentes étiquettes et catégories ne sont pas indiquées dans ce document.  

### Incidents de sécurité

Vous devez comprendre que les incidents qui sont classifiés dans la catégorie Sécurité requièrent un traitement et des procédures spéciales.  Les incidents doivent être consignés ici et suivre les procédures d’Incident de sécurité, définies par l’équipe de Sécurité des informations de Cloudflare.

### Incidents de gravité ou de priorité élevée

Les Incidents P0 et P1 ont évidemment plus d’impact sur l’activité commerciale. Par conséquent, ils font l’objet en amont d’exigences particulières pour nous assurer qu’ils seront traités dans les délais les plus courts possibles.

### Gestionnaire d’incident

Pour les problèmes de types P0 et P1, Les gestionnaires d’incident d’astreinte doivent être contactés immédiatement.  Un calendrier des gestionnaires d’incident sera publié pour s’assurer que le SRE sait qui contacter à un moment spécifique.  Le gestionnaire d’incident est un responsable de ressources critiques pour ce qui suit :

-   La validation de la gravité d’un problème
-   Le suivi du problème de sa soumission à sa résolution
-   Le respect du plus grand intérêt des clients
-   La consignation de toutes les actions et délais
-   La conduite du personnel vers la résolution la plus rapide du problème
-   S’assurer que les clients et la direction interne sont notifiés du statut dans les délais prédéterminés (ou de changements de statut)
-   Effectuer des escalades au client, en interne ou à des tiers quand les délais sont dépassés ou en l’absence de progrès appropriés
-   Veiller à ce qu’une explication cohérente soit appliquée au ticket au moment de la résolution
-   S’assurer que celui qui a soumis le ticket accepte que le problème soit résolu avant que le ticket ne soit refermé 

___

## Communications d’incident

Les communications externes au cours d’un incident sont importantes pour pouvoir :

-   Aviser les parties concernées que Cloudflare est au courant du problème et que nous cherchons une solution
-   Rassurer les clients et leur dire que le problème est en cours de traitement et que Cloudflare veille à leurs intérêts
-   Veiller à ce que les problèmes ne traînent pas et que les escalades appropriées soient effectuées
-   Informer les parties concernées internes principales des incidents importants

Les principaux types de communications pendant un incident sont les suivants :

La Page de statut sera créée en utilisant les modèles des membres de l’équipe d’astreinte CSUP dès qu’un incident sera identifié.

___

## Évaluations post mortem 

Cloudflare pense que tous les problèmes critiques ne devraient jamais se produire.  À cet effet, tous les problèmes de type P0 donneront lieu à la publication d’un Rapport d’incident (RI), qui inclura une Analyse des causes profondes (RCA) du problème ainsi que les facteurs généraux qui ont conduit à cet incident. Toutes les publications de RI seront suivies d’une réunion d’évaluation post mortem, durant laquelle les ingénieurs et les gestionnaires examineront et se mettront d’accord sur les détails du RI, les conclusions du RCA et toutes les mesures de correction qui seront prises pour veiller à ce que le problème ne se reproduise plus.

### Gestion de problème et post mortem

La gestion de problème est différente de la Gestion d’Incident. En effet, son but principal est de détecter les causes sous-jacentes d’un incident ainsi que les mesures prises pour sa résolution et éviter qu’il ne se reproduise.

###   
Analyse des causes profondes et correction

#### **Ticket de problème**

Un RCA est un rapport d’Analyse des causes profondes.  Un ticket de problème JIRA est le fait de consigner et de suivre les évènements justifiant un RCA.  C’est une procédure dans laquelle des experts en la matière (SME) examineront le problème P0 ou P1 en cherchant la cause sous-jacente du problème.  Une fois cette cause déterminée, les SME devront créer un plan de correction pour régler la ou les causes.  Le produit final est un ticket bien documenté pour suivre la correction jusqu’à son terme et, si nécessaire, un rapport d’incident bien rédigé sera envoyé à une équipe interne et/ou au client.

Les points exposés ci-dessus restent applicables même s’il s’agit d’un prestataire ou d’un fournisseur ou vendeur tiers qui fournit l’RCA.  Une fois les informations du RCA reçues de la part du tiers, nous devons nous assurer que le ticket de problème est mis à jour et qu’il comprend toutes les informations pertinentes, dont les corrections en suspens qu’il est nécessaire de suivre.  

#### **Rapport IR**

Le Rapport d’Incident (« RI ») est la méthode principale de communication avec le client en cas de problème et peut contenir tout ou partie de ce qui est écrit sur le ticket.  

Le rédacteur du rapport ne sera pas le même en fonction de la gravité du problème et le service responsable.  Une fois le rapport préliminaire établi, il est important de veiller à ce que ce rapport soit examiné par la direction Cloudflare qui prendra connaissance de son contenu, des engagements et de la présentation professionnelle.  Une fois le rapport approuvé, il pourra être remis au client.

___

## Examen des problèmes

Les sections ci-dessus détaillent la gestion de l’incident et la procédure de cause profonde pour s’assurer que la correction est permanente.  La dernière de la procédure de gestion de l’incident et du problème est de s’assurer que les métriques, les tendances et les rapports importants sont effectués, afin de s’assurer que la procédure est bien suivie, que les SLA sont respectés et que les problèmes sous-jacents ne perdurent pas.

### Rapports

Les critères des tickets qui doivent faire l’objet d’un rapport pour les tickets ouverts et fermés sont les suivants :

-   Gravité
-   Catégorie/sous-catégorie
-   Groupe responsable
-   Âge/Nombre de jours ouvert

Dans la mesure du possible, ces données doivent être présentées sous forme graphique pour faire ressortir les tendances visibles.  Ces rapports doivent être publiés en interne à l'intention des responsables Cloudflare et des propriétaires de zones

### Analyse et responsabilités

Chaque propriétaire de zone sera responsable de veiller non seulement à ce que ses tickets soient fermés dans les délais prescrits ou dans un laps de temps raisonnable, mais également d’examiner les rapports pour déceler des tendances, les sujets de préoccupation et les problèmes récurrents.  En se basant sur cette analyse, d'autres tickets Problem seront ouverts pour corriger tout problème qui n'aurait pas été décelé par un P0 ou un P1.  Cela nous permettra d'apporter des améliorations continues et, à terme, de réduire le nombre de nouveaux tickets en nous penchant de plus près sur les causes profondes.

### Réunions d'examen de la gestion des incidents (Post-mortem)

Lors de toutes les réunions de personnel des services, les responsables de groupe doivent examiner les rapports sur les tickets ouverts et les tendances en ayant en tête les objectifs suivants :

-   Discuter des réussites ou des difficultés rencontrées
-   Examiner les opportunités d'amélioration par les propriétaires de zones
-   Se mettre d'accord sur les problèmes qui justifient l'ouverture d'un nouveau ticket pour permettre le suivi de la résolution
