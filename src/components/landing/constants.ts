export function stagger(delay: number) {
	return `animate-[v27-enter_0.6s_cubic-bezier(0.16,1,0.3,1)_${delay}s_both] motion-reduce:animate-none`;
}
