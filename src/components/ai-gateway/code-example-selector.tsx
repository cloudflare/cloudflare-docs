import { useEffect, useState } from "react";
import ReactSelect from "react-select";

const STORAGE_KEY = "ai-gateway-code-selector";
const AIG_EVENT = "ai-gateway-selector-change";

export type Provider =
	| "openai"
	| "anthropic"
	| "google"
	| "grok"
	| "dynamic"
	| "workers-ai";
export type KeyType = "byok" | "in-request" | "unified";
export type ClientType = "openai-js" | "curl" | "aisdk";
export type APIType = "native" | "unified";

export interface Config {
	provider: Provider;
	keyType: KeyType;
	clientType: ClientType;
	apiType: APIType;
}

/**
 * Shared hook to read and update the currently selected platform/framework.
 *
 * - Persists selection in localStorage under STORAGE_KEY.
 * - Broadcasts changes via the `ai-gateway-selector-change` custom event.
 * - Listens to the same event to stay in sync across multiple components.
 */
export function useAIGConfig() {
	const [config, setConfig] = useState<Config>({
		provider: "openai",
		keyType: "byok",
		clientType: "openai-js",
		apiType: "unified",
	});

	// Helper: broadcast selection changes so other listeners can sync.
	function notifySelectionChange(_config: Partial<Config>) {
		if (typeof window === "undefined") return;
		try {
			window.dispatchEvent(
				new CustomEvent(AIG_EVENT, {
					detail: { ...config, ..._config },
				}),
			);
		} catch {
			// Ignore event dispatch errors.
		}
	}

	// Initialise selection from localStorage (if available) on first render.
	useEffect(() => {
		if (typeof window === "undefined") return;

		try {
			const raw = window.localStorage.getItem(STORAGE_KEY);
			if (raw) {
				const parsed = JSON.parse(raw) as Config;

				setConfig((prev) => ({ ...prev, ...parsed }));
				notifySelectionChange(parsed);
				return;
			}
		} catch {
			// Ignore JSON or storage errors and fall back to defaults.
		}

		notifySelectionChange(config);
	}, []);

	// Keep local state in sync with external changes.
	useEffect(() => {
		if (typeof window === "undefined") return;

		function handleChange(
			event: Event & {
				detail?: Config;
			},
		) {
			if (!event.detail) return;
			setConfig((prev) => ({ ...prev, ...event.detail }));
		}

		window.addEventListener(AIG_EVENT, handleChange as EventListener);

		return () => {
			window.removeEventListener(AIG_EVENT, handleChange as EventListener);
		};
	}, []);

	function updateConfig(c: Partial<Config>) {
		setConfig((prev) => {
			const updated = { ...prev, ...c };

			if (typeof window !== "undefined") {
				try {
					window.localStorage.setItem(
						STORAGE_KEY,
						JSON.stringify({
							...updated,
						}),
					);
				} catch {
					// Ignore storage errors.
				}
			}

			notifySelectionChange(updated);
			return updated;
		});
	}

	return {
		config,
		updateConfig,
	};
}

type ProviderItem = {
	value: Provider;
	label: string;
	icon?: string;
	invertIconDark?: boolean;
};
const providerOptions: ProviderItem[] = [
	{
		value: "openai",
		label: "OpenAI",
		invertIconDark: true,
		icon: "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPgo8c3ZnIGZpbGw9IiMwMDAwMDAiIHdpZHRoPSI2NHB4IiBoZWlnaHQ9IjY0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgcm9sZT0iaW1nIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0aXRsZT5PcGVuQUkgaWNvbjwvdGl0bGU+PHBhdGggZD0iTTIyLjI4MTkgOS44MjExYTUuOTg0NyA1Ljk4NDcgMCAwIDAtLjUxNTctNC45MTA4IDYuMDQ2MiA2LjA0NjIgMCAwIDAtNi41MDk4LTIuOUE2LjA2NTEgNi4wNjUxIDAgMCAwIDQuOTgwNyA0LjE4MThhNS45ODQ3IDUuOTg0NyAwIDAgMC0zLjk5NzcgMi45IDYuMDQ2MiA2LjA0NjIgMCAwIDAgLjc0MjcgNy4wOTY2IDUuOTggNS45OCAwIDAgMCAuNTExIDQuOTEwNyA2LjA1MSA2LjA1MSAwIDAgMCA2LjUxNDYgMi45MDAxQTUuOTg0NyA1Ljk4NDcgMCAwIDAgMTMuMjU5OSAyNGE2LjA1NTcgNi4wNTU3IDAgMCAwIDUuNzcxOC00LjIwNTggNS45ODk0IDUuOTg5NCAwIDAgMCAzLjk5NzctMi45MDAxIDYuMDU1NyA2LjA1NTcgMCAwIDAtLjc0NzUtNy4wNzI5em0tOS4wMjIgMTIuNjA4MWE0LjQ3NTUgNC40NzU1IDAgMCAxLTIuODc2NC0xLjA0MDhsLjE0MTktLjA4MDQgNC43NzgzLTIuNzU4MmEuNzk0OC43OTQ4IDAgMCAwIC4zOTI3LS42ODEzdi02LjczNjlsMi4wMiAxLjE2ODZhLjA3MS4wNzEgMCAwIDEgLjAzOC4wNTJ2NS41ODI2YTQuNTA0IDQuNTA0IDAgMCAxLTQuNDk0NSA0LjQ5NDR6bS05LjY2MDctNC4xMjU0YTQuNDcwOCA0LjQ3MDggMCAwIDEtLjUzNDYtMy4wMTM3bC4xNDIuMDg1MiA0Ljc4MyAyLjc1ODJhLjc3MTIuNzcxMiAwIDAgMCAuNzgwNiAwbDUuODQyOC0zLjM2ODV2Mi4zMzI0YS4wODA0LjA4MDQgMCAwIDEtLjAzMzIuMDYxNUw5Ljc0IDE5Ljk1MDJhNC40OTkyIDQuNDk5MiAwIDAgMS02LjE0MDgtMS42NDY0ek0yLjM0MDggNy44OTU2YTQuNDg1IDQuNDg1IDAgMCAxIDIuMzY1NS0xLjk3MjhWMTEuNmEuNzY2NC43NjY0IDAgMCAwIC4zODc5LjY3NjVsNS44MTQ0IDMuMzU0My0yLjAyMDEgMS4xNjg1YS4wNzU3LjA3NTcgMCAwIDEtLjA3MSAwbC00LjgzMDMtMi43ODY1QTQuNTA0IDQuNTA0IDAgMCAxIDIuMzQwOCA3Ljg3MnptMTYuNTk2MyAzLjg1NThMMTMuMTAzOCA4LjM2NCAxNS4xMTkyIDcuMmEuMDc1Ny4wNzU3IDAgMCAxIC4wNzEgMGw0LjgzMDMgMi43OTEzYTQuNDk0NCA0LjQ5NDQgMCAwIDEtLjY3NjUgOC4xMDQydi01LjY3NzJhLjc5Ljc5IDAgMCAwLS40MDctLjY2N3ptMi4wMTA3LTMuMDIzMWwtLjE0Mi0uMDg1Mi00Ljc3MzUtMi43ODE4YS43NzU5Ljc3NTkgMCAwIDAtLjc4NTQgMEw5LjQwOSA5LjIyOTdWNi44OTc0YS4wNjYyLjA2NjIgMCAwIDEgLjAyODQtLjA2MTVsNC44MzAzLTIuNzg2NmE0LjQ5OTIgNC40OTkyIDAgMCAxIDYuNjgwMiA0LjY2ek04LjMwNjUgMTIuODYzbC0yLjAyLTEuMTYzOGEuMDgwNC4wODA0IDAgMCAxLS4wMzgtLjA1NjdWNi4wNzQyYTQuNDk5MiA0LjQ5OTIgMCAwIDEgNy4zNzU3LTMuNDUzN2wtLjE0Mi4wODA1TDguNzA0IDUuNDU5YS43OTQ4Ljc5NDggMCAwIDAtLjM5MjcuNjgxM3ptMS4wOTc2LTIuMzY1NGwyLjYwMi0xLjQ5OTggMi42MDY5IDEuNDk5OHYyLjk5OTRsLTIuNTk3NCAxLjQ5OTctMi42MDY3LTEuNDk5N1oiLz48L3N2Zz4=",
	},
	{
		value: "anthropic",
		label: "Anthropic",
		invertIconDark: true,
		icon: "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSJub25lIiB2aWV3Qm94PSIwIDAgMjU2IDI1NiI+CiAgICA8cGF0aCBmaWxsPSJ1cmwoI2EpIiBkPSJNMCAwaDU4NXY1ODVIMHoiLz4KICAgIDxkZWZzPgogICAgICA8cGF0dGVybiBpZD0iYSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgcGF0dGVybkNvbnRlbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giPgogICAgICAgIDx1c2UgaHJlZj0iI2IiIHRyYW5zZm9ybT0ic2NhbGUoLjAwMTcpIi8+CiAgICAgIDwvcGF0dGVybj4KICAgICAgPGltYWdlIGlkPSJiIiB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgZGF0YS1uYW1lPSJBbnRocm9waWMucG5nIiBocmVmPSJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQWtrQUFBSkpDQVlBQUFDK2dLTTBBQUFBQ1hCSVdYTUFBQXNUQUFBTEV3RUFtcHdZQUFBQUFYTlNSMElBcnM0YzZRQUFBQVJuUVUxQkFBQ3hqd3Y4WVFVQUFCK2lTVVJCVkhnQjdkMUJiaHpYbmNmeDhpRHJYRUNCdlJYWER1VHRERUF1TTREb3JRUHFBdEk2UjRpM1RXQ3lGQVZrSytvQTdNUnI4d0xrQWFJTDVBS2VQQ1ZNV2svLzk2cTZ1N3E3cXQ3bkF4Z0RETEpLYVBhdjMvdXk2cXR2dnZuNmx3NEFnTS84VndjQXdCZU1KQUNBZ0pFRUFCQXdrZ0FBQWtZU0FFREFTQUlBQ0JoSkFBQUJJd2tBSUdBa0FRQUVqQ1FBZ0lDUkJBQVFNSklBQUFKR0VnQkF3RWdDQUFnWVNRQUFBU01KQUNCZ0pBRUFCSXdrQUlDQWtRUUFFRENTQUFBQ1JoSUFRTUJJQWdBSUdFa0FBQUVqQ1FBZ1lDUUJBQVNNSkFDQWdKRUVBQkF3a2dBQUFrWVNBRURBU0FJQUNCaEpBQUFCSXdrQUlHQWtBUUFFakNRQWdJQ1JCQUFRTUpJQUFBSkdFZ0JBd0VnQ0FBZ1lTUUFBQVNNSkFDQmdKQUVBQkl3a0FJQ0FrUVFBRURDU0FBQUNSaElBUU1CSUFnQUlHRWtBQUFFakNRQWdZQ1FCQUFTTUpBQ0FnSkVFQUJBd2tnQUFBa1lTQUVEQVNBSUFDQmhKQUFBQkl3a0FJR0FrQVFBRWpDUUFnSUNSQkFBUU1KSUFBQUpHRWdCQXdFZ0NBQWdZU1FBQUFTTUpBQ0JnSkFFQUJJd2tBSUNBa1FRQUVEQ1NBQUFDUmhJQVFNQklBZ0FJR0VrQUFBRWpDUUFnWUNRQkFBU01KQUNBZ0pFRUFCQXdrZ0FBQWtZU0FFREFTQUlBQ0JoSkFBQUJJd2tBSUdBa0FRQUVqQ1FBZ0lDUkJBQVFNSklBQUFKR0VnQkF3RWdDQUFnWVNRQUFBU01KQUNCZ0pBRUFCSXdrQUlDQWtRUUFFRENTQUFBQ1JoSUFRTUJJQWdBSUdFa0FBQUVqQ1FBZ1lDUUJBQVNNSkFDQWdKRUVBQkF3a2dBQUFrWVNBRURBU0FJQUNCaEpBQUFCSXdrQUlHQWtBUUFFakNRQWdJQ1JCQUFRTUpJQUFBSkdFZ0JBd0VnQ0FBZ1lTUUFBQVNNSkFDQmdKQUVBQkl3a0FJQ0FrUVFBRURDU0FBQUNSaElBUU1CSUFnQUlHRWtBQUFFakNRQWdZQ1FCQUFTTUpBQ0FnSkVFQUJBd2tnQUFBa1lTQUVEQVNBSUFDUHlxZzRiOCtPTWZ1OHZMeTQ1aGZ2ZTcvKzBlSHgrN1Z2ejYxNy91ZnZycHI1LytMN0Z2di8xdDkvZS8vNzJERmpoSm9oblBuajB6a0xaMGNYSFJ0U1I5K04vZWZ1Z291N3E2NnFBVlJoTE4rTzY3N3pxMjgrclZWWE9uS3V2MVhVZForcG1BVmhoSk5PUE5tOWNkMjBrRDZjV0xGMTFMZnY3NS9oLy8vTndSU3o4VDMzM1gxczhFN1RLU2FFTDZvRS9YYld5dnhaT0Q5Zm92SFdXdlgvdkNRUnVNSkpydy9mZGFwRjJsYThybno1OTNMYm05dlJVblY2U2ZDWEU3TFRDU1dEekI5djVhRExqdjd0WWRaUUp1V21Ba3NYaUM3ZjIxR0hCLytIRGJVU2JncGdWR0Vvc24yTjVmcXdIM3c4TkRSMHpBVFF1TUpCWk5zRDJlRms4T1hMblZDYmhaT2lPSlJSTnNqNmZGZ1B2ZHUzY0M3Z29CTjB0bkpMRllndTN4dFJodzM5L2ZkNVFKdUZreUk0bkZFbXlQcjhXQSsrYm1wcU5Nd00yU0dVa3NsbUI3ZkFKdWNnSnVsc3hJWXBFRTI0Y2o0Q1luNEdhcGpDUVdTYkI5T0MzR3VnTHVPZ0UzUzJVa3NUaUM3Y05yTGRZVmNQY1RjTE5FUmhLTEk5Zyt2QmF2M0FUY2RRSnVsc2hJWW5FRTI0ZlhZcXdyNEs0VGNMTkVSaEtMSXRnK25oWmpYUUYzbllDYnBUR1NXQlRCOXZFSXVNa0p1RmthSTRuRkVHd2ZuNENibklDYkpUR1NXQXpCOXZFSnVNa0p1RmtTSTRuRkVHd2ZYNnNCOThlUEh6dGlBbTZXeEVoaUVRVGJwOU5pclB2Ky9XMUhtWUNicFRDU1dBVEI5dW0wR25CVEp1Qm1LWXdrWmsrd2ZYb3RCdHcvLy94elI1bUFteVV3a3BnOXdmYnB0UmpyWGw5ZmQ1UmRYSngzTUhkR0VyTW4yRDY5VmdOdXowd3FPenM3RTNBemUwWVNzeWJZbm80V1k5MmJHMjFTemRYVnF3N216RWhpMWdUYjB5SGdKcGRPa2dUY3pKbVJ4R3dKdHFkSHdNMm1OSkFFM015WmtjUnNDYmFuUjhCTlRzRE5uQmxKekpaZ2Uzb0UzT1FFM015WmtjUXNDYmFuUzhCTlRzRE5YQmxKekpKZ2U3b0UzT1FFM015VmtjVHNDTGFuVDhETkpnRTNjMlVrTVR1Qzdla1RjSk1UY0ROSFJoS3pJOWllUGdFM09RRTNjMlFrTVN1Qzdma1FjSk1UY0RNM1JoS3pJdGllRHdFM09RRTNjMk1rTVJ2cGwrdjV1YTVoVGdUY2JCSndNemRHRXJPUkJwSnZvZk1pNENZbjRHWk9qQ1JtbzhVUDNMa1RjSk1UY0RNblJoS3prSDZ4cG4rWUh3RTN1ZlB6aXc3bXdFaGlGcHdpelplQW05emw1VXRYNTh5Q2tjVGtDYmJuVDhETnB2VHY5TXVYTHp1WU9pT0p5Uk5zejUrQW01eUFtemt3a3BnOFYyM3pKK0FtbDY1aEJkeE1uWkhFcEFtMmwwUEFUVTdBemRRWlNVeWFVNlRsRUhDVEUzQXpkVVlTa3lYWVhoNEJONXNFM0V5ZGtjUmtDYmFYUjhCTlRzRE5sQmxKVEphcnR1VVJjSk1UY0RObFJoS1RKTmhlTGdFM09RRTNVMlVrTVVsT2taWkx3RTFPd00xVUdVbE1qbUI3K1FUY2JCSndNMVZHRXBNajJGNCtBVGM1QVRkVFpDUXhPZW5vbldVVGNKTVRjRE5GUmhLVDh1elpzMCsvTEZrK0FUYzVBVGRUWXlReEtXL2V0UGZCMlNvQk56a0JOMU5qSkRFcFRwSGFJdUJtazRDYnFUR1NtSXpMeTh0UDEyMjBROEJOVHNETmxCaEpUSVpndXowQ2JuSUNicWJFU0dJU0JOdnRFbkNURTNBekZVWVNreURZYnBlQW01eUFtNmt3a3BnRXAwaHRFM0N6U2NETlZCaEpuSnhnbXhaalhRRjNuWUNiS1RDU09EbkJObWRuWndKdVBpUGdaZ3FNSkU1S3NNMlRxNnRYWFdzRTNIVUNiazdOU09La0JOczhTYWNHQW00MkNiZzVOU09KazNLS3hKUDBZU2pnWnBPQW0xTXpramdad1RZNUFUYzVBVGVuWkNSeE1vSnRjZ0p1Y2dKdVRzbEk0aVFFMjVRSXVNa0p1RGtWSTRtVEVHeFRJdUFtSitEbVZJd2tUc0lwRWlVQ2JuSUNiazdGU09Mb0JOdjBhVEhXZFpwVUorRG1GSXdrams2d1RSOEJOemtCTjZkZ0pIRlVnbTJHYWkzZ1RnTkp3RjBuNE9iWWpDU09TckROVUMwRzNPdjF1cU5Nd00yeEdVa2NsVk1raG1veDRINTRlQkJ3VndpNE9UWWppYU1SYkxNdEFUYzVBVGZIWkNSeE5JTHRNc0Z1VE1CTlRzRE5NUmxKSElWZ3Uremp4NC9kSC83d2g0NVlhN0d1Z0x1ZmdKdGpNWkk0Q3NGMjJXcTFjbnBRMFdLc0srQ3VFM0J6TEVZU1IrRVVxZXhwSU4zZWZ1ajRVb3V4cm9DN1RzRE5zUmhKSEp4Z3UrejI5dmJUZFZ1eVh0OTF4QVRjNUFUY0hJT1J4TUVKdHN2U1NIcVNUcFNjSHNSYWpIVmR3ZFlKdURrR0k0bURFbXlYcFJPazlFRzRhYjMrUzBkTXdFMU93TTJoR1VrY2xHQzc3UDM3MnkvK2YrbGt5ZWxCVE1CTlRzRE5vUmxKSEpSVHBMTE5xN1luQXU0eUFUYzVBVGVIWmlSeE1JTHRzdlRCOXhSczV3VGNaUUp1Y2dKdURzbEk0bUFFMjJYUktkS1QxQ21sRXdTK0pPQW1KK0Rta0l3a0RrS3dYWlpPa1BxdTFPN3V0Q2dsTFFiY3JtRHJCTndjaXBIRVFRaTJ5NFkwSnE1WXl0b011RjNCMWdpNE9SUWppWU53aWxTMldsMzMvbWZTNllGZ045WmlyT3NaV25YcForTDhYSnZFK0l3a1JpZllMcXNGMjducjYvNHgxYW9XWTEzUDBLclRRSElJUmhLajg4dXFyQlpzNXdTN1pTM0d1cDZoVlpkK0pwNC9mOTdCbUl3a1JpWFlMa3NmY051ZUJuamljcG1BbTl6RmhZQ2JjUmxKakVxd1haYWVucnp0U2NBMkowK3RFWENUZS9YcVNzRE5xSXdrUnVVVXFXeVh3ZlBQOTdzSmRpTUNibkxwWitMRkM4OU1ZanhHRXFNUmJKZEZMN01keWhWTG1ZQ2JYRHBOZ3JFWVNZeEdzRjIyV3EyNlhlMXlUZGNLQVRjNUFUZGpNcElZaFdDN2J0ZFRwRVN3V3lmZ0ppZmdaaXhHRXFNUWJKZWxiLzVEbjQxVUl0Z3RFM0NURTNBekZpT0pVVGhGS3J1NzIvOERUYkJiSnVBbUorQm1MRVlTZXhOc2w2VVRwTEZDVzhGdW1ZQ2JuSUNiTVJoSjdFMndYWFozdCs3R0l0Z3RFM0NURTNBekJpT0p2UWkyNjI1dWJycXhwQS9FKy92ZEEvQ2xFM0NURTNDekx5T0p2UWkyeTdaNW1lMVFZNDZ1cFJGd2t4TndzeThqaWIwNFJTbzd4Q3RGdlBTMlRNQk5Uc0ROdm93a2RwWmlXY0YyTEowZ0hlb3F4RXR2eXdUYzVBVGM3TU5JWW1mcHI5cUlIZkxiL2J0M1JsS0pnSnRjK3Bud1pZNWRHVW5zSlAzU09UOXY3MXY3VUcvZjNuU0hrajRRWGJHVUNiakorVUxIcm93a2R1S1hUdG5EdzBQMytQallIZEwxOVhWSFRNQk56cFVidXpLUzJNbjMzeHRKSmNmNEN6UUJkNW1BbTF6Nm1XanRHcFp4R0Vsc1RiQmR0OC9MYkxjaDRDNFRjSk43L2RyalN0aWVrY1RXWExXVmpmRXkyNkhXNi9HZTVyMDBBbTV5NldmQ001UFlscEhFVmdUYmRZZDRObEpKYXA5Y3NaUUp1TWxkWFdtVDJJNlJ4RmFjSXBXbEU2UmpYYlU5Y2NWU0p1QW1KK0JtVzBZU1d4RnNsNjFXcSs3WVhMR1VDYmpKQ2JqWmxwSEVZSUx0dW1PZklpV3VXT29FM09RRTNHekRTR0l3VjIxbGQzZnJvd1hiT1Zjc1pRSnVjZ0p1dG1Fa01ZaGd1KzcyOW4xM0txNVk2Z1RjNUFUY0RHVWtNWWhUcExKMGduVHFLdzVYTEdVQ2JuSUNib1l5a2hoRXNGMDJoVk1jVnl4bEFtNXlBbTZHTXBMb0pkaXVXNjFPL3g2MU5KRHU3NDhmanMrRmdKdWNnSnNoakNSNnVXb3JTOS9XVHhWczU0N3h6cmk1RW5DVEUzQXpoSkZFbFdDNzdwaFAyTzdqcGJkMUFtNXlBbTc2R0VsVXBXOWJ4TklKMHRRK2hMejB0a3pBVFU3QVRSOGppYW8zYjl6Ymwwd3hqSDMzemtncUVYQ1RFM0RUeDBpaTZNV0xGNEx0aXJkdmI3cXBTVmNzUGhUTEJOemtCTnpVR0VrVStiUC9zb2VIaCs3eDhiR2JvdXZyMC8rMTNWUUp1TWtKdUtreGtnaWxFeVIvMVZZMjViOGtFM0RYQ2JqSkNiZ3BNWklJQ2JiclR2RXkyMjBJdU1zRTNPUUUzSlFZU1lRRTIyWHArbUlxejBZcXViL1hKWldrZ2RUYVl5MEUzSFVDYmtxTUpMNGcySzZiMHJPUlNud28xcVhUcE5ZSXVPc0UzRVNNSkw0ZzJDNUxKMGhUdjJwNzRrT3hMRjBuUDMvK3ZHdUpnTHRPd0UzRVNPSXpndTI2S2Y3WmY0a1B4YnFMQ3dFM254Tndrek9TK0l4Z3UyNjlYbmR6NFVPeExzVzZBbTQyQ2JqSkdVbDhSckJkZG5lM25ueXduZk9oV0pZR1V1cnZXcUpWcXhOd2t6T1MrRGZCZHQwY0I0Y1B4Ym9XVHc2MGFuVUNiallaU2Z5YllMdHNpaSt6SFdvdW9ma3BDTGpKQ2JqWlpDVHhpV0M3YnM2bk1WNTZXeWZnSmlmZzVvbVJ4Q2VDN2JyVmFyN3ZRL1BTMnpvQk56a0JOMCtNSkQ0UmJKZWxnVEczWUR2bnBiZGxyUWJjNlNYTnhBVGNQREdTRUd6M21NTVR0dnQ0NlcxZGl5Y0g2YTgxS1JOd2t4aEpDTFlyMHJCWXlsOERlZWx0V1lzQmQyclZET2N5QVRlSmtkUTR3WFpkZW5qa1VqNUlCTngxTFFiYzkvZis4ckZHd0kyUjFEakJkdDBTcnRxZUNManJXZ3k0YjI1dU9zb0UzQmhKalJOc2w4M3BaYlpET1UwcUUzQ1RFM0JqSkRWTXNGMjNXcTI2cFJGdzF3bTR5UW00MjJZa05VeXdYYmZFSjFWN2tHQ2RnSnVjZ0x0dFJsS2pCTnQxcVVXYSs3T1JTanhJc0U3QVRVN0EzUzRqcVZHQzdib2xCZHM1TDcydGEvSEtUY0JkSitCdWw1SFVLTUYyMlJLRDdadzN3WmUxR09zS3VPc0UzTzB5a2hvazJLNTcvMzY1cDBoUHZBbStyc1ZZVjhCZEorQnVrNUhVSU1GMjNaS3YycDRJdU90YWpIVUYzSFVDN2pZWlNZMFJiTmN0NFdXMlF3bTQ2MXFMZFFYYy9RVGM3VEdTR2lQWXJtdmhGT21KRHFWT3dFMU93TjBlSTZreGd1MnlkSUxVMmhXVURxVk13RTFPd04wZUk2a2hndTI2RnY4czNtdEs2Z1RjNUFUY2JUR1NHaUxZcmx1dHJydldlT2x0WGFzQk4yVUM3cllZU1kwUWJOZTFGR3pucnEvYkc0ZmJhREhnTnB6ckJOenRNSklhSWRpdWF5bll6bm5wYlYyTHNhN2hYQ2ZnYm9lUjFBakJkbGthQ0swL2dmcm14aFZMU2FzQnQrRmNKdUJ1aDVIVUFNRjIzWHE5YnY0RFFZZFMxMktzYXpqWFhWMjk2bGcrSTZrQmd1MjZscS9hbnVoUTZnVGM1TkpKa29CNytZeWtoUk5zMTdYd010dWhmQ2pXQ2JqWmxBYVNnSHY1aktTRkUyelhyVmFyam4vU29kUUp1TWxkWEp4M0xKdVJ0SENDN1RxblNQL2hwYmQxQW01eVoyZG5BdTZGTTVJV1RMQmRsMXFrVnArTlZPS2x0M1VDYm5JQzdtVXpraFpNc0YxM2QyY1E1TkxKZ1E2bFRNQk5Uc0M5YkViU1FnbTI2OUlKVXV2UFJpcngzMHVkZ0p0TkF1NWxNNUlXU3JCZDV5V2VaZWthVW9kU0p1QW1KK0JlTGlOcG9RVGJkVGMzTngyeE5KQ015RElCTnprQjkzSVpTUXNrMks1citXVzJRMzM0NEFHYk5RSnVjZ0x1WlRLU0ZraXdYZWNKMi8zU3lZRWhXU2JnSmlmZ1hpWWphV0VFMjNYcGc5K3pnSVo1Lzk2WXJCRndzMG5BdlV4RzBzSUl0dXY4a2gvT3lVR2RnSnVjZ0h0NWpLU0ZhZkVYOXpaV0s3L2toM0p5VUNmZ0ppZmdYaDRqYVVIU3Y2RHBIMklQRHc4Nm15MDVPYWdUY0pNVGNDK0xrYlFnVHBIcS9Obi85cHdjMUFtNHlRbTRsOFZJV29qMEwrWDV1ZnZ3R2krejNZMlRnem9CTjV2UzcrS1hMMTkyTElPUnRCQnBJUG4yVXVabHRydGJyejFZc2tiQVRVN0F2UnhHMGtLNGFxdnpiS1RkcFpiTHlVR1pnSnRjdW9ZVmNDK0RrYlFBZ3UyNmRJTGtxbTAvWG5wYkorQW1kMzUrMFRGL1J0SUNPRVdxVzYxV0hmdngwdHM2QVRlNXk4dVhFb2dGTUpKbVRyRGR6eW5TL3RKQThxVHlPZ0UzbXdUY3kyQWt6WnhndXk2OXpWNndQWTcxK3E2alRNQk5Uc0E5ZjBiU3pMbHFxN3U5ZmQ4eGpuUWk1K1NnVE1CTlRzQTlmMGJTakFtMjY5SUprdUI0WFA3N3JCTndreE53ejV1Uk5HTk9rZXFjZW94UHdGMG40Q1luNEo0M0kybW1CTnY5dk14MmZHa2czZDhMNFdzRTNHd1NjTStia1RSVGd1MjY5RXRic0gwWTNvRlhKK0FtSitDZUx5TnBwbHkxMVhuQzl1R0lkZXNFM09RRTNQTmxKTTJRWUxzdW5TQjVwczloaVhYckJOemtCTnp6WkNUTmtGT2tPbjNFNFlsMTZ3VGM1QVRjOC9Tcmp0bEp2NEFwKzgxdmZ0UDkrT01mT3c0clhhLzRwVitXQXU2V1dwMm5nTnZ2cDloVHdHMU16c3RYMzN6ejlTOGRzM0Y1ZVdrQXdBeWswZkR0dDcvdFdwSzZtei8vK2M4ZHNUUWlmL2poOXgzejRicHRadEtSTFRCOUFtNXlBdTc1TVpKbTVObXpaNDZ5WVVZRTNPUUUzUE5pSk0zSW16ZnQvY0tGT1JOd2t4Tnd6NHVSTkNOT2tXQitQSUdiVFo3QVBTOUcwa3lrWUR0ZHR3SHo0Z25jNUR5QmV6Nk1wSmtRYk1NOENiakpDYmpudzBpYUFjRTJ6TnZWMWF1dU5RTHVPZ0gzUEJoSk15RFlobmxMcHdZQ2JqWUp1T2ZCU0pvQnAwZ3diK25EVU1ETkpnSDNQQmhKRXlmWWhtVm9NZFlWY05jSnVLZlBTSm80d1RZc3c5blptWUNiendpNHA4OUltakRCTml5TGdKdWNnSHZhaktRSkUyekRzZ2k0eVFtNHA4MUltakNuU0xBc0FtNXlBdTVwTTVJbVNyQU55eVRnSmlmZ25pNGphYUlFMjdCTUxRYmNEdytQQXU0S0FmZDBHVWtUSk5pR1pXc3Q0RTREU2NCZEorQ2VKaU5wZ2dUYnNHd3RCdHpyOWJxalRNQTlUVWJTQkRsRmdtVnJNZUIrZUhnUWNGY0l1S2ZKU0pvWXdUYTBvY1ZZMStNQTZnVGMwMk1rVFl4Z0c5cmdDZHprQk56VFl5Uk5pR0FiMmlMZ0ppZmduaFlqYVVJRTI5QVdBVGM1QWZlMEdFa1Q0aFFKMnRKaXJDdmdyaE53VDR1Uk5CR0NiV2lUZ0p1Y2dIczZqS1NKRUd4RG0xcU1kUVhjZFFMdTZUQ1NKa0N3RFcxckxkWVZjUGNUY0UrRGtUUUJnbTFvVzR1eHJvQzdUc0E5RFViU0JEaEZncllKdU1rSnVLZkJTRG94d1RhUUNMakpDYmhQejBnNk1jRTJrQWk0eVFtNFQ4OUlPaUhCTnJCSndFMU93SDFhUnRJSkNiYUJUUUp1Y2dMdTB6S1NUc2dwRXJCSndFMU93SDFhUnRLSkNMYUJTSXV4N25yOWw0NHlBZmZwR0Vrbkl0Z0dJaTNHdXJlM3R3THVDZ0gzNlJoSkp5RFlCbXBhRExodmJ6OTBsTDE0NFRQakZJeWtFeEJzQXpWdEJ0eDNIV1d2WGwwSnVFL0FTRG9CcDBoQVRZdXhibnBta29DN0xQMU12SGpoeXUzWWpLUWpFMndEUXdpNHlhWFRKSTdMU0RveXdUWXdoSUNiWFBxWmVQNzhlY2Z4R0VsSEpOZ0d0aUhnSm5keDRRbmN4MlFrSFpGZ0c5aUdnSnVjZ1B1NGpLUWpjb29FYkVQQVRVN0FmVnhHMHBFSXRvRmRDTGpKQ2JpUHgwZzZFc0Uyc0FzQk56a0I5L0VZU1VjZzJBYjJJZUFtSitBK0RpUHBDQVRid0Q0RTNPUUUzTWRoSkIyQlV5UmdId0p1Y2dMdTR6Q1NEa3l3RFl4QndFMU93SDE0UnRLQnRmaUxEUmlmZ0p1Y2dQdndqS1FEU2lkSTUrZEdFakFPQVRjNUFmZGhHVWtIbEs3YUFNWWk0Q1luNEQ0c0krbUF2di9lU0FMR0krQW1KK0ErTENQcFFGS0xKTmdHeGliZ0ppZmdQaHdqNlVCY3RRR0hJT0FtbDM0bVhMa2RocEYwQUlKdDRKQUUzT1N1cnB3bUhZS1JkQUJPa1lCREVuQ1RjK1YyR0ViU0FRaTJnVU1TY0pOTFB4T3RYY01ldzY4NlJpWFk3dmZ4NDhmdWIzLzdXd2MxWjJkbk9vdUs5THZtM2J0M1hVdFN3TzAxVDJXdlg3Lyt4NUQ4ZmNkNHZ2cm1tNjkvNlJqTm4vNzBmM3FrSHYvOTMvL3phU2hCalgrWCt2M3d3dytmVGxoYWtVYnpUei85MVhpdStQYmIzNHJjUitTNmJVU0M3WDdwdU54QVlvaWJtNXVPT2dFM09RSDN1SXlrRVFtMis2VS81WVVoMGdtSmI4UjFBbTV5QXU1eEdVa2pFbXpYcFJNazN3TFp4czFOVzgzTnRnVGM1QVRjNHpLU1JpTFk3dWNYRzl0cUxVemVoU2R3azBzQk4rTXdra2JpcXEzZjI3YzNIV3dqWGJjWjEzV2V3RTNPRTdqSFl5U05RTERkNytIaG9YdDhmT3hnVzlmWDF4MTFBbTV5QXU1eEdFa2pjSXJVejE4cXNTc0JkejhCTnprQjl6aU1wQkVJdHZ1MTlDd1h4aWZncmhOd2t4TndqOE5JMnRPTEZ5OEUyejFTUCtEWlNPeGp2VjUzMUFtNHlRbTQ5MmNrN2NrcFVqL1BSbUpmcVdsemFsQW40Q1luNE42ZmtiU0hkSUtrUjZwTEowaXUyaGlEVTROK0FtNXlBdTc5R0VsNzhLTEZmcXZWcW9NeE9EWG9KK0FtSitEZWo1RzBoemR2M1BmMmNZckVXSndhOUJOd2t4Tnc3OGRJMnBGZ3U5L2QzVnF3emFpY0d2UVRjSk1UY08vT1NOcVJZTHZmN2UzN0RzYmsxS0JmeWdDZVAzL2V0Y1JWYkoyQWUzZEcwZzRFMi8zU0NaSnZkeHlDbjZ0K0Z4Y0NiajRuNE42TmtiUUR3WFkvMy9ZNUZLY0cvVktzSytCbWs0QjdOMGJTRGdUYi9WWXI3OXZpTU5KQXVyLzNCd0UxYVNDbGJySWxybUxyQk55N01aSzJKTmp1bDM1UkNiWTVKTzhDN05maXlZR3IyRG9COS9hTXBDMEp0dnQ1d2phSDVxVzMvUVRjNUFUYzJ6T1N0aURZN3BkT2tBU1VISU9YM3ZZVGNKTVRjRy9IU05xQ1lMdWZKb0JqZWZmT1NPb2o0Q1luNE42T2tiUUZ3WGEvdDI5dk9qaUdkR3BnbE5jSnVNa0p1TGRqSkEwazJPNlhydG9lSHg4N09KYnJhMzlGMlVmQVRVN0FQWnlSTkpCZ3U1K1gyWEpzRHcrUFF0MGVBbTV5QXU3aGpLUUJCTnZEZUprdHg1WStDQVhjL1ZvTXVEMUxxMDdBUFl5Uk5JQmd1MS82NXViWlNKekMvYjMrcEUrTEFiZG5hZFVKdUljeGtnWVFiUGZ6YkNST1JhamJyOVdBKytIaG9TTW00QjdHU09vaDJPNlhUcEJjdFhGS1F0MStMWjRjM04ydE84b0UzUDJNcEI2QzdYNys3SjlURStyMmF6SGdUcy9TOG5OUkp1RHVaeVJWQ0xhSFdhOTlXK08wUEdsNUdBRTNPUUYzblpGVUlkanVsNDZ6QmR0TWdTY3Q5eE53a3hOdzF4bEpGWUx0Zmo2WW1Bb0JkNzgwa003TzJycHlFM0RYQ2JqcmpLUUN3WFkvTDdObGF2d0JRYjhXWTEwQmQ1MkF1OHhJS2hCczkvT3RuYW54MHR0K0xjYTZBdTQ2QVhlWmtSUVFiQSt6V25sdkZ0UGlwYmZEdEJickNyajdDYmhqUmxKQXNOMHZmUkFKdHBraUw3M3QxMktzSytDdUUzREhqS1NBWUx1Zkoyd3pWYWxMY3JWUzEyS3NLK0N1RTNESGpLU01ZTHRmK2dEeWhHT216RXR2K3dtNHlRbTR2MlFrWlFUYi9kTERJMzFUWjhvRTNQMEUzT1FFM0Y4eWtqWUl0b2R4MWNiVUNiaUhFWENURTNCL3pramFJTmp1NTJXMnpJWFRwSDRDYm5JQzdzOFpTUnNFMi8xV3ExVUhjeURnN3RkcXdPM25va3pBL1RrajZWOEUyOE00UldJdXZQUjJtQlpqWFdGL25ZRDdQNHlrZnhGczkwc3RrbWNqTVNmZUxkaXYxWUNiTWdIM2Z4aEpuV0I3S01FMmMrT2x0OE8wR0hEN3VhZ1RjUCtUa2RRSnRvY1FiRE5YbnVuVnI4VlkxNVBaNnk0dXpqdU1wRThFMi8zZXYzZUt4RHlsRTFDaGJwMkFtOXpaMlptQXV6T1NCTnNEdVdwanJnVGN3d2k0eVYxZHZlcGExL3hJRW16Mzh6SmI1azdBM1UvQVRTNmRKTFVlY0RjOWtnVGJ3emhGWXU2ODNIUVlBVGViMGtCcVBlQnVlaVFKdHZ1bEV5UlhGU3lCbDV2MkUzQ1RhejNnYm5va0NiYjcrWmJGVXJoYTZTZmdKdGQ2d04zc1NCSnNEN05hK1piRk1yaGFHVWJBVGE3bGdMdlprU1RZN2lmWVptbGNyZlFUY0pOck9lQnVjaVFKdG9jUmJMTTBybGFHRVhDenFlV0F1OG1SSk5qdWwzNXBlRkl4UytScXBaK0FtMXlyQVhlVEkwbXczVys5WHZ2R3pTSzVXdWtuNENiWGFzRGQzRWdTYkEvanFvMmxjclV5aklDYlhJc0JkM01qU2JEZHo4dHNXVHFuU2YwRTNPUmFETGliR2tucGY5enpjMjgyN3JOYXJUcFlNbGNyd3dpNDJkUml3TjNVU0VvRHFmWDMwQXpoRkltbDg5TGJZUVRjNUZvTHVKc2FTUzMrQzcrdDFDSjVOaEl0OE5MYmZnSnVjcTBGM00yTXBQUS9iUHFIdXJzN0h4eTBJWDBZdWxycEorQW1kMzUrMGJXaW1aSGtGS2xmT2tIeWJDUmE0dWU5bjRDYjNPWGx5MlorSnBvWVNZTHRZYndsbmRhazYyVlhLLzBFM0d4S242a3ZYNzdzV3RERVNCSnNEM056YzlOQlM5S0hvUzhIL1FUYzVGb0p1SnNZU2E3YStubVpMYTM2OE1HRFUvc0l1TW1sYTlnV2ZpYSsrdWFicjMvcEFBRDRUSlB2YmdNQTZHTWtBUUFFakNRQWdJQ1JCQUFRTUpJQUFBSkdFZ0JBd0VnQ0FBZ1lTUUFBQVNNSkFDQmdKQUVBQkl3a0FJQ0FrUVFBRURDU0FBQUNSaElBUU1CSUFnQUlHRWtBQUFFakNRQWdZQ1FCQUFTTUpBQ0FnSkVFQUJBd2tnQUFBa1lTQUVEQVNBSUFDQmhKQUFBQkl3a0FJR0FrQVFBRWpDUUFnSUNSQkFBUU1KSUFBQUpHRWdCQXdFZ0NBQWdZU1FBQUFTTUpBQ0JnSkFFQUJJd2tBSUNBa1FRQUVEQ1NBQUFDUmhJQVFNQklBZ0FJR0VrQUFBRWpDUUFnWUNRQkFBU01KQUNBZ0pFRUFCQXdrZ0FBQWtZU0FFREFTQUlBQ0JoSkFBQUJJd2tBSUdBa0FRQUVqQ1FBZ0lDUkJBQVFNSklBQUFKR0VnQkF3RWdDQUFnWVNRQUFBU01KQUNCZ0pBRUFCSXdrQUlDQWtRUUFFRENTQUFBQ1JoSUFRTUJJQWdBSUdFa0FBQUVqQ1FBZ1lDUUJBQVNNSkFDQWdKRUVBQkF3a2dBQUFrWVNBRURBU0FJQUNCaEpBQUFCSXdrQUlHQWtBUUFFakNRQWdJQ1JCQUFRTUpJQUFBSkdFZ0JBd0VnQ0FBZ1lTUUFBQVNNSkFDQmdKQUVBQkl3a0FJQ0FrUVFBRURDU0FBQUNSaElBUU1CSUFnQUlHRWtBQUFFakNRQWdZQ1FCQUFTTUpBQ0FnSkVFQUJBd2tnQUFBa1lTQUVEQVNBSUFDQmhKQUFBQkl3a0FJR0FrQVFBRWpDUUFnSUNSQkFBUU1KSUFBQUpHRWdCQXdFZ0NBQWdZU1FBQUFTTUpBQ0JnSkFFQUJJd2tBSUNBa1FRQUVEQ1NBQUFDUmhJQVFNQklBZ0FJR0VrQUFBRWpDUUFnWUNRQkFBU01KQUNBZ0pFRUFCQXdrZ0FBQWtZU0FFREFTQUlBQ0JoSkFBQUJJd2tBSUdBa0FRQUVqQ1FBZ0lDUkJBQVFNSklBQUFKR0VnQkF3RWdDQUFqOFA2TDdqYlNxWkVyMUFBQUFBRWxGVGtTdVFtQ0MiLz4KICAgIDwvZGVmcz4KICA8L3N2Zz4KICA=",
	},
	{
		value: "google",
		label: "Google AI Studio",
		icon: "PHN2ZyBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+PHBhdGggZD0iTTE2IDguMDE2QTguNTIyIDguNTIyIDAgMDA4LjAxNiAxNmgtLjAzMkE4LjUyMSA4LjUyMSAwIDAwMCA4LjAxNnYtLjAzMkE4LjUyMSA4LjUyMSAwIDAwNy45ODQgMGguMDMyQTguNTIyIDguNTIyIDAgMDAxNiA3Ljk4NHYuMDMyeiIgZmlsbD0idXJsKCNwcmVmaXhfX3BhaW50MF9yYWRpYWxfOTgwXzIwMTQ3KSIvPjxkZWZzPjxyYWRpYWxHcmFkaWVudCBpZD0icHJlZml4X19wYWludDBfcmFkaWFsXzk4MF8yMDE0NyIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgxNi4xMzI2IDUuNDU1MyAtNDMuNzAwNDUgMTI5LjIzMjIgMS41ODggNi41MDMpIj48c3RvcCBvZmZzZXQ9Ii4wNjciIHN0b3AtY29sb3I9IiM5MTY4QzAiLz48c3RvcCBvZmZzZXQ9Ii4zNDMiIHN0b3AtY29sb3I9IiM1Njg0RDEiLz48c3RvcCBvZmZzZXQ9Ii42NzIiIHN0b3AtY29sb3I9IiMxQkExRTMiLz48L3JhZGlhbEdyYWRpZW50PjwvZGVmcz48L3N2Zz4=",
	},
	{
		value: "grok",
		label: "xAI Grok",
		invertIconDark: true,
		icon: "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NjYuMDQgNTE2LjkzIj48cG9seWdvbiBwb2ludHM9IjAuMTIgMTgyLjcxIDIzNC4xNCA1MTYuOTIgMzM4LjE1IDUxNi45MiAxMDQuMTMgMTgyLjcxIDAuMTIgMTgyLjcxIi8+PHBvbHlnb24gcG9pbnRzPSIwIDUxNi45MiAxMDQuMDggNTE2LjkyIDE1Ni4wOCA0NDIuNjcgMTA0LjA0IDM2OC4zNCAwIDUxNi45MiIvPjxwb2x5Z29uIHBvaW50cz0iNDY2LjA0IDAgMzYxLjk2IDAgMTgyLjEgMjU2Ljg2IDIzNC4xNSAzMzEuMTggNDY2LjA0IDAiLz48cG9seWdvbiBwb2ludHM9IjM4MC43OCA1MTYuOTIgNDY2LjA0IDUxNi45MiA0NjYuMDQgMzcuMTYgMzgwLjc4IDE1OC45MiAzODAuNzggNTE2LjkyIi8+PC9zdmc+",
	},
	{
		value: "workers-ai",
		label: "Workers AI",
		icon: "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNjRweCIgaGVpZ2h0PSI2NHB4IiB2aWV3Qm94PSIwIC03MCAyNTYgMjU2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIj4KICAgIDxnPgogICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDAwMDAwLCAtMS4wMDAwMDApIj4KICAgICAgICAgICAgPHBhdGggZD0iTTIwMi4zNTY5LDUwLjM5NCBMMTk3LjA0NTksNDguMjcgQzE3Mi4wODQ5LDEwNC40MzQgNzIuNzg1OSw3MC4yODkgNjYuODEwOSw4Ni45OTcgQzY1LjgxNDksOTguMjgzIDEyMS4wMzc5LDg5LjE0MyAxNjAuNTE2OSw5MS4wNTYgQzE3Mi41NTU5LDkxLjYzOSAxNzguNTkyOSwxMDAuNzI3IDE3My40ODA5LDExNS41NCBMMTgzLjU0OTksMTE1LjU3MSBDMTk1LjE2NDksNzkuMzYyIDIzMi4yMzI5LDk3Ljg0MSAyMzMuNzgxOSw4NS44OTEgQzIzMS4yMzY5LDc4LjAzNCAxOTEuMTgwOSw4NS44OTEgMjAyLjM1NjksNTAuMzk0IFoiIGZpbGw9IiNGRkZGRkYiPgoKPC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMTc2LjMzMiwxMDkuMzQ4MyBDMTc3LjkyNSwxMDQuMDM3MyAxNzcuMzk0LDk4LjcyNjMgMTc0LjczOSw5NS41MzkzIEMxNzIuMDgzLDkyLjM1MjMgMTY4LjM2NSw5MC4yMjgzIDE2My41ODUsODkuNjk3MyBMNzEuMTcsODguNjM0MyBDNzAuNjM5LDg4LjYzNDMgNzAuMTA4LDg4LjEwMzMgNjkuNTc3LDg4LjEwMzMgQzY5LjA0Niw4Ny41NzIzIDY5LjA0Niw4Ny4wNDEzIDY5LjU3Nyw4Ni41MTAzIEM3MC4xMDgsODUuNDQ4MyA3MC42MzksODQuOTE2MyA3MS43MDEsODQuOTE2MyBMMTY0LjY0Nyw4My44NTQzIEMxNzUuODAxLDgzLjMyMzMgMTg3LjQ4Niw3NC4yOTQzIDE5MS43MzQsNjMuNjcyMyBMMTk3LjA0Niw0OS44NjMzIEMxOTcuMDQ2LDQ5LjMzMTMgMTk3LjU3Nyw0OC44MDAzIDE5Ny4wNDYsNDguMjY5MyBDMTkxLjIwMywyMS4xODIzIDE2Ni43NzIsMC45OTkzIDEzOC4wOTEsMC45OTkzIEMxMTEuNTM1LDAuOTk5MyA4OC42OTcsMTcuOTk1MyA4MC43Myw0MS44OTYzIEM3NS40MTksMzguMTc4MyA2OS4wNDYsMzYuMDUzMyA2MS42MSwzNi41ODUzIEM0OC44NjMsMzcuNjQ3MyAzOC43NzIsNDguMjY5MyAzNy4xNzgsNjEuMDE2MyBDMzYuNjQ3LDY0LjIwMzMgMzcuMTc4LDY3LjM5MDMgMzcuNzEsNzAuNTc2MyBDMTYuOTk2LDcxLjEwNzMgMCw4OC4xMDMzIDAsMTA5LjM0ODMgQzAsMTExLjQ3MjMgMCwxMTMuMDY2MyAwLjUzMSwxMTUuMTkwMyBDMC41MzEsMTE2LjI1MzMgMS41OTMsMTE2Ljc4NDMgMi4xMjUsMTE2Ljc4NDMgTDE3Mi42MTQsMTE2Ljc4NDMgQzE3My42NzYsMTE2Ljc4NDMgMTc0LjczOSwxMTYuMjUzMyAxNzQuNzM5LDExNS4xOTAzIEwxNzYuMzMyLDEwOS4zNDgzIFoiIGZpbGw9IiNGNDgxMUYiPgoKPC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMjA1LjU0MzYsNDkuODYyOCBMMjAyLjg4NzYsNDkuODYyOCBDMjAyLjM1NjYsNDkuODYyOCAyMDEuODI1Niw1MC4zOTM4IDIwMS4yOTQ2LDUwLjkyNDggTDE5Ny41NzY2LDYzLjY3MTggQzE5NS45ODM2LDY4Ljk4MjggMTk2LjUxNDYsNzQuMjk0OCAxOTkuMTcwNiw3Ny40ODA4IEMyMDEuODI1Niw4MC42Njc4IDIwNS41NDM2LDgyLjc5MTggMjEwLjMyMzYsODMuMzIzOCBMMjI5Ljk3NTYsODQuMzg1OCBDMjMwLjUwNjYsODQuMzg1OCAyMzEuMDM3Niw4NC45MTY4IDIzMS41Njg2LDg0LjkxNjggQzIzMi4wOTk2LDg1LjQ0NzggMjMyLjA5OTYsODUuOTc4OCAyMzEuNTY4Niw4Ni41MDk4IEMyMzEuMDM3Niw4Ny41NzI4IDIzMC41MDY2LDg4LjEwMzggMjI5LjQ0MzYsODguMTAzOCBMMjA5LjI2MTYsODkuMTY1OCBDMTk4LjEwNzYsODkuNjk2OCAxODYuNDIzNiw5OC43MjU4IDE4Mi4xNzQ2LDEwOS4zNDc4IEwxODEuMTExNiwxMTQuMTI4OCBDMTgwLjU4MDYsMTE0LjY1OTggMTgxLjExMTYsMTE1LjcyMTggMTgyLjE3NDYsMTE1LjcyMTggTDI1Mi4yODI2LDExNS43MjE4IEMyNTMuMzQ0NiwxMTUuNzIxOCAyNTMuODc1NiwxMTUuMTkwOCAyNTMuODc1NiwxMTQuMTI4OCBDMjU0LjkzNzYsMTA5Ljg3OTggMjU1Ljk5OTYsMTA1LjA5OTggMjU1Ljk5OTYsMTAwLjMxODggQzI1NS45OTk2LDcyLjcwMDggMjMzLjE2MTYsNDkuODYyOCAyMDUuNTQzNiw0OS44NjI4IiBmaWxsPSIjRkFBRDNGIj4KCjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==",
	},
	{ value: "dynamic", label: "Dynamic Route" },
];

const renderOptionWithIcon = (option: ProviderItem) => {
	return {
		label: (
			<div className="flex items-center gap-3">
				<img
					className={option.invertIconDark ? "dark:invert" : ""}
					src={`data:image/svg+xml;base64,${option.icon}`}
					style={{ width: "12px", height: "12px" }}
				/>{" "}
				{option.label}
			</div>
		),
		value: option.value,
	};
};

const keyTypeOptions: { value: KeyType; label: string }[] = [
	{ value: "byok", label: "Stored Key (BYOK)" },
	{ value: "in-request", label: "Key in Request" },
	{ value: "unified", label: "Unified Billing" },
];

const clientTypeOptions: { value: ClientType; label: string }[] = [
	{ value: "openai-js", label: "OpenAI JS SDK" },
	{ value: "curl", label: "cURL" },
	{ value: "aisdk", label: "AI SDK" },
];

const apiTypeOptions: { value: APIType; label: string }[] = [
	{ value: "native", label: "Native" },
	{ value: "unified", label: "Unified" },
];

const BaseReactSelectStyles = {
	indicatorSeparator: () => ({ display: "none" }),
	input: (base: any) => ({ ...base, margin: 0, padding: 0 }),
	valueContainer: (base: any) => ({ ...base, paddingTop: 0, paddingBottom: 0 }),
	control: (base: any) => ({
		...base,
		backgroundColor: "var(--selector-bg-color)",
		borderColor: "var(--selector-border-color)",
	}),
	singleValue: (base: any) => ({
		...base,
		color: "var(--selector-text-color)",
	}),
	option: (base: any, state: any) => ({
		...base,
		backgroundColor: state.isFocused
			? "var(--sl-color-gray-5)"
			: "var(--selector-bg-color)",
		color: "var(--selector-text-color)",
		"&:active": {
			backgroundColor: "var(--selector-bg-color)",
		},
	}),
};

export function CodeSelector({
	forceClient,
	forceApiType,
}: {
	forceClient?: string;
	forceApiType?: string;
}) {
	const { config, updateConfig } = useAIGConfig();

	const provider =
		providerOptions.find((p) => p.value === config.provider) ||
		providerOptions[0];
	const clientType =
		clientTypeOptions.find(
			(c) => c.value === (forceClient ?? config.clientType),
		) || clientTypeOptions[0];
	const keyType =
		keyTypeOptions.find((k) => k.value === config.keyType) || keyTypeOptions[0];
	const apiType =
		apiTypeOptions.find((a) => a.value === (forceApiType ?? config.apiType)) ||
		apiTypeOptions[0];

	if (provider.value === "dynamic" || provider.value === "workers-ai") {
		forceApiType = "unified";
	}

	return (
		<div className="not-content mt-2 rounded-lg px-4">
			<div className="flex flex-col">
				<div className="flex flex-wrap items-center gap-2">
					Make a request to{" "}
					<ReactSelect
						// className="mt-2 h-16"
						value={renderOptionWithIcon(provider)}
						options={providerOptions.map(renderOptionWithIcon)}
						onChange={(selected) => {
							if (selected) {
								updateConfig({ provider: selected.value });
							}
						}}
						styles={{
							menu: (base) => ({
								...base,
								zIndex: 999,
								minWidth: "12rem",
								backgroundColor: "var(--selector-bg-color)",
							}),
							...BaseReactSelectStyles,
						}}
						placeholder="Select an AI provider"
					/>
					{!forceApiType && (
						<>
							<ReactSelect
								value={apiType}
								options={apiTypeOptions}
								onChange={(selected) => {
									if (selected) {
										updateConfig({ apiType: selected.value });
									}
								}}
								styles={{
									menu: (base) => ({
										...base,
										zIndex: 999,
										minWidth: "10rem",
										backgroundColor: "var(--selector-bg-color)",
									}),
									...BaseReactSelectStyles,
								}}
								placeholder="Select API type"
							/>
							API{" "}
						</>
					)}
					{!forceClient && (
						<>
							using{" "}
							<ReactSelect
								value={clientType}
								options={clientTypeOptions}
								onChange={(selected) => {
									if (selected) {
										updateConfig({ clientType: selected.value });
									}
								}}
								styles={{
									menu: (base) => ({
										...base,
										zIndex: 999,
										minWidth: "10rem",
										backgroundColor: "var(--selector-bg-color)",
									}),
									...BaseReactSelectStyles,
								}}
								placeholder="Select client"
							/>
							<div className="w-full" />
						</>
					)}
					{!["workers-ai", "dynamic"].includes(config.provider) && (
						<>
							with{" "}
							<ReactSelect
								// className="mt-2 h-16"
								value={keyType}
								options={keyTypeOptions}
								onChange={(selected) => {
									if (selected) {
										updateConfig({ keyType: selected.value });
									}
								}}
								styles={{
									menu: (base) => ({
										...base,
										zIndex: 999,
										minWidth: "12rem",
										backgroundColor: "var(--selector-bg-color)",
									}),
									...BaseReactSelectStyles,
								}}
								placeholder="Select key type"
							/>
						</>
					)}
				</div>
			</div>
			<div className="hidden bg-gray-200"></div>
		</div>
	);
}

export function CodeExample({
	provider,
	clientType,
	keyType,
	apiType,
	forceApiType,
	forceClientType,
	children,
}: {
	provider: string;
	clientType: string;
	keyType: string;
	apiType: string;
	forceApiType?: string;
	forceClientType?: string;
	children: React.ReactNode;
}) {
	const { config } = useAIGConfig();
	if (
		["dynamic", "workers-ai"].includes(config.provider) &&
		config.keyType === "in-request"
	) {
		config.keyType = "byok";
	}
	if (provider === "dynamic" || provider === "workers-ai") {
		forceApiType = "unified";
	}
	const stored = config.keyType === "byok" || config.keyType === "unified";
	const resolvedClientType = forceClientType ?? config.clientType;
	const resolvedApiType = forceApiType ?? config.apiType;
	const isHidden =
		config.provider !== provider ||
		resolvedClientType !== clientType ||
		resolvedApiType !== apiType ||
		(stored ? keyType !== "stored" : keyType !== "in-request");
	return <div className={isHidden ? "hidden" : ""}>{children}</div>;
}

export const modelOptions = [
	{
		model: "gpt-5.2",
		provider: "openai",
		aiSDK: {
			providerFactory: "createOpenAI",
			providerUsage: "openai.chat",
			provider: "openai",
		},
	},
	{
		model: "claude-4-5-sonnet",
		provider: "anthropic",
		aiSDK: {
			providerFactory: "createAnthropic",
			providerUsage: "anthropic",
			provider: "anthropic",
		},
	},
	{
		model: "gemini-2.5-pro",
		provider: "google",
		aiSDK: {
			providerFactory: "createGoogle",
			providerUsage: "google",
			provider: "google",
		},
	},
	{
		model: "grok-4",
		provider: "grok",
		aiSDK: {
			providerFactory: "createXai",
			providerUsage: "xai",
			provider: "xai",
		},
	},
	{
		model: "customer-support",
		provider: "dynamic",
		aiSDK: {
			providerFactory: "createUnified",
			providerUsage: "unified",
			provider: "unified",
		},
	},
	{
		model: "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
		provider: "workers-ai",
		aiSDK: {
			providerFactory: "createUnified",
			providerUsage: "unified",
			provider: "unified",
		},
	},
];
export const code = `import OpenAI from "openai";

const client = new OpenAI({
	apiKey: "{cf_api_token}",
    {headerauth}
	baseURL:
		"https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat",
});

const response = await client.chat.completions.create({
	model: "{provider}/{model}",
	messages: [{ role: "user", content: "Hello, world!" }],
});`;

export const aiSDKUnifiedCode = `import { createAiGateway } from 'ai-gateway-provider';
import { createUnified } from 'ai-gateway-provider/providers/unified';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const unified = createUnified({apikey});

const { text } = await generateText({
  model: aigateway(unified('{provider}/{model}')),
  prompt: 'What is Cloudflare?',
});`;

export const aiSDKNativeCode = `import { createAiGateway } from 'ai-gateway-provider';
import { {providerFactory} } from 'ai-gateway-provider/providers/{provider}';
import { generateText } from "ai";

const aigateway = createAiGateway({
  accountId: "{CLOUDFLARE_ACCOUNT_ID}",
  gateway: '{GATEWAY_NAME}',
  apiKey: '{CF_AIG_TOKEN}',
});

const {provider} = {providerFactory}({apikey});

const { text } = await generateText({
  model: aigateway({providerUsage}('{model}')),
  prompt: 'What is Cloudflare?',
});`;

export const curlCode = `curl -X POST https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions \\
  --header 'cf-aig-authorization: Bearer {CF_AIG_TOKEN}' \\
{headerauth}
  --header 'Content-Type: application/json' \\
  --data '{
    "model": "{provider}/{model}",
    "messages": [
      {
        "role": "user",
        "content": "What is Cloudflare?"
      }
    ]
  }'`;
