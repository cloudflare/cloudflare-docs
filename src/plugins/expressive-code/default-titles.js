import { definePlugin } from "@expressive-code/core";

export default () => {
	return definePlugin({
		name: "Adds language-specific default titles.",
		hooks: {
			preprocessLanguage: async (context) => {
				switch (context.codeBlock.language) {
					case "powershell": {
						context.codeBlock.props.title ??= "PowerShell";
						break;
					}
					case "javascript":
					case "js": {
						context.codeBlock.props.title ??= "JavaScript";
						break;
					}
					case "py":
					case "python": {
						context.codeBlock.props.title ??= "Python";
						break;
					}
					case "typescript":
					case "ts": {
						context.codeBlock.props.title ??= "TypeScript";
						break;
					}
					default: {
						return;
					}
				}
			},
		},
	});
};
