---
pcx_content_type: troubleshooting
language_tag: spanish
source: https://support.cloudflare.com/hc/es-es/articles/5995821690637-Migraci%C3%B3n-de-reglas-administradas-del-WAF-a-conjuntos-de-reglas-administradas-del-WAF
title: Migración de reglas administradas del WAF a conjuntos de reglas administradas del WAF
---

# Migración de reglas administradas del WAF a conjuntos de reglas administradas del WAF



## Información general

El 4 de mayo de 2022, Cloudflare comenzará la fase 1 de la migración de WAF, de las [reglas administradas del WAF](https://support.cloudflare.com/hc/articles/200172016) a los nuevos [conjuntos de reglas administradas del WAF](https://developers.cloudflare.com/waf/managed-rulesets/). Podrás iniciar el proceso de migración para tus zonas elegibles en el panel de control de Cloudflare. Los conjuntos de reglas administradas del WAF proporcionan los siguientes beneficios:

-   Mejora del rendimiento de la detección
-   Mayor flexibilidad de configuración (definir filtros WAF personalizados, configurar anulaciones de conjuntos de reglas globales)
-   Mejora de la experiencia del usuario
-   Acceso a la [comprobación de credenciales expuestas](https://developers.cloudflare.com/waf/managed-rulesets/exposed-credentials-check/)

Actualmente, siempre inicias el proceso de migración en el panel de control de Cloudflare. **La migración es irreversible** — una vez que se migra a los nuevos conjuntos de reglas administradas de WAF, no se puede volver a utilizar las reglas administradas de WAF. Una vez que migres una zona a los nuevos conjuntos de reglas administradas de WAF, la pestaña **Reglas administradas** del panel de control de Cloudflare (disponible en **Seguridad** > **WAF** > **Reglas administradas**) mostrará una nueva interfaz, y las API de reglas administradas de WAF dejarán de funcionar.

___

## Impacto de la migración

Tu configuración actual de reglas administradas migrará a una configuración de conjuntos de reglas administradas de WAF, para que se aplique la misma protección a tu zona cuando migres al nuevo WAF.

Cloudflare recomienda que compruebes el [**registro de actividad**](https://developers.cloudflare.com/waf/analytics/paid-plans/#activity-log) en Firewall Analytics en los días siguientes a la migración para verificar que ninguna solicitud legítima esté siendo bloqueada por los conjuntos de reglas administradas del WAF. Si identificas alguna solicitud bloqueada incorrectamente, puedes ajustar la acción de la regla WAF correspondiente a _Registro_. Para obtener más información sobre cómo cambiar la acción de una regla del conjunto de reglas administradas, consulta [Configurar una sola regla en un conjunto de reglas administradas](https://developers.cloudflare.com/waf/managed-rulesets/deploy-zone-dashboard/#configure-a-single-rule-in-a-managed-ruleset) en la documentación del WAF.

### Cambios en el panel de control de Cloudflare

Una vez completada la migración, el panel de Cloudflare mostrará la interfaz de Conjunto de reglas administradas del WAF en **Seguridad** > **WAF** > **Reglas administradas**, donde podrás implementar Conjuntos de reglas administradas y ajustar su configuración.

![Después de migrar a conjuntos de reglas administradas del WAF, el panel de control de Cloudflare mostrará una nueva interfaz en la que podrás implementar conjuntos de reglas administradas en tu zona.](/support/static/waf-migration-dashboard-differences.png)

A diferencia de las reglas administradas del WAF, no hay un botón global de encendido/apagado para activar el WAF en la nueva interfaz. En su lugar, se implementa individualmente cada conjunto de reglas administradas del WAF en tu zona.

Para obtener más información sobre la configuración de los conjuntos de reglas administradas del WAF en el panel de control, consulta [Implementar conjuntos de reglas administradas para una zona en el panel de control](https://developers.cloudflare.com/waf/managed-rulesets/deploy-zone-dashboard/) en la documentación para desarrolladores.

### Cambios en la API

Tras la migración, las API que permiten interactuar con las reglas administradas del WAF **dejarán de funcionar**. Estas API son las siguientes:

-   [Paquetes de reglas WAF](https://api.cloudflare.com/#waf-rule-packages-properties)
-   [Grupos de reglas WAF](https://api.cloudflare.com/#waf-rule-groups-properties)
-   [Reglas WAF](https://api.cloudflare.com/#waf-rules-properties)

Para interactuar con los conjuntos de reglas administradas del WAF debes utilizar la [API de conjuntos de reglas](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/). Para más información sobre la implementación de conjuntos de reglas administradas del WAF a través de la API, consulta [Implementar conjuntos de reglas a través de la API](https://developers.cloudflare.com/waf/managed-rulesets/deploy-api/) en la documentación para desarrolladores.

___

## Zonas elegibles (fase 1)

La migración se producirá por fases. A partir del 4 de mayo de 2022, la migración estará disponible para un subconjunto de zonas elegibles, y gradualmente para todas las zonas elegibles.

Durante la fase 1 podrás migrar las zonas que cumplan los siguientes requisitos:

-   La zona tiene:
    -   WAF desactivado, o
    -   WAF habilitado y solo el conjunto de reglas administradas de Cloudflare está habilitado (el conjunto de reglas básicas de OWASP ModSecurity debe estar deshabilitado).
-   La zona no tiene [reglas de firewall](https://developers.cloudflare.com/firewall/cf-dashboard/) o [reglas de página](https://support.cloudflare.com/hc/articles/218411427) que eviten, habiliten o deshabiliten las reglas administradas del WAF:
    -   Reglas de firewall configuradas con _Omitir_ > _Reglas administradas del WAF_.
    -   Reglas de página configuradas con _Deshabilitar la seguridad_.
    -   Reglas de la página configuradas con _Firewall de aplicaciones web: desactivado_ o _Firewall de aplicaciones web: activado._
-   La zona no tiene [anulaciones WAF controladas por URI](https://api.cloudflare.com/#waf-overrides-properties) (solo disponibles a través de la API).

Las zonas que no cumplan estos requisitos no podrán migrar durante la fase 1.

En la fase 2, que tendrá lugar más adelante, todas las zonas podrán optar a la migración. Esta página se actualizará con información adicional antes de que comience la fase 2.

___

## Iniciar la migración

1\. Inicia sesión en el panel de control de [Cloudflare](https://dash.cloudflare.com/) y selecciona tu cuenta y zona.

2\. Ve a **Seguridad** > **WAF**\> **Reglas administradas**.

![El banner de migración que se muestra en WAF > Reglas administradas, disponible para las zonas elegibles, te permite actualizar de reglas administradas a conjuntos de reglas administradas del WAF.](/support/static/waf-migration-banner.png)

3\. En el banner de actualización, haz clic en **Actualizar ahora**. Este banner solo se muestra en las zonas elegibles.

4\. En el cuadro de diálogo emergente, confirma que deseas iniciar la migración de reglas administradas del WAF a conjuntos de reglas administradas del WAF haciendo clic en **Actualizar**. La migración es **irreversible.**

Tras confirmar la operación, se iniciará la migración.

El proceso de migración puede durar un par de minutos. Cuando la migración finalice, el panel de control mostrará la nueva interfaz de conjuntos de reglas administradas del WAF en **Seguridad** > **WAF** > **Reglas administradas**. Para comprobar si la migración ha finalizado, actualiza el panel de control.
