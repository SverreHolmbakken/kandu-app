import CreateProjectButton from "../components/ui/create-project-button";

export default function Dashboard() {

	const colors = [
		{
			id: 1,
			color: "#FF8080",
		},
		{
			id: 2,
			color: "#FFCF96",
		},
		{
			id: 3,
			color: "#F6FDC3",
		},
		{
			id: 4,
			color: "#CDFAD5",
		},
	];

	function shuffleColors() {
		colors.sort(() => 0.5 - Math.random());
	}

	shuffleColors();

	return (
		<div className="flex h-screen flex-col justify-between px-36 m-auto">
			<main className="flex h-full flex-col text-primaryDark">
				<h1 className="w-full text-extraLargeFont py-largePadding">
					Projects
				</h1>
				<CreateProjectButton />
			</main>
		</div>
	);
}
