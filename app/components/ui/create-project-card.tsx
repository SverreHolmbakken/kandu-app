"use client";

import { useState } from "react";
import { Plus, PlusSquare } from "lucide-react";
import { Fragment } from "react";
import { Dialog, DialogTrigger } from "@/app/components/ui/dialog";

import { colors } from "@/app/utils/colors";
import ProjectModal from "../layout/project-modal";

export default function CreateProjectCard() {
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
				className="flex place-items-center rounded-md h-80 place-content-center border-solid border-[1px] border-secondaryLight hover:opacity-90"
			>
				<div className="block w-5 h-5 justify-center">
					<Plus className="text-secondaryDark" />
				</div>
			</DialogTrigger>
			{modalIsOpen && <ProjectModal />}
		</Dialog>
	);
}
