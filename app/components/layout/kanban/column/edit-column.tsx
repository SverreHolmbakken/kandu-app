import React from "react";
import { MoreHorizontal } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";
import { deleteColumn } from "@/app/utils/supabase-request";
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

export default function EditColumn({
	columnId,
	setColumns,
	setText,
	text,
}: {
	columnId: string;
	setColumns: any;
	setText: any;
	text: string;
}) {
	const { getToken } = useAuth();
	const { toast } = useToast();

	async function handleDelete() {
		const token = await getToken({ template: "supabase" });
		await deleteColumn({
			token: token ?? "",
			columnId: columnId,
		});
		setColumns((current: any[]) =>
			current.filter((column) => column.column_id !== columnId)
		);
		toast({
			title: "Congratulations!",
			description: "Column has been deleted.",
		});
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button>
					<MoreHorizontal className="cursor-pointer" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-100 hover:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:hover:bg-zinc-800 dark:hover:text-slate-50">
					<EditColumnName
						columnId={columnId}
						setColumns={setColumns}
						text={text}
						setText={setText}
					/>
				</div>
				<div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-100 hover:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:hover:bg-zinc-800 dark:hover:text-slate-50">
					<AlertDialog>
						<AlertDialogTrigger className="text-red-500">
							Delete column
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
