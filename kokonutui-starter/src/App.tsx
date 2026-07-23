// Une fois les composants ajoutés avec `shadcn add` (voir README), décommente
// les imports ci-dessous et remplace le contenu de <main> par les composants.
//
// import CardFlip from "@/components/kokonutui/card-flip";
// import LiquidGlassCard from "@/components/kokonutui/liquid-glass-card";
// import SpotlightCard from "@/components/kokonutui/spotlight-cards";

export function App() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
			<div className="text-center">
				<h1 className="text-2xl font-semibold">kokonutui starter ✅</h1>
				<p className="text-muted-foreground mt-2 max-w-md text-sm">
					Projet React + Tailwind + shadcn prêt. Lance les 3 commandes{" "}
					<code>shadcn add</code> du README, puis décommente les imports dans{" "}
					<code>src/App.tsx</code>.
				</p>
			</div>

			{/*
			<div className="flex flex-wrap items-center justify-center gap-8">
				<CardFlip />
				<LiquidGlassCard />
				<SpotlightCard />
			</div>
			*/}
		</main>
	);
}
