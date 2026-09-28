import assert from "node:assert/strict";

const [baseUrl, stage, instance = "reference-e2e"] = process.argv.slice(2);
if (!baseUrl || !["legacy", "bridge", "direct"].includes(stage)) {
	console.error(
		"Usage: node scripts/e2e.mjs <worker-url> <legacy|bridge|direct> [instance]",
	);
	process.exit(2);
}
const results = [];
async function call(action, mode, options = {}) {
	const url = new URL(`/api/${action}`, baseUrl);
	url.searchParams.set("instance", instance);
	url.searchParams.set("mode", mode);
	if (options.delay) url.searchParams.set("delay", String(options.delay));
	const started = Date.now();
	const response = await fetch(url, {
		method: action === "status" || action === "events" ? "GET" : "POST",
		signal: AbortSignal.timeout(120_000),
	});
	const text = await response.text();
	let body;
	try {
		body = JSON.parse(text);
	} catch {
		body = text;
	}
	results.push({
		action,
		durationMs: Date.now() - started,
		mode,
		status: response.status,
	});
	return { body, response };
}
async function startEventually(mode) {
	let result;
	for (let attempt = 1; attempt <= 8; attempt += 1) {
		result = await call("start", mode);
		if (result.response.ok) return result;
		if (attempt < 8) await new Promise((resolve) => setTimeout(resolve, 5_000));
	}
	return result;
}
async function exercise(mode) {
	console.log(`\n[${stage}/${mode}] start and readiness`);
	let result = await startEventually(mode);
	assert.equal(result.response.ok, true, JSON.stringify(result.body));
	result = await call("status", mode);
	assert.equal(result.response.ok, true, JSON.stringify(result.body));
	result = await call("echo", mode);
	assert.equal(result.response.ok, true, JSON.stringify(result.body));
	assert.equal(result.body.port, 8080);
	result = await call("alternate", mode);
	assert.equal(result.response.ok, true, JSON.stringify(result.body));
	assert.equal(result.body.port, 9090);
	result = await call("switch-port", mode);
	assert.equal(result.response.ok, true, JSON.stringify(result.body));
	assert.equal(result.body.port, 9090);
	result = await call("exec", mode);
	assert.equal(result.response.ok, true, JSON.stringify(result.body));
	assert.equal(result.body.exitCode, 0);
	assert.match(result.body.stdout, /^v\d+/);
	result = await call("outbound", mode);
	assert.equal(result.response.ok, true, JSON.stringify(result.body));
	assert.equal(result.body.intercepted, true, JSON.stringify(result.body));
	result = await call("renew", mode);
	assert.equal(result.response.ok, true, JSON.stringify(result.body));
	const scheduleStartedAt = Date.now();
	result = await call("schedule", mode);
	if (stage === "bridge" && mode === "direct")
		assert.equal(result.response.status, 409, JSON.stringify(result.body));
	else {
		assert.equal(result.response.status, 202, JSON.stringify(result.body));
		await new Promise((resolve) => setTimeout(resolve, 4_500));
	}
	result = await call("events", mode);
	assert.equal(result.response.ok, true, JSON.stringify(result.body));
	assert.ok(Array.isArray(result.body));
	assert.ok(result.body.length > 0);
	if (!(stage === "bridge" && mode === "direct")) {
		const expectedMessage =
			stage === "direct"
				? "Durable Object alarm handled scheduled work"
				: "Container.schedule callback";
		assert.ok(
			result.body.some(
				(event) =>
					event.stage === stage &&
					event.message === expectedMessage &&
					Date.parse(event.at) >= scheduleStartedAt - 1000,
			),
			`${expectedMessage} did not run for the current test`,
		);
	}
	result = await call("stop", mode);
	assert.equal(result.response.ok, true, JSON.stringify(result.body));
	await new Promise((resolve) => setTimeout(resolve, 2_000));
	result = await startEventually(mode);
	assert.equal(result.response.ok, true, JSON.stringify(result.body));
	result = await call("echo", mode);
	assert.equal(result.response.ok, true, JSON.stringify(result.body));
	assert.equal(result.body.port, 8080);
	result = await call("outbound", mode);
	assert.equal(result.response.ok, true, JSON.stringify(result.body));
	assert.equal(result.body.intercepted, true, JSON.stringify(result.body));
	result = await call("destroy", mode);
	assert.equal(result.response.ok, true, JSON.stringify(result.body));
	await new Promise((resolve) => setTimeout(resolve, 4_000));
}
const modes =
	stage === "bridge"
		? ["helper", "direct"]
		: [stage === "legacy" ? "helper" : "direct"];
for (const mode of modes) await exercise(mode);
const ledger = await call("events", modes.at(-1));
assert.equal(ledger.response.ok, true, JSON.stringify(ledger.body));
const seenStages = new Set(ledger.body.map((event) => event.stage));
assert.ok(seenStages.has(stage));
if (stage === "direct") {
	assert.ok(seenStages.has("legacy"), "Legacy events did not survive");
	assert.ok(seenStages.has("bridge"), "Bridge events did not survive");
	assert.ok(
		ledger.body.some(
			(event) =>
				event.message === "Durable Object alarm handled scheduled work" &&
				event.detail?.payload?.stage === "bridge",
		),
		"The direct alarm handler did not process the bridge cutover job",
	);
}
console.table(results);
console.log(
	`PASS: ${stage} end-to-end suite completed for instance ${instance}`,
);
