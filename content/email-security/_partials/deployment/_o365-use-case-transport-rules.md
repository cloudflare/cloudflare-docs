---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: ruleName;;ruleWords;;doFollowing;;img;;ruleName2;;ruleWords2;;doFollowing2;;img2
---

To create the transport rules that will send emails with certain {{<glossary-tooltip term_id="disposition">}}dispositions{{</glossary-tooltip>}} to Cloud Email Security:

1. Open the new [Exchange admin center](https://admin.exchange.microsoft.com/#/homepage).
2. Go to **Mail flow** > **Rules**.
3. Select **Add a Rule** > **Create a new rule**.
4. Set the following rule conditions:
    - **Name**: $1.
    - **Apply this rule if**: _The message headers_ > _includes any of these words_.
        - **Enter text**: `X-Area1Security-Disposition` > **Save**.
        - **Enter words**: $2 > **Add** > **Save**.
    - **Apply this rule if**: Select **+** to add a second condition.
    - **And**: _The sender_ > _IP address is in any of these ranges or exactly matches_ > enter the egress IPs in the [Egress IPs page](/email-security/deployment/inline/reference/egress-ips/).
    - **Do the following** - $3.

    ![Select the spam actions in the above step](/email-security/static/flexible-partial-images/o365-area1-mx/$4)

5. Select **Next**.
6. You can use the default values on this screen. Select **Next**.
7. Review your settings and select **Finish** > **Done**.
8. Select the rule $1 you have just created, and **Enable**.
9. Select **Add a Rule** > **Create a new rule**.
10. Set the following rule conditions:
    - **Name**: $5.
    - **Apply this rule if**: _The message headers_ > _includes any of these words_.
        - **Enter text**: `X-Area1Security-Disposition` > **Save**.
        - **Enter words**: $6 > **Add** > **Save**.
    - **Apply this rule if**: Select **+** to add a second condition.
    - **And**: _The sender_ > _IP address is in any of these ranges or exactly matches_ > enter the egress IPs in the [Egress IPs page](/email-security/deployment/inline/reference/egress-ips/).
    - **Do the following**: $7.

    ![Select the spam actions in the above step](/email-security/static/flexible-partial-images/o365-area1-mx/$8)

11. Select **Next**.
12. You can use the default values on this screen. Select **Next**.
13. Review your settings and select **Finish** > **Done**.
14. Select the rule $5 you have just created, and select **Enable**.