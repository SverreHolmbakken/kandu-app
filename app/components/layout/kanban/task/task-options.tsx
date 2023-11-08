import React from "react";
import { MoreHorizontal } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";
import { deleteTask } from "@/app/utils/supabase-request";
import { useAuth } from "@clerk/nextjs";
import EditColumnName from "../../../ui/modals/edit-column-name";
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
import { useToast } from "@/app/components/ui/use-toast";
import ModalEditTask from "./modal-edit-task";
import { Dialog, DialogTrigger } from "@/app/components/ui/dialog";

export default function TaskOptions({
	taskId,
	setTasks,
	taskName,
	taskDescription,
}: {
	taskId: string;
	setTasks: any;
	taskName: string;
	taskDescription: string;
}) {
	const { getToken } = useAuth();
	const { toast } = useToast();

	const [open, setOpen] = React.useState(false);

	async function handleDelete() {
		const token = await getToken({ template: "supabase" });
		await deleteTask({
			token: token ?? "",
			taskId: taskId,
		});
		setTasks((current: any[]) =>
			current.filter((task) => task.task_id !== taskId)
		);
		toast({
			title: "Success!",
			description: "Task has been deleted.",
		});
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button>
					<MoreHorizontal className="cursor-pointer text-slate-500" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-100 hover:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:hover:bg-zinc-800 dark:hover:text-slate-50">
					<Dialog open={open} onOpenChange={setOpen}>
						<DialogTrigger className="text-secondaryDark">
							Edit task
						</DialogTrigger>
						<ModalEditTask
							taskId={taskId}
							setTasks={setTasks}
							setOpen={setOpen}
							taskName={taskName}
							taskDescription={taskDescription}
						/>
					</Dialog>
				</div>
				<div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-100 hover:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:hover:bg-zinc-800 dark:hover:text-slate-50">
					<AlertDialog>
						<AlertDialogTrigger className="text-red-500">
							Delete task
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Are you sure?</AlertDialogTitle>
								<AlertDialogDescription>
									This action cannot be undone, and your column will be
									permanently deleted.
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
