"use client";

import { getAllTasks } from "@/tasks";
import { useEffect, useState } from "react";
import CreateProjectCard from "../components/ui/create-project-card";
import ProjectCard from "../components/ui/project-card";
import { useAuth } from "@clerk/nextjs";
import { getProjects } from "../utils/supabase-request";

export default function Dashboard() {
	const { userId, getToken } = useAuth();
	const tasks = getAllTasks();

	const [projects, setProjects] = useState<Project[]>([]);

	interface Project {
		id: number;
		name: string;
		description: string;
		accessed_by: string[];
		owner_id: string;
		created_at: string;
		card_color: string;
	}

	useEffect(() => {
		const loadProject = async () => {
			const token = await getToken({ template: "supabase" });
			const projects = await getProjects({
				userId: userId ?? "",
				token: token ?? "",
			});
			console.log(projects);
			if (projects !== null) {
				setProjects(projects);
			}
		};
		loadProject();
	}, []);

	return (
		<div className="flex h-screen flex-col justify-between lg:px-36 md:px-8 px-1 m-auto">
			<main className="flex h-full flex-col text-primaryDark dark:text-zinc-200">
				<h1 className="w-full text-extraLargeFont py-largePadding">
					Projects
				</h1>
				<div className="grid grid-cols-1 grid-flow-row auto-cols-max gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
					{projects.map((project) => (
						<ProjectCard
							key={project.id}
							name={project.name}
							description={project.description}
							date={new Date(project.created_at).toLocaleDateString()}
							color={project.card_color}
						/>
					))}
					<CreateProjectCard />
				</div>
			</main>
		</div>
	);
}
