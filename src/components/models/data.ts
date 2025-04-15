import openai from "../../assets/images/workers-ai/openai.svg";
import meta from "../../assets/images/workers-ai/meta.svg";
import microsoft from "../../assets/images/workers-ai/microsoft.svg";
import mistral from "../../assets/images/workers-ai/mistralai.svg";
import stabilityai from "../../assets/images/workers-ai/stabilityai.svg";
import huggingface from "../../assets/images/workers-ai/huggingface.svg";
import google from "../../assets/images/workers-ai/google.svg";
import deepseek from "../../assets/images/workers-ai/deepseek.svg";
import qwen from "../../assets/images/workers-ai/qwen.svg";
import blackforestlabs from "../../assets/images/workers-ai/blackforestlabs.svg";

export const authorData: Record<string, { name: string; logo: string }> = {
	openai: {
		name: "OpenAI",
		logo: openai.src,
	},
	meta: {
		name: "Meta",
		logo: meta.src,
	},
	microsoft: {
		name: "Microsoft",
		logo: microsoft.src,
	},
	mistral: {
		name: "MistralAI",
		logo: mistral.src,
	},
	mistralai: {
		name: "MistralAI",
		logo: mistral.src,
	},
	stabilityai: {
		name: "Stability.ai",
		logo: stabilityai.src,
	},
	huggingface: {
		name: "HuggingFace",
		logo: huggingface.src,
	},
	google: {
		name: "Google",
		logo: google.src,
	},
	"deepseek-ai": {
		name: "DeepSeek",
		logo: deepseek.src,
	},
	qwen: {
		name: "Qwen",
		logo: qwen.src,
	},
	"black-forest-labs": {
		name: "Black Forest Labs",
		logo: blackforestlabs.src,
	},
};
