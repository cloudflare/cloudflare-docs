import type { WorkbenchOptions } from "./lab";

export function renderWorkbench({
	availableModes,
	description,
	stage,
}: WorkbenchOptions): string {
	const stages = [
		["legacy", "01", "Container class"],
		["bridge", "02", "Bridge release"],
		["direct", "03", "Direct API"],
	] as const;
	return `<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Container API migration workbench</title>
	<style>
		:root { --acid:#d7ff2f; --alert:#ff4f24; --paper:#f7f4e9; --canvas:#e8e3d4; --ink:#131612; --muted:#707469; --terminal:#171b16; }
		* { box-sizing:border-box; }
		body { margin:0; min-height:100vh; color:var(--ink); font-family:"Avenir Next Condensed","Arial Narrow",sans-serif; background:linear-gradient(90deg,rgba(19,22,18,.04) 1px,transparent 1px) 0 0/28px 28px,linear-gradient(rgba(19,22,18,.04) 1px,transparent 1px) 0 0/28px 28px,var(--canvas); }
		body::before { content:""; position:fixed; inset:0; pointer-events:none; opacity:.16; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.25'/%3E%3C/svg%3E"); mix-blend-mode:multiply; }
		button,input { font:inherit; }
		.shell { width:min(1440px,calc(100% - 32px)); margin:16px auto 48px; border:2px solid var(--ink); background:var(--paper); box-shadow:10px 10px 0 var(--ink); animation:arrive .45s ease both; }
		@keyframes arrive { from { opacity:0; transform:translateY(14px); } }
		.masthead { display:grid; grid-template-columns:1fr auto; gap:24px; padding:28px 30px 24px; border-bottom:2px solid var(--ink); background:linear-gradient(110deg,var(--acid) 0 43%,var(--paper) 43%); }
		.eyebrow,.stamp,.label,.rail-index,.mode label { font:700 11px/1.2 "Berkeley Mono","IBM Plex Mono",monospace; letter-spacing:.13em; text-transform:uppercase; }
		h1 { margin:10px 0 0; font:600 clamp(42px,6vw,86px)/.86 "Iowan Old Style","Palatino Linotype",serif; letter-spacing:-.055em; }
		.stamp { align-self:start; padding:10px 13px; border:2px solid var(--ink); background:var(--paper); box-shadow:4px 4px 0 var(--alert); transform:rotate(2deg); }
		.rail { display:grid; grid-template-columns:repeat(3,1fr); border-bottom:2px solid var(--ink); }
		.rail-item { position:relative; padding:15px 20px; border-right:1px solid var(--ink); background:#dad5c7; }
		.rail-item:last-child { border:0; } .rail-item.active { color:var(--acid); background:var(--ink); }
		.rail-item.active::after { content:"RUNNING"; position:absolute; top:16px; right:14px; color:var(--paper); font:700 9px monospace; letter-spacing:.15em; }
		.rail-name { margin-top:6px; font-size:19px; font-weight:800; }
		.context { display:grid; grid-template-columns:1fr 1fr; border-bottom:2px solid var(--ink); }
		.context>div { padding:18px 24px; } .context>div+div { border-left:1px solid var(--ink); }
		.context p { max-width:72ch; margin:6px 0 0; line-height:1.45; }
		.identity { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; margin-top:8px; }
		.identity code { padding:8px; border:1px solid var(--ink); background:#fffdf4; font:11px/1.35 monospace; overflow-wrap:anywhere; }
		.workarea { display:grid; grid-template-columns:minmax(340px,.78fr) minmax(420px,1.22fr); min-height:600px; }
		.controls { padding:24px; border-right:2px solid var(--ink); }
		.field { margin-bottom:18px; } .field input { width:100%; margin-top:7px; padding:12px; border:2px solid var(--ink); border-radius:0; background:#fffdf4; font:14px monospace; }
		.field input:focus { outline:0; box-shadow:4px 4px 0 var(--acid); }
		.mode { display:flex; gap:8px; margin:8px 0 22px; }
		.mode label { flex:1; padding:10px; border:2px solid var(--ink); background:#fffdf4; cursor:pointer; text-align:center; }
		.mode label:has(input:checked) { background:var(--acid); box-shadow:3px 3px 0 var(--ink); } .mode input { position:absolute; opacity:0; }
		.actions { display:grid; grid-template-columns:repeat(2,1fr); gap:8px; }
		.action { min-height:48px; padding:9px 10px; border:1.5px solid var(--ink); border-radius:0; background:transparent; cursor:pointer; font-weight:800; text-align:left; transition:.12s; }
		.action:hover { color:var(--paper); background:var(--ink); transform:translate(-2px,-2px); box-shadow:3px 3px 0 var(--alert); } .action.danger { color:#a52d16; border-color:#a52d16; } .action:disabled { opacity:.45; }
		.readout { display:grid; grid-template-rows:auto minmax(260px,1fr) minmax(180px,.62fr); color:#e7ebdc; background:var(--terminal); }
		.readout-head { display:flex; justify-content:space-between; padding:14px 18px; border-bottom:1px solid #4e5548; }
		.live { display:flex; align-items:center; gap:8px; } .live::before { content:""; width:9px; height:9px; border-radius:50%; background:var(--acid); } .live.busy::before { background:var(--alert); animation:pulse .8s infinite alternate; } @keyframes pulse { to { opacity:.3; } }
		pre { margin:0; padding:20px; overflow:auto; font:12px/1.65 "Berkeley Mono","IBM Plex Mono",monospace; white-space:pre-wrap; word-break:break-word; } #output { border-bottom:1px solid #4e5548; color:#f5f1df; } #events { color:#aeb7a4; } .ok { color:var(--acid)!important; } .bad { color:#ff7a5e!important; }
		footer { display:flex; justify-content:space-between; padding:12px 18px; border-top:2px solid var(--ink); font:10px/1.4 monospace; letter-spacing:.08em; text-transform:uppercase; }
		@media(max-width:850px) { .masthead,.context,.workarea { grid-template-columns:1fr; } .masthead { background:var(--acid); } .context>div+div,.controls { border-left:0; border-right:0; border-top:1px solid var(--ink); } .identity { grid-template-columns:1fr; } .rail { overflow:auto; } .rail-item { min-width:190px; } }
		@media(prefers-reduced-motion:reduce) { * { animation-duration:.01ms!important; } }
	</style>
</head>
<body><main class="shell">
	<header class="masthead"><div><div class="eyebrow">Executable migration reference / laboratory 03</div><h1>Container API<br>migration workbench</h1></div><div class="stamp">Stage: ${stage}</div></header>
	<nav class="rail" aria-label="Migration stages">${stages.map(([key, number, name]) => `<div class="rail-item ${key === stage ? "active" : ""}"><div class="rail-index">${number}</div><div class="rail-name">${name}</div></div>`).join("")}</nav>
	<section class="context"><div><div class="label">Current experiment</div><p>${description}</p></div><div><div class="label">Identity held constant</div><div class="identity"><code>class MigrationWorkbench</code><code>binding MIGRATION_WORKBENCH</code><code>image container/Dockerfile</code></div></div></section>
	<section class="workarea"><div class="controls">
		<div class="field"><label class="label" for="instance">Durable Object instance</label><input id="instance" value="reference" maxlength="64" spellcheck="false"></div>
		<div class="label">Control path</div><div class="mode">${availableModes.map((mode, index) => `<label><input type="radio" name="mode" value="${mode}" ${index === 0 ? "checked" : ""}>${mode === "helper" ? "Class helpers" : "Direct runtime"}</label>`).join("")}</div>
		<div class="actions">${[
			["start", "Start + readiness"],
			["status", "Read state"],
			["echo", "Proxy request"],
			["alternate", "Alternate port"],
			["switch-port", "Switch port"],
			["exec", "Execute process"],
			["outbound", "Intercept outbound"],
			["renew", "Renew activity"],
			["schedule", "Schedule +3 s"],
			["events", "Read event ledger"],
			["stop", "Graceful stop"],
			["destroy", "Destroy"],
		]
			.map(
				([action, label]) =>
					`<button class="action ${action === "stop" || action === "destroy" ? "danger" : ""}" data-action="${action}">${label}</button>`,
			)
			.join("")}</div>
	</div><div class="readout"><div class="readout-head"><span class="label">Runtime response</span><span class="live" id="live">ready</span></div><pre id="output" aria-live="polite">Select an operation to begin.</pre><pre id="events">Event ledger loads here.</pre></div></section>
	<footer><span>One image · one class name · one namespace</span><span>State ledger persists across stage deployments</span></footer>
</main><script type="module">
	const stage=${JSON.stringify(stage)}, output=document.querySelector("#output"), events=document.querySelector("#events"), live=document.querySelector("#live"), buttons=[...document.querySelectorAll("[data-action]")];
	const mode=()=>document.querySelector('input[name="mode"]:checked')?.value??"direct";
	async function run(action,quiet=false){const instance=document.querySelector("#instance").value.trim()||"reference",params=new URLSearchParams({instance,mode:mode()});live.textContent=action;live.classList.add("busy");buttons.forEach(b=>b.disabled=true);try{const response=await fetch('/api/'+action+'?'+params,{method:action==="status"||action==="events"?"GET":"POST"}),text=await response.text();let value;try{value=JSON.parse(text)}catch{value=text}if(!quiet){output.className=response.ok?"ok":"bad";output.textContent=JSON.stringify({action,mode:mode(),stage,status:response.status,response:value},null,2)}if(action==="events")events.textContent=JSON.stringify(value,null,2)}catch(error){output.className="bad";output.textContent=JSON.stringify({action,error:error.message},null,2)}finally{live.textContent="ready";live.classList.remove("busy");buttons.forEach(b=>b.disabled=false)}}
	document.addEventListener("click",event=>{const button=event.target.closest("[data-action]");if(button)run(button.dataset.action).then(()=>button.dataset.action==="events"?null:run("events",true))});run("status").then(()=>run("events",true));
</script></body></html>`;
}
