"use client";

import { Plus } from "lucide-react";
import { Dialog, DialogTrigger } from "@/app/components/ui/dialog";

import ProjectModal from "../layout/project-modal";

export default function CreateProjectCard({
	setProjects,
	projects,
}: {
	setProjects: any;
	projects: any;
}) {
	return (
		<Dialog>
			<DialogTrigger className="flex place-items-center h-80 place-content-center border-solid hover:opacity-90 rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50">
				<div className="block w-5 h-5 justify-center">
					<Plus className="text-secondaryDark" />
				</div>
			</DialogTrigger>

			<ProjectModal setProjects={setProjects} projects={projects} />
		</Dialog>
	);
}
