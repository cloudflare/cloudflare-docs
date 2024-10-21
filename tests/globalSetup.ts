import type { GlobalSetupContext } from "vitest/node";
import puppeteer, { Browser } from "puppeteer";

let browser: Browser;

export default async function setup({ provide }: GlobalSetupContext) {
	browser = await puppeteer.launch({
		args: ["--no-sandbox", "--disable-setuid-sandbox"],
	});
	provide("browserWSEndpoint", browser.wsEndpoint());
}

export async function teardown() {
	await browser.close();
}

declare module "vitest" {
	export interface ProvidedContext {
		browserWSEndpoint: string;
	}
}
