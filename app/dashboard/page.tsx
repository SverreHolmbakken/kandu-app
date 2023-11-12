"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { getProjects } from "../utils/supabase-request";
import CreateProjectCard from "../components/layout/kanban/project/create-project-card";
import ProjectCard from "../components/layout/kanban/project/project-card";
import { Skeleton } from "../components/ui/skeleton";
import { useOrganization } from "@clerk/nextjs";

export default function Dashboard() {
	const { orgId, userId, getToken } = useAuth();
	const { organization } = useOrganization();

	const [projects, setProjects] = useState<Project[]>([]);
	const [cardColor, setCardColor] = useState<string>("");
	const [loading, setLoading] = useState(true);

	function accessId() {
		if (!orgId) {
			return userId;
		} else {
			return orgId;
		}
	}

	interface Project {
		id: number;
		name: string;
		description: string;
		accessed_by: string[];
		owner_id: string;
		created_at: string;
		card_color: string;
		slug: string;
	}

	useEffect(() => {
		setLoading(true);
		const loadProject = async () => {
			const token = await getToken({ template: "supabase" });
			const projects = (await getProjects({
				id: accessId(),
				token: token ?? "",
			})) as Project[];
			console.log(projects);
			if (projects.length === 0) {
				setLoading(false);
			} else if (projects !== null) {
				setProjects(projects);
				setCardColor(projects[0].card_color);
				setLoading(false);
			}
		};
		loadProject();
	}, [orgId, userId]);

	return (
		<div className="flex h-screen flex-col justify-between lg:px-36 md:px-8 px-1 m-auto">
			<main className="flex h-full flex-col text-primaryDark dark:text-zinc-200">
				<h1 className="w-full text-extraLargeFont py-largePadding">
					{accessId() == orgId ? `${organization?.name} ` : "Personal "}
					projects
				</h1>
				<div className="grid grid-cols-1 grid-flow-row auto-cols-max gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{loading ? (
						<Skeleton className="h-80" />
					) : (
						<>
							{projects
								.map((project) => (
									<ProjectCard
										key={project.id}
										name={project.name}
										description={project.description}
										date={new Date(
											project.created_at
										).toLocaleDateString()}
										color={project.card_color}
										slug={project.slug}
										setProjects={setProjects}
										projects={projects}
									/>
								))
								.sort((a, b) => {
									if (a.props.date > b.props.date) {
										return 1;
									}
									if (a.props.date < b.props.date) {
										return -1;
									}
									return 0;
								})}
						</>
					)}
					<CreateProjectCard
						setProjects={setProjects}
						projects={projects}
					/>
				</div>
			</main>
		</div>
	);
}
