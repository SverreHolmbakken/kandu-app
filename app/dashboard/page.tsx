import Header from "../components/layout/header";
import CreateProjectButton from "../components/ui/create-project-button";

export default function Dashboard() {
	return (
		<div className="flex h-screen flex-col justify-between max-w-7xl m-auto">
			<Header />
			<main className="flex h-full flex-col text-primaryDark">
				<h1 className="w-full text-extraLargeFont py-largePadding">
					Projects
				</h1>
				<CreateProjectButton />
			</main>
		</div>
	);
}
