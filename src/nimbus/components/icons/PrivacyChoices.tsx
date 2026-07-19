import type * as React from "react";

// "Your Privacy Choices" glyph.
export const PrivacyChoices: React.FC<React.SVGProps<SVGSVGElement>> = (
	props,
) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 30 14"
			aria-hidden="true"
			{...props}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				fill="#fff"
				d="M7.4 12.8h6.8l3.1-11.6H7.4C4.2 1.2 1.6 3.8 1.6 7s2.6 5.8 5.8 5.8z"
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				fill="#06f"
				d="M22.6 0H7.4C3.5 0 .4 3.1.4 7s3.1 7 7 7h15.2c3.9 0 7-3.1 7-7s-3.1-7-7-7zM1.6 7c0-3.2 2.6-5.8 5.8-5.8h9.9l-3.1 11.6H7.4C4.2 12.8 1.6 10.2 1.6 7z"
			/>
			<path
				fill="#fff"
				d="M24.6 4c.2.2.2.6 0 .8L22.5 7l2.2 2.2c.2.2.2.6 0 .8-.2.2-.6.2-.8 0l-2.2-2.2L19.5 10c-.2.2-.6.2-.8 0-.2-.2-.2-.6 0-.8L20.8 7l-2.2-2.2c-.2-.2-.2-.6 0-.8.2-.2.6-.2.8 0l2.2 2.2L23.8 4c.2-.2.6-.2.8 0z"
			/>
			<path
				fill="#06f"
				d="M12.7 4.1c.2.2.3.6.1.8L8.6 9.8c-.1.1-.2.2-.3.2-.2.1-.5.1-.7-.1L5.4 7.7c-.2-.2-.2-.6 0-.8.2-.2.6-.2.8 0L8 8.6l3.8-4.5c.2-.2.6-.2.9 0z"
			/>
		</svg>
	);
};
