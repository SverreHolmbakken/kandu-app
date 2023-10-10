"use client";

import { getAllTasks } from "@/tasks";
import CreateProjectCard from "../components/ui/create-project-card";
import ProjectCard from "../components/ui/project-card";

export default function Dashboard() {
	const tasks = getAllTasks();

	return (
		<div className="flex h-screen flex-col justify-between lg:px-36 md:px-8 px-1 m-auto">
			<main className="flex h-full flex-col text-primaryDark">
				<h1 className="w-full text-extraLargeFont py-largePadding">
					Projects
				</h1>
				<div className="grid grid-cols-1 grid-flow-row auto-cols-max gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
					{tasks.map((task) => (
						<ProjectCard
							key={task.id}
							title={task.title}
							description={task.description}
							date={task.date}
						/>
					))}
					<CreateProjectCard />
				</div>
			</main>
		</div>
	);
}
