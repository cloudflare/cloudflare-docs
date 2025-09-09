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
					case "javascript": {
						context.codeBlock.props.title ??= "JavaScript";
						break;
					}
					case "js": {
						context.codeBlock.props.title ??= "JavaScript";
						break;
					}
					case "py": {
						context.codeBlock.props.title ??= "Python";
						break;
					}
					case "python": {
						context.codeBlock.props.title ??= "Python";
						break;
					}
					case "typescript": {
						context.codeBlock.props.title ??= "TypeScript";
						break;
					}
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
