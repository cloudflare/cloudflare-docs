const FieldBadges = ({ badges }) => {
	return (
		<ul className="list-none m-0 p-0 inline-flex items-center gap-2 text-xs">
			{badges.map((badge) => (
				<li
					key={badge}
					className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md block !mt-0"
				>
					{badge}
				</li>
			))}
		</ul>
	);
};

export default FieldBadges;
