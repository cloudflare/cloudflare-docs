"use strict";(self.webpackChunk_xpay_wallet_hub=self.webpackChunk_xpay_wallet_hub||[]).push([[227],{46227:(e,t,a)=>{a.r(t),a.d(t,{Header:()=>C});var r=a(90283),n=a(88988),s=a(857);const l=n.qy`<svg
  fill=""
  class=""
  aria-hidden="true"
  width="20"
  height="20"
  viewBox="0 0 20 20"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M15.53 3c.83 0 1.5.67 1.5 1.5v1.4c0 .94-.53 1.8-1.36 2.22l-4.2 2.14a3.54 3.54 0 1 1-2.92 0L4.36 8.12a2.5 2.5 0 0 1-1.35-2.04V4.5C3 3.67 3.66 3 4.5 3h11.02ZM10 10.95a2.54 2.54 0 1 0 0 5.08 2.54 2.54 0 0 0 0-5.08ZM12.55 4H7.47V8.6L9.8 9.77a.5.5 0 0 0 .45 0l2.31-1.18V4ZM6.47 4H4.5a.5.5 0 0 0-.5.5v1.54c.06.5.36.96.82 1.2l1.65.84V4Zm9.06 0h-1.98v4.08l1.66-.85c.5-.25.82-.77.82-1.33V4.5a.5.5 0 0 0-.5-.5Z"
    fill=""
  ></path>
</svg> `,o=n.qy`
  <fluent-button appearance="transparent" title="Microsoft Rewards - ${e=>e.points} points"
    >${e=>e.points}${l}</fluent-button
  >
`;var c=Object.defineProperty;Object.getOwnPropertyDescriptor;class d extends r.L{}((e,t,a)=>{for(var r,n=void 0,s=e.length-1;s>=0;s--)(r=e[s])&&(n=r(t,a,n)||n);n&&c(t,a,n)})([(0,s.CF)({mode:"fromView",converter:s.R$})],d.prototype,"points"),d.define({name:"header-rewards-link",template:o});var i=a(67963),p=(a(14418),a(62948));const h=n.qy`<svg
  width="17"
  height="11"
  viewBox="0 0 17 11"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  class=""
>
  <path
    d="M12.6 0.571256C12.2595 0.226247 11.7951 0.0317684 11.3104 0.0311508L2.74519 0.0202392C1.74177 0.0189605 0.927664 0.832034 0.927663 1.83545L0.927664 8.18698C0.927664 9.18949 1.74036 10.0022 2.74288 10.0022L11.2539 10.0022C11.7362 10.0022 12.1987 9.81021 12.5393 9.46863L15.7115 6.28712C16.4153 5.58122 16.4182 4.43982 15.718 3.73035L12.6 0.571256ZM11.3092 0.938758C11.5516 0.939067 11.7838 1.03631 11.954 1.20881L15.072 4.36791C15.4221 4.72264 15.4207 5.29334 15.0687 5.64629L11.8966 8.8278C11.7263 8.99859 11.495 9.09458 11.2539 9.09458L2.74288 9.09458C2.24162 9.09458 1.83527 8.68823 1.83527 8.18698L1.83527 1.83545C1.83527 1.33374 2.24233 0.927208 2.74404 0.927847L11.3092 0.938758Z"
    fill=""
  ></path>
</svg>`,w=n.qy`
  <fluent-button appearance="${p.RD.transparent}" title="Microsoft Cashback - ${e=>e.formattedBalance}"
    >${e=>e.formattedBalance}${h}</fluent-button
  >
`;var f=a(29792),u=Object.defineProperty,v=Object.getOwnPropertyDescriptor,b=(e,t,a,r)=>{for(var n,s=r>1?void 0:r?v(t,a):t,l=e.length-1;l>=0;l--)(n=e[l])&&(s=(r?n(t,a,s):n(s))||s);return r&&s&&u(t,a,s),s};class m extends r.L{get formattedBalance(){var e;const t=(0,f.S)(navigator.language,{currency:(null==(e=this.currency)?void 0:e.toUpperCase())||"USD"});return this.balance?t.format(this.balance):t.format(0)}}b([(0,s.CF)({mode:"fromView",converter:s.R$})],m.prototype,"balance",2),b([s.CF],m.prototype,"currency",2),b([i.Jg],m.prototype,"formattedBalance",1),m.define({name:"header-rebates-link",template:w});const y=n.qy`
  <div class="header">
    <span>Wallet Header Placeholder </span>
    <span class="headerButtons">
      <header-rewards-link @click=${e=>e.onRewardsClick()} :points=${300}></header-rewards-link>
      <header-rebates-link :balance=${134.23} :currency=${"jpy"}></header-rebates-link>
    </span>
  </div>
`,g=a(33160).A`
  .header {
    padding: 10;
    border: 1px solid black;
    display: flex;
    justify-content: space-between;
    max-width: 1150px;
  }
`;class C extends r.L{onRewardsClick(){window.open("https://rewards.bing.com/redeem/?form=edgepredeem")}}C.define({name:"wallet-hub-header",template:y,styles:g})}}]);