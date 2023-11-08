import React from "react";
import { MoreHorizontal } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";
import { deleteProject } from "@/app/utils/supabase-request";
import { useAuth } from "@clerk/nextjs";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
	AlertDialogTrigger,
	AlertDialogFooter,
	AlertDialogHeader,
} from "../../../ui/alert-dialog";
import { Dialog, DialogTrigger } from "@/app/components/ui/dialog";
import { useToast } from "@/app/components/ui/use-toast";
import ModalEditProject from "./modal-edit-project";

export default function EditColumn({
	slug,
	setProjects,
	projects,
	projectName,
	projectDescription,
}: {
	slug: string;
	setProjects: any;
	projects: any;
	projectName: string;
	projectDescription: string;
}) {
	const { getToken } = useAuth();
	const { toast } = useToast();

	const [openDialog, setOpenDialog] = React.useState(false);
	const [openDropdown, setOpenDropdown] = React.useState(false);

	async function handleDelete() {
		const token = await getToken({ template: "supabase" });
		await deleteProject({
			token: token ?? "",
			slug: slug,
		});
		setProjects((current: any[]) =>
			current.filter((project) => project.slug !== slug)
		);
		toast({
			title: "Success!",
			description: "Project has been deleted.",
		});
	}

	return (
		<DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
			<DropdownMenuTrigger asChild>
				<button>
					<MoreHorizontal className="cursor-pointer text-secondaryDark" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-100 hover:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:hover:bg-zinc-800 dark:hover:text-slate-50">
					<Dialog open={openDialog} onOpenChange={setOpenDialog}>
						<DialogTrigger className="text-secondaryDark">
							Edit project
						</DialogTrigger>

						<ModalEditProject
							setProjects={setProjects}
							slug={slug}
							setOpenDialog={setOpenDialog}
							setOpenDropdown={setOpenDropdown}
							projectName={projectName}
							projectDescription={projectDescription}
						/>
					</Dialog>
				</div>
				<div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-100 hover:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:hover:bg-zinc-800 dark:hover:text-slate-50">
					<AlertDialog>
						<AlertDialogTrigger className="text-red-500">
							Delete project
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Are you sure?</AlertDialogTitle>
								<AlertDialogDescription>
									This action cannot be undone, and your project will
									be permanently deleted.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction
									onClick={handleDelete}
									className="bg-red-500 hover:bg-red-600"
								>
									Delete
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
