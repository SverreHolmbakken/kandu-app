"use client";

import { useState } from "react";
import { Plus, PlusSquare } from "lucide-react";
import { Fragment } from "react";
import { Dialog, DialogTrigger } from "@/app/components/ui/dialog";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "./card";

import { colors } from "@/app/utils/colors";
import ProjectModal from "../layout/project-modal";

export default function CreateProjectCard({
	setProjects,
	projects,
}: {
	setProjects: any;
	projects: any;
}) {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	function handleCreateProjectClick() {
		openAddProjectPopup();
	}

	function openAddProjectPopup() {
		setModalIsOpen(true);
	}

	function createNewProject() {
		shuffleColors();
	}

	function shuffleColors() {
		colors.sort(() => 0.5 - Math.random());
	}

	return (
		<Dialog>
			<DialogTrigger
				onClick={handleCreateProjectClick}
				className="flex place-items-center h-80 place-content-center border-solid hover:opacity-90 rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
			>
				<div className="block w-5 h-5 justify-center">
					<Plus className="text-secondaryDark" />
				</div>
			</DialogTrigger>
			{modalIsOpen && (
				<ProjectModal setProjects={setProjects} projects={projects} />
			)}
		</Dialog>
	);
}
