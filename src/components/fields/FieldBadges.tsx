const FieldBadges = ({ badges }: { badges: string[] }) => {
	return (
		<ul className="m-0 inline-flex list-none items-center gap-2 p-0 text-xs">
			{badges.map((badge) => (
				<li key={badge}>
					<span className="sl-badge default">{badge}</span>
				</li>
			))}
		</ul>
	);
};

export default FieldBadges;
