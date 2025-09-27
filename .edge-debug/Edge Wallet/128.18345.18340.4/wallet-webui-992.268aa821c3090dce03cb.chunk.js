"use strict";(self.webpackChunk_xpay_wallet_hub=self.webpackChunk_xpay_wallet_hub||[]).push([[992],{97992:(e,t,r)=>{r.r(t),r.d(t,{Navbar:()=>k});var i=r(90283),n=r(67963),s=r(857),l=r(88988),d=r(52532);r(70327),r(61516);const a=l.qy`
  <fluent-option @click=${e=>e.onclickHandler()} selected=${e=>e.itemId===e.currentSelectedItemId}>
    ${e=>e.title}
  </fluent-option>
`;var c=r(33160);const o=c.A``;var m=Object.defineProperty,p=Object.getOwnPropertyDescriptor,I=(e,t,r,i)=>{for(var n,s=i>1?void 0:i?p(t,r):t,l=e.length-1;l>=0;l--)(n=e[l])&&(s=(i?n(t,r,s):n(s))||s);return i&&s&&m(t,r,s),s};class h extends i.L{onclickHandler(){const e={itemId:this.itemId};this.$emit("navbar-item-clicked",e)}}I([s.CF],h.prototype,"title",2),I([(0,s.CF)({converter:s.R$})],h.prototype,"itemId",2),I([(0,s.CF)({converter:s.R$})],h.prototype,"currentSelectedItemId",2),h.define({name:"navbar-item",template:a,styles:o});const u=l.qy`
  <fluent-listbox>
    ${(0,d.ux)((e=>e.items),l.qy` <navbar-item
        title=${e=>e.title}
        itemId=${e=>e.itemId}
        currentSelectedItemId=${(e,t)=>t.parent.currentSelectedItemId}
      ></navbar-item>`)}
  </fluent-listbox>
`,v=c.A`
  :host {
    font-family: 'Segoe UI';
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.25rem;
  }
`;var y=r(5101),b=Object.defineProperty,f=Object.getOwnPropertyDescriptor,g=(e,t,r,i)=>{for(var n,s=i>1?void 0:i?f(t,r):t,l=e.length-1;l>=0;l--)(n=e[l])&&(s=(i?n(t,r,s):n(s))||s);return i&&s&&b(t,r,s),s};class k extends i.L{getItemById(e){return this.items.find((t=>t.itemId===e))}itemClickEventHandler(e){const t=e.detail,r=this.getItemById(t.itemId);if(!r)return;this.currentSelectedItemId=t.itemId;const i=r.path;y.Ay.navigate(i,{},!0)}constructor(){super(),this.items=[{itemId:1,title:"Home",path:"/"},{itemId:2,title:"Passwords",path:"/passwords"},{itemId:3,title:"Settings",path:"/settings"}],this.currentSelectedItemId=1,this.addEventListener("navbar-item-clicked",this.itemClickEventHandler)}}g([n.sH],k.prototype,"items",2),g([(0,s.CF)({converter:s.R$})],k.prototype,"currentSelectedItemId",2),k.define({name:"wallet-hub-navbar",template:u,styles:v})}}]);