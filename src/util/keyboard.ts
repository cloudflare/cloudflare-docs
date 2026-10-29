const NON_TEXT_INPUT_TYPES = new Set([
	"button",
	"checkbox",
	"color",
	"file",
	"image",
	"radio",
	"range",
	"reset",
	"submit",
]);

export function isEditableKeyboardTarget(event: KeyboardEvent): boolean {
	const target = event.composedPath()[0];
	if (!(target instanceof HTMLElement)) return false;
	if (target instanceof HTMLInputElement) {
		return !NON_TEXT_INPUT_TYPES.has(target.type);
	}
	return (
		target instanceof HTMLTextAreaElement ||
		target instanceof HTMLSelectElement ||
		target.isContentEditable
	);
}
