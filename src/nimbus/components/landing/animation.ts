// Staggered `fade-rise` entrance classes (keyframes in globals.css).
export function stagger(delay: number) {
	return `animate-[fade-rise_0.6s_cubic-bezier(0.16,1,0.3,1)_${delay}s_both] motion-reduce:animate-none`;
}
