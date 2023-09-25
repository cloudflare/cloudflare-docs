// eslint-disable-next-line no-undef
module.exports = {
	env: {
		browser: true,
		es2023: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
	],
	overrides: [],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint'],
	rules: {
		// Main rules
		'indent': ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		'quotes': ['error', 'single'],
		'semi': ['error', 'always'],
		'comma-dangle': [
			'error',
			{
				arrays: 'always-multiline',
				objects: 'always-multiline',
				imports: 'always-multiline',
				exports: 'always-multiline',
				functions: 'always-multiline',
			},
		],
		'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1, maxBOF: 0 } ],
		'max-len': ['error', { code: 120, tabWidth: 2 }],

		// Disabled due to them being code examples and being far too common
		'no-undef': ['off'],
		'@typescript-eslint/no-unused-vars': ['off'],
	},
};
